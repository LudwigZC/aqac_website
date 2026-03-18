"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function QuickLinkCard({ title, description, href }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="card-sheen group h-full"
    >
      <Link
        href={href}
        className="glass-panel relative flex h-full min-h-[240px] flex-col justify-between rounded-[2rem] p-8"
      >
        <div>
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-glow">
            ✦
          </div>
          <h3 className="font-serif text-2xl text-navy">{title}</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-navy/68">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.28em] text-orange">Explore</span>
          <span className="rounded-full border border-navy/10 px-3 py-2 text-sm text-navy transition group-hover:bg-navy group-hover:text-white">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}