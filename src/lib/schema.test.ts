import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Built-HTML schema suite. Reads out/ directly rather than importing app code,
// so it needs no alias shim and no bundler. Run `yarn build` (or `yarn export`)
// first; the prerender gate below is the owner policy.
const OUT = path.join(process.cwd(), "out");

// Error documents are not routes and must not carry schema. `next build` counts
// /_not-found as a route and emits robots.txt as a non-HTML route, so the raw
// route count (29) does not equal the number of content HTML pages (27).
const ERROR_PAGES = new Set(["404.html", "_not-found.html"]);

type RouteGraphs = { file: string; canonical: string; blocks: number; nodes: Record<string, unknown>[] }[];

function htmlFiles(dir: string, out: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) htmlFiles(full, out);
        else if (entry.name.endsWith(".html")) out.push(full);
    }
    return out;
}

function parseBlocks(html: string): Record<string, unknown>[] {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    const nodes: Record<string, unknown>[] = [];
    for (const [, body] of blocks) {
        const parsed = JSON.parse(body.replace(/\\u003c/g, "<"));
        if (Array.isArray(parsed["@graph"])) nodes.push(...(parsed["@graph"] as Record<string, unknown>[]));
        else nodes.push(parsed);
    }
    return nodes;
}

let routes: RouteGraphs;
let contentPages = 0;
let totalHtml = 0;

before(() => {
    if (!fs.existsSync(OUT)) throw new Error("out/ missing - run `yarn export` first");
    const files = htmlFiles(OUT);
    totalHtml = files.length;
    routes = files.map((full) => {
        const html = fs.readFileSync(full, "utf8");
        return {
            file: path.relative(OUT, full),
            canonical: (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? "",
            blocks: (html.match(/<script type="application\/ld\+json"/g) || []).length,
            nodes: parseBlocks(html),
        };
    });
    routes = routes.filter((r) => !ERROR_PAGES.has(path.basename(r.file)));
    contentPages = routes.length;
});

describe("JSON-LD in the built HTML", () => {
    test("(e) prerender gate: every content route's HTML carries at least one ld+json block", () => {
        const missing = routes.filter((r) => r.blocks === 0).map((r) => r.file);
        assert.deepEqual(missing, [], `routes with no JSON-LD: ${missing.join(", ")}`);
        // Every non-error HTML file must be covered; error documents are excluded
        // deliberately and are asserted absent below.
        assert.equal(
            contentPages,
            totalHtml - [...ERROR_PAGES].filter((p) => fs.existsSync(path.join(OUT, p))).length,
            "content page census does not match out/ contents",
        );
        for (const errorPage of ERROR_PAGES) {
            const full = path.join(OUT, errorPage);
            if (!fs.existsSync(full)) continue;
            assert.ok(
                !fs.readFileSync(full, "utf8").includes("application/ld+json"),
                `${errorPage} must not carry schema`,
            );
        }
    });

    test("(a) exactly one node per @id within each file", () => {
        for (const route of routes) {
            const seen = new Set<string>();
            for (const node of route.nodes) {
                const id = node["@id"] as string | undefined;
                if (!id) continue;
                assert.ok(!seen.has(id), `${route.file}: duplicate @id ${id}`);
                seen.add(id);
            }
        }
    });

    test("(a2) a given @id resolves to identical content everywhere", () => {
        const seen = new Map<string, string>();
        for (const route of routes) {
            for (const node of route.nodes) {
                const id = node["@id"] as string | undefined;
                if (!id) continue;
                const json = JSON.stringify(node);
                if (seen.has(id)) assert.equal(seen.get(id), json, `${id} differs between files`);
                else seen.set(id, json);
            }
        }
        assert.ok(seen.size > 0);
    });

    test("(b) no key anywhere holds an empty string or empty array", () => {
        const walk = (value: unknown, trail: string, file: string) => {
            if (Array.isArray(value)) {
                assert.ok(value.length > 0, `${file}: ${trail} is an empty array`);
                value.forEach((item, i) => walk(item, `${trail}[${i}]`, file));
            } else if (value && typeof value === "object") {
                for (const [k, v] of Object.entries(value)) walk(v, trail ? `${trail}.${k}` : k, file);
            } else if (typeof value === "string") {
                assert.ok(value.length > 0, `${file}: ${trail} is an empty string`);
            }
        };
        for (const route of routes) {
            for (const node of route.nodes) walk(node, "", route.file);
        }
    });

    test("(c) page-node @id equals that file's rel=canonical", () => {
        const PAGE_TYPES = new Set(["WebPage", "AboutPage", "ContactPage"]);
        let checked = 0;
        for (const route of routes) {
            for (const node of route.nodes) {
                if (!PAGE_TYPES.has(node["@type"] as string)) continue;
                checked++;
                assert.equal(node["@id"], route.canonical, `${route.file}: page @id != canonical`);
                assert.equal(node["url"], route.canonical, `${route.file}: page url != canonical`);
            }
        }
        assert.ok(checked > 0, "no page nodes found");
    });

    test("(c2) a sub-route page node is never pinned to the origin", () => {
        const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethercraftguild.vercel.app";
        for (const route of routes) {
            if (route.canonical === origin) continue;
            for (const node of route.nodes) {
                assert.notEqual(node["@id"], origin, `${route.file}: node @id is the origin`);
            }
        }
    });

    test("(d) no reference to a non-existent public asset", () => {
        const assetRefs = /\/(logo|icon|og|favicon|apple-touch-icon|web-app-manifest)[a-z0-9.\-]*/g;
        for (const route of routes) {
            for (const match of JSON.stringify(route.nodes).match(assetRefs) ?? []) {
                assert.ok(fs.existsSync(path.join(OUT, match)), `${route.file}: ${match} missing from out/`);
            }
        }
    });

    test("exactly one organization node per route, with the canonical org @id", () => {
        for (const route of routes) {
            const orgs = route.nodes.filter(
                (n) => n["@type"] === "ProfessionalService" || n["@type"] === "Organization",
            );
            assert.equal(orgs.length, 1, `${route.file}: expected 1 org node, got ${orgs.length}`);
            assert.match(orgs[0]["@id"] as string, /#organization$/, `${route.file}: bad org @id`);
        }
    });

    test("no telephone, identifier, icon.png or data-flag leakage", () => {
        for (const route of routes) {
            const json = JSON.stringify(route.nodes);
            assert.ok(!/"telephone":\s*""/.test(json), `${route.file}: empty telephone`);
            assert.ok(!/"identifier"/.test(json), `${route.file}: identifier present`);
            assert.ok(!/icon\.png/.test(json), `${route.file}: references the 404 /icon.png`);
            assert.ok(!/listedProject/.test(json), `${route.file}: data-side flag leaked into JSON-LD`);
        }
    });
});
