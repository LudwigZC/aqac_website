"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import EventImageLoopScroll from "@/components/ui/EventImageLoopScroll";
import EventImageLightbox from "@/components/ui/EventImageLightbox";
import { useI18n } from "@/components/providers/LocaleProvider";
import { getEventBannerSrc, getEventGallerySrcs } from "@/lib/eventAssets";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/lib/i18n";

type Props = EventListItem;

const imageFrameClass =
  "relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-[1.5rem] shadow-glow";

export default function EventCard({ slug, month, day, title, description, cta }: Props) {
  const { dict } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number | undefined>();

  const bannerSrc = getEventBannerSrc(slug);
  const gallerySrcs = getEventGallerySrcs(slug);
  const eventHref = `/events#event-${slug}`;

  const allImages = useMemo(
    () => (gallerySrcs.length > 0 ? [bannerSrc, ...gallerySrcs] : [bannerSrc]),
    [bannerSrc, gallerySrcs],
  );

  const needsExpand = useMemo(
    () => description.length > 180 || description.includes("\n\n"),
    [description],
  );

  const showLoopScroll = expanded && gallerySrcs.length > 0;

  useEffect(() => {
    if (!showLoopScroll) {
      setPanelHeight(undefined);
      return;
    }

    const node = contentRef.current;
    if (!node) return;

    const syncHeight = () => setPanelHeight(node.offsetHeight);

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, [showLoopScroll, description, expanded]);

  const lightboxLabels = {
    close: dict.events.imageClose,
    previous: dict.events.imagePrevious,
    next: dict.events.imageNext,
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="glass-panel card-sheen grid gap-6 rounded-[2rem] p-6 grid-cols-1 md:grid-cols-[minmax(0,200px)_110px_1fr] md:items-start"
      >
        <motion.div className={cn("w-full max-w-[200px]", showLoopScroll && "md:sticky md:top-28")}>
          {showLoopScroll ? (
            <EventImageLoopScroll
              images={allImages}
              title={title}
              height={panelHeight}
              onImageClick={(index) => setLightboxIndex(index)}
            />
          ) : (
            <button
              type="button"
              className={cn(imageFrameClass, "block cursor-zoom-in")}
              aria-label={title}
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={bannerSrc}
                alt={title}
                fill
                className="object-cover transition duration-300 hover:scale-[1.02]"
                sizes="200px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
                aria-hidden
              />
            </button>
          )}
        </motion.div>

        <motion.div className="rounded-[1.5rem] bg-navy p-5 text-center text-white shadow-glow md:self-start">
          <p className="text-xs uppercase tracking-[0.32em] text-white/65">{month}</p>
          <p className="mt-2 font-serif text-4xl leading-none">{day}</p>
        </motion.div>

        <motion.div ref={contentRef} layout className="flex flex-col justify-between gap-5">
          <motion.div layout>
            <h3 className="font-serif text-xl text-navy">{title}</h3>
            <p
              id={`event-desc-${slug}`}
              className={cn(
                "mt-3 max-w-2xl text-sm leading-7 text-navy/72",
                needsExpand && !expanded && "line-clamp-4 overflow-hidden",
                (needsExpand && expanded) || !needsExpand ? "whitespace-pre-line" : "",
              )}
            >
              {description}
            </p>
          </motion.div>

          <motion.div layout className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {!needsExpand && (
              <MagneticButton href={eventHref} variant="solid">
                {cta}
              </MagneticButton>
            )}

            {needsExpand && !expanded && (
              <button
                type="button"
                className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-navy bg-navy px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,31,63,0.28)] transition duration-300 hover:bg-white hover:text-navy"
                aria-expanded={expanded}
                aria-controls={`event-desc-${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(true);
                }}
              >
                <span>{cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            )}

            {needsExpand && expanded && (
              <button
                type="button"
                className="w-fit rounded-full border border-navy/20 bg-white/90 px-5 py-2.5 text-sm font-medium text-navy shadow-sm transition hover:bg-white"
                onClick={() => setExpanded(false)}
              >
                {dict.events.readLess}
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <EventImageLightbox
            images={allImages}
            activeIndex={lightboxIndex}
            title={title}
            onClose={() => setLightboxIndex(null)}
            onChangeIndex={setLightboxIndex}
            labels={lightboxLabels}
          />
        )}
      </AnimatePresence>
    </>
  );
}
