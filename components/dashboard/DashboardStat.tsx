import { LucideIcon } from "lucide-react";

interface DashboardStatProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
}

export default function DashboardStat({
  title,
  value,
  icon: Icon,
  color = "text-blue-600",
}: DashboardStatProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 ${color}`}
        >
          <Icon className="h-7 w-7" />
        </div>

      </div>

    </div>
  );
}