import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Article fetch error:", error);
  }

  return data;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | NewsSphere",
    };
  }

  const description =
    article.seo_description ||
    article.summary ||
    article.description ||
    "";

  const canonical = `https://newssphere-beta.vercel.app/news/${article.slug}`;

  return {
    title: article.seo_title || article.title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: article.seo_title || article.title,

      description,

      url: canonical,

      siteName: "NewsSphere",

      type: "article",

      publishedTime:
        article.published_at ||
        article.created_at,

      images: article.image_url
        ? [
            {
              url: article.image_url,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title: article.seo_title || article.title,

      description,

      images: article.image_url
        ? [article.image_url]
        : [],
    },
  };
}

export default async function NewsPage({
  params,
}: Props) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const currentViews = article.views ?? 0;

  /*
   * Increment view count.
   *
   * This is intentionally done after
   * successfully finding a published article.
   */
  await supabase
    .from("articles")
    .update({
      views: currentViews + 1,
    })
    .eq("id", article.id);

  const description =
    article.summary ||
    article.description ||
    "";

  return (
    <main className="min-h-screen bg-slate-100">
      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",

            headline: article.title,

            description,

            image: article.image_url
              ? [article.image_url]
              : [],

            datePublished:
              article.published_at ||
              article.created_at,

            dateModified:
              article.updated_at ||
              article.created_at,

            author: {
              "@type": "Organization",
              name:
                article.author ||
                "NewsSphere",
            },

            publisher: {
              "@type": "Organization",
              name: "NewsSphere",
            },

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://newssphere-beta.vercel.app/news/${article.slug}`,
            },
          }),
        }}
      />

      {/* Hero */}
      <div className="relative min-h-[460px] w-full bg-slate-900 flex flex-col justify-end pt-24 pb-24">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <span className="inline-block rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {article.category || "General"}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            {article.title}
          </h1>

          {description && (
            <p className="mt-3 max-w-4xl text-base text-slate-200 leading-relaxed md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Article Content Card */}
      <div className="relative z-10 mx-auto -mt-12 max-w-5xl rounded-3xl bg-white p-6 shadow-xl md:p-10">
        
        {/* SPONSORED DISCLOSURE BANNER */}
        {article.is_sponsored && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-amber-800">
              Sponsored Content
            </h3>
            <p className="text-base">
              This article is presented in partnership with{" "}
              {article.sponsor_url ? (
                <a
                  href={article.sponsor_url}
                  target="_blank"
                  rel="noopener sponsored"
                  className="font-semibold text-amber-700 underline transition hover:text-amber-900"
                >
                  {article.sponsor_name || "our sponsor"}
                </a>
              ) : (
                <span className="font-semibold">
                  {article.sponsor_name || "our sponsor"}
                </span>
              )}
              .
            </p>
          </div>
        )}

        <div className="mb-8 flex flex-wrap gap-6 border-b border-slate-200 pb-6 text-sm text-slate-600">
          <span>
            👤 {article.author || "NewsSphere"}
          </span>

          <span>
            📍 {article.location || "World"}
          </span>

          <span>
            👁️ {currentViews + 1} Views
          </span>

          <span>
            📅{" "}
            {new Date(
              article.published_at || article.created_at
            ).toLocaleDateString()}
          </span>
        </div>

        <article
          className="prose prose-lg max-w-none text-slate-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              article.content ||
              "<p>No content available.</p>",
          }}
        />

        {Array.isArray(article.tags) &&
          article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
              {article.tags.map(
                (tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          )}
      </div>
    </main>
  );
}