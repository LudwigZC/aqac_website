import { notFound } from "next/navigation";
import MembershipPage from "@/components/pages/MembershipPage";
import { isChineseLocale } from "@/lib/localeRouting";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props) {
  if (!isChineseLocale(params.locale)) notFound();
  return pageMetadata(params.locale, "membership");
}

export default MembershipPage;
