import { withBasePath } from "@/lib/paths";

type EventBanner = {
  src: string;
  fit: "cover" | "contain";
};

const EVENT_BANNERS: Record<string, EventBanner | null> = {
  "stroke-awareness-talk": {
    src: "/images/events/stroke-awareness-talk.webp",
    fit: "contain",
  },
  "australian-family-law-seminar": null,
};

/** Existing photographic covers follow the slug.jpg convention. */
export function getEventBanner(slug: string): EventBanner | null {
  const banner = EVENT_BANNERS[slug];
  if (banner === null) return null;
  return {
    src: withBasePath(banner?.src ?? `/images/events/${slug}.jpg`),
    fit: banner?.fit ?? "cover",
  };
}

const EVENT_GALLERY: Record<string, string[]> = {
  "founding-members-first-meeting": [
    "/images/events/founding-members-first-meeting_2.jpg",
    "/images/events/founding-members-first-meeting_3.jpg",
    "/images/events/founding-members-first-meeting_4.jpg",
    "/images/events/founding-members-first-meeting_5.jpg",
  ],
  "fiona-simpson-multicultural-minister-visit": [
    "/images/events/fiona-simpson-multicultural-minister-visit_2.jpg",
    "/images/events/fiona-simpson-multicultural-minister-visit_3.jpg",
    "/images/events/fiona-simpson-multicultural-minister-visit_4.jpg",
  ],
  "queensland-holocaust-museum-visit": [
    "/images/events/queensland-holocaust-museum-visit_2.jpg",
    "/images/events/queensland-holocaust-museum-visit_3.jpg",
  ],
  "brisbane-lord-mayor-visit": [
    "/images/events/brisbane-lord-mayor-visit_2.jpg",
    "/images/events/brisbane-lord-mayor-visit_3.jpg",
    "/images/events/brisbane-lord-mayor-visit_4.jpg",
  ],
};

export function getEventGallerySrcs(slug: string): string[] {
  return (EVENT_GALLERY[slug] ?? []).map(withBasePath);
}
