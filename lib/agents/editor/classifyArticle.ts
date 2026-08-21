import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function classifyArticle(article: any) {
  const prompt = `
You are the Editor-in-Chief of NewsSphere.

Evaluate the following news article.

TITLE:
${article.title}

SUMMARY:
${article.description}

CONTENT:
${article.content}

Return ONLY valid JSON.

{
  "importance":0,
  "priority":0,
  "publish":true,
  "breaking":false,
  "featured":false,
  "reason":""
}

EDITOR RULES

Assume articles come from trusted RSS sources like BBC, Reuters, AP, The Hindu, etc.

DO NOT reject an article unless:
- it is empty
- it is obvious spam
- it is duplicated
- it contains almost no useful information

Otherwise ALWAYS publish it.

Importance:
0-100

Priority:
1-10

Breaking:
Only true for urgent or developing news.

Featured:
True for major international, national or highly important stories.

Reason:
Short explanation.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
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

  const text = completion.choices[0].message.content || "{}";

  const result = JSON.parse(text);

  return {
    importance: result.importance ?? 70,
    priority: result.priority ?? 7,
    publish: result.publish ?? true,
    breaking: result.breaking ?? false,
    featured: result.featured ?? false,
    reason: result.reason ?? "",
  };
}
