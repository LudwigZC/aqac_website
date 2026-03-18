import en from "@/content/locales/en.json";
import zhCN from "@/content/locales/zh-CN.json";
import zhTW from "@/content/locales/zh-TW.json";

export const locales = ["en", "zh-CN", "zh-TW"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "简",
  "zh-TW": "繁",
};

export const dictionaries = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}