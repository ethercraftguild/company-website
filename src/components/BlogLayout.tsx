import Link from "next/link";
import type { ReactNode } from "react";
import type { BlogPost } from "@/lib/blog/posts";
import ServiceSummaryCard from "@/components/blog/ServiceSummaryCard";

function labelFromServicePath(href: string) {
  const cleaned = href.replace(/^\//, "");
  const last = cleaned.split("/").filter(Boolean).pop() ?? cleaned;
  return last
    .split("-")
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function BlogLayout({
  post,
  children,
}: {
  post: BlogPost;
  children: ReactNode;
}) {
  return (
    <div className="pt-3xl pb-xl">
      <div className="container-custom">
        <nav aria-label="Breadcrumb" className="mb-xl">
          <ol className="flex flex-wrap items-center gap-sm text-sm opacity-80">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="opacity-100">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="mb-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-md">
            {post.title}
          </h1>
          <p className="text-xl opacity-80 leading-relaxed font-light max-w-[70ch]">
            {post.excerpt}
          </p>

          <div className="mt-lg flex flex-wrap gap-sm items-center opacity-80 text-sm">
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-xl items-start">
          <section
            className="min-w-0 [&_p]:leading-relaxed [&_p]:opacity-90 [&_p]:mb-md [&_h2]:mt-2xl [&_h2]:mb-md [&_h2]:text-2xl [&_h3]:mt-xl [&_h3]:mb-sm [&_li]:mb-xs"
            aria-label="Post content"
          >
            {children}
            <ServiceSummaryCard
              serviceCategory={post.service_category}
              linkedServices={post.linked_services}
            />
          </section>

          <aside className="space-y-xl" aria-label="Service sidebar">
            <section className="p-xl border border-border rounded-sm bg-card">
              <h3 className="text-xl font-bold mb-md">Author</h3>
              <p className="opacity-80 leading-relaxed font-light">
                Written by <strong>{post.author}</strong>. We’re an Engineering Cooperative of senior architects and developers who treat code as craft.
              </p>
            </section>

            <section className="p-xl border border-border rounded-sm bg-card">
              <h3 className="text-xl font-bold mb-md">Service Mapping</h3>
              <p className="opacity-80 leading-relaxed font-light mb-md">
                <strong>Category:</strong> {post.service_category}
              </p>

              <div className="mb-md">
                <p className="opacity-80 font-medium mb-sm">Target regions</p>
                <ul className="list-disc ml-lg opacity-80">
                  {post.target_regions.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-md">
                <p className="opacity-80 font-medium mb-sm">Focus keywords</p>
                <ul className="list-none opacity-80 flex flex-wrap gap-sm">
                  {post.focus_keywords.map((k) => (
                    <li key={k} className="border border-border/50 rounded-sm px-sm py-xs">
                      {k}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="opacity-80 font-medium mb-sm">Linked services</p>
                <ul className="list-none space-y-xs">
                  {post.linked_services.map((href) => (
                    <li key={href}>
                      <Link href={href} className="underline underline-offset-4">
                        {labelFromServicePath(href)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

