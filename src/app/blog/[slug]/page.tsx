import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogLayout from "@/components/BlogLayout";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { buildBlogJsonLd } from "@/lib/blog/schema";

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
    title: `${postData.title} | Ethercraft Guild`,
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
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: "Ethercraft Guild",
        },
      ],
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

