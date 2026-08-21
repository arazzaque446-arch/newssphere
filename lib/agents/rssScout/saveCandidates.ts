import { supabaseAdmin } from "@/lib/supabase/admin";

export async function saveCandidates(items: any[]) {
  let imported = 0;
  let duplicates = 0;
  let failed = 0;

  for (const item of items) {
    try {
      const guid = item.guid ?? "";
      const link = item.link ?? "";

      const { data: existing } = await supabaseAdmin
        .from("news_candidates")
        .select("id")
        .or(`guid.eq.${guid},link.eq.${link}`)
        .maybeSingle();

      if (existing) {
        duplicates++;
        continue;
      }

      const { error } = await supabaseAdmin
        .from("news_candidates")
        .insert({
          title: item.title,
          description: item.description,
          content: item.content || item.description,
          image_url: item.image_url,
          category: item.category,
          source: item.source,
          link: item.link,
          guid: item.guid,
          author: item.author,
          published_at: item.published_at,

          status: "pending",
          ai_processed: false,
          researched: false,
          fact_checked: false,
          approved: false,
          rejected: false,
          priority: 0,
        });

      if (error) {
        console.error(error);
        failed++;
      } else {
        imported++;
      }
    } catch (err) {
      console.error(err);
      failed++;
    }
  }

  return {
    imported,
    duplicates,
    failed,
  };
}