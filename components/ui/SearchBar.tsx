"use client";

import { useState } from "react";

export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      // Demo: search would navigate to results page
      console.log("Search:", query);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor="search" className="sr-only">
        Search news
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
      <svg
        className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
}
