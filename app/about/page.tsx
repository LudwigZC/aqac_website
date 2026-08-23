"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MasonryGrid from "@/components/ui/MasonryGrid";
import Timeline from "@/components/ui/Timeline";
import { useI18n } from "@/components/providers/LocaleProvider";
import { teamMembers, type TeamMember } from "@/lib/data";
import { withBasePath } from "@/lib/paths";

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
  src?: string;
};

type LocalizedTeamMember = TeamMember & {
  name: string;
  role: string;
  bio: string;
};

export default function AboutPage() {
  const { dict } = useI18n();
  const localizedMembers = (dict.about.team.members as LocalizedTeamMember[] | undefined) ?? teamMembers;

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.about.intro.eyebrow}
        title={dict.about.intro.title}
        description={dict.about.intro.description}
      >
        <div className="section-shell ink-wash fine-pattern grid items-center gap-10 overflow-hidden p-6 md:grid-cols-2 md:p-10">
          <div className="reveal relative min-h-[420px] overflow-hidden rounded-[2rem] bg-navy">
            <Image
              src={withBasePath("/images/about/community-culture.jpg")}
              alt="Queensland Chinese Affairs Committee representatives meeting with Queensland multicultural minister Fiona Simpson MP"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,.08),rgba(26,26,26,.44))]" />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              Queensland • Community • Culture
            </div>
          </div>

          <div className="reveal relative z-10">
            <h3 className="font-serif text-2xl text-navy">
              {dict.about.intro.splitTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-navy/72">
              {dict.about.intro.body1}
            </p>
            <p className="mt-3 text-sm leading-7 text-navy/72">
              {dict.about.intro.body2}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {(dict.about.intro.stats as Stat[]).map((stat) => (
                <div key={stat.label} className="glass-panel rounded-[1.5rem] p-5">
                  <p className="font-serif text-2xl text-navy">{stat.value}</p>
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
          {localizedMembers.map((member) => (
            <div key={member.slug} className="reveal glass-panel rounded-[2rem] p-6">
              {member.avatar ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white shadow-glow">
                  <Image
                    src={withBasePath(member.avatar)}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1A1A1A,#B8860B,#D4A84B)] font-serif text-2xl text-white shadow-glow">
                  {member.initials}
                </div>
              )}
              <h3 className="mt-4 font-serif text-xl text-navy">{member.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.26em] text-crimson">
                {member.role}
              </p>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-navy/72">{member.bio}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
