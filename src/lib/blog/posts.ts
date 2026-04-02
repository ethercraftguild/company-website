import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  service_category: string;
  target_regions: string[];
  linked_services: string[];
  focus_keywords: string[];
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTimeMinutes(text: string) {
  const words = text
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function getMdxFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): BlogPost[] {
  const mdxFiles = getMdxFiles();

  const posts: BlogPost[] = mdxFiles.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const parsed = matter(raw);

    const frontmatter = parsed.data as BlogPostFrontmatter;
    const content = parsed.content ?? "";

    return {
      slug,
      ...frontmatter,
      readingTimeMinutes: estimateReadingTimeMinutes(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): (BlogPost & { content: string }) | null {
  const file = `${slug}.mdx`;
  const fullPath = path.join(BLOG_DIR, file);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as BlogPostFrontmatter;
  const content = parsed.content ?? "";

  return {
    slug,
    ...frontmatter,
    content,
    readingTimeMinutes: estimateReadingTimeMinutes(content),
  };
}

