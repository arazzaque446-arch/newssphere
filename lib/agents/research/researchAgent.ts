import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateArticle } from "./generateArticle";
import { saveResearch } from "./saveResearch";

export async function runResearchAgent() {
  console.log("Research Agent Started");

  const { data: queue, error } = await supabaseAdmin
    .from("news_candidates")
    .select("*")
    .eq("status", "pending")
    .eq("researched", false)
    .limit(10);

  if (error) {
    throw error;
  }

  if (!queue || queue.length === 0) {
    return {
      success: true,
      processed: 0,
      message: "No articles to research",
    };
  }

  let processed = 0;
  let failed = 0;

  for (const article of queue) {
    try {
      const rewritten = await generateArticle(article);

      await saveResearch(article.id, rewritten);

      processed++;
    } catch (err) {
      console.error(`Research failed: ${article.title}`, err);
      failed++;
    }
  }

  return {
    success: true,
    processed,
    failed,
  };
}