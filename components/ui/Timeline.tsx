"use client";

import { motion } from "framer-motion";

type Item = {
  year: string;
  title: string;
  description: string;
};

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="relative ml-3 border-l border-navy/12 pl-8">
      {items.map((item, index) => (
        <motion.div
          key={`${item.year}-${item.title}`}
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08, duration: 0.7 }}
          className="relative mb-12 last:mb-0"
        >
          <span className="absolute -left-[42px] top-1 h-4 w-4 rounded-full border-4 border-white bg-orange shadow-glow" />
          <p className="text-xs uppercase tracking-[0.3em] text-crimson">{item.year}</p>
          <h3 className="mt-3 font-serif text-2xl text-navy">{item.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-navy/72">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}