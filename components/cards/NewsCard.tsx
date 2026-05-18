"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import EventImageLightbox from "@/components/ui/EventImageLightbox";
import { useI18n } from "@/components/providers/LocaleProvider";

type Props = {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  imageSrc?: string;
};

export default function NewsCard({ tag, title, excerpt, date, imageSrc }: Props) {
  const { dict } = useI18n();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const labels = {
    close: dict.events.imageClose,
    previous: dict.events.imagePrevious,
    next: dict.events.imageNext,
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="glass-panel card-sheen flex h-full flex-col overflow-hidden rounded-[2rem]"
      >
        {imageSrc ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group/poster relative aspect-[3/4] w-full overflow-hidden border-b border-navy/8 bg-navy/5"
            aria-label={dict.news.viewPoster}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover object-top transition duration-500 group-hover/poster:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,31,63,0.35))]" />
          </button>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="shrink-0 rounded-full bg-orange/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-crimson">
              {tag}
            </span>
            <span className="text-right text-xs tracking-[0.18em] text-navy/45">{date}</span>
          </div>

          <h3 className="mt-6 font-serif text-2xl text-navy">{title}</h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-navy/72">{excerpt}</p>

          {imageSrc ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="mt-6 w-fit rounded-full border border-navy/10 px-4 py-2 text-sm text-navy transition hover:bg-navy hover:text-white"
            >
              {dict.news.viewPoster}
            </button>
          ) : null}
        </div>
      </motion.article>

      {lightboxOpen && imageSrc ? (
        <EventImageLightbox
          images={[imageSrc]}
          activeIndex={0}
          title={title}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={() => {}}
          labels={labels}
        />
      ) : null}
    </>
  );
}
