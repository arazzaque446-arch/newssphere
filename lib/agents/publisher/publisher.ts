import { supabaseAdmin } from "@/lib/supabase/admin";

interface PublishResult {
  published: number;
  readyForReview: number;
  skipped: number;
  failed: number;
  reasons: Record<string, number>;
}

function isValidSlug(slug: unknown): slug is string {
  return (
    typeof slug === "string" &&
    slug.trim().length >= 3 &&
    slug.trim() !== "null" &&
    slug.trim() !== "undefined"
  );
}

function validateArticle(article: any): string[] {
  const errors: string[] = [];

  if (!article.title?.trim()) {
    errors.push("missing_title");
  }

  if (!article.content?.trim()) {
    errors.push("missing_content");
  }

  if (!isValidSlug(article.seo_slug)) {
    errors.push("missing_seo_slug");
  }

  if (!article.category?.trim()) {
    errors.push("missing_category");
  }

  const summary =
    article.description?.trim() ||
    article.content?.trim();

  if (!summary) {
    errors.push("missing_summary");
  }

  if (!article.seo_title?.trim()) {
    errors.push("missing_seo_title");
  }

  if (!article.seo_description?.trim()) {
    errors.push("missing_seo_description");
  }

  if (article.rejected === true) {
    errors.push("rejected");
  }

  if (article.approved !== true) {
    errors.push("not_approved");
  }

  return errors;
}

export async function runPublisher(): Promise<{
  success: boolean;
  published: number;
  readyForReview: number;
  skipped: number;
  failed: number;
  reasons: Record<string, number>;
}> {
  console.log("=================================");
  console.log("PUBLISHER AGENT STARTED");
  console.log("=================================");

  const result: PublishResult = {
    published: 0,
    readyForReview: 0,
    skipped: 0,
    failed: 0,
    reasons: {},
  };

  /*
   * IMPORTANT:
   *
   * The AI Publisher NEVER publishes directly.
   *
   * It only prepares approved candidates for
   * final human review.
   */

  const { data: queue, error: queueError } =
    await supabaseAdmin
      .from("news_candidates")
      .select("*")
      .eq("approved", true)
      .eq("rejected", false)
      .eq("status", "pending")
      .limit(20);

  if (queueError) {
    console.error(
      "Publisher queue error:",
      queueError
    );

    return {
      success: false,
      published: 0,
      readyForReview: 0,
      skipped: 0,
      failed: 1,
      reasons: {
        queue_error: 1,
      },
    };
  }

  if (!queue || queue.length === 0) {
    console.log(
      "Publisher: Nothing ready for review."
    );

    return {
      success: true,
      published: 0,
      readyForReview: 0,
      skipped: 0,
      failed: 0,
      reasons: {},
    };
  }

  console.log(
    `Publisher: ${queue.length} candidate(s) found.`
  );

  for (const article of queue) {
    console.log("---------------------------------");
    console.log(
      "Checking:",
      article.title
    );

    /*
     * FINAL AI SAFETY CHECK
     */

    const validationErrors =
      validateArticle(article);

    if (validationErrors.length > 0) {
      result.skipped++;

      console.warn(
        "Candidate failed publication gate:",
        article.id,
        validationErrors
      );

      for (const reason of validationErrors) {
        result.reasons[reason] =
          (result.reasons[reason] ?? 0) + 1;
      }

      continue;
    }

    /*
     * CHECK DUPLICATE SLUG
     */

    const {
      data: duplicate,
      error: duplicateError,
    } = await supabaseAdmin
      .from("articles")
      .select("id")
      .eq("slug", article.seo_slug)
      .maybeSingle();

    if (duplicateError) {
      console.error(
        "Slug check failed:",
        duplicateError
      );

      result.failed++;

      result.reasons["slug_check_error"] =
        (result.reasons["slug_check_error"] ?? 0) + 1;

      continue;
    }

    if (duplicate) {
      console.warn(
        "Duplicate slug:",
        article.seo_slug
      );

      result.skipped++;

      result.reasons["duplicate_slug"] =
        (result.reasons["duplicate_slug"] ?? 0) + 1;

      await supabaseAdmin
        .from("news_candidates")
        .update({
          rejected: true,
          status: "rejected",
        })
        .eq("id", article.id);

      continue;
    }

    /*
     * IMPORTANT:
     *
     * DO NOT INSERT INTO articles HERE.
     *
     * The article is only moved to the
     * human review stage.
     */

    const { error: reviewError } =
      await supabaseAdmin
        .from("news_candidates")
        .update({
          status: "ready_for_review",
        })
        .eq("id", article.id);

    if (reviewError) {
      console.error(
        "Failed to move candidate to review:",
        reviewError
      );

      result.failed++;

      result.reasons["review_queue_update_failed"] =
        (result.reasons[
          "review_queue_update_failed"
        ] ?? 0) + 1;

      continue;
    }

    result.readyForReview++;

    console.log(
      "READY FOR YOUR REVIEW:",
      article.title
    );
  }

  console.log("=================================");
  console.log("PUBLISHER AGENT FINISHED");
  console.log(
    "Ready for review:",
    result.readyForReview
  );
  console.log(
    "Published:",
    result.published
  );
  console.log(
    "Skipped:",
    result.skipped
  );
  console.log(
    "Failed:",
    result.failed
  );
  console.log(
    "Reasons:",
    result.reasons
  );
  console.log("=================================");

  return {
    success: true,
    published: 0,
    readyForReview: result.readyForReview,
    skipped: result.skipped,
    failed: result.failed,
    reasons: result.reasons,
  };
}