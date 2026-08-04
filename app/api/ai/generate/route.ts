import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const body = await req.json();

    const {
      title = "",
      content = "",
      category = "",
      location = "",
    } = body;

    const prompt = `
You are the Chief Editor of NewsSphere, an international digital newspaper.

Your job is to rewrite the provided news into a COMPLETE, PROFESSIONAL, ORIGINAL newspaper article.

IMPORTANT INSTRUCTIONS

- Write between 1000 and 1500 words.
- Write like Reuters, BBC, AP or The Hindu.
- Never copy the original wording.
- Rewrite everything naturally.
- Use professional journalism.
- Expand the story with useful background.
- Explain what happened.
- Explain why it happened.
- Explain who is involved.
- Explain the timeline.
- Explain the impact.
- Explain possible future developments.
- Use short readable paragraphs.
- Do NOT use markdown.
- Do NOT use HTML.
- Do NOT use bullet points.
- Do NOT invent fake statistics.
- Do NOT invent fake quotes.
- If information is limited, naturally mention that authorities have not released further details.
- The article should read like it was written by a human journalist.

Generate:

• Professional headline
• Short summary (2-3 sentences)
• Complete article
• SEO title
• SEO description (under 160 characters)
• Category
• 5-10 SEO tags
• URL slug
• Estimated read time

RETURN ONLY VALID JSON.

{
  "title":"",
  "summary":"",
  "content":"",
  "seoTitle":"",
  "seoDescription":"",
  "category":"",
  "tags":[],
  "slug":"",
  "readTime":""
}

ARTICLE TITLE:
${title}

CATEGORY:
${category}

LOCATION:
${location}

ORIGINAL ARTICLE:
${content}

Remember:

Return ONLY JSON.

No markdown.

No explanations.

No code fences.

No extra text.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 4096,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices[0].message.content || "{}";

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    let article = JSON.parse(text);

    article.title ||= title;
    article.summary ||= "";
    article.content ||= content;
    article.category ||= category;

    article.tags ||= [];

    article.slug ||=
      article.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    article.seoTitle ||= article.title;

    article.seoDescription ||=
      article.summary.substring(0, 155);

    if (!article.readTime) {
      const words = article.content.split(/\s+/).length;
      article.readTime = `${Math.max(
        3,
        Math.ceil(words / 220)
      )} min read`;
    }

    return NextResponse.json({
      success: true,
      article,
    });

  } catch (error) {
    console.error("GROQ ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}