import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Ethercraft Guild",
  description:
    "Schema-first engineering and compliance insights from the Ethercraft Guild—built for clients scaling globally with senior craftsmanship.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-3xl pb-xl">
      <div className="container-custom">
        <header className="mb-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-md">
            Blog
          </h1>
          <p className="text-xl opacity-80 leading-relaxed font-light max-w-[75ch]">
            Professional engineering + compliance perspectives from Dhaka, built for global execution.
          </p>
        </header>

        <ul className="space-y-xl">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="p-xl border border-border rounded-sm bg-card">
                <h2 className="text-2xl font-bold mb-sm">
                  <Link href={`/blog/${post.slug}`} className="underline underline-offset-4">
                    {post.title}
                  </Link>
                </h2>
                <p className="opacity-80 leading-relaxed font-light mb-md">
                  {post.excerpt}
                </p>
                <div className="text-sm opacity-70 flex flex-wrap gap-sm items-center">
                  <span>{post.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

