/** Poster images for announcement-style news items (slug → filename under public/images/news/). */
const NEWS_POSTERS: Record<string, { en: string; zh: string }> = {
  "official-launch-2026": {
    en: "/images/news/official-launch-en.jpg",
    zh: "/images/news/official-launch-zh.jpg",
  },
};

export function getNewsPosterSrc(slug: string, locale: string): string | undefined {
  const entry = NEWS_POSTERS[slug];
  if (!entry) return undefined;
  return locale === "en" ? entry.en : entry.zh;
}
