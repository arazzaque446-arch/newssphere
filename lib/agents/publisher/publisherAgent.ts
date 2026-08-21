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

  if (
    typeof article.title !== "string" ||
    !article.title.trim()
  ) {
    errors.push("missing_title");
  }

  if (
    typeof article.content !== "string" ||
    !article.content.trim()
  ) {
    errors.push("missing_content");
  }

  if (
    !article.summary?.trim() &&
    !article.description?.trim()
  ) {
    errors.push("missing_summary");
  }

  if (!article.category?.trim()) {
    errors.push("missing_category");
  }

  if (
    !isValidSlug(
      article.seo_slug ?? article.slug
    )
  ) {
    errors.push("missing_seo_slug");
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

  /*
   * IMPORTANT:
   *
   * Publisher must NEVER require approved=true.
   *
   * Human approval happens later.
   */

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
   * Publisher only handles candidates that
   * the Editor has already placed into the
   * human review queue.
   */

  const {
    data: queue,
    error: queueError,
  } = await supabaseAdmin
    .from("news_candidates")
    .select("*")
    .eq("status", "ready_for_review")
    .eq("approved", false)
    .eq("rejected", false)
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

  if (!queue?.length) {
    console.log(
      "Publisher: No candidates awaiting review."
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

  for (const article of queue) {
    console.log("---------------------------------");
    console.log(
      "Validating:",
      article.title
    );

    const validationErrors =
      validateArticle(article);

    if (validationErrors.length > 0) {
      result.skipped++;

      for (const reason of validationErrors) {
        result.reasons[reason] =
          (result.reasons[reason] ?? 0) + 1;
      }

      console.warn(
        "Publisher validation failed:",
        article.id,
        validationErrors
      );

      continue;
    }

    /*
     * Check duplicate slug against published
     * articles.
     */

    const slug =
      article.seo_slug ??
      article.slug;

    const {
      data: duplicate,
      error: duplicateError,
    } = await supabaseAdmin
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (duplicateError) {
      console.error(
        "Duplicate slug check failed:",
        duplicateError
      );

      result.failed++;

      result.reasons["slug_check_error"] =
        (result.reasons[
          "slug_check_error"
        ] ?? 0) + 1;

      continue;
    }

    if (duplicate) {
      console.warn(
        "Duplicate slug:",
        slug
      );

      result.skipped++;

      result.reasons["duplicate_slug"] =
        (result.reasons[
          "duplicate_slug"
        ] ?? 0) + 1;

      await supabaseAdmin
        .from("news_candidates")
        .update({
          rejected: true,
          approved: false,
          status: "rejected",
          reviewed_at:
            new Date().toISOString(),
        })
        .eq("id", article.id);

      continue;
    }

    /*
     * DO NOT publish here.
     *
     * The candidate is already in the
     * human review queue.
     */

    result.readyForReview++;

    console.log(
      "READY FOR HUMAN REVIEW:",
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
    "Published automatically:",
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