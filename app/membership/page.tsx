"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MagneticButton from "@/components/ui/MagneticButton";
import MemberModal from "@/components/ui/MemberModal";
import { useI18n } from "@/components/providers/LocaleProvider";

type MemberItem = { name: string; description: string };

export default function MembershipPage() {
  const { dict } = useI18n();
  const [selected, setSelected] = useState<MemberItem | null>(null);

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.membership.eyebrow}
        title={dict.membership.title}
        description={dict.membership.description}
      >
        <div className="section-shell ink-wash overflow-hidden p-8 md:p-12">
          <div className="relative z-10 max-w-3xl">
            <h3 className="font-serif text-3xl text-navy">{dict.membership.join.title}</h3>
            <p className="mt-4 text-base leading-8 text-navy/72">
              {dict.membership.join.description}
            </p>
            <div className="mt-8">
              <MagneticButton
                href="#"
                className="border-ink/15 bg-parchment/90 !text-ink shadow-sm hover:bg-parchment hover:!text-ink hover:border-ink/25"
              >
                {dict.membership.join.button}
              </MagneticButton>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.membership.wall.eyebrow}
        title={dict.membership.wall.title}
        description={dict.membership.wall.description}
        className="pb-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(dict.membership.wall.items as MemberItem[]).map((item, index) => {
            const hasDesc = Boolean(item.description);
            return (
              <div
                key={index}
                onClick={() => hasDesc && setSelected(item)}
                className={`reveal glass-panel rounded-[1.75rem] p-6 text-center transition-shadow ${hasDesc ? "cursor-pointer hover:shadow-glow" : ""}`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                  ✦
                </div>
                <p className="mt-4 text-sm leading-7 text-navy/72">{item.name}</p>
                {hasDesc && (
                  <p className="mt-2 text-xs tracking-wide text-crimson/70">
                    {dict.membership.wall.learnMore} →
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {selected && (
          <MemberModal
            name={selected.name}
            description={selected.description}
            onClose={() => setSelected(null)}
          />
        )}
      </SectionWrapper>
    </div>
  );
}

