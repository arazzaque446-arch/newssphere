import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          Website Settings
        </h1>

        <div className="space-y-8">

          <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              General Settings
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block font-semibold">
                  Website Name
                </label>

                <input
                  defaultValue="NewsSphere"
                  className="w-full rounded-xl border p-4"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Tagline
                </label>

                <input
                  defaultValue="Your Trusted News Platform"
                  className="w-full rounded-xl border p-4"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Editor
                </label>

                <input
                  defaultValue="Abdur Razzaque"
                  className="w-full rounded-xl border p-4"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Address
                </label>

                <input
                  defaultValue="Guwahati, Assam, India"
                  className="w-full rounded-xl border p-4"
                />
              </div>

              <button
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
              >
                Save Settings
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}