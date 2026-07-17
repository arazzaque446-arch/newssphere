import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) {
    notFound();
  }

  // Increase view count
  await supabase
    .from("articles")
    .update({
      views: (article.views ?? 0) + 1,
    })
    .eq("id", article.id);

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Hero */}

      <div className="relative h-[420px] w-full">

        <Image
          src={article.image_url}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-10 left-1/2 w-full max-w-6xl -translate-x-1/2 px-6">

          <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
            {article.category}
          </span>

          <h1 className="mt-5 text-5xl font-bold text-white">
            {article.title}
          </h1>

          <p className="mt-4 text-xl text-slate-200">
            {article.summary}
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl -mt-16 relative z-10">

        <div className="mb-8 flex flex-wrap gap-6 border-b pb-6 text-slate-600">

          <span>
            👤 {article.author}
          </span>

          <span>
            📍 {article.location}
          </span>

          <span>
            👁 {article.views + 1} Views
          </span>

          <span>
            📅 {new Date(article.created_at).toLocaleDateString()}
          </span>

        </div>

        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />

      </div>

    </main>
  );
}