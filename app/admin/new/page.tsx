import { createArticle } from "../actions";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ArticleForm from "@/components/editor/ArticleForm";

export default function NewArticlePage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Create New Article
          </h1>

          <p className="mt-2 text-slate-500">
            Publish news professionally with NewsSphere CMS.
          </p>
        </div>

        {/* Article Form */}
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <ArticleForm action={createArticle} />
        </div>

      </div>
    </DashboardLayout>
  );
}