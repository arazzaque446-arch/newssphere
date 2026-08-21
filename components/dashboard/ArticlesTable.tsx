"use client";

import { useMemo, useState } from "react";

import ArticleFilters from "./ArticleFilters";
import ArticleRow from "./ArticleRow";

import { Article } from "@/types/article";

interface Props {
  articles: Article[];
}

export default function ArticlesTable({
  articles,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    /* Search */
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(keyword) ||
          (article.author || "")
            .toLowerCase()
            .includes(keyword) ||
          (article.category || "")
            .toLowerCase()
            .includes(keyword)
      );
    }

    /* Category */
    if (category) {
      result = result.filter(
        (article) => article.category === category
      );
    }

    /* Status */
    if (status === "published") {
      result = result.filter(
        (article) => article.published
      );
    }

    if (status === "draft") {
      result = result.filter(
        (article) => !article.published
      );
    }

    if (status === "featured") {
      result = result.filter(
        (article) => article.featured
      );
    }

    if (status === "breaking") {
      result = result.filter(
        (article) => article.breaking
      );
    }

    /* Sorting */
    switch (sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        break;

      case "views":
        result.sort(
          (a, b) =>
            (b.views || 0) -
            (a.views || 0)
        );
        break;

      case "title":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    }

    return result;
  }, [
    articles,
    search,
    category,
    status,
    sort,
  ]);

  return (
    <>
      <ArticleFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Article
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Views
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-20 text-center text-slate-500"
                  >
                    No articles found.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <ArticleRow
                    key={article.id}
                    article={article}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}