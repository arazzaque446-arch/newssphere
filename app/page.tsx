import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestNewsGrid } from "@/components/home/LatestNewsGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";

import {
  getHeroArticles,
  getFeaturedArticle,
  getLatestArticles,
  getTrendingArticles,
} from "@/lib/articles";

import { categoryCards } from "@/data/news";

export default async function Home() {
  const heroArticles = await getHeroArticles();
  const featuredArticle = await getFeaturedArticle();
  console.log("FEATURED ARTICLE:", featuredArticle);
  const latestArticles = await getLatestArticles(6);
  const trendingArticles = await getTrendingArticles(5);

  if (!featuredArticle) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-20">
          <h1 className="text-3xl font-bold">
            No published articles found.
          </h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BreakingNewsTicker />

      <main className="flex-1 space-y-12 pb-8 md:space-y-16">
        <HeroSection articles={heroArticles} />

        <FeaturedArticle article={featuredArticle} />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
          <LatestNewsGrid articles={latestArticles} />
          <TrendingSidebar articles={trendingArticles} />
        </div>

        <CategoryCards categories={categoryCards} />

        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}