"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Newspaper,
  Sparkles,
  Image,
  BarChart3,
  Users,
  Settings,
  FolderTree,
  LogOut,
  Shield,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "AI Studio",
    href: "/admin/ai/news",
    icon: Sparkles,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Image,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 min-h-screen bg-slate-950 text-white flex-col border-r border-slate-800">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">

            <Shield className="h-7 w-7" />

          </div>

          <div>

            <h1 className="text-xl font-bold">

              NewsSphere

            </h1>

            <p className="text-xs text-slate-400">

              Professional CMS

            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">

                {item.title}

              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-5 w-5" />

          Logout
        </button>

        <p className="mt-5 text-center text-xs text-slate-500">

          NewsSphere CMS v1.0

        </p>

      </div>

    </aside>
  );
}