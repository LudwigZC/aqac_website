"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import MasonryGrid from "@/components/ui/MasonryGrid";
import Timeline from "@/components/ui/Timeline";
import { useI18n } from "@/components/providers/LocaleProvider";
import { teamMembers } from "@/lib/data";

type Stat = {
  value: string;
  label: string;
};

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type GalleryItem = {
  title: string;
  subtitle: string;
  height: string;
  gradient: string;
};

export default function AboutPage() {
  const { dict } = useI18n();

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.about.intro.eyebrow}
        title={dict.about.intro.title}
        description={dict.about.intro.description}
      >
        <div className="section-shell ink-wash fine-pattern grid items-center gap-10 overflow-hidden p-6 md:grid-cols-2 md:p-10">
          <div className="reveal relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#001F3F,#21476E,#D6D8DC)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.28),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(242,140,40,.24),transparent_22%)]" />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              Queensland • Community • Culture
            </div>
          </div>

          <div className="reveal relative z-10">
            <h3 className="font-serif text-3xl text-navy">
              {dict.about.intro.splitTitle}
            </h3>
            <p className="mt-5 text-base leading-8 text-navy/72">
              {dict.about.intro.body1}
            </p>
            <p className="mt-4 text-base leading-8 text-navy/72">
              {dict.about.intro.body2}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {(dict.about.intro.stats as Stat[]).map((stat) => (
                <div key={stat.label} className="glass-panel rounded-[1.5rem] p-5">
                  <p className="font-serif text-3xl text-navy">{stat.value}</p>
                  <p className="mt-2 text-sm text-navy/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.about.gallery.eyebrow}
        title={dict.about.gallery.title}
        description={dict.about.gallery.description}
      >
        <div className="reveal">
          <MasonryGrid items={dict.about.gallery.items as GalleryItem[]} />
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.about.timeline.eyebrow}
        title={dict.about.timeline.title}
        description={dict.about.timeline.description}
      >
        <div className="reveal section-shell p-8 md:p-10">
          <Timeline items={dict.about.timeline.items as TimelineItem[]} />
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={dict.about.team.eyebrow}
        title={dict.about.team.title}
        description={dict.about.team.description}
        className="pb-24"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="reveal glass-panel rounded-[2rem] p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#001F3F,#B22222,#F28C28)] font-serif text-2xl text-white shadow-glow">
                {member.initials}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-navy">{member.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.26em] text-crimson">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-navy/72">{member.bio}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}