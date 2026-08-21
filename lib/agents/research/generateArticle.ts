import { buildResearchPrompt } from "./prompt";
import { groq } from "@/lib/ai/groq";

export interface ResearchResult {
  title: string;
  summary: string;
  content: string;
  category: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export async function generateArticle(article: any): Promise<ResearchResult> {
  const prompt = buildResearchPrompt(article);

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.3,
    max_tokens: 4096,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an expert news editor. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = completion.choices[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response.");
  }

  try {
    const parsed = JSON.parse(text);

    return {
      title: parsed.title || article.title,
      summary: parsed.summary || "",
      content: parsed.content || "",
      category: parsed.category || article.category || "General",
      location: parsed.location || "",
      seoTitle: parsed.seoTitle || parsed.title || article.title,
      seoDescription: parsed.seoDescription || "",
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    };
  } catch (err) {
    console.error("Invalid JSON from Groq:", text);
    throw err;
  }
}