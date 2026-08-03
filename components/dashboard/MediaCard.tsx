import Image from "next/image";

interface Props {
  name: string;
  url: string;
}

export default function MediaCard({
  name,
  url,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <Image
        src={url}
        alt={name}
        width={320}
        height={220}
        className="h-48 w-full rounded-xl object-cover"
      />

      <p className="mt-4 truncate text-sm font-medium">
        {name}
      </p>

      <input
        readOnly
        value={url}
        className="mt-3 w-full rounded-lg border p-2 text-xs"
      />
    </div>
  );
}