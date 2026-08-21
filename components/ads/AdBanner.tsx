import AdSlot from "./AdSlot";

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export default function AdBanner({
  slot = "banner",
  className = "",
}: AdBannerProps) {
  return (
    <AdSlot
      slot={slot}
      className={className}
      minHeight={120}
    />
  );
}