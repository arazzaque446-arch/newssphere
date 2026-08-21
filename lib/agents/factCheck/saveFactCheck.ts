import { supabase } from "@/lib/supabase";

export async function saveFactCheck(id: string, report: any) {
  const { error } = await supabase
    .from("news_candidates")
    .update({
      title: report.title,
      description: report.summary,
      content: report.content,

      fact_checked: true,

      approved: report.approved,

      confidence_score: report.confidence,

      fact_check_notes: report.notes,

      reviewed_at: new Date().toISOString(),

      status: report.approved
        ? "fact_checked"
        : "needs_review",
    })
    .eq("id", id);

  if (error) throw error;
}