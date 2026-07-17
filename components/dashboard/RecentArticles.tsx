interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  image_url: string;
  published: boolean;
}

export default function RecentArticles({
  articles,
}: {
  articles: Article[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold">
          Recent Articles
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Category</th>

            <th className="p-4 text-left">Author</th>

            <th className="p-4 text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {articles.map((article) => (

            <tr
              key={article.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-3">

                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-16 w-24 rounded-xl object-cover"
                />

              </td>

              <td className="p-4 font-semibold">
                {article.title}
              </td>

              <td className="p-4">
                {article.category}
              </td>

              <td className="p-4">
                {article.author}
              </td>

              <td className="p-4">

                {article.published ? (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
                    Draft
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}