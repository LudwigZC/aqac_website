"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { localeLabels, locales } from "@/lib/i18n";
import { localizedPath } from "@/lib/localeRouting";
import { withBasePath } from "@/lib/paths";
import { useI18n } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

const names = { en: "English", "zh-CN": "简体中文", "zh-TW": "繁體中文" };

export default function LanguageToggle() {
  const { locale } = useI18n();
  const pathname = usePathname() || "/";
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  return (
    <div className="glass-panel relative flex items-center gap-1 rounded-full p-1">
      {locales.map((item) => {
        const active = locale === item;
        return (
          <a
            key={item}
            href={withBasePath(localizedPath(pathname + suffix, item))}
            hrefLang={item}
            lang={item}
            aria-label={names[item]}
            aria-current={active ? "true" : undefined}
            onClick={(event) => {
              // A hash can also change through history.replaceState, without an event.
              event.currentTarget.href = withBasePath(
                localizedPath(pathname + window.location.search + window.location.hash, item),
              );
            }}
            className={cn(
              "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
              active ? "text-white" : "text-navy/70 hover:text-navy",
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative z-10">{localeLabels[item]}</span>
          </a>
        );
      })}
    </div>
  );
}
