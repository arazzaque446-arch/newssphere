import { supabase } from "@/lib/supabase";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentArticles from "@/components/dashboard/RecentArticles";

export default async function AdminPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  const total = articles?.length ?? 0;

  const published =
    articles?.filter((a) => a.published).length ?? 0;

  const featured =
    articles?.filter((a) => a.featured).length ?? 0;

  const categories = new Set(
    articles?.map((a) => a.category)
  ).size;

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Articles"
          value={total}
          icon="file"
          color="bg-blue-600"
        />

        <StatCard
          title="Published"
          value={published}
          icon="news"
          color="bg-green-600"
        />

        <StatCard
          title="Featured"
          value={featured}
          icon="star"
          color="bg-yellow-500"
        />

        <StatCard
          title="Categories"
          value={categories}
          icon="folder"
          color="bg-purple-600"
        />
      </div>

      <div className="mt-10">
        <RecentArticles articles={articles ?? []} />
      </div>
    </DashboardLayout>
  );
}