"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";

type LocaleContextValue = { locale: Locale; dict: Dictionary };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const value = useMemo(() => ({ locale, dict: getDictionary(locale) }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useI18n must be used inside LocaleProvider");
  return context;
}
