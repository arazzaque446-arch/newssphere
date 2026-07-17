import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const category =
    slug.charAt(0).toUpperCase() +
    slug.slice(1);

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .ilike("category", category)
    .order("created_at", {
      ascending: false,
    });

  if (!articles || articles.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <h1 className="mb-2 text-5xl font-bold">
        {category}
      </h1>

      <p className="mb-10 text-slate-500">
        {articles.length} Articles
      </p>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {articles.map((article) => (

          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1 hover:shadow-2xl"
          >

            <div className="relative h-60">

              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
              />

            </div>

            <div className="space-y-3 p-6">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
                {article.category}
              </span>

              <h2 className="text-2xl font-bold">
                {article.title}
              </h2>

              <p className="line-clamp-3 text-slate-600">
                {article.summary}
              </p>

              <div className="flex justify-between text-sm text-slate-500">

                <span>{article.author}</span>

                <span>
                  {new Date(
                    article.created_at
                  ).toLocaleDateString()}
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}