import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { randomUUID } from "crypto";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const dynamic = "force-dynamic";

const MAX_LOGO = 2 * 1024 * 1024;
const AUTO_MAX = 20000;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

/** Sjekker filens første byte – stoler ikke på filnavn eller oppgitt type. Ikke SVG. */
function imageType(b: Buffer): string | null {
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length > 12 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}

const bad = (message: string, status = 400) =>
  NextResponse.json({ ok: false, message }, { status });

export async function POST(request: NextRequest) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return bad("Skjemaet er ikke aktivert ennå.", 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "ukjent";
  if (limited(ip)) return bad("For mange forsøk. Prøv igjen senere.", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Ugyldig skjema.");
  }
  const text = (k: string, max: number) =>
    String(form.get(k) || "").trim().slice(0, max);

  // Skjult felt som bare roboter fyller ut
  if (text("nettside", 200)) return NextResponse.json({ ok: true });

  const bedrift = text("bedrift", 40);
  const kontaktNavn = text("kontaktNavn", 80);
  const kontaktEpost = text("kontaktEpost", 120);
  const orgnr = text("orgnr", 20).replace(/\s/g, "");
  const betaling = text("betaling", 10) === "vipps" ? "vipps" : "faktura";
  const belop = Math.round(Number(text("belop", 10)));

  if (bedrift.length < 2) return bad("Skriv inn bedriftsnavn.");
  if (kontaktNavn.length < 2) return bad("Skriv inn kontaktperson.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontaktEpost)) return bad("Skriv inn en gyldig e-postadresse.");
  if (!Number.isFinite(belop) || belop < 500 || belop > 500000) return bad("Beløpet må være mellom 500 og 500 000 kr.");
  if (orgnr && !/^\d{9}$/.test(orgnr)) return bad("Org.nr. skal ha ni siffer.");

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

  let logo: { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined;
  const file = form.get("logo");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_LOGO) return bad("Logoen er for stor. Maks 2 MB.");
    const buf = Buffer.from(await file.arrayBuffer());
    const type = imageType(buf);
    if (!type) return bad("Logoen må være PNG, JPG eller WebP.");
    try {
      const asset = await client.assets.upload("image", buf, {
        filename: `logo-${bedrift.replace(/[^\w-]+/g, "-").slice(0, 40)}.${type.split("/")[1]}`,
        contentType: type,
      });
      logo = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch {
      return bad("Kunne ikke laste opp logoen. Prøv igjen.", 502);
    }
  }

  const ref = `fyr26-${randomUUID()}`;
  const now = new Date().toISOString();
  try {
    // Vises og teller med en gang. Uvanlig store beløp venter på styret, så et falskt skjema ikke kan fylle målet.
    await client.create({
      _type: "fyrverkeriGave",
      ref,
      belop,
      kilde: betaling === "vipps" ? "kontant" : "faktura",
      status: belop <= AUTO_MAX ? "meldt" : "opprettet",
      synlighet: logo && belop >= 5000 ? "logo" : "navn",
      navn: bedrift,
      logo,
      godkjent: true,
      opprettet: now,
    });
    // Kontaktinfo lagres i et eget dokument med punktum i id-en – slike er ikke offentlig lesbare
    await client.create({
      _id: `fyrhenvendelse.${randomUUID()}`,
      _type: "fyrverkeriHenvendelse",
      gaveRef: ref,
      bedrift,
      belop,
      betaling,
      kontaktNavn,
      kontaktEpost,
      orgnr: orgnr || undefined,
      mottatt: now,
      behandlet: false,
    });
  } catch {
    return bad("Kunne ikke lagre henvendelsen. Prøv igjen, eller send oss en e-post.", 502);
  }

  return NextResponse.json({ ok: true });
}
