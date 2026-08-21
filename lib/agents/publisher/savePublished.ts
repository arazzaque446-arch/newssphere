import { supabaseAdmin } from "@/lib/supabase/admin";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function savePublished(
  article: any
) {
  const slug =
    typeof article.seo_slug === "string" &&
    article.seo_slug.trim()
      ? article.seo_slug.trim()
      : slugify(article.title);

  const summary =
    typeof article.description === "string"
      ? article.description.trim()
      : "";

  const content =
    typeof article.content === "string" &&
    article.content.trim()
      ? article.content.trim()
      : summary;

  const seoTitle =
    typeof article.seo_title === "string" &&
    article.seo_title.trim()
      ? article.seo_title.trim()
      : article.title;

  const seoDescription =
    typeof article.seo_description ===
      "string" &&
    article.seo_description.trim()
      ? article.seo_description.trim()
      : summary;

  console.log(
    "Saving published article:",
    {
      title: article.title,
      slug,
    }
  );

  const { error } =
    await supabaseAdmin
      .from("articles")
      .insert({
        title: article.title,

        slug,

        summary,

        content,

        category:
          article.category ||
          "General",

        image_url:
          article.image_url || null,

        author:
          article.author ||
          "NewsSphere AI",

        source:
          article.source || null,

        seo_title: seoTitle,

        seo_description:
          seoDescription,

        published: true,

        featured:
          article.featured ?? false,

        breaking:
          article.breaking ?? false,

        published_at:
          new Date().toISOString(),

        guid:
          article.guid || null,

        link:
          article.link || null,
      });

  if (error) {
    console.error(
      "================================="
    );

    console.error(
      "PUBLISH SAVE ERROR"
    );

    console.error(
      "================================="
    );

    console.error(error);

    console.error(
      "================================="
    );

    return false;
  }

  console.log(
    "Published:",
    article.title
  );

  return true;
}