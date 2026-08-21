"use client";

interface AdSlotProps {
  slot?: string;
  className?: string;
  minHeight?: number;
}

export default function AdSlot({
  slot = "default",
  className = "",
  minHeight = 120,
}: AdSlotProps) {
  const adsEnabled =
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  /*
   * Ads remain completely disabled until
   * NEXT_PUBLIC_ADS_ENABLED=true.
   *
   * This gives NewsSphere fixed advertising
   * locations without displaying fake ads.
   */

  if (!adsEnabled) {
    return null;
  }

  return (
    <div
      className={`my-8 flex w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        minHeight: `${minHeight}px`,
      }}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      <div className="flex h-full min-h-[90px] w-full max-w-4xl items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-400">
        Advertisement
      </div>
    </div>
  );
}