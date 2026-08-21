import { supabaseAdmin } from "@/lib/supabase/admin";
import { scoreArticle } from "./scoreArticle";
import { publishDecision } from "./publishDecision";

export async function runEditorAgent() {
  console.log("=================================");
  console.log("EDITOR AGENT STARTED");
  console.log("=================================");

  const { data: queue, error } = await supabaseAdmin
    .from("news_candidates")
    .select("*")
    .eq("researched", true)
    .eq("fact_checked", true)
    .eq("approved", false)
    .eq("rejected", false)
    .limit(20);

  if (error) {
    console.error("Editor queue error:", error);
    throw error;
  }

  if (!queue?.length) {
    console.log("Editor: Nothing to process.");

    return {
      success: true,
      processed: 0,
      readyForReview: 0,
      rejected: 0,
    };
  }

  let processed = 0;
  let readyForReview = 0;
  let rejected = 0;

  for (const article of queue) {
    try {
      const score = scoreArticle(article);
      const decision = publishDecision(score);

      console.log("---------------------------------");
      console.log("Article:", article.title);
      console.log("Score:", score);
      console.log("Decision:", decision);

      /*
       * Articles that pass the editorial gate are NOT published.
       *
       * They are moved to the human review queue.
       */
      if (decision.publish) {
        const { error: updateError } = await supabaseAdmin
          .from("news_candidates")
          .update({
            approved: true,
            rejected: false,
            priority: decision.priority,
            importance: decision.importance,
            featured: decision.featured,
            breaking: decision.breaking,
            status: "pending",
          })
          .eq("id", article.id);

        if (updateError) {
          console.error(
            "Failed to update approved candidate:",
            updateError
          );
          continue;
        }

        readyForReview++;
      } else {
        const { error: updateError } = await supabaseAdmin
          .from("news_candidates")
          .update({
            approved: false,
            rejected: true,
            priority: decision.priority,
            importance: decision.importance,
            status: "rejected",
          })
          .eq("id", article.id);

        if (updateError) {
          console.error(
            "Failed to reject candidate:",
            updateError
          );
          continue;
        }

        rejected++;
      }

      processed++;
    } catch (error) {
      console.error(
        `Editor failed for ${article.title}:`,
        error
      );
    }
  }

  console.log("=================================");
  console.log("EDITOR AGENT FINISHED");
  console.log("Processed:", processed);
  console.log("Ready for review:", readyForReview);
  console.log("Rejected:", rejected);
  console.log("=================================");

  return {
    success: true,
    processed,
    readyForReview,
    rejected,
  };
}