import { supabase } from "./supabase";
import type { Article } from "@/types/news";

function mapArticle(article: any): Article {
  return {
    id: article.id,
    slug: article.slug ?? null,

    title: article.title,
    excerpt: article.summary ?? "",
    content: article.content ?? "",

    category: article.category ?? "General",
    author: article.author ?? "NewsSphere",
    location: article.location ?? "",

    publishedAt: article.published_at ?? article.created_at,
    createdAt: article.created_at,
    updatedAt: article.updated_at ?? article.created_at,

    readTime: Math.max(
      1,
      Math.ceil((article.content?.split(/\s+/).length || 0) / 200)
    ),

    imageUrl:
      article.image_url ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",

    imageAlt: article.title,

    featured: article.featured ?? false,
    trending: (article.views ?? 0) > 100 || article.featured === true,
    breaking: article.breaking ?? false,

    published: article.published ?? false,
    views: article.views ?? 0,

    seoTitle: article.seo_title ?? article.title,
    seoDescription: article.seo_description ?? article.summary ?? "",
    tags: article.tags ?? [],
  };
}

export async function getHeroArticles() {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(3);

  return (data ?? []).map(mapArticle);
}

export async function getFeaturedArticle() {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!data) return null;

  return mapArticle(data);
}

export async function getLatestArticles(limit = 6) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map(mapArticle);
}

export async function getTrendingArticles(limit = 5) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("views", { ascending: false })
    .limit(limit);

  return (data ?? []).map(mapArticle);
}

export async function getArticleBySlug(slug: string) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) return null;

  return mapArticle(data);
}

export async function getRelatedArticles(
  category: string,
  currentId: string,
  limit = 4
) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .neq("id", currentId)
    .limit(limit);

  return (data ?? []).map(mapArticle);
}