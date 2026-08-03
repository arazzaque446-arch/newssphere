import Parser from "rss-parser";
import { RSS_FEEDS } from "./feeds";

const parser = new Parser({
  timeout: 10000,
});

function extractImage(item: any) {
  return (
    item.enclosure?.url ||
    item["media:content"]?.url ||
    item["media:thumbnail"]?.url ||
    item.image ||
    null
  );
}

function cleanText(text: string | undefined) {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchFeed(feed: any) {
  try {
    const data = await parser.parseURL(feed.url);

    return data.items.map((item: any) => ({
      title: item.title || "Untitled",
      description: cleanText(
        item.contentSnippet || item.content || item.description
      ),

      link: item.link || "",

      guid:
        item.guid ||
        item.id ||
        item.link ||
        "",

      image_url: extractImage(item),

      category: feed.category,

      source: feed.name,

      published_at:
        item.isoDate ||
        item.pubDate ||
        new Date().toISOString(),
    }));

  } catch (error) {
    console.error(
      `RSS failed: ${feed.name}`,
      error
    );

    return [];
  }
}


export async function fetchAllFeeds() {

  const results = await Promise.all(
    RSS_FEEDS.map(feed =>
      fetchFeed(feed)
    )
  );


  return results.flat();
}