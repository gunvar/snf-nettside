import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Arrangementer",
  description: "Kommende arrangementer fra Skudeneshavn Næringsforening.",
};

const arrangementer = [
  {
    dato: "Vår 2026",
    tittel: "Næringslivslunsj — ny strategi presenteres",
    beskrivelse:
      "Vi inviterer alle medlemmer og interesserte til lunsj hvor den nye strategiplanen presenteres og diskuteres.",
    type: "Medlemsarrangement",
  },
  {
    dato: "Vår 2026",
    tittel: "Konstituering av ressursgrupper",
    beskrivelse:
      "Ressursgruppene A–D konstitueres med ledere og medlemmer. Her kan du melde din interesse og bli med å påvirke.",
    type: "Internt",
  },
  {
    dato: "2026",
    tittel: "Frokostmøte: Coworking i Skudeneshavn",
    beskrivelse:
      "Mulighetsstudie for en coworking-hub som gjør det mulig å jobbe lokalt uten å pendle.",
    type: "Faglig",
  },
  {
    dato: "2026",
    tittel: "Nettverkssamling for næringsdrivende",
    beskrivelse:
      "Uformell nettverkssamling for alle næringsdrivende i Skudeneshavn. Bygg kontakter og finn samarbeidspartnere.",
    type: "Nettverk",
  },
];

export default function Arrangementer() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/9.jpg"
          alt="Skudeneshavn havn om kvelden"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Arrangementer
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Møteplasser som bygger kompetanse, engasjement og
            gjennomføringsevne.
          </p>
        </div>
      </section>

      {/* Kommende */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Kalender
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-10">
            Kommende arrangementer
          </h2>

          <div className="space-y-5">
            {arrangementer.map((arr, i) => (
              <div
                key={i}
                className="border border-navy/8 rounded-xl p-6 hover:border-gold/30 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-5"
              >
                <div className="sm:w-36 shrink-0">
                  <div className="bg-sand-light rounded-lg px-4 py-3 text-center">
                    <p className="font-semibold text-navy text-sm">{arr.dato}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded">
                    {arr.type}
                  </span>
                  <h3 className="font-serif text-lg text-navy mt-2 mb-2">
                    {arr.tittel}
                  </h3>
                  <p className="text-sm text-navy/50 leading-relaxed">
                    {arr.beskrivelse}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-navy/30 mt-10 italic">
            Datoer og detaljer annonseres fortløpende.
          </p>
        </div>
      </section>

      {/* Helårsambisjon */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Ambisjon
            </span>
            <h2 className="font-serif text-3xl text-navy mt-2 mb-6">
              Helårsaktivitet
            </h2>
            <p className="text-navy/50 text-[15px] leading-relaxed mb-8">
              En av våre viktigste ambisjoner er å gjøre Skudeneshavn til en
              helårsby. Vi arbeider med et årshjul som sikrer minimum ett
              arrangement per måned — også utenfor sommersesongen.
            </p>
            <Link
              href="/kontakt"
              className="text-sea-blue text-sm font-medium hover:underline underline-offset-4"
            >
              Kontakt oss for å foreslå arrangementer &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
