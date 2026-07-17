import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function MediaPage() {
  const { data: files } = await supabase.storage
    .from("news-images")
    .list("", {
      limit: 500,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Media Library
            </h1>

            <p className="text-slate-500">
              All uploaded images
            </p>

          </div>

          <Link
            href="/admin/new"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Upload New Article
          </Link>

        </div>

        {files?.length === 0 && (

          <div className="rounded-3xl bg-white p-20 text-center shadow-xl">

            <h2 className="text-2xl font-bold">
              No Images Uploaded
            </h2>

            <p className="mt-3 text-slate-500">
              Upload your first article.
            </p>

          </div>

        )}

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">

          {files?.map((file) => {

            const image =
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news-images/${file.name}`;

            return (

              <div
                key={file.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >

                <div className="relative aspect-square">

                  <Image
                    src={image}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-3">

                  <p className="truncate text-sm">
                    {file.name}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </main>
  );
}