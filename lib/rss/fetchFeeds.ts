import Parser from "rss-parser";
import { RSS_FEEDS } from "./feeds";

// 1. Configure parser to capture hidden media tags
const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["image", "image"],
    ],
  },
});

// 2. High-quality default images based on category
const FALLBACK_IMAGES: Record<string, string> = {
  Technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  Business: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1200&q=80",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  Health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
  Politics: "https://images.unsplash.com/photo-1529107381315-e25b2d2948bb?auto=format&fit=crop&w=1200&q=80",
  World: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
  General: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
};

// 3. Advanced Image Extraction Strategy
function extractImage(item: any): string | null {
  // Check standard enclosures
  if (item.enclosure?.url) return item.enclosure.url;

  // Check custom media tags (requires the customFields config above)
  if (item.mediaContent?.$?.url) return item.mediaContent.$.url;
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;
  if (item.image) return item.image;

  // Regex fallback: Search inside the raw HTML for an img tag
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  
  const contentMatch = item.content?.match(imgRegex);
  if (contentMatch && contentMatch[1]) return contentMatch[1];
  
  const descMatch = item.description?.match(imgRegex);
  if (descMatch && descMatch[1]) return descMatch[1];

  return null;
}

// 4. Advanced Text Cleaning (Strips HTML and decodes entities)
function cleanText(text: string | undefined) {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchFeed(feed: any) {
  try {
    const data = await parser.parseURL(feed.url);

    return data.items.map((item: any) => {
      // Get the image or apply the category fallback
      let finalImage = extractImage(item);
      if (!finalImage) {
        finalImage = FALLBACK_IMAGES[feed.category] || FALLBACK_IMAGES["General"];
      }

      return {
        title: item.title || "Untitled",
        summary: cleanText(item.contentSnippet || item.description || item.content),
        content: cleanText(item.content || item.description),
        link: item.link || "",
        guid: item.guid || item.id || item.link || "",
        imageUrl: finalImage, // Fixed property name to match saveArticles.ts
        category: feed.category,
        source: feed.name,
        published: item.isoDate || item.pubDate || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error(`RSS failed to fetch [${feed.name}]:`, error);
    return [];
  }
}

export async function fetchAllFeeds() {
  const results = await Promise.all(
    RSS_FEEDS.map((feed) => fetchFeed(feed))
  );
  return results.flat();
}