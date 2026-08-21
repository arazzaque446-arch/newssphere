import { supabase } from "@/lib/supabase";

export async function saveResearch(
  candidateId: string,
  article: any
) {
  const { error } = await supabase
    .from("news_candidates")
    .update({
      title: article.title,
      description: article.summary,
      content: article.content,
      category: article.category,
      researched: true,
ai_processed: true,
status: "researched",
      updated_at: new Date().toISOString(),
    })
    .eq("id", candidateId);

  if (error) {
    throw error;
  }

  return true;
}