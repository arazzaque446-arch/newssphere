import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function LatestNewsPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="mb-10 text-5xl font-bold">
          Latest News
        </h1>

        <div className="grid gap-8">

          {articles?.map((article) => (

            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-2xl"
            >

              <div className="grid md:grid-cols-3">

                <div className="relative h-64">

                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="space-y-4 p-8 md:col-span-2">

                  <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">
                    {article.category}
                  </span>

                  <h2 className="text-3xl font-bold">
                    {article.title}
                  </h2>

                  <p className="text-gray-600">
                    {article.summary}
                  </p>

                  <div className="flex gap-5 text-sm text-gray-500">

                    <span>{article.author}</span>

                    <span>{article.location}</span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </main>
  );
}