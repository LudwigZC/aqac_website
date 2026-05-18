"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/cards/NewsCard";
import { cn } from "@/lib/utils";

export type NewsItem = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  imageSrc?: string;
};

type Props = {
  tags: string[];
  items: NewsItem[];
  filterAllLabel: string;
};

export default function NewsFilter({ tags, items, filterAllLabel }: Props) {
  const [activeTag, setActiveTag] = useState<string>(filterAllLabel);

  const filtered = useMemo(() => {
    if (activeTag === filterAllLabel) return items;
    return items.filter((item) => item.tag === activeTag);
  }, [activeTag, items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {[filterAllLabel, ...tags].map((tag) => {
          const active = activeTag === tag;

          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active ? "bg-navy text-white" : "glass-panel text-navy/72 hover:bg-white/80"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "grid gap-6",
          filtered.length === 1
            ? "mx-auto max-w-lg grid-cols-1"
            : filtered.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {filtered.map((item) => (
          <NewsCard key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
}