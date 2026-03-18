"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import NewsFilter from "@/components/ui/NewsFilter";
import { useI18n } from "@/components/providers/LocaleProvider";

type NewsItem = {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function NewsPage() {
  const { dict } = useI18n();

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.news.eyebrow}
        title={dict.news.title}
        description={dict.news.description}
      >
        <div className="reveal">
          <NewsFilter
            tags={dict.news.tags as string[]}
            items={dict.news.items as NewsItem[]}
          />
        </div>
      </SectionWrapper>
    </div>
  );
}