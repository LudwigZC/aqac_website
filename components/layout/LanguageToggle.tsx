"use client";

import { motion } from "framer-motion";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { useI18n } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="glass-panel relative flex items-center gap-1 rounded-full p-1">
      {locales.map((item) => {
        const active = locale === item;

        return (
          <button
            key={item}
            onClick={() => setLocale(item as Locale)}
            className={cn(
              "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
              active ? "text-white" : "text-navy/70 hover:text-navy"
            )}
            aria-label={`Switch language to ${item}`}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative z-10">{localeLabels[item]}</span>
          </button>
        );
      })}
    </div>
  );
}