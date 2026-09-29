import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/localeRouting";
import { withBasePath } from "@/lib/paths";

export const siteOrigin = "https://qca-committee.org.au";
export const pagePaths = {
  home: "/",
  about: "/about/",
  events: "/events/",
  news: "/news/",
  membership: "/membership/",
} as const;
export type PageKey = keyof typeof pagePaths;

export function absolutePageUrl(locale: Locale, page: PageKey): string {
  return `${siteOrigin}${withBasePath(localizedPath(pagePaths[page], locale))}`;
}

export function languageAlternates(page: PageKey): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, absolutePageUrl(locale, page)])),
    "x-default": absolutePageUrl("en", page),
  };
}

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const descriptions: Record<PageKey, string> = {
    home: dict.home.hero.description,
    about: dict.about.intro.description,
    events: dict.events.description,
    news: dict.news.description,
    membership: dict.membership.description,
  };
  return {
    title: `${dict.nav[page]} | ${dict.brand.name}`,
    description: descriptions[page],
    alternates: {
      canonical: absolutePageUrl(locale, page),
      languages: languageAlternates(page),
    },
  };
}
