"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "glass" | "solid" | "accent";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const variantClass: Record<Variant, string> = {
  glass:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-navy",
  solid:
    "border-2 border-navy bg-navy text-white shadow-[0_8px_24px_rgba(26,26,26,0.22)] hover:bg-white hover:text-navy",
  accent:
    "border-2 border-gold bg-gradient-to-br from-gold-light via-gold to-[#8A6508] text-white shadow-[0_10px_36px_rgba(184,134,11,0.28)] hover:brightness-105",
};

export default function MagneticButton({
  href = "#",
  children,
  className,
  variant = "glass",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex">
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className={cn(
          "group inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-300",
          variantClass[variant],
          className,
        )}
      >
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
}
