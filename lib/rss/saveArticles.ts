import { createClient } from "@/lib/supabase/client";

export async function saveArticles(articles: any[]) {
  const supabase = createClient();

  const formattedArticles = articles.map((article) => ({
    guid: article.guid ?? null,

    link: article.link ?? article.url ?? null,

    title: article.title,

    summary: article.summary,

    content: article.content,

    image_url: article.image ?? "",

    category: article.category || "General",

    location: "Guwahati, Assam",

    author: article.author || "NewsSphere",

    source: article.source || "RSS",

    published: true,

    featured: false,

    slug: article.slug,

    seo_title: article.title,

    seo_description: article.summary,

    tags: [],

    breaking: false,

    published_at: article.published
      ? new Date(article.published)
      : new Date(),

    read_time: Math.max(
      1,
      Math.ceil((article.content || "").length / 1000)
    ),
  }));

  const inserted = [];
  let duplicates = 0;
  let failed = 0;

  for (const article of formattedArticles) {
    let existing = null;

    // Check GUID
    if (article.guid) {
      const { data } = await supabase
        .from("articles")
        .select("id")
        .eq("guid", article.guid)
        .maybeSingle();

      existing = data;
    }

    // Check Link
    if (!existing && article.link) {
      const { data } = await supabase
        .from("articles")
        .select("id")
        .eq("link", article.link)
        .maybeSingle();

      existing = data;
    }

    // Check Slug
    if (!existing) {
      const { data } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", article.slug)
        .maybeSingle();

      existing = data;
    }

    if (existing) {
      duplicates++;
      continue;
    }

    const { data, error } = await supabase
      .from("articles")
      .insert(article)
      .select()
      .single();

    if (error) {
      console.error("Insert Error:", error);
      failed++;
      continue;
    }

    inserted.push(data);
  }

  console.log(
    `✅ Imported: ${inserted.length} | Duplicates: ${duplicates} | Failed: ${failed}`
  );

  return {
    inserted,
    stats: {
      imported: inserted.length,
      duplicates,
      failed,
    },
  };
}