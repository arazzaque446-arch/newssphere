import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { updateArticle } from "../../actions";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ArticleForm from "@/components/editor/ArticleForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) {
    notFound();
  }

  // Bind the article ID to the server action
  const updateAction = updateArticle.bind(null, id);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Article</h1>
            <p className="mt-2 text-slate-500">
              Update the article content and sponsored settings.
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Back to Articles
          </Link>
        </div>

        {/* Reusable form pre-filled with existing data */}
        <ArticleForm action={updateAction} initialData={article} />
      </div>
    </DashboardLayout>
  );
}