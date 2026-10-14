import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://ethercraftguild.vercel.app";

export function siteUrl(): string {
    const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

interface PageMetadataInput {
    title: string;
    description: string;
    /** Route path, e.g. "/work". Omit for the home page. */
    path?: string;
    keywords?: string[];
}

/**
 * Single place that builds page metadata, so every route carries matching
 * Open Graph and Twitter card tags. Without this, shares fall back to the bare
 * domain with no title or image.
 */
export function pageMetadata({ title, description, path = "/", keywords }: PageMetadataInput): Metadata {
    const url = `${siteUrl()}${path === "/" ? "" : path}`;
    const fullTitle = title === "Home" ? "Ethercraft Guild | Master Digital Craftsmanship" : title;

    return {
        metadataBase: new URL(siteUrl()),
        title: fullTitle,
        description,
        ...(keywords ? { keywords } : {}),
        alternates: { canonical: url },
        // Icons live here rather than only in the root layout so every route
        // carries them explicitly, not by inheritance.
        manifest: "/site.webmanifest",
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/favicon.svg", type: "image/svg+xml" },
                { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            ],
            apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        },
        openGraph: {
            type: "website",
            url,
            title: fullTitle,
            description,
            siteName: "Ethercraft Guild",
            locale: "en_US",
            images: [
                {
                    url: `${siteUrl()}/og.png`,
                    width: 1200,
                    height: 630,
                    alt: "Ethercraft Guild — Mastering Digital Craftsmanship",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [`${siteUrl()}/og.png`],
        },
    };
}
