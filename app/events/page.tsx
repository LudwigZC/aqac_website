"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCard from "@/components/cards/EventCard";
import { useI18n } from "../../components/providers/LocaleProvider";

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
          {(dict.events.items).map((item) => (
            <div key={item.slug} className="reveal">
              <EventCard {...item} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
