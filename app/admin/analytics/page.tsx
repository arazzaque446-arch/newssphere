import { BarChart3, TrendingUp, FileText, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Fetch all articles to calculate stats
  const { data: articles } = await supabase
    .from("articles")
    .select("views, published");

  const safeArticles = articles || [];
  
  // Calculate real stats from your database
  const totalPageviews = safeArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalArticles = safeArticles.length;
  const publishedArticles = safeArticles.filter((a) => a.published).length;

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
        <p className="mt-2 text-slate-500">
          Track your website traffic and content performance based on internal database metrics.
        </p>
      </div>

      {/* Live Stat Cards */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Pageviews</p>
              <p className="text-2xl font-bold text-slate-900">{totalPageviews}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Articles</p>
              <p className="text-2xl font-bold text-slate-900">{totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Published Articles</p>
              <p className="text-2xl font-bold text-slate-900">{publishedArticles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Message */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-10 text-center">
        <BarChart3 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
        <h2 className="mb-2 text-xl font-bold text-slate-900">Advanced Analytics Pending</h2>
        <p className="mx-auto max-w-xl text-slate-600">
          Basic view counts are currently being pulled from your Supabase database. To view advanced metrics like Unique Visitors, Bounce Rate, and Time on Page, connect a tool like Vercel Web Analytics.
        </p>
      </div>
    </div>
  );
}