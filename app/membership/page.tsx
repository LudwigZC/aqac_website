"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MemberModal from "@/components/ui/MemberModal";
import MemberWallCluster from "@/components/ui/MemberWallCluster";
import { useI18n } from "@/components/providers/LocaleProvider";
import type { MemberWallItem } from "@/lib/memberWall";

type MemberItem = MemberWallItem;

export default function MembershipPage() {
  const { dict } = useI18n();
  const [selected, setSelected] = useState<MemberItem | null>(null);
  const { join } = dict.membership;
  const mailtoHref = `mailto:${join.email}?subject=${encodeURIComponent(join.emailSubject)}`;

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.membership.eyebrow}
        title={dict.membership.title}
        description={dict.membership.description}
      >
        <div className="section-shell ink-wash overflow-hidden p-8 md:p-12">
          <div className="relative z-10 max-w-3xl">
            <h3 className="font-serif text-2xl text-navy">{dict.membership.join.title}</h3>
            <p className="mt-3 text-sm leading-7 text-navy/72">
              {dict.membership.join.description}
            </p>
            <div className="mt-8 flex flex-col items-start">
              <a
                href={mailtoHref}
                className="font-serif text-2xl text-navy/80 underline-offset-4 transition hover:text-crimson hover:underline md:text-3xl"
              >
                {join.email}
              </a>
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
        <div className="reveal">
          <MemberWallCluster
            items={dict.membership.wall.items as MemberItem[]}
            filterAllLabel={dict.membership.wall.filterAll}
            memberCountLabel={(count) =>
              count === 1
                ? dict.membership.wall.clusterCountOne
                : dict.membership.wall.clusterCountMany.replace("{{count}}", String(count))
            }
            learnMoreLabel={dict.membership.wall.learnMore}
            onSelect={setSelected}
          />
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
