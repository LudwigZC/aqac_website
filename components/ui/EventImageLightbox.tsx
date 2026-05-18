"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  images: string[];
  activeIndex: number;
  title: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
  labels: {
    close: string;
    previous: string;
    next: string;
  };
};

export default function EventImageLightbox({
  images,
  activeIndex,
  title,
  onClose,
  onChangeIndex,
  labels,
}: Props) {
  const hasMultiple = images.length > 1;
  const src = images[activeIndex];

  const goPrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onChangeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/92 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-2xl text-white transition hover:bg-white/20"
        aria-label={labels.close}
        onClick={onClose}
      >
        ×
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl text-white transition hover:bg-white/20 md:flex"
            aria-label={labels.previous}
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl text-white transition hover:bg-white/20 md:flex"
            aria-label={labels.next}
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>
        </>
      )}

      <motion.div
        key={src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative flex max-h-[min(88vh,900px)] w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full min-h-[240px] overflow-hidden rounded-[1.5rem] shadow-2xl md:aspect-[16/10]">
          <Image
            src={src}
            alt={`${title} (${activeIndex + 1}/${images.length})`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        {hasMultiple && (
          <p className="mt-4 text-center text-sm text-white/75">
            {activeIndex + 1} / {images.length}
          </p>
        )}
        {hasMultiple && (
          <motion.div className="mt-4 flex gap-2 md:hidden">
            <button
              type="button"
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white"
              onClick={goPrev}
            >
              {labels.previous}
            </button>
            <button
              type="button"
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white"
              onClick={goNext}
            >
              {labels.next}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
