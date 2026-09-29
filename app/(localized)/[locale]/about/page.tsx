import { notFound } from "next/navigation";
import AboutPage from "@/components/pages/AboutPage";
import { isChineseLocale } from "@/lib/localeRouting";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props) {
  if (!isChineseLocale(params.locale)) notFound();
  return pageMetadata(params.locale, "about");
}

export default AboutPage;
