interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
