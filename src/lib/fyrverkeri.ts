import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

export const GOAL = Number(process.env.FYR_GOAL) || 125000;
export const FUND_DAY =
  process.env.FYR_FUND_DAY || "2026-11-28T18:00:00+01:00";
export const AMOUNTS = [200, 500, 1000, 5000, 10000] as const;

export type Gift = {
  id: string;
  /** 0–4, brukes til stjernestørrelse/navnestørrelse. Beløp eksponeres aldri. */
  tier: number;
  kind: "anon" | "name" | "logo";
  name?: string;
  logo?: string;
};

export type FyrStatus = {
  raised: number;
  goal: number;
  donors: number;
  gifts: Gift[];
};

export function tierOf(belop: number) {
  if (belop >= 10000) return 4;
  if (belop >= 5000) return 3;
  if (belop >= 1000) return 2;
  if (belop >= 500) return 1;
  return 0;
}

const QUERY = `*[_type == "fyrverkeriGave" && status == "betalt"] | order(betaltTidspunkt asc, _createdAt asc) {
  _id, belop, synlighet, godkjent, navn, logo
}`;

type Row = {
  _id: string;
  belop: number;
  synlighet?: string;
  godkjent?: boolean;
  navn?: string;
  logo?: { asset?: { _ref: string } };
};

export async function getStatus(): Promise<FyrStatus> {
  let rows: Row[] = [];
  try {
    rows = await client.fetch<Row[]>(QUERY, {}, { cache: "no-store" });
  } catch {
    rows = [];
  }
  let raised = 0;
  const gifts: Gift[] = rows.map((r) => {
    raised += r.belop || 0;
    const tier = tierOf(r.belop || 0);
    const navn = r.navn?.trim();
    let kind: Gift["kind"] = "anon";
    let logo: string | undefined;
    if (r.godkjent && r.synlighet !== "anonym") {
      if (r.synlighet === "logo" && r.logo?.asset && tier >= 3) {
        kind = "logo";
        logo = urlFor(r.logo).width(400).fit("max").url();
      } else if (navn) {
        kind = "name";
      }
    }
    return {
      id: r._id,
      tier,
      kind,
      name: kind === "anon" ? undefined : navn,
      logo,
    };
  });
  return { raised, goal: GOAL, donors: rows.length, gifts };
}
