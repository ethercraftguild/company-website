/**
 * Route helpers for JSON-LD. Deliberately dependency-free so tests can import it
 * with a plain relative path — no alias shim, no build step.
 */

export function normalizeSiteUrl(siteUrl: string): string {
    return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

/** Turns a router pathname into the canonical URL that route declares. */
export function canonicalFor(siteUrl: string, pathname: string): string {
    const origin = normalizeSiteUrl(siteUrl);
    const clean = pathname.replace(/\/+$/, "");
    return clean === "" ? origin : `${origin}${clean}`;
}

/** One page node per route; everything that is not a special route is a WebPage. */
export function pageTypeFor(pathname: string): string {
    const clean = pathname.replace(/\/+$/, "");
    if (clean === "/about") return "AboutPage";
    if (clean === "/contact") return "ContactPage";
    return "WebPage";
}
