import Link from "next/link";
import {
  Plus,
  Sparkles,
  Image,
  Newspaper,
} from "lucide-react";

const actions = [
  {
    title: "New Article",
    href: "/admin/new",
    icon: Plus,
    color: "bg-blue-600",
  },
  {
    title: "AI Writer",
    href: "/admin/ai/news",
    icon: Sparkles,
    color: "bg-green-600",
  },
  {
    title: "Media Library",
    href: "/admin/media",
    icon: Image,
    color: "bg-purple-600",
  },
  {
    title: "Manage Articles",
    href: "/admin/articles",
    icon: Newspaper,
    color: "bg-orange-600",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${action.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-500">
                  Open
                </p>
              </div>
            </Link>
          );
        })}

      </div>

    </div>
  );
}