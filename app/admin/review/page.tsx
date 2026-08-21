import { createClient } from "@/lib/supabase/server";
import ReviewQueue from "@/components/dashboard/ReviewQueue";

export default async function ReviewPage() {
  const supabase = await createClient();

  const {
    data: candidates,
    error,
  } = await supabase
    .from("news_candidates")
    .select("*")
    .eq("status", "ready_for_review")
    .eq("rejected", false)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Review Queue
          </h1>

          <p className="mt-3 text-slate-500">
            Review AI-generated news before publication.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900">
            Human approval required
          </h2>

          <p className="mt-2 text-sm text-orange-800">
            Articles in this queue will never be published automatically.
            Review the article and explicitly approve it before publication.
          </p>
        </div>

        <ReviewQueue candidates={candidates ?? []} />
      </div>
    </main>
  );
}