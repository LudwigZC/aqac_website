"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import { getEventBannerSrc } from "@/lib/eventAssets";
import type { EventListItem } from "@/lib/i18n";

type Props = EventListItem;

export default function EventCard({ slug, month, day, title, description, cta }: Props) {
  const bannerSrc = getEventBannerSrc(slug);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="glass-panel card-sheen grid gap-6 rounded-[2rem] p-6 grid-cols-1 md:grid-cols-[minmax(0,200px)_110px_1fr]"
    >
      <div className="relative h-44 overflow-hidden rounded-[1.5rem] shadow-glow md:h-full md:min-h-[168px]">
        <Image
          src={bannerSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="rounded-[1.5rem] bg-navy p-5 text-center text-white shadow-glow md:self-start">
        <p className="text-xs uppercase tracking-[0.32em] text-white/65">{month}</p>
        <p className="mt-3 font-serif text-5xl leading-none">{day}</p>
      </div>

      <div className="flex flex-col justify-between gap-5">
        <div>
          <h3 className="font-serif text-2xl text-navy">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-navy/72">{description}</p>
        </div>

        <MagneticButton
          href="#"
          className="w-fit border-navy/10 bg-navy text-white hover:border-white hover:text-navy"
        >
          {cta}
        </MagneticButton>
      </div>
    </motion.article>
  );
}
