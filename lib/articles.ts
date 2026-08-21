import { supabase } from "./supabase";
import type { Article } from "@/types/news";

function normalizeImageUrl(value: unknown): string {
  const fallback =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c";

  if (typeof value !== "string") {
    return fallback;
  }

  let url = value.trim();

  if (!url) {
    return fallback;
  }

  // Convert Markdown image/link URLs to plain URLs.
  const markdownMatch = url.match(/\]\((https?:\/\/[^)]+)\)/);

  if (markdownMatch?.[1]) {
    url = markdownMatch[1];
  }

  // Remove accidental brackets.
  url = url
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .trim();

  if (!/^https?:\/\//i.test(url)) {
    return fallback;
  }

  return url;
}

function mapArticle(article: any): Article {
  return {
    id: article.id,

    slug: article.slug ?? null,

    title: article.title ?? "Untitled News",

    excerpt:
      article.summary ??
      article.description ??
      "",

    content: article.content ?? "",

    category:
      article.category ??
      "General",

    author:
      article.author ??
      "NewsSphere",

    location:
      article.location ??
      "",

    publishedAt:
      article.published_at ??
      article.created_at,

    createdAt:
      article.created_at,

    updatedAt:
      article.updated_at ??
      article.created_at,

    readTime: Math.max(
      1,
      Math.ceil(
        (article.content
          ?.split(/\s+/)
          .filter(Boolean).length || 0) / 200
      )
    ),

    imageUrl: normalizeImageUrl(
      article.image_url
    ),

    imageAlt:
      article.title ??
      "NewsSphere news",

    featured:
      article.featured ??
      false,

    trending:
      (article.views ?? 0) > 100 ||
      article.featured === true,

    breaking:
      article.breaking ??
      false,

    published:
      article.published ??
      false,

    views:
      article.views ??
      0,

    seoTitle:
      article.seo_title ??
      article.title,

    seoDescription:
      article.seo_description ??
      article.summary ??
      article.description ??
      "",

    tags:
      Array.isArray(article.tags)
        ? article.tags
        : [],
  };
}

export async function getHeroArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("featured", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  if (error) {
    console.error(
      "getHeroArticles error:",
      error
    );

    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getFeaturedArticle() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("featured", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "getFeaturedArticle error:",
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return mapArticle(data);
}

export async function getLatestArticles(
  limit = 6
) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "getLatestArticles error:",
      error
    );

    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getTrendingArticles(
  limit = 5
) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("views", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "getTrendingArticles error:",
      error
    );

    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getArticleBySlug(
  slug: string
) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error(
      "getArticleBySlug error:",
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return mapArticle(data);
}

export async function getRelatedArticles(
  category: string,
  currentId: string,
  limit = 4
) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .neq("id", currentId)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "getRelatedArticles error:",
      error
    );

    return [];
  }

  return (data ?? []).map(mapArticle);
}