import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const keyword = (q ?? "").trim();

  let articles: any[] = [];

  if (keyword) {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .or(
        `title.ilike.%${keyword}%,summary.ilike.%${keyword}%,category.ilike.%${keyword}%,author.ilike.%${keyword}%`
      );

    articles = data ?? [];
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        Search News
      </h1>

      <form
        action="/search"
        className="mb-10 flex gap-3"
      >
        <input
          name="q"
          defaultValue={keyword}
          placeholder="Search news..."
          className="flex-1 rounded-xl border p-4"
        />

        <button
          className="rounded-xl bg-blue-600 px-8 text-white"
        >
          Search
        </button>
      </form>

      <div className="grid gap-6">

        {articles.map((article) => (

          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="flex gap-5 rounded-2xl bg-white p-5 shadow hover:shadow-lg"
          >

            <div className="relative h-40 w-60 overflow-hidden rounded-xl">

              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
              />

            </div>

            <div>

              <div className="mb-2 text-sm text-blue-600">
                {article.category}
              </div>

              <h2 className="text-2xl font-bold">
                {article.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {article.summary}
              </p>

            </div>

          </Link>

        ))}

        {keyword && articles.length === 0 && (
          <p>No articles found.</p>
        )}

      </div>

    </main>
  );
}