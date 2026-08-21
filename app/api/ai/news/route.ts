import { NextRequest, NextResponse } from "next/server";
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
  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("AI did not return valid JSON.");
  }

  return cleaned.substring(firstBrace, lastBrace + 1);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const topic =
      typeof body?.topic === "string"
        ? body.topic.trim()
        : "";

    if (!topic) {
      return NextResponse.json(
        {
          success: false,
          error: "Topic or source material is required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are the senior journalist and editor of NewsSphere.

Create a professional news article based ONLY on the information supplied by the user.

IMPORTANT JOURNALISM RULES:

- Do not invent facts.
- Do not invent statistics.
- Do not invent quotes.
- Do not invent people, organizations or events.
- Do not claim that you independently verified something.
- Do not pretend to have browsed the internet.
- If the supplied information is limited, write only what can reasonably be supported.
- Do not copy the source wording.
- Rewrite naturally and originally.
- Use clear professional news writing.
- Use short readable paragraphs.
- Do not use markdown.
- Do not use HTML.
- Do not use bullet points inside the article.
- Do not add fictional background information.

ARTICLE LENGTH:

Aim for approximately 700-1100 words when enough information is provided.
If the source material is short, do NOT pad the article with invented information.

RETURN ONLY VALID JSON.

Required format:

{
  "title": "",
  "summary": "",
  "content": "",
  "category": "",
  "location": "",
  "seoTitle": "",
  "seoDescription": "",
  "slug": "",
  "tags": [],
  "readTime": 0
}

FIELD RULES:

title:
A strong professional news headline.

summary:
A concise 2-3 sentence summary.

content:
The complete article.

category:
Choose one of:
Politics, Business, Technology, Sports, Health,
Entertainment, India, World, Local.

location:
Main location if clearly available. Otherwise empty string.

seoTitle:
SEO-friendly title.

seoDescription:
Maximum 155 characters.

slug:
Lowercase URL-safe slug.

tags:
5-8 relevant SEO keywords.

readTime:
Estimated reading time in minutes as a number.

USER'S MATERIAL:

${topic}
`;

    const completion =
      await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        temperature: 0.3,
        max_tokens: 6000,
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
      completion.choices[0]?.message?.content;

    if (!raw) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    const article = JSON.parse(
      cleanJson(raw)
    );

    article.title =
      String(article.title || "Untitled News");

    article.summary =
      String(article.summary || "").trim();

    article.content =
      String(article.content || "").trim();

    article.category =
      String(article.category || "India").trim();

    article.location =
      String(article.location || "").trim();

    article.seoTitle =
      String(
        article.seoTitle || article.title
      ).trim();

    article.seoDescription =
      String(
        article.seoDescription ||
          article.summary
      )
        .trim()
        .slice(0, 155);

    article.slug =
      slugify(
        String(
          article.slug || article.title
        )
      );

    article.tags = Array.isArray(article.tags)
      ? article.tags
          .filter(
            (tag: unknown) =>
              typeof tag === "string"
          )
          .map((tag: string) =>
            tag.trim()
          )
          .filter(Boolean)
          .slice(0, 8)
      : [];

    const wordCount =
      article.content
        .split(/\s+/)
        .filter(Boolean).length;

    article.readTime =
      Number(article.readTime) > 0
        ? Number(article.readTime)
        : Math.max(
            1,
            Math.ceil(wordCount / 220)
          );

    if (!article.content) {
      throw new Error(
        "AI generated an empty article."
      );
    }

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error(
      "AI News Generation Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "AI generation failed.",
      },
      { status: 500 }
    );
  }
}
