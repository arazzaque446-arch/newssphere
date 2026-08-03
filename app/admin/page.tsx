import {
  Newspaper,
  FileText,
  Eye,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import DashboardStat from "@/components/dashboard/DashboardStat";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import QuickActions from "@/components/dashboard/QuickActions";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: articles = [] } = await supabase
    .from("articles")
    .select("*");

  const totalArticles = articles.length;

  const publishedArticles = articles.filter(
    (a) => a.published
  ).length;

  const draftArticles = articles.filter(
    (a) => !a.published
  ).length;

  const totalViews = articles.reduce(
    (sum, article) => sum + (article.views || 0),
    0
  );

  const recentArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Page Title */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to NewsSphere CMS
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardStat
          title="Articles"
          value={totalArticles}
          icon={Newspaper}
        />

        <DashboardStat
          title="Published"
          value={publishedArticles}
          icon={Sparkles}
          color="text-green-600"
        />

        <DashboardStat
          title="Drafts"
          value={draftArticles}
          icon={FileText}
          color="text-orange-600"
        />

        <DashboardStat
          title="Views"
          value={totalViews}
          icon={Eye}
          color="text-purple-600"
        />

      </div>
      {/* Analytics */}

<AnalyticsCards articles={articles} />

      {/* Main Grid */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Recent Articles */}

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Recent Articles
            </h2>

          </div>

          {recentArticles.length === 0 ? (

            <div className="p-10 text-center text-slate-500">

              No articles available.

            </div>

          ) : (

            recentArticles.map((article) => (

              <div
                key={article.id}
                className="flex items-center justify-between border-b p-6 last:border-none"
              >

                <div>

                  <h3 className="font-semibold">

                    {article.title}

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    {article.category}

                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    article.published
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {article.published ? "Published" : "Draft"}
                </span>

              </div>

            ))

          )}

        </div>

        {/* Right Side */}

        <QuickActions />

      </div>

    </div>
  );
}