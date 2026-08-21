"use client";

import { FormEvent, useState } from "react";

const advertisingTypes = [
  "Display Banner Advertisement",
  "Sponsored Article",
  "Homepage Promotion",
  "Category Sponsorship",
  "Business Promotion",
  "Job Advertisement",
  "Event Promotion",
  "Brand Campaign",
  "Partnership",
  "Other",
];

export default function AdvertisePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(
        formData.get("company") ?? ""
      ).trim(),
      email: String(
        formData.get("email") ?? ""
      ).trim(),
      phone: String(
        formData.get("phone") ?? ""
      ).trim(),
      advertisingType: String(
        formData.get("advertisingType") ?? ""
      ).trim(),
      campaignDescription: String(
        formData.get("campaignDescription") ?? ""
      ).trim(),
      startDate: String(
        formData.get("startDate") ?? ""
      ).trim(),
      endDate: String(
        formData.get("endDate") ?? ""
      ).trim(),
      budget: String(
        formData.get("budget") ?? ""
      ).trim(),
    };

    try {
      const response = await fetch(
        "/api/advertising/inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Unable to submit enquiry."
        );
      }

      setSuccess(
        "Thank you! Your advertising enquiry has been received. Our team will contact you soon."
      );

      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}

      <section className="text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Advertising & Partnerships
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Advertise With NewsSphere
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted">
            Reach NewsSphere readers through display
            advertising, sponsored content, business
            promotion, event promotion and partnership
            opportunities.
          </p>
        </div>
      </section>

      {/* OPPORTUNITIES */}

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground">
            Display Advertising
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Promote your business or brand through
            advertising placements across NewsSphere.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground">
            Sponsored Content
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Promote businesses, products, services,
            announcements and campaigns through sponsored
            content.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground">
            Business & Events
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Promote local businesses, educational
            initiatives, events, jobs and other relevant
            campaigns.
          </p>
        </div>
      </section>

      {/* BENEFITS */}

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-foreground">
          Why Advertise With NewsSphere?
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Multiple news and content categories",
            "Flexible advertising campaigns",
            "Display and sponsored-content opportunities",
            "Business and event promotion",
            "Local and broader audience reach",
            "Custom partnership opportunities",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border p-4"
            >
              <span className="mr-2 text-primary">
                ✓
              </span>

              <span className="text-foreground">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ENQUIRY FORM */}

      <section className="mx-auto mt-20 max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get Started
            </p>

            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Request Advertising Information
            </h2>

            <p className="mt-3 leading-7 text-muted">
              Tell us about your campaign and our team
              will contact you with available options.
            </p>
          </div>

          {success && (
            <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-700 dark:text-green-400">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name *
              </label>

              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* COMPANY */}

            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Company / Organisation
              </label>

              <input
                id="company"
                name="company"
                placeholder="Company or organisation name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* EMAIL + PHONE */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* TYPE */}

            <div>
              <label
                htmlFor="advertisingType"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Advertising Type *
              </label>

              <select
                id="advertisingType"
                name="advertisingType"
                required
                defaultValue=""
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select advertising type
                </option>

                {advertisingTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor="campaignDescription"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Campaign Description *
              </label>

              <textarea
                id="campaignDescription"
                name="campaignDescription"
                required
                rows={5}
                placeholder="Tell us about your business, campaign or advertising requirements."
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* DATES */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Preferred Start Date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Preferred End Date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* BUDGET */}

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Estimated Budget
              </label>

              <input
                id="budget"
                name="budget"
                placeholder="Example: ₹10,000 – ₹25,000"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Submit Advertising Enquiry"}
            </button>

            <p className="text-center text-sm text-muted">
              By submitting this form, you agree that
              NewsSphere may contact you regarding your
              advertising enquiry.
            </p>
          </form>
        </div>
      </section>

      {/* EDITORIAL INDEPENDENCE */}

      <section className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
        <h2 className="text-2xl font-bold text-foreground">
          Editorial Independence
        </h2>

        <p className="mt-4 leading-8 text-muted">
          Advertising and commercial relationships do
          not automatically influence NewsSphere editorial
          decisions. Commercial material may be clearly
          distinguished from independent editorial content
          where appropriate.
        </p>

        <p className="mt-6 leading-8 text-muted">
          NewsSphere reserves the right to reject
          advertising or partnership proposals that are
          misleading, unlawful, inappropriate or
          inconsistent with our standards.
        </p>
      </section>

      {/* DIRECT CONTACT */}

      <section className="mt-16 text-center">
        <p className="text-muted">
          Prefer email?
        </p>

        <a
          href="mailto:arazzaque446@gmail.com?subject=Advertising%20Enquiry"
          className="mt-2 inline-block font-semibold text-primary hover:underline"
        >
          arazzaque446@gmail.com
        </a>
      </section>
    </main>
  );
}