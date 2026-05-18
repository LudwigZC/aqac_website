"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  href: string;
};

const iconAccentByHref: Record<string, { icon: string; label: string; arrow: string }> = {
  "/events": {
    icon: "bg-navy text-white shadow-glow",
    label: "text-orange",
    arrow: "group-hover:bg-navy group-hover:text-white",
  },
  "/news": {
    icon: "bg-gradient-to-br from-crimson via-[#C42B2B] to-[#8B1A1A] text-white shadow-[0_12px_32px_rgba(178,34,34,0.32)]",
    label: "text-crimson",
    arrow: "group-hover:bg-crimson group-hover:text-white",
  },
  "/membership": {
    icon: "bg-gradient-to-br from-[#FCD34D] via-[#FBBF24] to-[#F59E0B] text-navy shadow-[0_12px_32px_rgba(251,191,36,0.38)]",
    label: "text-[#D97706]",
    arrow: "group-hover:bg-[#F59E0B] group-hover:text-navy",
  },
};

const defaultAccent = iconAccentByHref["/events"];

export default function QuickLinkCard({ title, description, href }: Props) {
  const accent = iconAccentByHref[href] ?? defaultAccent;

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
          <div
            className={cn(
              "mb-8 flex h-12 w-12 items-center justify-center rounded-full text-lg",
              accent.icon,
            )}
          >
            ✦
          </div>
          <h3 className="font-serif text-2xl text-navy">{title}</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-navy/68">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className={cn("text-xs uppercase tracking-[0.28em]", accent.label)}>Explore</span>
          <span
            className={cn(
              "rounded-full border border-navy/10 px-3 py-2 text-sm text-navy transition",
              accent.arrow,
            )}
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
