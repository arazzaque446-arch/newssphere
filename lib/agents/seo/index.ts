import { supabaseAdmin } from "@/lib/supabase/admin";
import { optimizeSEO } from "./optimizeSEO";
import { saveSEO } from "./saveSEO";

export async function runSEOAgent() {
  console.log("=================================");
  console.log("SEO AGENT STARTED");
  console.log("=================================");

  const { data: articles, error: fetchError } = await supabaseAdmin
    .from("news_candidates")
    .select("*")
    .eq("status", "pending")
    .limit(20);

  if (fetchError) {
    console.error("SEO candidate fetch failed:", fetchError);

    return {
      success: false,
      optimized: 0,
      failed: 0,
      error: fetchError.message,
    };
  }

  if (!articles?.length) {
    console.log("SEO Agent: No candidates found.");

    return {
      success: true,
      optimized: 0,
      failed: 0,
    };
  }

  console.log(
    `SEO Agent: ${articles.length} candidate(s) found.`
  );

  let optimized = 0;
  let failed = 0;

  const failures: Array<{
    id: string;
    title: string;
    stage: string;
    error: string;
  }> = [];

  for (const article of articles) {
    console.log("---------------------------------");
    console.log(`Optimizing: ${article.title}`);

    try {
      /*
       * STEP 1
       * Generate SEO metadata with Groq.
       */
      let seo;

      try {
        seo = await optimizeSEO(article);

        console.log("Generated SEO:", seo);
      } catch (error) {
        failed++;

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        console.error(
          "SEO generation failed:",
          message
        );

        failures.push({
          id: article.id,
          title: article.title,
          stage: "generation",
          error: message,
        });

        continue;
      }

      /*
       * STEP 2
       * Save generated SEO metadata.
       */
      try {
        const ok = await saveSEO(
          article.id,
          seo
        );

        if (!ok) {
          failed++;

          console.error(
            `✗ Failed to save SEO: ${article.title}`
          );

          failures.push({
            id: article.id,
            title: article.title,
            stage: "database",
            error: "saveSEO returned false",
          });

          continue;
        }

        optimized++;

        console.log(
          `✓ SEO optimized: ${article.title}`
        );
      } catch (error) {
        failed++;

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        console.error(
          "SEO database save exception:",
          message
        );

        failures.push({
          id: article.id,
          title: article.title,
          stage: "database",
          error: message,
        });
      }
    } catch (error) {
      failed++;

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(
        "Unexpected SEO error:",
        message
      );

      failures.push({
        id: article.id,
        title: article.title,
        stage: "unknown",
        error: message,
      });
    }
  }

  console.log("=================================");
  console.log("SEO AGENT FINISHED");
  console.log(`Optimized: ${optimized}`);
  console.log(`Failed: ${failed}`);
  console.log("=================================");

  return {
    success: true,
    optimized,
    failed,
    failures,
  };
}