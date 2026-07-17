import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/types/news";
import { formatDate } from "@/components/ui/ArticleCard";

interface HeroSectionProps {
  articles: Article[];
}

export function HeroSection({
  articles,
}: HeroSectionProps) {
  const [main, ...secondary] = articles;

  if (!main) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Main Hero */}

        <Link
          href={`/news/${main.slug}`}
          className="group relative col-span-2 overflow-hidden rounded-3xl shadow-2xl"
        >
          <div className="relative aspect-[16/10] lg:min-h-[600px]">

            <Image
              src={main.imageUrl}
              alt={main.imageAlt}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="(max-width:1024px)100vw,66vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute left-8 top-8 flex gap-3">

              {main.breaking && (
                <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white animate-pulse">
                  🔴 Breaking
                </span>
              )}

              {main.featured && (
                <span className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  ⭐ Featured
                </span>
              )}

            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">

              <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                {main.category}
              </span>

              <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
                {main.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90">
                {main.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/80">

                <span>👤 {main.author}</span>

                <span>📅 {formatDate(main.publishedAt)}</span>

                <span>⏱ {main.readTime} min read</span>

                {main.views !== undefined && (
                  <span>👁 {main.views.toLocaleString()} views</span>
                )}

              </div>

            </div>

          </div>
        </Link>

        {/* Right Side */}

        <div className="flex flex-col gap-6">

          {secondary.map((article) => (

            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              <div className="relative aspect-[16/9]">

                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              <div className="space-y-3 p-5">

                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  {article.category}
                </span>

                <h2 className="line-clamp-2 font-serif text-xl font-bold">
                  {article.title}
                </h2>

                <p className="line-clamp-2 text-sm text-slate-600">
                  {article.excerpt}
                </p>

                <div className="flex justify-between text-xs text-slate-500">

                  <span>{article.author}</span>

                  <span>{formatDate(article.publishedAt)}</span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}