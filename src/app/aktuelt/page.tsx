import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aktuelt",
  description: "Nyheter og saker fra Skudeneshavn Næringsforening.",
};

const nyheter = [
  {
    dato: "8. januar 2026",
    kategori: "Strategi",
    tittel: "Ny strategiplan vedtatt",
    ingress:
      "Styret vedtok den nye strategiplanen 2026–2036 som transformerer foreningen til en profesjonell utviklingsmotor for Skudeneshavn.",
  },
  {
    dato: "Januar 2026",
    kategori: "Organisasjon",
    tittel: "Fire ressursgrupper skal bygge gjennomføringskraft",
    ingress:
      "Den nye organisasjonsmodellen med fire ressursgrupper — Byutvikling, Turisme & handel, Næring & industri, og Kurs & arrangement — sikrer at strategien omsettes til handling.",
  },
  {
    dato: "2026",
    kategori: "Næringsliv",
    tittel: "Storamyr 2 — næringsareal for fremtiden",
    ingress:
      "Realisering av Storamyr 2 er et prioritert mål. Næringsforeningen jobber for at næringslivet får tilgang på tomter og infrastruktur.",
  },
  {
    dato: "2026",
    kategori: "Bosetting",
    tittel: "Skudeneshavn som førstevalg for barnefamilier",
    ingress:
      "Med fokus på skole, nye boligprosjekter og synliggjøring av livskvaliteten, jobber foreningen for at flere velger Skudeneshavn.",
  },
  {
    dato: "2026",
    kategori: "Sentrum",
    tittel: "Nullvisjon for forfall i sentrum",
    ingress:
      "Gjennom dialog med gårdeiere, koordinerte åpningstider og helårsaktiviteter skal sentrum leve hele året.",
  },
  {
    dato: "2026",
    kategori: "Digital",
    tittel: "Ny nettside lansert",
    ingress:
      "Skudeneshavn Næringsforening har fått ny nettside for å synliggjøre arbeidet og mobilisere medlemmer og befolkning.",
  },
];

export default function Aktuelt() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/10.jpg"
          alt="Skudeneshavn gate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Aktuelt
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Nyheter, saker og oppdateringer fra Skudeneshavn Næringsforening.
          </p>
        </div>
      </section>

      {/* Nyheter */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nyheter.map((nyhet, i) => (
              <article
                key={i}
                className="border border-navy/8 rounded-xl p-7 hover:border-gold/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-navy/35 font-medium">
                    {nyhet.dato}
                  </span>
                  <span className="text-xs font-medium bg-sand px-2.5 py-0.5 rounded text-navy/50">
                    {nyhet.kategori}
                  </span>
                </div>
                <h2 className="font-serif text-xl text-navy mb-3">
                  {nyhet.tittel}
                </h2>
                <p className="text-sm text-navy/50 leading-relaxed">
                  {nyhet.ingress}
                </p>
              </article>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-navy/30 text-sm italic">
              Flere nyheter kommer etter hvert som ressursgruppene starter sitt arbeid.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
