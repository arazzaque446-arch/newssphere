import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MediaGrid from "@/components/dashboard/MediaGrid";
import { createClient } from "@/lib/supabase/server";

export default async function MediaPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("news-images")
    .list("", {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) {
    throw new Error(error.message);
  }

  const files =
    data?.map((file) => ({
      name: file.name,
      url: supabase.storage
        .from("news-images")
        .getPublicUrl(file.name).data.publicUrl,
    })) ?? [];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Media Library
          </h1>

          <p className="mt-2 text-slate-500">
            Browse every uploaded image in NewsSphere.
          </p>

        </div>

        <MediaGrid files={files} />

      </div>
    </DashboardLayout>
  );
}