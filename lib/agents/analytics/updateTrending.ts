import { supabase } from "@/lib/supabase";
import { scoreArticles } from "./scoreArticles";

export async function updateTrending() {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true);

  for (const article of data ?? []) {
    const score = scoreArticles(article);

    await supabase
      .from("articles")
      .update({
        trending: score >= 60,
        recommended: score >= 80,
      })
      .eq("id", article.id);
  }

  return true;
}