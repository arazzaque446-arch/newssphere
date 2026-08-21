export function scoreArticle(article: any) {
  let score = 50;

  if (article.category === "Politics") score += 15;
  if (article.category === "World") score += 15;
  if (article.category === "Technology") score += 10;

  if ((article.content ?? "").length > 2500)
    score += 10;

  if (article.researched) score += 10;

  if (article.fact_checked) score += 15;

  return Math.min(score, 100);
}