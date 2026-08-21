import { fetchAllFeeds } from "@/lib/rss/fetchFeeds";
import { saveCandidates } from "./saveCandidates";

export async function runRSSScout() {
  console.log("RSS Scout started...");

  const feeds = await fetchAllFeeds();

  console.log(`Fetched ${feeds.length} RSS articles`);

  const result = await saveCandidates(feeds);

  return {
    success: true,
    total: feeds.length,
    imported: result.imported,
    duplicates: result.duplicates,
    failed: result.failed,
  };
}