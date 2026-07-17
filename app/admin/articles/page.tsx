import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { deleteArticle } from "../actions";

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

          <div>

            <h1 className="text-5xl font-bold text-slate-900">
              📰 All Articles
            </h1>

            <p className="mt-2 text-slate-500">
              Manage every article published on NewsSphere.
            </p>

          </div>

          <Link
            href="/admin/new"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            ➕ New Article
          </Link>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-5 text-left">Image</th>

                <th className="text-left">Title</th>

                <th className="text-left">Category</th>

                <th className="text-left">Status</th>

                <th className="text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {articles?.length ? (

                articles.map((article) => (

                  <tr
                    key={article.id}
                    className="border-b transition hover:bg-slate-50"
                  >

                    {/* Image */}

                    <td className="p-4">

                      <Image
                        src={article.image_url}
                        alt={article.title}
                        width={130}
                        height={80}
                        className="rounded-xl object-cover shadow"
                      />

                    </td>

                    {/* Title */}

                    <td className="font-semibold text-slate-800">

                      {article.title}

                    </td>

                    {/* Category */}

                    <td>

                      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                        {article.category}

                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      {article.published ? (

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                          Published

                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                          Draft

                        </span>

                      )}

                    </td>

                    {/* Actions */}

                    <td>

                      <div className="flex justify-center gap-3">

                        <Link
                          href={`/admin/edit/${article.id}`}
                          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >
                          ✏ Edit
                        </Link>

                        <form action={deleteArticle.bind(null, article.id)}>

                          <button
                            type="submit"
                            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                          >
                            🗑 Delete
                          </button>

                        </form>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={5}
                    className="py-20 text-center text-xl text-slate-500"
                  >
                    No articles found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}