import MediaCard from "./MediaCard";

interface MediaFile {
  name: string;
  url: string;
}

interface Props {
  files: MediaFile[];
}

export default function MediaGrid({ files }: Props) {
  if (files.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-500">
        No images found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {files.map((file) => (
        <MediaCard
          key={file.name}
          name={file.name}
          url={file.url}
        />
      ))}
    </div>
  );
}