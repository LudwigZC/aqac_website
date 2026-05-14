import type { Dictionary, EventListItem } from "@/lib/i18n";

/**
 * Resolves home.featuredEvents.featuredSlugs to full event rows from dict.events.items.
 * Unknown slugs are skipped.
 */
export function resolveFeaturedEventsBySlugs(
  dict: Dictionary,
  slugs: string[],
): EventListItem[] {
  const items = dict.events.items;
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is EventListItem => item != null);
}
