import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absolutePageUrl, pagePaths, type PageKey } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    (Object.keys(pagePaths) as PageKey[]).map((page) => ({
      url: absolutePageUrl(locale, page),
    })),
  );
}
