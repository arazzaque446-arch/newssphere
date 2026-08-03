"use client";

import { Bell, Search, Sparkles, UserCircle } from "lucide-react";

interface AdminHeaderProps {
  user: {
    email: string;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {today}
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2">

            <Search className="h-4 w-4 text-slate-500" />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-64 bg-transparent text-sm outline-none"
            />

          </div>

          {/* AI Status */}

          <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2">

            <Sparkles className="h-4 w-4 text-green-700" />

            <span className="text-sm font-medium text-green-700">
              AI Online
            </span>

          </div>

          {/* Notifications */}

          <button className="relative rounded-xl border border-slate-300 p-3 transition hover:bg-slate-100">

            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 py-2">

            <UserCircle className="h-9 w-9 text-slate-600" />

            <div>

              <p className="text-sm font-semibold">
                Administrator
              </p>

              <p className="max-w-[180px] truncate text-xs text-slate-500">
                {user.email}
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}