import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
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

export const metadata: Metadata = {
  title: "Queensland Chinese Affair Committee",
  description:
    "Official bilingual website of the Queensland Chinese Affair Committee in Queensland, Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} font-sans text-ink antialiased`}
      >
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}