import slugify from "slugify";

export interface ParsedArticle {
  title: string;

  content: string;

  summary: string;

  source: string;

  category: string;

  url: string;

  published: string;

  slug: string;

  image: string;

  author: string;

  description: string;
}

export function parseArticle(article: any): ParsedArticle {
  const title = (article.title || "").trim();

  const content = (
    article.content ||
    article.description ||
    ""
  )
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const description = (
    article.description ||
    content
  )
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title,

    content,

    summary:
      content.length > 300
        ? content.substring(0, 300) + "..."
        : content,

    source:
      article.source || "Unknown",

    category:
      article.category || "General",

    url:
      article.link ||
      article.url ||
      "",

    published:
      article.published ||
      new Date().toISOString(),

    slug: slugify(title, {
      lower: true,
      strict: true,
    }),

    image:
      article.image || "",

    author:
      article.author || "",

    description,
  };
}