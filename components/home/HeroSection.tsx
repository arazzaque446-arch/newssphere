import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";
import { formatDate } from "@/components/ui/ArticleCard";

interface HeroSectionProps {
  articles: Article[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  const [main, ...secondary] = articles;

  if (!main) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Link
          href={`/article/${main.id}`}
          className="group relative col-span-2 overflow-hidden rounded-2xl lg:row-span-2"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[480px]">
            <Image
              src={main.imageUrl}
              alt={main.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {main.category}
              </span>
              <h1 className="font-serif text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {main.title}
              </h1>
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                {main.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                <span>{main.author}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(main.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{main.readTime} min read</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4 lg:gap-6">
          {secondary.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group relative flex-1 overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[228px]">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-wide text-accent">
                    {article.category}
                  </span>
                  <h2 className="line-clamp-2 font-serif text-base font-bold leading-snug text-white md:text-lg">
                    {article.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
