import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { updateArticle } from "../../actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: Props) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10">

      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-2xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold text-slate-900">
              ✏ Edit Article
            </h1>

            <p className="mt-2 text-slate-500">
              Update your article professionally.
            </p>

          </div>

          <Link
            href="/admin/articles"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            ← Back
          </Link>

        </div>

        <form
          action={updateArticle.bind(null, id)}
          encType="multipart/form-data"
          className="space-y-8"
        >

          {/* Current Image */}

          <div>

            <label className="mb-3 block text-lg font-semibold text-slate-700">
              Current Featured Image
            </label>

            <Image
              src={article.image_url}
              alt={article.title}
              width={900}
              height={500}
              className="rounded-2xl object-cover shadow-lg"
            />

          </div>

          {/* Upload New Image */}

          <div>

            <label className="mb-3 block text-lg font-semibold text-slate-700">
              Replace Image (optional)
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full rounded-xl border border-slate-300 bg-white p-4"
            />

            <p className="mt-2 text-sm text-slate-500">
              Leave empty if you want to keep the current image.
            </p>

          </div>

          {/* Title */}

          <div>

            <label className="mb-2 block font-semibold">
              Title
            </label>

            <input
              name="title"
              required
              defaultValue={article.title}
              className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* Summary */}

          <div>

            <label className="mb-2 block font-semibold">
              Summary
            </label>

            <textarea
              name="summary"
              rows={4}
              required
              defaultValue={article.summary}
              className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* Content */}

          <div>

            <label className="mb-2 block font-semibold">
              Full Article
            </label>

            <textarea
              name="content"
              rows={14}
              required
              defaultValue={article.content}
              className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* Two Columns */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">
                Author
              </label>

              <input
                name="author"
                defaultValue={article.author}
                className="w-full rounded-xl border border-slate-300 p-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Location
              </label>

              <input
                name="location"
                defaultValue={article.location}
                className="w-full rounded-xl border border-slate-300 p-4"
              />

            </div>

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 block font-semibold">
              Category
            </label>

            <select
              name="category"
              defaultValue={article.category}
              className="w-full rounded-xl border border-slate-300 p-4"
            >
              <option>Technology</option>
              <option>Politics</option>
              <option>Business</option>
              <option>Sports</option>
              <option>Health</option>
              <option>Entertainment</option>
              <option>India</option>
              <option>World</option>
              <option>Local</option>
            </select>

          </div>

          {/* Save Button */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-5 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02]"
          ><div className="grid gap-6 md:grid-cols-2">

  <label className="flex items-center gap-3 rounded-xl border p-5">

    <input
      type="checkbox"
      name="featured"
      defaultChecked={article.featured}
      className="h-5 w-5"
    />

    <div>

      <p className="font-semibold">
        Featured Article
      </p>

      <p className="text-sm text-gray-500">
        Display on homepage
      </p>

    </div>

  </label>

  <label className="flex items-center gap-3 rounded-xl border p-5">

    <input
      type="checkbox"
      name="published"
      defaultChecked={article.published}
      className="h-5 w-5"
    />

    <div>

      <p className="font-semibold">
        Published
      </p>

      <p className="text-sm text-gray-500">
        Visible to everyone
      </p>

    </div>

  </label>

</div>
            💾 Save Changes
          </button>

        </form>

      </div>

    </main>
  );
}