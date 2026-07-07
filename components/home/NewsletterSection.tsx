"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12 md:px-12 md:py-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Newsletter
          </span>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            The Morning Briefing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-300">
            Start your day with curated headlines, deep dives, and exclusive
            analysis delivered to your inbox every morning at 7 AM IST.
          </p>

          {submitted ? (
            <p className="mt-8 rounded-lg bg-white/10 px-6 py-4 text-sm font-medium text-white">
              Thank you for subscribing! Check your inbox to confirm.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:max-w-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-gray-500">
            Join 250,000+ readers. Unsubscribe anytime. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
