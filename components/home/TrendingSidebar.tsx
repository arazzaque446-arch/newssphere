import Link from "next/link";
import type { Article } from "@/types/news";

interface TrendingSidebarProps {
  articles: Article[];
}

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  return (
    <aside className="rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24 lg:self-start">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
        <h2 className="font-serif text-xl font-bold text-foreground">
          Trending Now
        </h2>
      </div>
      <ol className="divide-y divide-border">
        {articles.map((article, i) => (
          <li key={article.id}>
            <Link
              href={`/article/${article.id}`}
              className="group flex gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="font-serif text-2xl font-bold leading-none text-accent/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                  {article.title}
                </h3>
                <span className="mt-1 block text-xs text-muted">
                  {article.category} · {article.readTime} min read
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href="/trending"
        className="mt-4 block text-center text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        See all trending →
      </Link>
    </aside>
  );
}
