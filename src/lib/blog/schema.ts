import type { BlogPost } from "./posts";

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function escapeJsonLd(str: string) {
  return str.replace(/</g, "\\u003c");
}

export function buildBlogJsonLd({
  siteUrl,
  post,
}: {
  siteUrl: string;
  post: BlogPost;
}) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const pageUrl = `${normalizedSiteUrl}/blog/${post.slug}`;

  const organization = {
    "@type": "Organization",
    name: "Ethercraft Guild",
    url: normalizedSiteUrl,
    image: `${normalizedSiteUrl}/logo.png`,
  };

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: escapeJsonLd(post.title),
    description: escapeJsonLd(post.excerpt),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: escapeJsonLd(post.author),
    },
    publisher: organization,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    articleSection: escapeJsonLd(post.service_category),
    keywords: post.focus_keywords.map((k) => escapeJsonLd(k)),
  };

  const serviceUrl =
    post.linked_services?.[0]?.startsWith("/")
      ? `${normalizedSiteUrl}${post.linked_services[0]}`
      : `${normalizedSiteUrl}/services`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: escapeJsonLd(post.service_category),
    serviceType: escapeJsonLd(post.service_category),
    provider: organization,
    url: serviceUrl,
    areaServed: post.target_regions.map((r) => ({
      "@type": "AdministrativeArea",
      name: escapeJsonLd(r),
    })),
    keywords: post.focus_keywords.map((k) => escapeJsonLd(k)),
  };

  return { blogPosting, service };
}

