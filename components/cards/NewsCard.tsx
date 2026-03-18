"use client";

import { motion } from "framer-motion";

type Props = {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function NewsCard({ tag, title, excerpt, date }: Props) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass-panel card-sheen flex h-full flex-col rounded-[2rem] p-6"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-crimson">
          {tag}
        </span>
        <span className="text-xs tracking-[0.18em] text-navy/45">{date}</span>
      </div>

      <h3 className="mt-6 font-serif text-2xl text-navy">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-navy/72">{excerpt}</p>

      <button className="mt-6 w-fit rounded-full border border-navy/10 px-4 py-2 text-sm text-navy transition hover:bg-navy hover:text-white">
        Read More
      </button>
    </motion.article>
  );
}