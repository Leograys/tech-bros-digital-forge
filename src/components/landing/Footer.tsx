import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/techbros-logo.png";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://x.com/TBROS2024" },
  { label: "TikTok", href: "https://www.tiktok.com/@TBROS2024" },
];

export function Footer() {
  return (
    <footer className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div className="max-w-sm">
            <a
              href="#home"
              className="flex w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
              aria-label="Tech Bros — back to top"
            >
              <img
                src={logo}
                alt="Tech Bros TB logo"
                width={36}
                height={36}
                loading="lazy"
                className="h-9 w-9"
              />
              <span className="font-display text-xl tracking-wide">
                TECH <span className="text-gradient">BROS</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Building digital experiences through technology, creativity, and
              innovation.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
                  >
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-center text-xs text-muted-foreground/80">
            &copy; {new Date().getFullYear()} Tech Bros. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
