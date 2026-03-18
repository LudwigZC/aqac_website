"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/cards/NewsCard";

type NewsItem = {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
};

type Props = {
  tags: string[];
  items: NewsItem[];
};

export default function NewsFilter({ tags, items }: Props) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return items;
    return items.filter((item) => item.tag === activeTag);
  }, [activeTag, items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {["All", ...tags].map((tag) => {
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <NewsCard key={`${item.title}-${item.date}`} {...item} />
        ))}
      </div>
    </div>
  );
}