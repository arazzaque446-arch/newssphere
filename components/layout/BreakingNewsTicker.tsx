import { breakingHeadlines } from "@/data/news";

export function BreakingNewsTicker() {
  const items = [...breakingHeadlines, ...breakingHeadlines];

  return (
    <div className="border-b border-border bg-ticker-bg text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center bg-accent px-4 py-2.5">
          <span className="text-xs font-bold uppercase tracking-widest">
            Breaking
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="ticker-animate flex w-max items-center gap-8 whitespace-nowrap px-4">
            {items.map((headline, i) => (
              <span key={`${headline}-${i}`} className="flex items-center gap-8">
                <span className="text-sm font-medium">{headline}</span>
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
