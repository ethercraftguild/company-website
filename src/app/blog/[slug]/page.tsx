import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogLayout from "@/components/BlogLayout";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { buildBlogJsonLd } from "@/lib/blog/schema";
import StructuredData from "@/components/StructuredData";
import { SITE_CONFIG } from "@/config";

const DEFAULT_SITE_URL = "https://ethercraftguild.vercel.app";

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostBySlug(slug);
  if (!postData) return {};

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/blog/${postData.slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${postData.title} | ${SITE_CONFIG.companyName}`,
    description: postData.excerpt,
    keywords: postData.focus_keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      url: pageUrl,
      type: "article",
      siteName: SITE_CONFIG.companyName,
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.companyName} — Mastering Digital Craftsmanship`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
      images: [`${siteUrl}/og.png`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = getPostBySlug(slug);
  if (!postData) notFound();

  const { content, ...post } = postData;

  // In RSC mode, `MDXRemote` expects the raw MDX string and compiles it server-side.
  const mdxSource = content;

  const siteUrl = getSiteUrl();
  const { blogPosting, service } = buildBlogJsonLd({ siteUrl, post });

  return (
    <>
      <StructuredData path={`/blog/${postData.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPosting).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(service).replace(/</g, "\\u003c"),
        }}
      />
      <BlogLayout post={post}>
        <MDXRemote source={mdxSource} />
      </BlogLayout>
    </>
  );
}

