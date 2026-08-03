import { Article } from "@/types/article";

interface Props {
  articles: Article[];
}

export default function AnalyticsCards({ articles }: Props) {
  const published = articles.filter(a => a.published).length;

  const drafts = articles.filter(a => !a.published).length;

  const featured = articles.filter(a => a.featured).length;

  const breaking = articles.filter(a => a.breaking).length;

  const views = articles.reduce(
    (sum, a) => sum + (a.views || 0),
    0
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="text-sm text-slate-500">
          Total Articles
        </h3>
        <p className="mt-2 text-4xl font-bold">
          {articles.length}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="text-sm text-slate-500">
          Published
        </h3>
        <p className="mt-2 text-4xl font-bold text-green-600">
          {published}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="text-sm text-slate-500">
          Drafts
        </h3>
        <p className="mt-2 text-4xl font-bold text-orange-500">
          {drafts}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="text-sm text-slate-500">
          Featured
        </h3>
        <p className="mt-2 text-4xl font-bold text-blue-600">
          {featured}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="text-sm text-slate-500">
          Total Views
        </h3>
        <p className="mt-2 text-4xl font-bold text-purple-600">
          {views}
        </p>
      </div>

    </div>
  );
}