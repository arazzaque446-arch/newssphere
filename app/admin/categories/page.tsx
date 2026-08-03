import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

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
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Categories
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all article categories.
            </p>

          </div>

          <Link
            href="/admin/articles"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Articles
          </Link>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="text-left">
                  Articles
                </th>

              </tr>

            </thead>

            <tbody>

              {categories.length === 0 ? (

                <tr>

                  <td
                    colSpan={2}
                    className="py-12 text-center text-slate-500"
                  >
                    No categories found.
                  </td>

                </tr>

              ) : (

                categories.map(([name, count]) => (

                  <tr
                    key={name}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {name}
                    </td>

                    <td>
                      {count}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}