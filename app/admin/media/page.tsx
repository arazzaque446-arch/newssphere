import { Image as ImageIcon, Upload } from "lucide-react";

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
          <p className="mt-2 text-slate-500">
            Manage your uploaded images and assets.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Upload size={20} />
          Upload Media
        </button>
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <ImageIcon className="mx-auto mb-4 h-16 w-16 text-slate-300" />
        <h2 className="mb-2 text-xl font-bold text-slate-900">Media Library is Empty</h2>
        <p className="text-slate-500">Upload images directly from the article editor.</p>
      </div>
    </div>
  );
}