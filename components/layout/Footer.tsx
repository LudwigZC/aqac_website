"use client";

import { useI18n } from "@/components/providers/LocaleProvider";

export default function Footer() {
  const { dict } = useI18n();

  return (
    <footer className="mt-24 border-t border-navy/10 bg-white/50">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="font-serif text-2xl text-navy">{dict.brand.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-navy/70">{dict.footer.description}</p>
        </div>

        <div className="md:text-right">
          <p className="text-sm uppercase tracking-[0.26em] text-navy/45">
            {dict.footer.contactTitle}
          </p>
          <p className="mt-3 text-sm text-navy/70">info@qca-committee.org.au</p>
          <p className="text-sm text-navy/70">Brisbane, Queensland, Australia</p>
        </div>
      </div>
    </footer>
  );
}