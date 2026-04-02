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
  additionalPaths: async () => {
    const now = new Date().toISOString().slice(0, 10);
    const locSet = new Set();
    const paths = [];

    // Collect static pages from app router
    if (fs.existsSync(APP_DIR)) {
      const pageFiles = walkDirForPages(APP_DIR);
      for (const pageFile of pageFiles) {
        const routePath = toRouteFromPageFile(pageFile);
        if (!isRouteSafe(routePath)) continue;

        const lastmod = safeStat(pageFile)?.mtime?.toISOString().slice(0, 10) ?? now;
        const loc = `${siteUrl}${routePath === "/" ? "" : routePath}`;
        if (locSet.has(loc)) continue;
        locSet.add(loc);

        paths.push({
          loc,
          lastmod,
          changefreq: routePath === "/" ? "weekly" : "monthly",
          priority: routePath === "/" ? 1.0 : 0.7,
        });
      }
    }

    // Collect blog post slugs from content/blog/*.mdx
    if (fs.existsSync(BLOG_DIR)) {
      const mdxFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
      for (const file of mdxFiles) {
        const slug = file.replace(/\.mdx$/, "");
        const loc = `${siteUrl}/blog/${slug}`;
        if (locSet.has(loc)) continue;
        locSet.add(loc);

        const lastmod = safeStat(path.join(BLOG_DIR, file))?.mtime?.toISOString().slice(0, 10) ?? now;
        paths.push({
          loc,
          lastmod,
          changefreq: "monthly",
          priority: 0.6,
        });
      }
    }

    return paths;
  },
};

