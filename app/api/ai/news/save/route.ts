import {
  NextRequest,
  NextResponse,
} from "next/server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { cleanArticle } from "@/lib/cleanArticle";
import { groq } from "@/lib/ai/groq";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function getSlug(
  slug: unknown,
  title: string
) {
  const supplied =
    typeof slug === "string"
      ? slug
      : "";

  return (
    slugify(supplied) ||
    slugify(title)
  );
}

/*
 * Generate relevant SEO/search tags with Groq.
 *
 * This does NOT publish anything.
 * It only generates metadata for the article.
 */
async function generateAutomaticTags(
  title: string,
  summary: string,
  content: string
): Promise<string[]> {
  try {
    const response =
      await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        temperature: 0.2,

        max_tokens: 300,

        messages: [
          {
            role: "system",
            content:
              "You are an SEO metadata assistant for a professional news website. " +
              "Generate only highly relevant search and topic tags. " +
              "Never invent facts. " +
              "Do not use hashtags. " +
              "Avoid generic tags such as news, latest news, breaking news, article, update, or NewsSphere. " +
              "Return ONLY a valid JSON array containing 5 to 10 short tag strings.",
          },
          {
            role: "user",
            content:
              `Generate 5 to 10 highly relevant tags for this news article.

TITLE:
${title}

SUMMARY:
${summary}

CONTENT:
${content.slice(0, 6000)}

Return ONLY JSON in this exact format:
["tag 1", "tag 2", "tag 3"]`,
          },
        ],
      });

    const raw =
      response.choices?.[0]?.message?.content
        ?.trim() || "";

    if (!raw) {
      return [];
    }

    /*
     * Remove accidental markdown code fences.
     */
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (tag): tag is string =>
          typeof tag === "string"
      )
      .map((tag) =>
        tag
          .trim()
          .replace(/^#+/, "")
          .replace(/\s+/g, " ")
      )
      .filter(Boolean)
      .slice(0, 10);

  } catch (error) {
    console.error(
      "Automatic tag generation failed:",
      error
    );

    /*
     * Saving the article must NOT fail
     * just because AI tagging failed.
     */
    return [];
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    /*
     * Authentication
     */

    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const article =
      await req.json();

    /*
     * Basic validation
     */

    const title =
      typeof article?.title === "string"
        ? article.title.trim()
        : "";

    const summary =
      typeof article?.summary === "string"
        ? article.summary.trim()
        : "";

    const content =
      typeof article?.content === "string"
        ? cleanArticle(
            article.content.trim()
          )
        : "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article title is required.",
        },
        { status: 400 }
      );
    }

    if (!summary) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article summary is required.",
        },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article content is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Normalize fields
     */

    const slug = getSlug(
      article.slug,
      title
    );

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A valid article slug is required.",
        },
        { status: 400 }
      );
    }

    const category =
      typeof article.category === "string" &&
      article.category.trim()
        ? article.category.trim()
        : "India";

    const location =
      typeof article.location === "string"
        ? article.location.trim()
        : "";

    const seoTitle =
      typeof article.seoTitle === "string" &&
      article.seoTitle.trim()
        ? article.seoTitle.trim()
        : title;

    const seoDescription =
      typeof article.seoDescription === "string" &&
      article.seoDescription.trim()
        ? article.seoDescription
            .trim()
            .slice(0, 155)
        : summary.slice(0, 155);

    /*
     * Manual tags, if supplied.
     */
    const manualTags = Array.isArray(
      article.tags
    )
      ? article.tags
          .filter(
            (tag: unknown) =>
              typeof tag === "string"
          )
          .map((tag: string) =>
            tag.trim()
          )
          .filter(Boolean)
          .slice(0, 10)
      : [];

    /*
     * AUTOMATIC TAG GENERATION
     *
     * If no manual tags were supplied,
     * Groq generates them automatically.
     */
    let tags = manualTags;

    if (tags.length === 0) {
      tags =
        await generateAutomaticTags(
          title,
          summary,
          content
        );
    }

    /*
     * Published state
     */

    const published =
      article.published === true;

    /*
     * Duplicate slug protection
     */

    const {
      data: existing,
      error: duplicateError,
    } = await supabaseAdmin
      .from("articles")
      .select("id,title,slug")
      .eq("slug", slug)
      .maybeSingle();

    if (duplicateError) {
      console.error(
        "Slug check failed:",
        duplicateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to verify article slug.",
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            `An article already exists with slug "${slug}". ` +
            "Please change the URL slug before saving.",
        },
        { status: 409 }
      );
    }

    /*
     * Calculate read time
     */

    const wordCount =
      content
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const readTime = Math.max(
      1,
      Math.ceil(wordCount / 220)
    );

    /*
     * Save
     */

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("articles")
      .insert({
        title,
        slug,
        summary,
        content,

        category,
        location,

        author: "NewsSphere",

        source:
          typeof article.source === "string" &&
          article.source.trim()
            ? article.source.trim()
            : "NewsSphere AI",

        image_url:
          typeof article.image_url === "string" &&
          article.image_url.trim()
            ? article.image_url.trim()
            : "https://images.unsplash.com/photo-1504711434969-e33886168f5c",

        seo_title:
          seoTitle,

        seo_description:
          seoDescription,

        tags,

        published,

        featured: false,
        breaking: false,

        views: 0,

        read_time: readTime,

        published_at: published
          ? new Date().toISOString()
          : null,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Save article error:",
        error
      );

      /*
       * Handle database-level
       * duplicate protection too.
       */

      if (
        error.code === "23505"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              `The slug "${slug}" is already in use. Please choose another slug.`,
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    /*
     * Revalidate frontend pages
     */

    revalidatePath("/");
    revalidatePath("/latest");
    revalidatePath("/sitemap.xml");
    revalidatePath("/news-sitemap.xml");

    if (category) {
      revalidatePath(
        `/category/${slugify(category)}`
      );
    }

    revalidatePath(
      `/news/${data.slug}`
    );

    /*
     * Return saved article
     */

    return NextResponse.json({
      success: true,

      article: data,

      message: published
        ? "Article published successfully."
        : "Draft saved successfully.",

      automaticTags:
        manualTags.length === 0,

      tags,
    });

  } catch (error) {
    console.error(
      "AI Save API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to save article.",
      },
      { status: 500 }
    );
  }
}
