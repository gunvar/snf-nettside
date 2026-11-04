import type { Metadata } from "next";
import { getStatus } from "@/lib/fyrverkeri";
import Gnisten from "./Gnisten";

export const dynamic = "force-dynamic";

const title = "En liten gnist – spleis på nyttårsfyrverkeriet i Skudeneshavn";
const description =
  "Hver gave tenner en ny stjerne over havna. Bli med og spleis på felles fyrverkeri nyttårsaften.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: "https://skudenesnf.no/fyrverkeri2026",
    type: "website",
    locale: "nb_NO",
    images: [
      {
        url: "https://skudenesnf.no/fyrverkeri2026/havn-natt.jpg",
        width: 1600,
        height: 1203,
        alt: "Skudeneshavn om natta",
      },
    ],
  },
};

export default async function Page() {
  const status = await getStatus();
  return (
    <Gnisten
      initial={status}
      fundDay={process.env.FYR_FUND_DAY || "2026-11-28T18:00:00+01:00"}
      vippsNummer={process.env.NEXT_PUBLIC_FYR_VIPPSNUMMER || ""}
      epost={process.env.NEXT_PUBLIC_FYR_EPOST || "Skude.nf@gmail.com"}
      fbUrl={process.env.NEXT_PUBLIC_FYR_FB_URL || ""}
      simUrl={process.env.NEXT_PUBLIC_FYR_SIM_URL || ""}
    />
  );
}
