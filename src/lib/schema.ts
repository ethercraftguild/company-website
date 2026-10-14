import { SITE_CONFIG } from "@/config";
import { CLIENT_COUNTRIES, deriveKnowsAboutTerms } from "@/data/clients";
import { canonicalFor as canonicalPath, normalizeSiteUrl, pageTypeFor as pageKind } from "@/lib/schemaPaths";

const DEFAULT_SITE_URL = "https://ethercraftguild.vercel.app";

export function siteOrigin(): string {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
}

/** Canonical, stable identity for the org across every route and every other graph. */
export function organizationId(): string {
    return `${siteOrigin()}/#organization`;
}

/** Turns a router pathname into the canonical URL that route declares. */
export function canonicalFor(pathname: string): string {
    return canonicalPath(siteOrigin(), pathname);
}

/**
 * Per-route page node type. Everything else is a plain WebPage.
 * isPartOf/about both point at the org @id per the T6 brief.
 */
export function pageTypeFor(pathname: string): string {
    return pageKind(pathname);
}

function organizationNode() {
    const node: Record<string, unknown> = {
        "@type": "ProfessionalService",
        "@id": organizationId(),
        name: SITE_CONFIG.companyName,
        // Trade-Licence business name. Not a cooperative: no alternateName and no
        // explanatory schema fields about the word "Guild".
        legalName: SITE_CONFIG.companyName,
        url: siteOrigin(),
        logo: `${siteOrigin()}${SITE_CONFIG.logoPath}`,
        image: `${siteOrigin()}${SITE_CONFIG.logoPath}`,
        address: {
            "@type": "PostalAddress",
            addressLocality: SITE_CONFIG.addressCity,
            addressCountry: SITE_CONFIG.addressCountry,
        },
        email: SITE_CONFIG.email,
        serviceType: [...SITE_CONFIG.serviceTypes],
        areaServed: CLIENT_COUNTRIES.map((country) => ({
            "@type": "AdministrativeArea",
            name: country,
        })),
        // Owner-curated list wins verbatim when supplied; otherwise derive from
        // repo data only, so nothing unreferenced ships.
        knowsAbout:
            SITE_CONFIG.knowsAboutOverride ?? [
                ...SITE_CONFIG.serviceTypes,
                "Custom AI Agents & LLM Tooling",
                ...deriveKnowsAboutTerms(),
            ],
    };

    // telephone and identifier were removed: config carries neither, and an empty
    // string or a placeholder is worse than the key being absent.
    if (SITE_CONFIG.sameAsProfiles.length > 0) {
        node.sameAs = [...SITE_CONFIG.sameAsProfiles];
    }

    // Founder is owner-supplied and carries no title/date/handle: only a bare Person.
    if (SITE_CONFIG.founderName.trim()) {
        node.founder = { "@type": "Person", name: SITE_CONFIG.founderName };
    }

    return node;
}

function pageNode(pathname: string) {
    const canonical = canonicalFor(pathname);
    return {
        "@type": pageTypeFor(pathname),
        "@id": canonical,
        url: canonical,
        isPartOf: { "@id": organizationId() },
        about: { "@id": organizationId() },
    };
}

/**
 * One @graph per route: exactly one organization node plus one page node.
 * Every identity fact is read from config/clients - no literals here.
 */
export function buildSchemaGraph(pathname: string) {
    return {
        "@context": "https://schema.org",
        "@graph": [organizationNode(), pageNode(pathname)],
    };
}

/** JSON-LD must never contain a raw "<" that could close the script element early. */
export function serializeGraph(graph: unknown): string {
    return JSON.stringify(graph).replace(/</g, "\\u003c");
}
