import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Skudeneshavn Næringsforening",
    template: "%s | Skudeneshavn Næringsforening",
  },
  description:
    "Skudeneshavn Næringsforening arbeider for å gjøre Skudeneshavn til Karmøys mest attraktive sted for bosetting, næringsliv og besøk.",
  metadataBase: new URL("https://skudenesnf.no"),
  openGraph: {
    title: "Skudeneshavn Næringsforening",
    description:
      "Verdensledende verdiskaping i rammen av det gode liv.",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-navy">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
