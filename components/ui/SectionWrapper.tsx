"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  id?: string;
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  headingLevel: Heading = "h2",
  eyebrow,
  title,
  description,
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".reveal"),
        { y: 24 },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        },
      );
    }, ref);
    return () => context.revert();
  }, []);

  return (
    <section id={id} ref={ref} className={`container-shell py-10 md:py-14 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-8 max-w-2xl">
          {eyebrow && (
            <p className="reveal mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-crimson">
              {eyebrow}
            </p>
          )}
          {title && (
            <Heading className="reveal font-serif text-2xl text-navy md:text-3xl lg:text-4xl">{title}</Heading>
          )}
          {description && (
            <p className="reveal mt-3 text-sm leading-7 text-navy/72">{description}</p>
          )}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}