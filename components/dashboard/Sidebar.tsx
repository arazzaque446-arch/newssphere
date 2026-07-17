"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  Image,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  PlusCircle,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "New Article",
    href: "/admin/new",
    icon: PlusCircle,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Image,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
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

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 border-r border-white/10 bg-slate-950/90 backdrop-blur-xl">

      <div className="border-b border-white/10 p-8">

        <h1 className="text-3xl font-bold text-white">
          📰 NewsSphere
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Professional CMS
        </p>

      </div>

      <nav className="space-y-2 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-4 text-slate-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white"
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}