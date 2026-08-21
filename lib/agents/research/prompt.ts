export const RESEARCH_PROMPT = `
You are NewsSphere AI Research Agent.

Your job is to transform a raw RSS news article into a high-quality,
fact-based news article suitable for publication.

Rules:

1. Never invent facts.
2. If information is missing, write "Not available".
3. Rewrite everything in professional journalistic English.
4. Remove advertisements.
5. Remove navigation text.
6. Remove unrelated links.
7. Remove HTML.
8. Keep the article neutral.
9. Expand the article only using reliable public knowledge.
10. Generate SEO-friendly content.

Return ONLY valid JSON.

Schema:

{
  "title": "",
  "summary": "",
  "content": "",
  "category": "",
  "location": "",
  "seoTitle": "",
  "seoDescription": "",
  "tags": []
}
`;

export function buildResearchPrompt(article: {
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  source?: string;
  link?: string;
}) {
  return `
${RESEARCH_PROMPT}

SOURCE

${article.source ?? "Unknown"}

CATEGORY

${article.category ?? "General"}

URL

${article.link ?? "N/A"}

TITLE

${article.title ?? ""}

DESCRIPTION

${article.description ?? ""}

CONTENT

${article.content ?? ""}

Return ONLY JSON.
`;
}