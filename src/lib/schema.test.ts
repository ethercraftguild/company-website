import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";

// The app sources use the tsconfig `@/*` alias; resolve it for bare Node.
// Absolute URL: the specifier is resolved against the importer, not cwd.
register(new URL("../../test/alias-resolver.mjs", import.meta.url));

const { buildSchemaGraph, canonicalFor, organizationId, pageTypeFor } = await import("./schema.ts");

const OUT = path.join(process.cwd(), "out");

/** Every ld+json block in the built site, keyed by route file. */
type RouteGraphs = { file: string; canonical: string; nodes: Record<string, unknown>[] }[];

function collect(): RouteGraphs {
    const out: RouteGraphs = [];
    const walk = (dir: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(full);
                continue;
            }
            if (!entry.name.endsWith(".html")) continue;

            const html = fs.readFileSync(full, "utf8");
            const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? "";
            const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
            if (blocks.length === 0) continue;

            const nodes: Record<string, unknown>[] = [];
            for (const [, body] of blocks) {
                const parsed = JSON.parse(body.replace(/\\u003c/g, "<"));
                if (Array.isArray(parsed["@graph"])) {
                    nodes.push(...(parsed["@graph"] as Record<string, unknown>[]));
                } else {
                    nodes.push(parsed);
                }
            }
            out.push({ file: path.relative(OUT, full), canonical, nodes });
        }
    };
    walk(OUT);
    return out;
}

let routes: RouteGraphs;

before(() => {
    if (!fs.existsSync(OUT)) {
        throw new Error("out/ missing - run `npm run export` before the schema suite");
    }
    routes = collect();
});

describe("JSON-LD shape", () => {
    test("the built site emits structured data on real routes", () => {
        assert.ok(routes.length > 0, "no ld+json found in out/");
    });

    test("(a) exactly one node per @id within every file", () => {
        for (const route of routes) {
            const ids = route.nodes.map((n) => n["@id"]).filter(Boolean);
            const seen = new Set<string>();
            for (const id of ids) {
                assert.ok(!seen.has(id as string), `${route.file}: duplicate @id ${id}`);
                seen.add(id as string);
            }
        }
    });

    test("(a2) the same @id always resolves to identical content across files", () => {
        const seen = new Map<string, string>();
        for (const route of routes) {
            for (const node of route.nodes) {
                const id = node["@id"] as string | undefined;
                if (!id) continue;
                const serialized = JSON.stringify(node);
                if (seen.has(id)) {
                    assert.equal(seen.get(id), serialized, `node ${id} differs between files`);
                } else {
                    seen.set(id, serialized);
                }
            }
        }
        assert.ok(seen.size > 0);
    });

    test("(b) no key anywhere carries an empty string or empty array", () => {
        const walkKeys = (value: unknown, trail: string, file: string) => {
            if (Array.isArray(value)) {
                assert.ok(value.length > 0, `${file}: ${trail} is an empty array`);
                value.forEach((item, i) => walkKeys(item, `${trail}[${i}]`, file));
                return;
            }
            if (value && typeof value === "object") {
                for (const [k, v] of Object.entries(value)) {
                    walkKeys(v, trail ? `${trail}.${k}` : k, file);
                }
                return;
            }
            if (typeof value === "string") {
                assert.ok(value.length > 0, `${file}: ${trail} is an empty string`);
            }
        };
        for (const route of routes) {
            for (const node of route.nodes) walkKeys(node, "", route.file);
        }
    });

    test("(c) every page-node @id equals that file's rel=canonical", () => {
        for (const route of routes) {
            const pageNodes = route.nodes.filter((n) =>
                ["WebPage", "AboutPage", "ContactPage"].includes(n["@type"] as string),
            );
            for (const node of pageNodes) {
                assert.equal(node["@id"], route.canonical, `${route.file}: page @id != canonical`);
                assert.equal(node["url"], route.canonical, `${route.file}: page url != canonical`);
            }
        }
    });

    test("(c2) page nodes are never pinned to the origin on a sub-route", () => {
        const origin = canonicalFor("/");
        for (const route of routes) {
            if (route.canonical === origin) continue;
            for (const node of route.nodes) {
                assert.notEqual(
                    node["@id"],
                    origin,
                    `${route.file}: node @id is the origin, should be the route canonical`,
                );
            }
        }
    });

    test("(d) every referenced public asset exists on disk", () => {
        const assetRefs = /\/(logo|icon|og|favicon|apple-touch-icon|web-app-manifest)[a-z0-9.\-]*/g;
        for (const route of routes) {
            const json = JSON.stringify(route.nodes);
            for (const match of json.match(assetRefs) ?? []) {
                assert.ok(
                    fs.existsSync(path.join(OUT, match)),
                    `${route.file}: references ${match} which is not in out/`,
                );
            }
        }
    });
});

describe("schema helpers", () => {
    test("canonical strips trailing slashes and keeps the bare origin for /", () => {
        assert.equal(canonicalFor("/"), canonicalFor(""));
        assert.equal(canonicalFor("/about/"), canonicalFor("/about"));
    });

    test("page type is route-aware", () => {
        assert.equal(pageTypeFor("/about"), "AboutPage");
        assert.equal(pageTypeFor("/contact"), "ContactPage");
        assert.equal(pageTypeFor("/work"), "WebPage");
        assert.equal(pageTypeFor("/"), "WebPage");
    });

    test("graph has exactly one organization node and one page node", () => {
        const graph = buildSchemaGraph("/about") as { "@graph": Record<string, unknown>[] };
        const orgs = graph["@graph"].filter((n) => n["@type"] === "ProfessionalService");
        const pages = graph["@graph"].filter((n) => n["@type"] === "AboutPage");
        assert.equal(orgs.length, 1);
        assert.equal(pages.length, 1);
        assert.equal(orgs[0]["@id"], organizationId());
        assert.equal(pages[0]["about"].toString(), organizationId());
    });

    test("no telephone or identifier key survives", () => {
        const graph = buildSchemaGraph("/") as { "@graph": Record<string, unknown>[] };
        const org = graph["@graph"][0];
        assert.equal("telephone" in org, false);
        assert.equal("identifier" in org, false);
    });

    test("founder carries a name and nothing else", () => {
        const graph = buildSchemaGraph("/") as { "@graph": Record<string, unknown>[] };
        const founder = graph["@graph"][0].founder as Record<string, unknown>;
        assert.equal(founder["@type"], "Person");
        assert.deepEqual(Object.keys(founder).sort(), ["@type", "name"]);
    });
});
