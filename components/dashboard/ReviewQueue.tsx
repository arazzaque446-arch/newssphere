"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface Candidate {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  source: string | null;
  link: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_slug: string | null;
  author: string | null;
  breaking: boolean | null;
  featured: boolean | null;
}

interface Props {
  candidates: Candidate[];
}

export default function ReviewQueue({
  candidates,
}: Props) {
  const [items, setItems] =
    useState<Candidate[]>(candidates);

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  async function handleAction(
    id: string,
    action: "approve" | "reject"
  ) {
    setLoadingId(id);

    try {
      const response = await fetch(
        "/api/admin/review",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            action,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Action failed"
        );
      }

      setItems((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Action failed"
      );
    } finally {
      setLoadingId(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
        <CheckCircle
          className="mx-auto mb-4 text-green-600"
          size={48}
        />

        <h2 className="text-xl font-bold text-slate-900">
          Review queue is empty
        </h2>

        <p className="mt-2 text-slate-500">
          New AI-generated articles will appear here
          after processing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {items.map((article) => (
        <article
          key={article.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="p-8">

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {article.category ||
                  "General"}
              </span>

              {article.breaking && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  Breaking
                </span>
              )}

              {article.featured && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                  Featured
                </span>
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              {article.title}
            </h2>

            {article.author && (
              <p className="mt-3 text-sm text-slate-500">
                By {article.author}
              </p>
            )}

            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="mt-6 max-h-[400px] w-full rounded-xl object-cover"
              />
            )}

            {article.description && (
              <div className="mt-6 rounded-xl bg-slate-50 p-5">
                <h3 className="mb-2 font-bold">
                  Summary
                </h3>

                <p className="text-slate-700">
                  {article.description}
                </p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="mb-3 font-bold">
                Article Content
              </h3>

              <div
                className="prose max-w-none text-slate-700"
                dangerouslySetInnerHTML={{
                  __html:
                    article.content ||
                    article.description ||
                    "",
                }}
              />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">
                  SEO Title
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {article.seo_title ||
                    "Missing"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">
                  SEO Description
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {article.seo_description ||
                    "Missing"}
                </p>
              </div>
            </div>

            {article.seo_slug && (
              <div className="mt-4 rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">
                  URL Slug
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  /news/{article.seo_slug}
                </p>
              </div>
            )}

            {article.source && (
              <div className="mt-6">
                <p className="text-sm text-slate-500">
                  Source: {article.source}
                </p>
              </div>
            )}

            {article.link && (
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View original source
                <ExternalLink size={15} />
              </a>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <button
                type="button"
                disabled={
                  loadingId === article.id
                }
                onClick={() =>
                  handleAction(
                    article.id,
                    "approve"
                  )
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle size={20} />

                {loadingId === article.id
                  ? "Publishing..."
                  : "Approve & Publish"}
              </button>

              <button
                type="button"
                disabled={
                  loadingId === article.id
                }
                onClick={() =>
                  handleAction(
                    article.id,
                    "reject"
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={20} />

                Reject
              </button>
            </div>

          </div>
        </article>
      ))}
    </div>
  );
}