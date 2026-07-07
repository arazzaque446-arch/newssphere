import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
        NS
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-tight text-foreground">
          NewsSphere
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
          Truth. First.
        </span>
      </div>
    </Link>
  );
}
