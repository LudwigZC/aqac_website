import { notFound } from "next/navigation";
import SiteDocument from "@/components/layout/SiteDocument";
import { chineseLocales, isChineseLocale } from "@/lib/localeRouting";

export const dynamicParams = false;

export function generateStaticParams() {
  return chineseLocales.map((locale) => ({ locale }));
}

export default function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isChineseLocale(params.locale)) notFound();
  return <SiteDocument locale={params.locale}>{children}</SiteDocument>;
}
