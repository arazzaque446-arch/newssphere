"use client";

import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  Star,
  Flame,
} from "lucide-react";

import { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function ArticleRow({
  article,
}: Props) {
  return (
    <tr className="border-b border-slate-100 last:border-none">
      {/* Image */}
      <td className="p-4">
        {article.image_url &&
        article.image_url.trim() !== "" ? (
          <img
            src={article.image_url}
            alt={article.title}
            width={120}
            height={80}
            className="h-20 w-[120px] rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-20 w-[120px] items-center justify-center rounded-lg bg-slate-200 text-xs text-slate-500">
            No image
          </div>
        )}
      </td>

      {/* Article */}
      <td className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">
            {article.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {article.featured && (
              <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                <Star size={13} />
                Featured
              </span>
            )}

            {article.breaking && (
              <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                <Flame size={13} />
                Breaking
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="p-4">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {article.category || "General"}
        </span>
      </td>

      {/* Status */}
      <td className="p-4">
        {article.published ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
            Draft
          </span>
        )}
      </td>

      {/* Views */}
      <td className="p-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Eye size={16} />
          {article.views || 0}
        </div>
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex justify-center gap-2">
          <Link
            href={`/admin/edit/${article.id}`}
            className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
            title="Edit article"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
            title="Delete article"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}