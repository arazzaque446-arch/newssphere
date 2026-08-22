import { Globe, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-500">Manage your platform preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 p-4 font-semibold text-blue-700">
            <Globe size={20} /> Site Details
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl p-4 font-medium text-slate-600 hover:bg-slate-50">
            <Shield size={20} /> Security
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl p-4 font-medium text-slate-600 hover:bg-slate-50">
            <Bell size={20} /> Notifications
          </button>
        </div>

        <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Site Details</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-slate-700">Site Name</label>
              <input 
                type="text" 
                defaultValue="NewsSphere" 
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-slate-700">Site Description</label>
              <textarea 
                rows={3}
                defaultValue="Professional CMS for the latest news." 
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500" 
              />
            </div>
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}