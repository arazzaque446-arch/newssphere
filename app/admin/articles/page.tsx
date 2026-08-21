import Link from "next/link";

import {
  Newspaper,
  Eye,
  FileText,
  Plus,
  BadgeDollarSign,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import DashboardStat from "@/components/dashboard/DashboardStat";
import ArticlesTable from "@/components/dashboard/ArticlesTable";

import { Article } from "@/types/article";

export default async function ArticlesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const articles = (data ?? []) as Article[];

  const totalArticles = articles.length;

  const publishedArticles = articles.filter(
    (article) => article.published
  ).length;

  const draftArticles =
    totalArticles - publishedArticles;

  const sponsoredArticles = articles.filter(
    (article) => article.is_sponsored === true
  ).length;

  const totalViews = articles.reduce(
    (sum, article) =>
      sum + (article.views || 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              Articles
            </h1>

            <p className="mt-3 text-slate-500">
              Manage all published, draft, and sponsored articles.
            </p>
          </div>

          <Link
            href="/admin/new"
            className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            <Plus size={20} />
            New Article
          </Link>

        </div>

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          <DashboardStat
            title="Articles"
            value={totalArticles}
            icon={Newspaper}
          />

          <DashboardStat
            title="Published"
            value={publishedArticles}
            icon={FileText}
            color="text-green-600"
          />

          <DashboardStat
            title="Drafts"
            value={draftArticles}
            icon={FileText}
            color="text-orange-600"
          />

          <DashboardStat
            title="Sponsored"
            value={sponsoredArticles}
            icon={BadgeDollarSign}
            color="text-amber-600"
          />

          <DashboardStat
            title="Views"
            value={totalViews}
            icon={Eye}
            color="text-purple-600"
          />

        </div>

        {/* =====================================================
            ARTICLES TABLE
        ====================================================== */}

        <ArticlesTable articles={articles} />

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-5 md:flex-row">

          <div className="text-sm text-slate-500">

            Showing{" "}

            <span className="mx-2 font-semibold text-slate-900">
              {articles.length}
            </span>

            article
            {articles.length !== 1 ? "s" : ""}

          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/admin/new"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              + New Article
            </Link>

          </div>

        </div>

        {/* =====================================================
            INFORMATION CARDS
        ====================================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-4">

          {/* Published */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold">
              Published
            </h2>

            <p className="text-4xl font-bold text-green-600">
              {publishedArticles}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Articles currently visible on NewsSphere.
            </p>

          </div>

          {/* Drafts */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold">
              Drafts
            </h2>

            <p className="text-4xl font-bold text-orange-600">
              {draftArticles}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Draft articles waiting for publication.
            </p>

          </div>

          {/* Sponsored */}

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Sponsored
            </h2>

            <p className="text-4xl font-bold text-amber-600">
              {sponsoredArticles}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Articles associated with commercial sponsors.
            </p>

          </div>

          {/* Views */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold">
              Total Views
            </h2>

            <p className="text-4xl font-bold text-purple-600">
              {totalViews}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Combined views across all articles.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}