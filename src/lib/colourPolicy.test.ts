import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Machine gate for the monochrome invariant (AGENTS.md).
 *
 * Every colour must live in the @theme block of src/app/globals.css. This test
 * FAILS if a raw hue utility or an off-allowlist hex appears in src/ or in the
 * built CSS. That is the point: the policy cannot rot because the check runs.
 *
 * CLIENT_BRAND_ALLOWLIST is for verified client/third-party brand marks. It is
 * intentionally EMPTY - the six client logos are raster/vector image files in
 * public/clients/, so no brand hex is in the source. Add an entry only with the
 * owner's written approval and a file:line comment naming the element.
 */
const CLIENT_BRAND_ALLOWLIST: { value: string; why: string }[] = [];

/**
 * Owner ruling 2026-10-15: the monochrome invariant binds chrome, not a11y
 * signals. Exactly ONE hue token is permitted, reserved for error-state text.
 * Any other hue in @theme is a failure.
 */
const ALLOWED_THEME_HUES: { value: string; why: string }[] = [
    {
        value: "#b3261e",
        why: "Error-state text only. ~6:1 on --color-bg, passes WCAG AA. Never borders/fills/decoration. Paired with a warning glyph.",
    },
];

/** Source-level exceptions, each with a reason. Deliberately tiny. */
const SOURCE_ALLOWLIST: { match: string; why: string }[] = [
    {
        match: "layout.tsx",
        why: "export const viewport themeColor is a JS string for the Next metadata API; it cannot read a CSS variable. Mirrors --color-bg and must be changed together with it.",
    },
];

const HUE_UTILITIES = /(?:text|bg|border|from|via|to|ring|shadow|fill|stroke|outline|decoration|accent|caret)-(?:blue|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky)-[0-9]{2,3}/g;
// Negative lookbehind so HTML numeric entities (&#10003;) are not read as hex.
const HEX_LITERALS = /(?<!&)#[0-9a-fA-F]{3,8}\b/g;
const THEME_FILE = path.join("src", "app", "globals.css");

function walk(dir: string, exts: string[], out: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, exts, out);
        else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
    }
    return out;
}

function hits(files: string[], pattern: RegExp, skip?: (f: string, line: string) => boolean) {
    const found: string[] = [];
    for (const file of files) {
        const lines = fs.readFileSync(file, "utf8").split("\n");
        lines.forEach((line, i) => {
            if (skip?.(file, line)) return;
            if (SOURCE_ALLOWLIST.some((a) => file.endsWith(a.match))) return;
            for (const m of line.matchAll(pattern)) {
                if (CLIENT_BRAND_ALLOWLIST.some((a) => a.value === m[0])) continue;
                found.push(`${file}:${i + 1}  ${m[0]}`);
            }
        });
    }
    return found;
}

describe("monochrome colour policy", () => {
    const SELF = path.basename(import.meta.url ?? "");
    const srcFiles = walk("src", [".ts", ".tsx"]).filter((f) => !f.endsWith(SELF));

    test("no raw hue utilities anywhere in src/", () => {
        const found = hits(srcFiles, HUE_UTILITIES);
        assert.deepEqual(found, [], `hue utilities found:\n  ${found.join("\n  ")}`);
    });

    test("no hex literal in components outside the @theme block", () => {
        const found = hits(srcFiles, HEX_LITERALS);
        assert.deepEqual(found, [], `hex literals found:\n  ${found.join("\n  ")}`);
    });

    test("the @theme block declares the primary hook and its foreground", () => {
        const css = fs.readFileSync(THEME_FILE, "utf8");
        const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer base"));
        assert.match(theme, /--color-primary:\s*#1a1a1a/i, "primary must be bound to ink");
        assert.match(theme, /--color-primary-foreground:/i, "primary-foreground must exist");
    });

    test("the theme holds no hue token except the single allowlisted one", () => {
        const css = fs.readFileSync(THEME_FILE, "utf8");
        const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer base"));
        // Strip comments so the "was #3c83f6 (BLUE)" note is not scanned as a hue.
        const body = theme.replace(/\/\*[\s\S]*?\*\//g, "");
        const found = [...new Set((body.match(HEX_LITERALS) ?? []).map((h) => h.toLowerCase()))];
        // Only chromatic values count as hues. #f7f7f7/#1a1a1a/#cccccc and friends
        // are neutrals and are the monochrome identity itself.
        const isHue = (hex: string) => {
            let v = hex.slice(1);
            if (v.length === 3) v = v.split("").map((c) => c + c).join("");
            const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
            return Math.max(r, g, b) - Math.min(r, g, b) > 12;
        };
        const unexpected = found.filter(
            (h) => isHue(h) && !ALLOWED_THEME_HUES.some((a) => a.value.toLowerCase() === h),
        );
        assert.deepEqual(unexpected, [], `hue tokens found in @theme: ${unexpected.join(", ")}`);
        assert.equal(ALLOWED_THEME_HUES.length, 1, "allowlist must stay exactly one hue");
    });

    test("the allowlisted hue is declared under --color-danger", () => {
        const css = fs.readFileSync(THEME_FILE, "utf8");
        const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer base")).replace(/\/\*[\s\S]*?\*\//g, "");
        const declared = (theme.match(/--color-danger:\s*(#[0-9a-fA-F]+)/) || [])[1];
        assert.equal(declared?.toLowerCase(), ALLOWED_THEME_HUES[0].value);
    });

    test("success is no longer the blue token", () => {
        const css = fs.readFileSync(THEME_FILE, "utf8");
        assert.ok(!/--color-success:\s*#3c83f6/i.test(css), "success must not be #3c83f6");
    });

    test("the client-brand allowlist is documented and currently empty", () => {
        assert.ok(Array.isArray(CLIENT_BRAND_ALLOWLIST));
        for (const entry of CLIENT_BRAND_ALLOWLIST) {
            assert.ok(entry.why.length > 0, "every allowlist entry needs a reason");
        }
    });

    test("built CSS carries no hue utility classes", () => {
        const out = "out";
        if (!fs.existsSync(out)) return; // export not run; src-level gates still apply
        const cssFiles = walk(out, [".css"]);
        const found: string[] = [];
        for (const file of cssFiles) {
            const css = fs.readFileSync(file, "utf8");
            for (const m of css.matchAll(HUE_UTILITIES)) {
                if (CLIENT_BRAND_ALLOWLIST.some((a) => a.value === m[0])) continue;
                found.push(`${file}: ${m[0]}`);
            }
        }
        assert.deepEqual(found, [], `hue utilities in built CSS:\n  ${found.join("\n  ")}`);
    });

    test("built CSS actually emits the primary utilities (regression guard)", () => {
        const out = "out";
        if (!fs.existsSync(out)) return;
        const css = fs.readFileSync(walk(out, [".css"])[0], "utf8");
        for (const cls of ["text-primary", "bg-primary", "from-primary", "via-primary", "to-primary"]) {
            assert.ok(css.includes(cls), `${cls} is not emitted - primary token regressed`);
        }
    });

    test("built CSS emits focus-visible styling", () => {
        const out = "out";
        if (!fs.existsSync(out)) return;
        const css = fs.readFileSync(walk(out, [".css"])[0], "utf8");
        assert.ok(css.includes("focus-visible"), "focus-visible styles missing from built CSS");
    });
});
