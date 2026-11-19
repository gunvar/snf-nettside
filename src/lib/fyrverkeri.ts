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

/** Eksempeldata til forhåndsvisning (?demo=1). Brukes aldri i produksjon. */
export function demoStatus(): FyrStatus {
  const logo = (txt: string, bg: string, fg: string, shape: string) =>
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="${bg}"/>${shape}<text x="118" y="72" font-family="Georgia,serif" font-size="34" font-weight="700" fill="${fg}">${txt}</text></svg>`
    );
  const logos = [
    logo("Bedrift A", "#ffffff", "#1a2744", `<circle cx="62" cy="60" r="34" fill="#c8a55a"/>`),
    logo("Bedrift B", "#ffffff", "#3b7a9e", `<path d="M28 88 L62 26 L96 88 Z" fill="#3b7a9e"/>`),
    logo("Bedrift C", "#ffffff", "#4a8c6f", `<rect x="30" y="28" width="64" height="64" rx="14" fill="#4a8c6f"/>`),
    logo("Bedrift D", "#ffffff", "#d4874d", `<path d="M26 60 q18 -34 36 0 t36 0" stroke="#d4874d" stroke-width="12" fill="none"/>`),
    logo("Bedrift E", "#ffffff", "#1a2744", `<path d="M62 24 l12 26 28 4 -20 20 5 28 -25 -14 -25 14 5 -28 -20 -20 28 -4z" fill="#1a2744"/>`),
    logo("Bedrift F", "#ffffff", "#8a3b5c", `<circle cx="48" cy="60" r="24" fill="#8a3b5c"/><circle cx="78" cy="60" r="24" fill="#d9a5b8" fill-opacity=".8"/>`),
    logo("Bedrift G", "#ffffff", "#2f5d50", `<rect x="28" y="50" width="68" height="20" fill="#2f5d50"/><rect x="52" y="26" width="20" height="68" fill="#2f5d50"/>`),
  ];
  const seed: [number, Gift["kind"], string][] = [
    [10000, "logo", "Bedrift A"], [500, "name", "Ingrid S."], [200, "name", "Kari N."], [1000, "name", "Ole Martin"],
    [200, "anon", ""], [5000, "logo", "Bedrift B"], [500, "name", "Familien Berg"], [200, "name", "Lars H."],
    [10000, "logo", "Bedrift C"], [1000, "name", "Siri og Tom"], [200, "name", "Nora"], [500, "anon", ""],
    [1000, "name", "Naboene i Søragadå"], [200, "name", "Bjørn"], [500, "name", "Familien Hansen"], [200, "name", "Astrid"],
    [5000, "name", "Familien Våge"], [200, "anon", ""], [500, "name", "Per Arne"], [5000, "logo", "Bedrift D"],
    [200, "name", "Solveig"], [500, "name", "Hanne L."], [200, "name", "Jonas"], [5000, "logo", "Bedrift E"],
    [200, "name", "Eirik"], [500, "name", "Marit"], [1000, "name", "Even og Ida"], [200, "name", "Tor E."],
    [500, "anon", ""], [200, "name", "Sigrid"], [1000, "name", "Besteforeldrene på Haugen"], [200, "name", "Familien Hamre"],
    [500, "name", "Anne K."], [200, "name", "Odd"], [10000, "logo", "Bedrift F"], [200, "name", "Liv"],
    [5000, "logo", "Bedrift G"], [500, "name", "Klasse 7B"], [200, "name", "Mathea"], [1000, "name", "Kjell og Turid"],
    [200, "anon", ""], [500, "name", "Gjengen på brygga"], [200, "name", "Emil"], [500, "name", "Familien Sørheim"],
    [200, "name", "Tone"], [1000, "name", "Mona og Rune"], [200, "name", "Elias"], [500, "name", "Kristin"],
  ];
  let li = 0;
  let raised = 21400; // mange små gaver som ikke vises enkeltvis
  const gifts: Gift[] = seed.map(([a, kind, name], i) => {
    raised += a;
    return {
      id: `demo-${i + 1}`,
      tier: tierOf(a),
      kind,
      name: name || undefined,
      logo: kind === "logo" ? logos[li++ % logos.length] : undefined,
    };
  });
  for (let i = 0; i < 60; i++) gifts.push({ id: `demo-s${i}`, tier: i % 7 === 0 ? 1 : 0, kind: "anon" });
  return { raised, goal: GOAL, donors: gifts.length, gifts };
}
