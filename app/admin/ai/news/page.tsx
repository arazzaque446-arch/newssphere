"use client";

import { useState } from "react";

interface AIArticle {
  title: string;
  summary: string;
  content: string;
  category: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export default function AINewsPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<AIArticle | null>(null);
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt.trim()) {
      alert("Please enter a topic or URL.");
      return;
    }

    setLoading(true);
    setError("");
    setArticle(null);

    try {
      const response = await fetch("/api/ai/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: prompt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setArticle(data.article);
      } else {
        setError(data.error || "Generation failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-5xl font-bold">
          🤖 NewsSphere AI News Writer
        </h1>

        <p className="mb-8 text-slate-600">
          Generate a complete news article from a topic or a news URL.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Example:

Assam Flood Latest Update

OR

https://example.com/news`}
          className="h-48 w-full rounded-2xl border border-slate-300 p-5 text-lg shadow-sm focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={generate}
          disabled={loading}
          className="mt-6 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "✨ Generate with AI"}
        </button>

        {error && (
          <div className="mt-8 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {article && (
          <div className="mt-10 space-y-8 rounded-3xl bg-white p-8 shadow-xl">

            <div>
              <h2 className="mb-2 text-2xl font-bold">
                📰 Title
              </h2>

              <p>{article.title}</p>
            </div>

            <div>
              <h2 className="mb-2 text-2xl font-bold">
                📄 Summary
              </h2>

              <p>{article.summary}</p>
            </div>

            <div>
              <h2 className="mb-2 text-2xl font-bold">
                📚 Content
              </h2>

              <div className="whitespace-pre-wrap leading-8">
                {article.content}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <h2 className="mb-2 text-xl font-bold">
                  📂 Category
                </h2>

                <p>{article.category}</p>
              </div>

              <div>
                <h2 className="mb-2 text-xl font-bold">
                  📍 Location
                </h2>

                <p>{article.location}</p>
              </div>

            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">
                🔍 SEO Title
              </h2>

              <p>{article.seoTitle}</p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">
                📝 SEO Description
              </h2>

              <p>{article.seoDescription}</p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold">
                🏷 Tags
              </h2>

              <div className="flex flex-wrap gap-3">
                {article.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">

              <button
  onClick={async () => {
    if (!article) return;

    try {
      const res = await fetch("/api/ai/news/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...article,
          published: false,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Draft saved successfully!");
      } else {
        alert(data.error || "❌ Failed to save.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Unable to save draft.");
    }
  }}
  className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
>
  💾 Save Draft
</button>

<button
  onClick={async () => {
    if (!article) return;

    try {
      const res = await fetch("/api/ai/news/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...article,
          published: true,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Article published successfully!");
      } else {
        alert(data.error || "❌ Failed to publish.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Unable to publish article.");
    }
  }}
  className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
>
  🚀 Publish
</button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}