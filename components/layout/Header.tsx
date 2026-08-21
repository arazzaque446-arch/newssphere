"use client";

import Link from "next/link";
import { useState } from "react";

import { navItems } from "@/data/navigation";

import { DarkModeToggle } from "@/components/ui/DarkModeToggle";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/ui/SearchBar";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* TOP BAR */}
        <div className="flex min-h-16 items-center justify-between gap-4">

          {/* LOGO */}
          <Logo />

          {/* DESKTOP SEARCH */}
          <div className="hidden flex-1 px-6 lg:block">
            <SearchBar />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <DarkModeToggle />

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-lg transition hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="hidden border-t border-border lg:block"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-1 overflow-x-auto py-2">

            {/* HOME */}
            <li>
              <Link
                href="/"
                className="group flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800"
              >
                Home
              </Link>
            </li>

            {/* LATEST */}
            <li>
              <Link
                href="/latest"
                className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800"
              >
                Latest
              </Link>
            </li>

            {/* CATEGORY NAVIGATION */}
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition hover:bg-green-50 hover:text-green-700 dark:hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}

          </ul>
        </nav>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-5 shadow-lg lg:hidden">

          {/* MOBILE SEARCH */}
          <SearchBar className="mb-5" />

          {/* MOBILE LINKS */}
          <nav aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-3">

              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border bg-surface p-3 text-center font-semibold transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800"
              >
                Home
              </Link>

              <Link
                href="/latest"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border bg-surface p-3 text-center font-semibold transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800"
              >
                Latest
              </Link>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-border bg-surface p-3 text-center font-medium transition hover:border-green-500 hover:bg-green-50 hover:text-green-700 dark:hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </nav>

        </div>
      )}
    </header>
  );
}