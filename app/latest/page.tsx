import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

function normalizeImageUrl(value: unknown): string {
  if (typeof value !== "string") {
    return "/placeholder-news.jpg";
  }

  let url = value.trim();

  if (!url) {
    return "/placeholder-news.jpg";
  }

  // Remove Markdown link format:
  // [https://example.com/image.jpg](https://example.com/image.jpg)
  const markdownMatch = url.match(/\]\((https?:\/\/[^)]+)\)/);

  if (markdownMatch?.[1]) {
    url = markdownMatch[1];
  }

  // Remove accidental surrounding brackets
  url = url
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .trim();

  // Only allow HTTP/HTTPS image URLs
  if (!/^https?:\/\//i.test(url)) {
    return "/placeholder-news.jpg";
  }

  return url;
}

export default async function LatestNewsPage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Latest news error:", error);
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-10 text-5xl font-bold">
          Latest News
        </h1>

        {!articles || articles.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No published articles found.
            </h2>

            <p className="mt-3 text-slate-600">
              Published NewsSphere articles will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {articles.map((article) => {
              const imageUrl = normalizeImageUrl(
                article.image_url
              );

              return (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="grid md:grid-cols-3">
                    <div className="relative h-64 bg-slate-200 md:h-full">
                      <Image
                        src={imageUrl}
                        alt={article.title || "NewsSphere news"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-4 p-8 md:col-span-2">
                      <span className="inline-block rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                        {article.category || "News"}
                      </span>

                      <h2 className="text-3xl font-bold leading-tight">
                        {article.title}
                      </h2>

                      <p className="text-lg leading-8 text-gray-600">
                        {article.summary ||
                          article.description ||
                          "Read the full story on NewsSphere."}
                      </p>

                      <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                        {article.author && (
                          <span>
                            {article.author}
                          </span>
                        )}

                        {article.location && (
                          <span>
                            {article.location}
                          </span>
                        )}

                        {article.created_at && (
                          <span>
                            {new Date(
                              article.created_at
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}