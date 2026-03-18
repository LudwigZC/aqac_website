"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export default function MagneticButton({ href = "#", children, className }: Props) {
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
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-navy",
          className
        )}
      >
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
}