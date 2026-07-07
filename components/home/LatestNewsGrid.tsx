import Link from "next/link";
import type { Article } from "@/types/news";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface LatestNewsGridProps {
  articles: Article[];
}

export function LatestNewsGrid({ articles }: LatestNewsGridProps) {
  return (
    <section>
      <SectionHeading
        title="Latest News"
        subtitle="Stay informed with our most recent coverage"
        action={
          <Link
            href="/latest"
            className="hidden text-sm font-semibold text-accent transition-colors hover:text-accent-hover sm:block"
          >
            View all →
          </Link>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            priority={i < 2}
          />
        ))}
      </div>
    </section>
  );
}
