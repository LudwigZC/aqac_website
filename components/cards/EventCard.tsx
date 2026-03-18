"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

type Props = {
  month: string;
  day: string;
  title: string;
  description: string;
  cta: string;
};

export default function EventCard({ month, day, title, description, cta }: Props) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="glass-panel card-sheen grid gap-6 rounded-[2rem] p-6 md:grid-cols-[110px_1fr]"
    >
      <div className="rounded-[1.5rem] bg-navy p-5 text-center text-white shadow-glow">
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