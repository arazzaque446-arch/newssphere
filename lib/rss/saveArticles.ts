import { createClient } from "@/lib/supabase/client";

function createSlug(text: string): string {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function cleanText(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function makeUniqueSlug(
  baseSlug: string,
  guid: string | null,
  index: number
): string {
  const suffix =
    guid?.replace(/[^a-zA-Z0-9]/g, "").slice(-10) ||
    `${Date.now()}-${index}`;

  return `${baseSlug}-${suffix}`.slice(0, 200);
}

export async function saveArticles(articles: any[]) {
  const supabase = createClient();

  const inserted: any[] = [];
  let duplicates = 0;
  let failed = 0;

  for (let index = 0; index < articles.length; index++) {
    const article = articles[index];

    try {
      const title =
        cleanText(article.title) || "NewsSphere News";

      const summary =
        cleanText(article.summary) ||
        cleanText(article.excerpt) ||
        cleanText(article.description);

      const content =
        cleanText(article.content) ||
        cleanText(article.contentEncoded) ||
        summary ||
        title;

      const link =
        cleanText(article.link) ||
        cleanText(article.url) ||
        null;

      const guid =
        cleanText(article.guid) || null;

      const imageUrl =
        cleanText(article.image) ||
        cleanText(article.imageUrl) ||
        "";

      const baseSlug =
        cleanText(article.slug) ||
        createSlug(title) ||
        `news-${Date.now()}-${index}`;

      const publishedAt =
        article.published && !Number.isNaN(Date.parse(article.published))
          ? new Date(article.published)
          : new Date();

      // --------------------------------------------
      // DUPLICATE CHECK
      // --------------------------------------------

      let existing = null;

      // 1. GUID
      if (guid) {
        const { data } = await supabase
          .from("articles")
          .select("id")
          .eq("guid", guid)
          .maybeSingle();

        existing = data;
      }

      // 2. LINK
      if (!existing && link) {
        const { data } = await supabase
          .from("articles")
          .select("id")
          .eq("link", link)
          .maybeSingle();

        existing = data;
      }

      // 3. SLUG
      if (!existing) {
        const { data } = await supabase
          .from("articles")
          .select("id")
          .eq("slug", baseSlug)
          .maybeSingle();

        existing = data;
      }

      if (existing) {
        duplicates++;
        continue;
      }

      // --------------------------------------------
      // GENERATE UNIQUE SLUG
      // --------------------------------------------

      let slug = baseSlug;

      const { data: slugMatch } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (slugMatch) {
        slug = makeUniqueSlug(
          baseSlug,
          guid,
          index
        );
      }

      // --------------------------------------------
      // FINAL ARTICLE
      // --------------------------------------------

      const formattedArticle = {
        guid,
        link,

        title,

        summary,

        content,

        image_url: imageUrl,

        category:
          cleanText(article.category) || "General",

        location:
          cleanText(article.location) ||
          "Guwahati, Assam",

        author:
          cleanText(article.author) ||
          "NewsSphere",

        source:
          cleanText(article.source) ||
          "RSS",

        published: true,

        featured: false,

        slug,

        seo_title: title,

        seo_description:
          summary ||
          `${title} - Latest news and updates from NewsSphere.`,

        tags:
          Array.isArray(article.tags)
            ? article.tags
            : [],

        breaking: false,

        published_at: publishedAt,

        read_time: Math.max(
          1,
          Math.ceil(content.length / 1000)
        ),
      };

      // --------------------------------------------
      // INSERT
      // --------------------------------------------

      const { data, error } = await supabase
        .from("articles")
        .insert(formattedArticle)
        .select()
        .single();

      if (error) {
        // A duplicate slug can still theoretically happen
        // because the database is the final authority.
        if (error.code === "23505") {
          console.warn(
            `Duplicate detected during insert: ${slug}`
          );

          duplicates++;
          continue;
        }

        console.error(
          "Insert Error:",
          error
        );

        failed++;
        continue;
      }

      inserted.push(data);
    } catch (error) {
      console.error(
        "RSS article processing error:",
        error
      );

      failed++;
    }
  }

  console.log(
    `Imported: ${inserted.length} | Duplicates: ${duplicates} | Failed: ${failed}`
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