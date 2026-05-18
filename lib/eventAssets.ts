/**
 * Event images under public/images/events/ (see paths.py EVENT_BANNERS / EVENT_GALLERY).
 */
export function getEventBannerSrc(slug: string): string {
  return `/images/events/${slug}.jpg`;
}

const EVENT_GALLERY: Record<string, string[]> = {
  "brisbane-lord-mayor-visit": [
    "/images/events/brisbane-lord-mayor-visit_2.jpg",
    "/images/events/brisbane-lord-mayor-visit_3.jpg",
  ],
};

export function getEventGallerySrcs(slug: string): string[] {
  return EVENT_GALLERY[slug] ?? [];
}
