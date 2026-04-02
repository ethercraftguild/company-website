import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://ethercraftguild.vercel.app";
const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
const siteUrl = siteUrlRaw.endsWith("/") ? siteUrlRaw.slice(0, -1) : siteUrlRaw;

// Required for `output: "export"` builds so `/robots.txt` can be statically emitted.
export const dynamic = "force-static";
export const revalidate = 0;

function getHost() {
  const envHost = process.env.NEXT_PUBLIC_SITE_HOST;
  if (envHost) return envHost;

  try {
    return new URL(siteUrl).host;
  } catch {
    return "ethercraftguild.vercel.app";
  }
}

export default function robots(): MetadataRoute.Robots {
  const host = getHost();

  return {
    host,
    sitemap: `${siteUrl}/sitemap.xml`,
    rules: [
      {
        userAgent: ["Googlebot", "GPTBot", "PerplexityBot"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}

