"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCard from "@/components/cards/EventCard";
import { useI18n } from "../../components/providers/LocaleProvider";

type EventItem = {
  month: string;
  day: string;
  title: string;
  description: string;
  cta: string;
};

export default function EventsPage() {
  const { dict } = useI18n();

  return (
    <div className="pt-28">
      <SectionWrapper
        eyebrow={dict.events.eyebrow}
        title={dict.events.title}
        description={dict.events.description}
      >
        <div className="grid gap-6">
          {(dict.events.items as EventItem[]).map((item) => (
            <div key={item.title} className="reveal">
              <EventCard {...item} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
