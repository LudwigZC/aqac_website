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
    "border-2 border-navy bg-navy text-white shadow-[0_8px_24px_rgba(0,31,63,0.28)] hover:bg-white hover:text-navy",
  accent:
    "border-2 border-[#9a3412] bg-gradient-to-br from-[#FBBF24] via-[#F97316] to-[#DC2626] text-white shadow-[0_10px_36px_rgba(249,115,22,0.45)] hover:brightness-110",
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
          "group inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300",
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
