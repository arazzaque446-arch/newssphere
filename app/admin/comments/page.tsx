import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function CommentsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Comments
          </h1>

          <p className="mt-2 text-slate-500">
            Moderate comments from readers.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow">

          <table className="min-w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">
                  User
                </th>

                <th className="text-left">
                  Comment
                </th>

                <th className="text-left">
                  Article
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan={5}
                  className="py-16 text-center text-slate-500"
                >
                  No comments yet.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}