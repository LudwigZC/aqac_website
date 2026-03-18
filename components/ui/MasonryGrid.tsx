"use client";

import { motion } from "framer-motion";

type Item = {
  title: string;
  subtitle: string;
  height: string;
  gradient: string;
};

export default function MasonryGrid({ items }: { items: Item[] }) {
  return (
    <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08, duration: 0.7 }}
          className={`mb-5 break-inside-avoid rounded-[2rem] bg-gradient-to-br ${item.gradient} ${item.height} relative overflow-hidden p-6 text-white shadow-glass`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.25),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.24))]" />
          <div className="relative z-10 flex h-full flex-col justify-end">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">Gallery</p>
            <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-7 text-white/82">{item.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}