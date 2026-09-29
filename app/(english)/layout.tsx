import SiteDocument from "@/components/layout/SiteDocument";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
