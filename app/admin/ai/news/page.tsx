"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AIArticle {
  title: string;
  summary: string;
  content: string;
  category: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  tags: string[];
  readTime: number;
}

const CATEGORIES = [
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Health",
  "Entertainment",
  "India",
  "World",
  "Local",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function calculateReadTime(content: string) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export default function AINewsPage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [article, setArticle] =
    useState<AIArticle | null>(null);

  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateArticle(
    field: keyof AIArticle,
    value: string | string[] | number
  ) {
    if (!article) return;

    setArticle({
      ...article,
      [field]: value,
    });
  }

  async function generate() {
    if (!prompt.trim()) {
      setError(
        "Paste your source material, notes, report, or news information first."
      );
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/ai/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "AI generation failed."
        );
      }

      const generated = data.article;

      const content =
        typeof generated.content === "string"
          ? generated.content
          : "";

      const normalized: AIArticle = {
        title: String(
          generated.title || ""
        ).trim(),

        summary: String(
          generated.summary || ""
        ).trim(),

        content,

        category:
          CATEGORIES.includes(
            generated.category
          )
            ? generated.category
            : "India",

        location: String(
          generated.location || ""
        ).trim(),

        seoTitle: String(
          generated.seoTitle ||
            generated.title ||
            ""
        ).trim(),

        seoDescription: String(
          generated.seoDescription ||
            generated.summary ||
            ""
        )
          .trim()
          .slice(0, 155),

        slug:
          slugify(
            String(
              generated.slug ||
                generated.title ||
                ""
            )
          ),

        tags: Array.isArray(
          generated.tags
        )
          ? generated.tags
              .filter(
                (tag: unknown) =>
                  typeof tag === "string"
              )
              .map((tag: string) =>
                tag.trim()
              )
              .filter(Boolean)
          : [],

        readTime:
          Number(generated.readTime) > 0
            ? Number(generated.readTime)
            : calculateReadTime(content),
      };

      setArticle(normalized);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate article."
      );
    } finally {
      setLoading(false);
    }
  }

  async function rewriteArticle() {
    if (!article) return;

    if (!article.content.trim()) {
      setError(
        "Article content is required before rewriting."
      );
      return;
    }

    setRewriting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: article.title,
            content: article.content,
            category: article.category,
            location: article.location,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Rewrite failed."
        );
      }

      const rewritten =
        data.article || {};

      const content =
        String(
          rewritten.content ||
            article.content
        ).trim();

      setArticle({
        ...article,

        title:
          String(
            rewritten.title ||
              article.title
          ).trim(),

        summary:
          String(
            rewritten.summary ||
              article.summary
          ).trim(),

        content,

        category:
          CATEGORIES.includes(
            rewritten.category
          )
            ? rewritten.category
            : article.category,

        location:
          String(
            rewritten.location ??
              article.location
          ).trim(),

        seoTitle:
          String(
            rewritten.seoTitle ||
              article.seoTitle ||
              rewritten.title ||
              article.title
          ).trim(),

        seoDescription:
          String(
            rewritten.seoDescription ||
              article.seoDescription
          )
            .trim()
            .slice(0, 155),

        slug:
          slugify(
            String(
              rewritten.slug ||
                rewritten.title ||
                article.slug ||
                article.title
            )
          ),

        tags:
          Array.isArray(
            rewritten.tags
          )
            ? rewritten.tags
                .filter(
                  (tag: unknown) =>
                    typeof tag === "string"
                )
                .map((tag: string) =>
                  tag.trim()
                )
                .filter(Boolean)
            : article.tags,

        readTime:
          calculateReadTime(content),
      });

      setSuccess(
        "Article rewritten successfully. Review the changes before saving."
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to rewrite article."
      );
    } finally {
      setRewriting(false);
    }
  }

  async function saveArticle(
    published: boolean
  ) {
    if (!article) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "/api/ai/news/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...article,
            published,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to save article."
        );
      }

      if (published) {
        setSuccess(
          "Article published successfully. Redirecting..."
        );

        const publishedSlug =
          data.article?.slug ||
          article.slug;

        setTimeout(() => {
          router.push(
            `/news/${publishedSlug}`
          );
          router.refresh();
        }, 500);
      } else {
        setSuccess(
          "Draft saved successfully."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save article."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            🤖 NewsSphere AI Studio
          </h1>

          <p className="mt-3 text-slate-600">
            Generate, edit, rewrite, save and
            manually publish your news articles.
          </p>
        </div>

        {/* Source Material */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            1. Source Material
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Paste the information you want
            NewsSphere AI to turn into an article.
            Use verified material only.
          </p>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder={`Paste your news material here...

Example:
Today, the Assam government announced...
According to the official statement...
`}
            className="mt-5 min-h-[240px] w-full rounded-xl border border-slate-300 p-5 text-base leading-7 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className="mt-5 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "✨ Generate Article"}
          </button>
        </section>

        {/* Messages */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* Editor */}
        {article && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">

            <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  2. Article Editor
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Everything below is manually editable.
                </p>
              </div>

              <button
                type="button"
                onClick={rewriteArticle}
                disabled={
                  rewriting || saving
                }
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {rewriting
                  ? "Rewriting..."
                  : "✨ Rewrite with AI"}
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-slate-800">
                Headline
              </label>

              <input
                value={article.title}
                onChange={(e) =>
                  updateArticle(
                    "title",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-4 text-lg font-semibold outline-none focus:border-blue-500"
              />
            </div>

            {/* Summary */}
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-slate-800">
                Summary
              </label>

              <textarea
                value={article.summary}
                onChange={(e) =>
                  updateArticle(
                    "summary",
                    e.target.value
                  )
                }
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-4 leading-7 outline-none focus:border-blue-500"
              />
            </div>

            {/* Category / Location / Read Time */}
            <div className="mb-6 grid gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold text-slate-800">
                  Category
                </label>

                <select
                  value={article.category}
                  onChange={(e) =>
                    updateArticle(
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-800">
                  Location
                </label>

                <input
                  value={article.location}
                  onChange={(e) =>
                    updateArticle(
                      "location",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-800">
                  Read Time
                </label>

                <input
                  value={`${article.readTime} min`}
                  readOnly
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-8">
              <label className="mb-2 block font-semibold text-slate-800">
                Article Content
              </label>

              <textarea
                value={article.content}
                onChange={(e) => {
                  const content =
                    e.target.value;

                  setArticle({
                    ...article,
                    content,
                    readTime:
                      calculateReadTime(
                        content
                      ),
                  });
                }}
                rows={28}
                className="w-full rounded-xl border border-slate-300 p-5 leading-8 outline-none focus:border-blue-500"
              />
            </div>

            {/* SEO */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="mb-6 text-xl font-bold text-blue-950">
                🔍 SEO
              </h2>

              <div className="space-y-6">

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    SEO Title
                  </label>

                  <input
                    value={article.seoTitle}
                    onChange={(e) =>
                      updateArticle(
                        "seoTitle",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    SEO Description
                  </label>

                  <textarea
                    value={
                      article.seoDescription
                    }
                    onChange={(e) =>
                      updateArticle(
                        "seoDescription",
                        e.target.value
                      )
                    }
                    maxLength={155}
                    rows={4}
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none focus:border-blue-500"
                  />

                  <p className="mt-1 text-right text-xs text-slate-500">
                    {
                      article.seoDescription
                        .length
                    }
                    /155
                  </p>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    URL Slug
                  </label>

                  <input
                    value={article.slug}
                    onChange={(e) =>
                      updateArticle(
                        "slug",
                        slugify(
                          e.target.value
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 font-mono outline-none focus:border-blue-500"
                  />

                  <p className="mt-1 text-xs text-slate-500">
                    Must be unique.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Tags
                  </label>

                  <input
                    value={article.tags.join(
                      ", "
                    )}
                    onChange={(e) =>
                      updateArticle(
                        "tags",
                        e.target.value
                          .split(",")
                          .map((tag) =>
                            tag.trim()
                          )
                          .filter(Boolean)
                      )
                    }
                    placeholder="India, Assam, Government, Politics"
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-8 md:flex-row">

              <button
                type="button"
                disabled={saving || rewriting}
                onClick={() =>
                  saveArticle(false)
                }
                className="flex-1 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "💾 Save Draft"}
              </button>

              <button
                type="button"
                disabled={saving || rewriting}
                onClick={() =>
                  saveArticle(true)
                }
                className="flex-1 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Publishing..."
                  : "🚀 Publish Article"}
              </button>

            </div>
          </section>
        )}
      </div>
    </main>
  );
}