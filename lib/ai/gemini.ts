import { GoogleGenAI } from "@google/genai";

export async function generateNews(topic: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

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

category:
Politics, Business, Technology, Sports, Health, Entertainment, India, World or Local.

location:
Main location.

seoTitle:
SEO optimized title.

seoDescription:
Under 160 characters.

tags:
5-8 tags.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text.trim();
}