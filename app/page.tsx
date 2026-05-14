"use client";

import HeroSection from "@/components/HeroSection";
import QuickLinkCard from "@/components/cards/QuickLinkCard";
import EventCard from "@/components/cards/EventCard";
import NewsCard from "@/components/cards/NewsCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useI18n } from "@/components/providers/LocaleProvider";
import { resolveFeaturedEventsBySlugs } from "@/lib/featuredEvents";

type QuickLinkItem = {
  title: string;
  description: string;
  href: string;
};

type NewsItem = {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function HomePage() {
  const { dict } = useI18n();
  const featuredEvents = resolveFeaturedEventsBySlugs(
    dict,
    dict.home.featuredEvents.featuredSlugs,
  );

  return (
    <>
      <HeroSection />

      <SectionWrapper
        eyebrow={dict.home.quickLinks.eyebrow}
        title={dict.home.quickLinks.title}
        description={dict.home.quickLinks.description}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {(dict.home.quickLinks.items as QuickLinkItem[]).map((item) => (
            <div key={item.href} className="reveal">
              <QuickLinkCard {...item} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.home.featuredEvents.eyebrow}
        title={dict.home.featuredEvents.title}
        description={dict.home.featuredEvents.description}
      >
        <div className="grid gap-6">
          {featuredEvents.map((item) => (
            <div key={item.slug} className="reveal">
              <EventCard {...item} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.home.latestNews.eyebrow}
        title={dict.home.latestNews.title}
        description={dict.home.latestNews.description}
        className="pb-24"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(dict.home.latestNews.items as NewsItem[]).map((item) => (
            <div key={item.title} className="reveal">
              <NewsCard {...item} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}