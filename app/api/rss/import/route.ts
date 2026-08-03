import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss/fetchFeeds";
import { saveArticles } from "@/lib/rss/saveArticles";

export async function GET() {
  try {
    const articles = await fetchAllFeeds();

    const result = await saveArticles(articles);

    return NextResponse.json({
      success: true,
      imported: result.stats.imported,
      duplicates: result.stats.duplicates,
      failed: result.stats.failed,
      articles: result.inserted,
    });

  } catch (error) {
    console.error("RSS Import Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}