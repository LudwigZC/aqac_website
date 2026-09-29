import { notFound } from "next/navigation";
import EventsPage from "@/components/pages/EventsPage";
import { isChineseLocale } from "@/lib/localeRouting";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props) {
  if (!isChineseLocale(params.locale)) notFound();
  return pageMetadata(params.locale, "events");
}

export default EventsPage;
