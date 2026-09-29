import { type Locale } from "@/lib/i18n";
import { basePath } from "@/lib/paths";

export const chineseLocales = ["zh-CN", "zh-TW"] as const;

export function isChineseLocale(value: string): value is (typeof chineseLocales)[number] {
  return chineseLocales.some((locale) => locale === value);
}

/** Route paths for Next Link; Next adds basePath itself. Preserve query and hash. */
export function localizedPath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const boundary = href.search(/[?#]/);
  let path = boundary < 0 ? href : href.slice(0, boundary);
  const tail = boundary < 0 ? "" : href.slice(boundary);
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) {
    path = path.slice(basePath.length) || "/";
  }
  path = path.replace(/^\/(en|zh-CN|zh-TW)(?=\/|$)/, "");
  path = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}${path === "/" ? "/" : `${path}/`}${tail}`;
}
