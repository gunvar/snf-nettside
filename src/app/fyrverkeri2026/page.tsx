import type { Metadata } from "next";
import { demoStatus, getStatus } from "@/lib/fyrverkeri";
import Gnisten from "./Gnisten";

export const dynamic = "force-dynamic";

const title = "En liten gnist – spleis på nyttårsfyrverkeriet i Skudeneshavn";
const description =
  "Hver gave tenner en ny stjerne over havna. Bli med og spleis på felles fyrverkeri nyttårsaften.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://skudenesnf.no/fyrverkeri2026" },
  openGraph: {
    title,
    description,
    url: "https://skudenesnf.no/fyrverkeri2026",
    type: "website",
    locale: "nb_NO",
    images: [
      {
        url: "https://skudenesnf.no/fyrverkeri2026/og.png",
        width: 1200,
        height: 630,
        alt: "En liten gnist. En stor felles feiring. Spleis på nyttårsfyrverkeriet i Skudeneshavn.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://skudenesnf.no/fyrverkeri2026/og.png"],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  // Eksempeltall kan bare vises utenfor produksjon (lokalt og på forhåndsvisning)
  const demo = sp.demo !== undefined && process.env.VERCEL_ENV !== "production";
  const status = demo ? demoStatus() : await getStatus();
  return (
    <Gnisten
      initial={status}
      demo={demo}
      fundDay={process.env.FYR_FUND_DAY || "2026-11-28T18:00:00+01:00"}
      vippsNummer={process.env.NEXT_PUBLIC_FYR_VIPPSNUMMER || "586326"}
      vippsUrl={process.env.NEXT_PUBLIC_FYR_VIPPS_URL || "https://qr.vipps.no/vp/nWi_gXvjp"}
      epost={process.env.NEXT_PUBLIC_FYR_EPOST || "Skude.nf@gmail.com"}
      fbUrl={process.env.NEXT_PUBLIC_FYR_FB_URL || "https://www.facebook.com/events/4652609771680936"}
      simUrl={process.env.NEXT_PUBLIC_FYR_SIM_URL || ""}
    />
  );
}
