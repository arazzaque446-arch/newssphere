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

function cleanHtml(value: unknown): string {
  if (!value) return "";

  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstValue(...values: unknown[]): string {
  for (const value of values) {
    const cleaned = cleanHtml(value);

    if (cleaned) {
      return cleaned;
    }
  }

  return "";
}

export function parseArticle(article: any): ParsedArticle {
  const title =
    getFirstValue(
      article.title,
      article.name
    ) || "NewsSphere News";

  /*
   * CONTENT FALLBACK ORDER
   *
   * 1. content:encoded
   * 2. content
   * 3. description
   * 4. summary
   * 5. excerpt
   */

  const content = getFirstValue(
    article["content:encoded"],
    article.contentEncoded,
    article.content_encoded,
    article.content,
    article.description,
    article.summary,
    article.excerpt
  );

  const summarySource = getFirstValue(
    article.summary,
    article.excerpt,
    article.description,
    content
  );

  const summary =
    summarySource.length > 300
      ? summarySource.substring(0, 300).trim() + "..."
      : summarySource;

  const url = getFirstValue(
    article.link,
    article.url,
    article.guid
  );

  const published =
    article.published ||
    article.pubDate ||
    article.published_at ||
    new Date().toISOString();

  const slug =
    getFirstValue(article.slug) ||
    slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

  const image = getFirstValue(
    article.image,
    article.imageUrl,
    article.image_url,
    article.thumbnail,
    article.media,
    article.enclosure?.url
  );

  const author = getFirstValue(
    article.author,
    article.creator,
    article["dc:creator"]
  );

  const source =
    getFirstValue(article.source) || "RSS";

  const category =
    getFirstValue(article.category) || "General";

  return {
    title,

    content,

    summary,

    source,

    category,

    url,

    published,

    slug,

    image,

    author,

    description: summary,
  };
}