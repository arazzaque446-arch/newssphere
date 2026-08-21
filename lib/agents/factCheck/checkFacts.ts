import { groq } from "@/lib/ai/groq";

export async function checkFacts(article: any) {
  const prompt = `
You are a senior Reuters Fact Checker.

Review the following news article.

Tasks:

1. Detect unsupported claims.
2. Detect obvious misinformation.
3. Detect contradictions.
4. Detect exaggerated language.
5. Improve neutrality.
6. Give confidence score (0-100).

Return ONLY JSON.

{
 "title":"",
 "summary":"",
 "content":"",
 "confidence":95,
 "notes":"Short explanation",
 "approved":true
}

ARTICLE

TITLE:
${article.title}

CONTENT:
${article.content}
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

  return JSON.parse(completion.choices[0].message.content || "{}");
}
