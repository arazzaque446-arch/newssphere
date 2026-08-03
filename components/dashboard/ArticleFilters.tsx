"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function ArticleFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-4">

        {/* Search */}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search articles..."
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="">All Categories</option>

          <option value="Politics">Politics</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="International">International</option>
          <option value="Local">Local</option>

        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="">All Status</option>

          <option value="published">Published</option>

          <option value="draft">Draft</option>

          <option value="featured">Featured</option>

          <option value="breaking">Breaking</option>

        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="newest">Newest First</option>

          <option value="oldest">Oldest First</option>

          <option value="views">Most Viewed</option>

          <option value="title">Title A-Z</option>

        </select>

      </div>

    </div>
  );
}