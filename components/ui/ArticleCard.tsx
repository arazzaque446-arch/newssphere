import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal";
  priority?: boolean;
}

export function ArticleCard({
  article,
  variant = "default",
  priority = false,
}: ArticleCardProps) {
  const href = `/article/${article.id}`;

  if (variant === "horizontal") {
    return (
      <Link
        href={href}
        className="group flex gap-4 rounded-xl border border-border bg-surface p-3 transition-all hover:border-accent/30 hover:shadow-md"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {article.category}
          </span>
          <h3 className="line-clamp-2 font-serif text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
            {article.title}
          </h3>
          <span className="mt-1 text-xs text-muted">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex items-start gap-3 py-3">
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
          •
        </span>
        <div>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <span className="mt-1 block text-xs text-muted">
            {article.readTime} min read
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/30 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
          <span>{article.author}</span>
          <span>
            {formatDate(article.publishedAt)} · {article.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

export { formatDate };
