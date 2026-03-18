"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current.querySelectorAll(".reveal"), {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id={id} ref={ref} className={`container-shell py-14 md:py-20 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <p className="reveal mb-3 text-xs uppercase tracking-[0.3em] text-crimson">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="reveal font-serif text-3xl text-navy md:text-5xl">{title}</h2>
          )}
          {description && (
            <p className="reveal mt-4 text-base leading-8 text-navy/72">{description}</p>
          )}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}