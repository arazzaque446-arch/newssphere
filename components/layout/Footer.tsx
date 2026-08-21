import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/data/navigation";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Advertise", href: "/advertise" },
  ],

  editorial: [
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "AI Disclosure", href: "/ai-disclosure" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    label: "X",
    href: "#",
    ariaLabel: "NewsSphere on X",
  },
  {
    label: "FB",
    href: "#",
    ariaLabel: "NewsSphere on Facebook",
  },
  {
    label: "IG",
    href: "#",
    ariaLabel: "NewsSphere on Instagram",
  },
  {
    label: "YT",
    href: "#",
    ariaLabel: "NewsSphere on YouTube",
  },
];

export function Footer() {
  const categories = navItems.filter(
    (item) => item.label !== "Home"
  );

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / About */}
          <div>
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              NewsSphere is an independent digital news platform delivering
              trusted and timely news from North East India, India, and around
              the world.
            </p>

            <div className="mt-5 space-y-1 text-sm text-muted">
              <p>
                Email:{" "}
                <a
                  href="mailto:arazzaque446@gmail.com"
                  className="transition-colors hover:text-accent"
                >
                  arazzaque446@gmail.com
                </a>
              </p>

              <p>Head Office: Guwahati, Assam, India</p>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label={social.ariaLabel}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
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

          {/* Company */}
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

            <h3 className="mb-4 mt-8 text-sm font-bold uppercase tracking-wider text-foreground">
              Editorial
            </h3>

            <ul className="space-y-2">
              {footerLinks.editorial.map((item) => (
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

          {/* Legal */}
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

            <div className="mt-8">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
                NewsSphere
              </h3>

              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link
                    href="/latest"
                    className="transition-colors hover:text-accent"
                  >
                    Latest News
                  </Link>
                </li>

                <li>
                  <Link
                    href="/government"
                    className="transition-colors hover:text-accent"
                  >
                    Government
                  </Link>
                </li>

                <li>
                  <Link
                    href="/jobs"
                    className="transition-colors hover:text-accent"
                  >
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} NewsSphere. All Rights Reserved.
          </p>

          <p className="text-xs text-muted">
            Editor-in-Chief:{" "}
            <strong className="text-foreground">Abdur Razzaque</strong>
            {" · "}
            Guwahati · Assam · India
          </p>
        </div>

        {/* Small transparency note */}
        <div className="mt-5 text-center">
          <p className="text-xs leading-relaxed text-muted">
            NewsSphere uses AI-assisted tools in parts of its research,
            drafting, SEO, and editorial workflow. Published material remains
            subject to editorial review.
          </p>
        </div>
      </div>
    </footer>
  );
}