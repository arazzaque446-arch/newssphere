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
  categoryCards,
  getFeaturedArticle,
  getHeroArticles,
  getLatestArticles,
  getTrendingArticles,
} from "@/data/news";

export default function Home() {
  const heroArticles = getHeroArticles();
  const featuredArticle = getFeaturedArticle();
  const latestArticles = getLatestArticles(6);
  const trendingArticles = getTrendingArticles(5);

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
