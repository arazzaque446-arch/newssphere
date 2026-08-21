import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkFacts } from "./checkFacts";
import { saveFactCheck } from "./saveFactCheck";

export async function runFactCheckAgent() {
  console.log("Fact Check Agent Started");

  const { data: queue, error } = await supabaseAdmin
    .from("news_candidates")
    .select("*")
    .eq("researched", true)
    .eq("fact_checked", false)
    .limit(10);

  if (error) throw error;

  if (!queue?.length) {
    return {
      success: true,
      processed: 0,
      message: "Nothing to fact check",
    };
  }

  let processed = 0;
  let failed = 0;

  for (const article of queue) {
    try {
      const report = await checkFacts(article);

      await saveFactCheck(article.id, report);

      processed++;
    } catch (err) {
      console.error(err);
      failed++;
    }
  }

  return {
    success: true,
    processed,
    failed,
  };
}