"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function HeroSection() {
  const { dict } = useI18n();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#001F3F_0%,#173B61_38%,#3F5E7E_65%,#E7DDD0_100%)]" />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-grain" />

      <div className="container-shell relative z-10 flex min-h-screen items-center py-28">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-xs uppercase tracking-[0.34em] text-white/85 drop-shadow-sm"
          >
            {dict.home.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.85 }}
            className="text-balance font-serif text-5xl leading-tight text-white md:text-7xl"
          >
            {dict.home.hero.titleLine1}
            <br />
            <span className="text-parchment/90">{dict.home.hero.titleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.85 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/[0.86] drop-shadow-sm md:text-lg"
          >
            {dict.home.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.85 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton href="/membership">{dict.home.hero.primaryCta}</MagneticButton>
            <MagneticButton
              href="/about"
              className="border-white/20 bg-white/8 text-white hover:bg-white hover:text-navy"
            >
              {dict.home.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}