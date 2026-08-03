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
      title,
      content,
      category,
      location,
    } = body;

    const prompt = `
You are the Chief Editor of NewsSphere.

Rewrite this news professionally.

Return ONLY one JSON object.

Do not use markdown.

Do not use code fences.

Do not wrap the response in a JSON code block.

Return raw JSON only.

The response MUST be valid JSON that can be parsed using JSON.parse().

Return exactly this structure:

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

TITLE:
${title}

CATEGORY:
${category}

LOCATION:
${location}

ARTICLE:
${content}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const text =
      completion.choices[0].message.content || "{}";

    let article;

    try {
      article = JSON.parse(text);
    } catch {
      const fixed = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      article = JSON.parse(fixed);
    }

    article.title ??= title;
    article.summary ??= "";
    article.content ??= content;
    article.category ??= category;
    article.tags ??= [];
    article.slug ??=
      article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
    article.readTime ??= "3 min read";
    article.seoTitle ??= article.title;
    article.seoDescription ??= article.summary;

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