import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Skudeneshavn Næringsforening – Fra postkort til powerhouse",
    template: "%s | Skudeneshavn Næringsforening",
  },
  description:
    "Skudeneshavn Næringsforening arbeider for å gjøre Skudeneshavn til Karmøys mest attraktive sted for bosetting, næringsliv og besøk.",
  metadataBase: new URL("https://skudenesnf.no"),
  openGraph: {
    title: "Skudeneshavn Næringsforening",
    description:
      "Fra postkort til powerhouse – vi påvirker, kobler og tilrettelegger for Skudeneshavns fremtid.",
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
    <html lang="no" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
