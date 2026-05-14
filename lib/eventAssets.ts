/**
 * Event banner URLs under public/images/events/ (see paths.py EVENT_BANNERS).
 * Slug matches locale JSON events.items[].slug and the image basename without extension.
 */
export function getEventBannerSrc(slug: string): string {
  return `/images/events/${slug}.jpg`;
}
