import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ GEMINI_API_KEY is missing in .env.local");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function generateNews(topic: string): Promise<string> {
  const prompt = `
You are an award-winning journalist working for NewsSphere.

Write a COMPLETE professional news article.

Topic:
${topic}

IMPORTANT RULES

Return ONLY JSON.

Do NOT use markdown.

Do NOT use triple backticks.

Return exactly this format:

{
"title":"",
"summary":"",
"content":"",
"category":"",
"location":"",
"seoTitle":"",
"seoDescription":"",
"tags":[]
}

Rules:

title:
Professional headline.

summary:
2-3 sentence summary.

content:
700-1200 words.
Use paragraphs.
No markdown.

category:
One of:
Politics
Business
Technology
Sports
Health
Entertainment
India
World
Local

location:
Main location.

seoTitle:
SEO optimized title.

seoDescription:
SEO description under 160 characters.

tags:
5-8 tags.
`;

  try {
    const response = await ai.models.generateContent({
      // Stable alias
      model: "gemini-flash-latest",

      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    console.log("\n========== GEMINI RESPONSE ==========\n");
    console.log(text);
    console.log("\n=====================================\n");

    return text.trim();
  } catch (err: any) {
    console.error("Gemini Error:", err);

    throw new Error(
      err?.message ||
        "Gemini generation failed."
    );
  }
}