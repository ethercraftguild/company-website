/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL || "https://ethercraftguild.vercel.app";
const siteUrl = siteUrlRaw.endsWith("/") ? siteUrlRaw.slice(0, -1) : siteUrlRaw;

const APP_DIR = path.join(__dirname, "src", "app");
const BLOG_DIR = path.join(__dirname, "content", "blog");

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return undefined;
  }
}

function walkDirForPages(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDirForPages(fullPath));
      continue;
    }

    const isPageFile = /^page\.(tsx|ts|jsx|js)$/.test(entry.name);
    if (isPageFile) results.push(fullPath);
  }

  return results;
}

function toRouteFromPageFile(pageFilePath) {
  const rel = path.relative(APP_DIR, pageFilePath).replace(/\\/g, "/");
  // rel example: about/manifesto/page.tsx => about/manifesto
  const withoutPage = rel.replace(/\/page\.(tsx|ts|jsx|js)$/, "");
  if (!withoutPage || withoutPage === ".") return "/";
  return `/${withoutPage}`;
}

function isRouteSafe(routePath) {
  // Skip dynamic segments like [slug]
  if (routePath.includes("[") || routePath.includes("]")) return false;

  // Skip route groups like (marketing)
  const segments = routePath.split("/").filter(Boolean);
  if (segments.some((s) => s.startsWith("(") && s.endsWith(")"))) return false;

  return true;
}

module.exports = {
  siteUrl,
  // We use `src/app/robots.ts` so robots are served dynamically by Next.
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  // next-sitemap auto-discovers every static route from the Next.js build
  // manifest — including blog slugs emitted via generateStaticParams — so
  // additionalPaths stays empty. Re-adding walked routes here duplicates every
  // URL, and the root page.tsx edge case once emitted a bogus "/page.tsx".
  // Only append routes the manifest cannot see (fully dynamic, no static params).
  additionalPaths: async () => [],
};

