// Pure module: no imports at all, so this runs under plain `node --test` with
// native type stripping. No alias shim, no build step.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { canonicalFor, normalizeSiteUrl, pageTypeFor } from "./schemaPaths.ts";

const SITE = "https://ethercraftguild.vercel.app";

describe("schemaPaths", () => {
    test("normalizeSiteUrl strips a single trailing slash", () => {
        assert.equal(normalizeSiteUrl("https://x.test/"), "https://x.test");
        assert.equal(normalizeSiteUrl("https://x.test"), "https://x.test");
    });

    test("canonical for the home route is the bare origin", () => {
        assert.equal(canonicalFor(SITE, "/"), SITE);
        assert.equal(canonicalFor(SITE, ""), SITE);
    });

    test("canonical tolerates a trailing slash on sub-routes", () => {
        assert.equal(canonicalFor(SITE, "/about/"), `${SITE}/about`);
    });

    test("page type is route-aware and defaults to WebPage", () => {
        assert.equal(pageTypeFor("/about"), "AboutPage");
        assert.equal(pageTypeFor("/contact"), "ContactPage");
        assert.equal(pageTypeFor("/work"), "WebPage");
        assert.equal(pageTypeFor("/"), "WebPage");
        assert.equal(pageTypeFor("/blog/x"), "WebPage");
    });
});
