"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useI18n } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: dict.nav.home },
      { href: "/about", label: dict.nav.about },
      { href: "/events", label: dict.nav.events },
      { href: "/news", label: dict.nav.news },
      { href: "/membership", label: dict.nav.membership },
    ],
    [dict]
  );

  useEffect(() => {
    gsap.fromTo(
      ".navbar-shell",
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div
          className={cn(
            "navbar-shell flex items-center justify-between rounded-full px-3 py-2.5 transition-all duration-300",
            "glass-panel border-white/40",
            scrolled ? "shadow-sm" : "shadow-none"
          )}
        >
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-semibold text-white shadow-glow">
              QL
            </span>
            <div className="min-w-0 leading-tight">
              <p className="max-w-[12rem] truncate font-serif text-sm tracking-wide text-navy sm:max-w-none md:text-base">{dict.brand.name}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-navy/72 transition hover:bg-white/70 hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-navy/10 bg-white/60 text-navy transition hover:bg-white md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative h-3.5 w-4" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition",
                    menuOpen && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-current transition",
                    menuOpen && "bottom-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="navbar-shell mt-2 grid gap-1 rounded-[1.5rem] border border-white/40 bg-white/85 p-2 shadow-glass backdrop-blur-md md:hidden">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-navy/78 transition hover:bg-navy hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
