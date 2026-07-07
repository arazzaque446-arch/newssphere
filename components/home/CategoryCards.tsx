import Image from "next/image";
import Link from "next/link";
import type { CategoryCard } from "@/types/news";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface CategoryCardsProps {
  categories: CategoryCard[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        title="Explore Categories"
        subtitle="Browse stories by topic"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.category}
            href={`/category/${cat.category.toLowerCase()}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={cat.imageUrl}
                alt={`${cat.category} news category`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-opacity group-hover:from-black/90" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-bold text-white">
                  {cat.category}
                </h3>
                <p className="mt-1 text-sm text-white/70">{cat.description}</p>
                <span className="mt-2 inline-block text-xs font-medium text-white/60">
                  {cat.articleCount} articles
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
