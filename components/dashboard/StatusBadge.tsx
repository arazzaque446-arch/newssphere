interface StatusBadgeProps {
  status: "published" | "draft" | "breaking" | "featured";
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "published":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Published
        </span>
      );

    case "draft":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Draft
        </span>
      );

    case "breaking":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Breaking
        </span>
      );

    case "featured":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Featured
        </span>
      );

    default:
      return null;
  }
}