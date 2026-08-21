import { supabaseAdmin } from "@/lib/supabase/admin";

export async function saveSEO(
  id: string,
  seo: any
) {
  const seoSlug =
    typeof seo.slug === "string"
      ? seo.slug.trim()
      : "";

  const summary =
    typeof seo.summary === "string"
      ? seo.summary.trim()
      : "";

  const seoTitle =
    typeof seo.seoTitle === "string"
      ? seo.seoTitle.trim()
      : "";

  const seoDescription =
    typeof seo.seoDescription === "string"
      ? seo.seoDescription.trim()
      : "";

  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords
        .filter(
          (keyword: unknown): keyword is string =>
            typeof keyword === "string"
        )
        .map((keyword: string) => keyword.trim())
        .filter(Boolean)
        .filter(
          (keyword: string, index: number, array: string[]) =>
            array.indexOf(keyword) === index
        )
        .slice(0, 10)
    : [];

  if (
    !seoSlug ||
    !summary ||
    !seoTitle ||
    !seoDescription
  ) {
    console.error(
      "SEO validation failed:",
      {
        id,
        seoSlug: Boolean(seoSlug),
        summary: Boolean(summary),
        seoTitle: Boolean(seoTitle),
        seoDescription: Boolean(seoDescription),
      }
    );

    return false;
  }

  const updateData = {
    seo_slug: seoSlug,
    description: summary,
    seo_title: seoTitle,
    seo_description: seoDescription,
    keywords,
  };

  console.log(
    "Saving SEO:",
    {
      id,
      updateData,
    }
  );

  const { error: updateError } =
    await supabaseAdmin
      .from("news_candidates")
      .update(updateData)
      .eq("id", id);

  if (updateError) {
    console.error(
      "================================="
    );
    console.error(
      "SEO DATABASE ERROR"
    );
    console.error(
      "================================="
    );
    console.error(
      "Candidate ID:",
      id
    );
    console.error(
      "Error:",
      updateError
    );
    console.error(
      "================================="
    );

    return false;
  }

  const { data: saved, error: verifyError } =
    await supabaseAdmin
      .from("news_candidates")
      .select(
        "id,seo_slug,seo_title,seo_description,description,keywords"
      )
      .eq("id", id)
      .single();

  if (verifyError) {
    console.error(
      "SEO verification failed:",
      verifyError
    );

    return false;
  }

  console.log(
    "SEO SAVED + VERIFIED:",
    saved
  );

  if (
    !saved?.seo_slug ||
    !saved?.seo_title ||
    !saved?.seo_description ||
    !saved?.description
  ) {
    console.error(
      "SEO verification failed: required fields are empty",
      saved
    );

    return false;
  }

  console.log(
    "✓ SEO saved:",
    id
  );

  console.log(
    "✓ Automatic tags:",
    keywords
  );

  return true;
}