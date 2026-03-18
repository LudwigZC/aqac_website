"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("site-locale") as Locale | null;
    if (stored) setLocaleState(stored);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("site-locale", nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      dict: getDictionary(locale),
      setLocale,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useI18n must be used inside LocaleProvider");
  }

  return context;
}

