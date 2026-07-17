"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 shadow-2xl">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Welcome back 👋
        </h2>

        <p className="mt-2 text-blue-100">
          Manage NewsSphere professionally
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="rounded-xl bg-white/20 p-3">
          <Search className="text-white" />
        </div>

        <div className="rounded-xl bg-white/20 p-3">
          <Bell className="text-white" />
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white/20 px-4 py-3">

          <UserCircle2
            className="text-white"
            size={34}
          />

          <div>

            <p className="font-semibold text-white">
              Abdur Razzaque
            </p>

            <p className="text-xs text-blue-100">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}