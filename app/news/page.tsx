"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import NewsFilter, { type NewsItem } from "@/components/ui/NewsFilter";
import { useI18n } from "../../components/providers/LocaleProvider";
import { getNewsPosterSrc } from "@/lib/newsAssets";

export default function NewsPage() {
  const { dict, locale } = useI18n();

  const items = (dict.news.items as NewsItem[]).map((item) => ({
    ...item,
    imageSrc: item.imageSrc ?? getNewsPosterSrc(item.slug, locale),
  }));

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
            items={items}
            filterAllLabel={dict.news.filterAll}
          />
        </div>
      </SectionWrapper>
    </div>
  );
}
