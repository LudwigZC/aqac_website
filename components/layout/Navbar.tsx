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
            "navbar-shell flex items-center justify-between rounded-full px-4 py-3 transition-all duration-300",
            "glass-panel border-white/40",
            scrolled ? "shadow-sm" : "shadow-none"
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-semibold text-white shadow-glow">
              QL
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg tracking-wide text-navy">{dict.brand.name}</p>
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

          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}