"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  name: string;
  description: string;
  onClose: () => void;
};

export default function MemberModal({ name, description, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="glass-panel relative w-full max-w-lg rounded-[2rem] p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 text-sm text-navy/50 transition hover:bg-navy/8 hover:text-navy"
          >
            ✕
          </button>

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
            ✦
          </div>

          <h2 className="font-serif text-2xl text-navy">{name}</h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-navy/72">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
