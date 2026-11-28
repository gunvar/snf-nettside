import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { randomUUID } from "crypto";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const dynamic = "force-dynamic";

/**
 * Giveren melder selv inn en Vipps-gave etter å ha betalt til Vippsnummeret.
 * Vises og teller med en gang (status «meldt»). Styret avstemmer mot Vipps etterpå
 * og setter gaver som ikke finnes der til «Avbrutt».
 */
const MIN = 50;
const MAX = 10000;
const hits = new Map<string, number[]>();

// Mange kan dele samme IP (wifi på torget, mobilnett), så grensen er romslig
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 600_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 12;
}

const bad = (message: string, status = 400) =>
  NextResponse.json({ ok: false, message }, { status });

export async function POST(request: NextRequest) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return bad("Registreringen er ikke aktivert ennå.", 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "ukjent";
  if (limited(ip)) return bad("For mange registreringer på kort tid. Prøv igjen om litt.", 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Ugyldig skjema.");
  }

  // Skjult felt som bare roboter fyller ut
  if (String(body.nettside || "").trim()) return NextResponse.json({ ok: true });

  const belop = Math.round(Number(body.belop));
  const anonym = body.anonym === true;
  const navn = String(body.navn || "").replace(/\s+/g, " ").trim().slice(0, 40);

  if (!Number.isFinite(belop) || belop < MIN || belop > MAX)
    return bad("Beløpet må være mellom 50 og 10 000 kr. Større gaver kan meldes inn under «For bedrifter».");
  if (!anonym && navn.length < 2) return bad("Skriv navnet ditt, eller velg anonym.");
  if (!anonym && /https?:|www\.|\.(no|com|net)\b|[<>@]/i.test(navn))
    return bad("Navnet kan ikke inneholde lenker eller e-postadresser.");

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });
  const now = new Date().toISOString();
  try {
    await client.create({
      _type: "fyrverkeriGave",
      ref: `fyr26-selv-${randomUUID()}`,
      belop,
      kilde: "selvreg",
      status: "meldt",
      synlighet: anonym ? "anonym" : "navn",
      navn: anonym ? undefined : navn,
      godkjent: true,
      opprettet: now,
      betaltTidspunkt: now,
    });
  } catch {
    return bad("Kunne ikke lagre registreringen. Prøv igjen.", 502);
  }
  return NextResponse.json({ ok: true });
}
