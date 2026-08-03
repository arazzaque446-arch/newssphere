import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss/fetchFeeds";

export async function GET() {
  const articles = await fetchAllFeeds();

  return NextResponse.json({
    success: true,
    total: articles.length,
    articles,
  });
}