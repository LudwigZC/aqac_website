import { notFound } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
import { isChineseLocale } from "@/lib/localeRouting";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props) {
  if (!isChineseLocale(params.locale)) notFound();
  return pageMetadata(params.locale, "home");
}

export default HomePage;
