export function scoreArticles(article: any) {
  let score = 0;

  score += Math.min(article.views ?? 0, 100);

  if (article.breaking) score += 30;
  if (article.featured) score += 20;

  return score;
}