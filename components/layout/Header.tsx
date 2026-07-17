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
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md shadow-sm">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* TOP BAR */}

        <div className="flex h-16 items-center justify-between gap-4">

          <Logo />

          {/* Desktop Search */}

          <div className="hidden flex-1 px-8 lg:block">

            <SearchBar />

          </div>

          <div className="flex items-center gap-3">

            <DarkModeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>

          </div>

        </div>

        {/* DESKTOP MENU */}

        <nav className="hidden border-t border-border lg:block">

          <ul className="flex items-center gap-2 overflow-x-auto py-3">

            <li>

              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600"
              >
                Home
              </Link>

            </li>

            <li>

              <Link
                href="/latest"
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600"
              >
                Latest
              </Link>

            </li>

            {navItems.map((item) => (

              <li key={item.href}>

                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600"
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

        <div className="border-t border-border bg-surface px-5 py-5 lg:hidden">

          <SearchBar className="mb-5" />

          <div className="grid grid-cols-2 gap-3">

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border p-3 text-center font-semibold"
            >
              Home
            </Link>

            <Link
              href="/latest"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border p-3 text-center font-semibold"
            >
              Latest
            </Link>

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border p-3 text-center font-medium"
              >
                {item.label}
              </Link>

            ))}

          </div>

        </div>

      )}

    </header>
  );
}