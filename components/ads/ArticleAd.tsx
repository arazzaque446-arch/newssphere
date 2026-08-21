import AdSlot from "./AdSlot";

interface ArticleAdProps {
  position:
    | "top"
    | "middle"
    | "bottom"
    | "sidebar";
}

export default function ArticleAd({
  position,
}: ArticleAdProps) {
  return (
    <AdSlot
      slot={`article-${position}`}
      className={
        position === "sidebar"
          ? "my-6"
          : "my-10"
      }
      minHeight={
        position === "sidebar"
          ? 250
          : 180
      }
    />
  );
}