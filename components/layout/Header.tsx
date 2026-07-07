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
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <div className="hidden max-w-xs flex-1 lg:block xl:max-w-sm">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <nav
          className="hidden border-t border-border lg:block"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <SearchBar className="mb-4" />
          <nav aria-label="Mobile navigation">
            <ul className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
