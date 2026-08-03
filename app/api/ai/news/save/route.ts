import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cleanArticle } from "@/lib/cleanArticle";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    const article = await req.json();

    // Clean AI-generated HTML before saving
    const cleanedContent = cleanArticle(article.content);

    const { error } = await supabase
      .from("articles")
      .insert({
        title: article.title,
        slug: slugify(article.title),
        summary: article.summary,
        content: cleanedContent,
        category: article.category || "General",
        author: "NewsSphere AI",
        location: article.location || "India",
        image_url:
          "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
        source: "AI Generated",
        seo_title: article.seoTitle,
        seo_description: article.seoDescription,
        tags: article.tags || [],
        published: false,
        featured: false,
        breaking: false,
        views: 0,
        published_at: new Date().toISOString(),
      });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Article saved successfully.",
    });

  } catch (err) {
    console.error("Save Article Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to save article.",
      },
      {
        status: 500,
      }
    );
  }
}