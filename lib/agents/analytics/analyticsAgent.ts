import { supabase } from "@/lib/supabase";

export async function analyticsAgent() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true);

  if (error) throw error;

  let featured = 0;
  let trending = 0;

  for (const article of articles ?? []) {
    const views = article.views ?? 0;

    let score = 0;

    // Views score
    score += Math.min(views, 100);

    // Breaking bonus
    if (article.breaking) score += 30;

    // Featured bonus
    if (article.featured) score += 20;

    const isTrending = score >= 60;
    const isFeatured = score >= 80;

    if (isTrending) trending++;
    if (isFeatured) featured++;

    await supabase
      .from("articles")
      .update({
        importance: score,
        editor_score: score,
        trending: isTrending,
        recommended: isFeatured,
      })
      .eq("id", article.id);
  }

  return {
    success: true,
    featured,
    trending,
  };
}