import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import type { Locale } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function SiteDocument({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} font-sans text-ink antialiased`}
      >
        <LocaleProvider key={locale} locale={locale}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}