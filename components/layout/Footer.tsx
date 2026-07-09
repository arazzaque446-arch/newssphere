import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/data/navigation";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Advertise", href: "/advertise" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  const categories = navItems.filter((item) => item.label !== "Home");

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              NewsSphere is an independent digital news platform delivering
              trusted and timely news from North East India, India, and around
              the world.
            </p>

            <div className="mt-4 space-y-1 text-sm text-muted">
              <p>Email: arazzaque446@gmail.com</p>
              <p>Head Office: Guwahati, Assam, India</p>
            </div>

            <div className="mt-5 flex gap-3">
              {["X", "FB", "IG", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Categories
            </h3>

            <ul className="space-y-2">
              {categories.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Company
            </h3>

            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Legal
            </h3>

            <ul className="space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} NewsSphere. All Rights Reserved.
          </p>

          <p className="text-xs text-muted">
            Editor-in-Chief: <strong>Abdur Razzaque</strong> · Guwahati · Assam · India
          </p>

        </div>
      </div>
    </footer>
  );
}