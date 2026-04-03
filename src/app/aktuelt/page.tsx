import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktuelt",
  description: "Nyheter og saker fra Skudeneshavn Næringsforening.",
};

const nyheter = [
  {
    dato: "8. januar 2026",
    kategori: "Strategi",
    tittel: "Ny strategiplan vedtatt: «Fra postkort til powerhouse»",
    ingress:
      "Styret vedtok den nye strategiplanen 2026–2036 som transformerer foreningen fra en dugnadsbasert «festkomité» til en profesjonell «utviklingsmotor» som kan påvirke byens fremtid.",
    pilar: null,
  },
  {
    dato: "Januar 2026",
    kategori: "Organisasjon",
    tittel: "Fire ressursgrupper skal bygge gjennomføringskraft",
    ingress:
      "Den nye organisasjonsmodellen med fire ressursgrupper — Byutvikling, Turisme & handel, Næring & industri, og Kurs & arrangement — skal sikre at strategien omsettes til handling.",
    pilar: null,
  },
  {
    dato: "2026",
    kategori: "Næringsliv",
    tittel: "Skudeneshavn-paradokset: Global kompetanse, lokal avmakt",
    ingress:
      "Byen huser hovedkontoret til et av verdens største offshorerederier, men sliter med å få gjennomslag for basale infrastrukturtiltak. Næringsforeningen tar grep.",
    pilar: "Pilar 1",
  },
  {
    dato: "2026",
    kategori: "Byutvikling",
    tittel: "Storamyr 2 — næringsareal for fremtiden",
    ingress:
      "Realisering av Storamyr 2 er et prioritert mål i den nye strategiplanen. Næringsforeningen jobber for at næringslivet får tilgang på tomter og infrastruktur.",
    pilar: "Pilar 1",
  },
  {
    dato: "2026",
    kategori: "Bosetting",
    tittel: "Skudeneshavn som førstevalg for barnefamilier",
    ingress:
      "Med fokus på sikre skole, nye boligprosjekter og synliggjøring av livskvaliteten, jobber foreningen for at flere velger Skudeneshavn som bosted.",
    pilar: "Pilar 2",
  },
  {
    dato: "2026",
    kategori: "Sentrum",
    tittel: "Nullvisjon for forfall i sentrum",
    ingress:
      "Et dødt sentrum er dårlig omdømme. Gjennom dialog med gårdeiere, koordinerte åpningstider og helårsaktiviteter skal sentrum leve hele året.",
    pilar: "Pilar 3",
  },
];

export default function Aktuelt() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">
            Aktuelt
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Nyheter og saker
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Følg med på hva Skudeneshavn Næringsforening jobber med —
            nyheter, høringssvar, leserinnlegg og oppdateringer.
          </p>
        </div>
      </section>

      {/* Nyheter */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nyheter.map((nyhet, i) => (
              <article
                key={i}
                className="border border-navy/10 rounded-xl p-6 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-navy/40">
                    {nyhet.dato}
                  </span>
                  <span className="text-xs font-semibold bg-sand px-2 py-0.5 rounded text-navy/60">
                    {nyhet.kategori}
                  </span>
                  {nyhet.pilar && (
                    <span className="text-xs font-medium text-sea-blue bg-sea-light px-2 py-0.5 rounded">
                      {nyhet.pilar}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-navy mb-3">
                  {nyhet.tittel}
                </h2>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {nyhet.ingress}
                </p>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-navy/40 text-sm italic">
              Flere nyheter kommer etter hvert som ressursgruppene starter sitt arbeid.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
