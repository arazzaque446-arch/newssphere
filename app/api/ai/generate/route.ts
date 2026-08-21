import { NextResponse } from "next/server";
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

function cleanJson(text: string) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (
    firstBrace === -1 ||
    lastBrace === -1
  ) {
    throw new Error(
      "AI did not return valid JSON."
    );
  }

  return cleaned.substring(
    firstBrace,
    lastBrace + 1
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title =
      typeof body?.title === "string"
        ? body.title.trim()
        : "";

    const content =
      typeof body?.content === "string"
        ? body.content.trim()
        : "";

    const category =
      typeof body?.category === "string"
        ? body.category.trim()
        : "";

    const location =
      typeof body?.location === "string"
        ? body.location.trim()
        : "";

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

    const prompt = `
You are the senior editor of NewsSphere.

Rewrite the supplied article into clear, professional,
original news writing.

STRICT ACCURACY RULES:

- Use ONLY information contained in the supplied article.
- Do NOT invent facts.
- Do NOT invent statistics.
- Do NOT invent quotes.
- Do NOT invent names.
- Do NOT invent organizations.
- Do NOT invent dates.
- Do NOT invent locations.
- Do NOT invent background information.
- Do NOT add events that are not supplied.
- Do NOT claim independent verification.
- Do NOT pretend that you browsed the internet.
- Do NOT add information merely to make the article longer.
- Preserve the factual meaning of the source.
- Remove repetition.
- Improve clarity and grammar.
- Use professional newspaper style.
- Use short readable paragraphs.
- Do not use markdown.
- Do not use HTML.
- Do not use bullet points inside the article.

If the source is short, keep the rewritten article
appropriately short.

Return ONLY valid JSON.

Required format:

{
  "title": "",
  "summary": "",
  "content": "",
  "seoTitle": "",
  "seoDescription": "",
  "category": "",
  "location": "",
  "tags": [],
  "slug": "",
  "readTime": 0
}

TITLE:
${title}

CATEGORY:
${category}

LOCATION:
${location}

SOURCE ARTICLE:
${content}
`;

    const completion =
      await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        temperature: 0.25,
        max_tokens: 5000,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content:
              "You are a careful professional news editor. Accuracy is more important than length.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const raw =
      completion.choices[0]?.message
        ?.content;

    if (!raw) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    const article = JSON.parse(
      cleanJson(raw)
    );

    article.title = String(
      article.title || title
    ).trim();

    article.summary = String(
      article.summary || ""
    ).trim();

    article.content = String(
      article.content || content
    ).trim();

    article.category = String(
      article.category || category || "India"
    ).trim();

    article.location = String(
      article.location || location || ""
    ).trim();

    article.seoTitle = String(
      article.seoTitle ||
        article.title ||
        title
    ).trim();

    article.seoDescription = String(
      article.seoDescription ||
        article.summary ||
        ""
    )
      .trim()
      .slice(0, 155);

    article.slug = slugify(
      String(
        article.slug ||
          article.title ||
          title
      )
    );

    article.tags = Array.isArray(
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

    const wordCount =
      article.content
        .split(/\s+/)
        .filter(Boolean).length;

    article.readTime = Math.max(
      1,
      Math.ceil(wordCount / 220)
    );

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error(
      "GROQ REWRITE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Article rewrite failed.",
      },
      { status: 500 }
    );
  }
}
