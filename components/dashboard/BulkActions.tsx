"use client";

interface Props {
  selected: number;
}

export default function BulkActions({ selected }: Props) {
  if (selected === 0) return null;

  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border bg-blue-50 p-4">
      <div className="font-medium">
        {selected} article{selected > 1 ? "s" : ""} selected
      </div>

      <div className="flex gap-3">
        <button
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
          type="button"
        >
          Publish
        </button>

        <button
          className="rounded-lg bg-yellow-600 px-4 py-2 text-white"
          type="button"
        >
          Draft
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}