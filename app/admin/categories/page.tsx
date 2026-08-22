import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("category");

  if (error) {
    throw new Error(error.message);
  }

  const categoryMap = new Map<string, number>();

  articles?.forEach((article) => {
    const category = article.category || "Uncategorized";
    categoryMap.set(
      category,
      (categoryMap.get(category) || 0) + 1
    );
  });

  const categories = Array.from(categoryMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="mx-auto max-w-6xl p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Categories
          </h1>
          <p className="mt-2 text-slate-500">
            Manage all article categories.
          </p>
        </div>
        <Link
          href="/admin/articles"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Articles
        </Link>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left font-semibold">Category Name</th>
              <th className="p-4 text-left font-semibold">Total Articles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map(([name, count]) => (
              <tr key={name} className="transition hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">{name}</td>
                <td className="p-4 text-slate-600">{count}</td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-slate-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}