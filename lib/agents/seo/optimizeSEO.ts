import Groq from "groq-sdk";
import { SEO_PROMPT } from "./prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function createFallbackSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export async function optimizeSEO(article: any) {
  const completion =
    await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: SEO_PROMPT,
        },

        {
          role: "user",
          content: `
Title:
${article.title ?? ""}

Description:
${article.description ?? ""}

Summary:
${article.summary ?? article.excerpt ?? ""}

Content:
${article.content ?? ""}

Category:
${article.category ?? ""}

Source:
${article.source ?? ""}
`,
        },
      ],
    });

  let text =
    completion.choices[0].message.content ??
    "{}";

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const result = JSON.parse(text);

  /*
   * Always have a deterministic slug fallback.
   */

  const slug =
    typeof result.slug === "string" &&
    result.slug.trim().length > 2
      ? result.slug
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      : createFallbackSlug(
          article.title ?? "news-article"
        );

  /*
   * Summary fallback.
   */

  const summary =
    typeof result.summary === "string" &&
    result.summary.trim()
      ? result.summary.trim()
      : (
          article.summary ??
          article.excerpt ??
          article.description ??
          ""
        ).trim();

  return {
    slug,
    summary,

    seoTitle:
      result.seoTitle?.trim() ||
      article.title,

    seoDescription:
      result.seoDescription?.trim() ||
      summary.slice(0, 155),

    keywords:
      Array.isArray(result.keywords)
        ? result.keywords
        : [],

    ogTitle:
      result.ogTitle?.trim() ||
      article.title,

    ogDescription:
      result.ogDescription?.trim() ||
      summary,
  };
}