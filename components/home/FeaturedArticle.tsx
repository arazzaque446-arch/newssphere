import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";
import { formatDate } from "@/components/ui/ArticleCard";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
       href={`/news/${article.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px]">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            Featured Story
          </span>
          <h2 className="font-serif text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent md:text-3xl lg:text-4xl">
            {article.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {article.author}
              </p>
              <p className="text-xs text-muted">
                {formatDate(article.publishedAt)} · {article.readTime} min read
              </p>
            </div>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Read full story
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </section>
  );
}
