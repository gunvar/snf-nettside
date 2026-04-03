import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arrangementer",
  description:
    "Kommende arrangementer fra Skudeneshavn Næringsforening.",
};

const arrangementer = [
  {
    dato: "Våren 2026",
    tittel: "Næringslivslunsj — presentasjon av ny strategi",
    beskrivelse:
      "Vi inviterer alle medlemmer og interesserte til lunsj hvor den nye strategiplanen presenteres og diskuteres.",
    type: "Medlemsarrangement",
    sted: "Skudeneshavn",
  },
  {
    dato: "Våren 2026",
    tittel: "Konstituering av ressursgrupper",
    beskrivelse:
      "Ressursgruppene A-D konstitueres med ledere og medlemmer. Her kan du melde din interesse og bli med å påvirke.",
    type: "Internt",
    sted: "Skudeneshavn",
  },
  {
    dato: "2026",
    tittel: "Frokostmøte: Coworking i Skudeneshavn",
    beskrivelse:
      "Mulighetsstudie for en coworking-hub som gjør det mulig å jobbe lokalt uten å pendle. For fjernarbeidere, gründere og etablerte.",
    type: "Faglig",
    sted: "Skudeneshavn",
  },
  {
    dato: "2026",
    tittel: "Nettverkssamling for næringsdrivende",
    beskrivelse:
      "Uformell nettverkssamling for alle næringsdrivende i Skudeneshavn. Bygg kontakter, del erfaringer, finn samarbeidspartnere.",
    type: "Nettverk",
    sted: "Skudeneshavn",
  },
];

export default function Arrangementer() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">
            Arrangementer
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Møteplasser som skaper verdi
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Vi bygger kompetanse, engasjement og gjennomføringsevne gjennom
            relevante møteplasser — næringslunsjer, seminarer, kurs og
            nettverkssamlinger.
          </p>
        </div>
      </section>

      {/* Kommende arrangementer */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            Kommende arrangementer
          </h2>
          <div className="space-y-6">
            {arrangementer.map((arr, i) => (
              <div
                key={i}
                className="border border-navy/10 rounded-xl p-6 hover:border-gold/40 transition-colors flex flex-col sm:flex-row gap-6"
              >
                <div className="sm:w-40 shrink-0">
                  <div className="bg-sand rounded-lg px-4 py-3 text-center">
                    <p className="font-bold text-navy text-sm">{arr.dato}</p>
                    <p className="text-xs text-navy/40 mt-1">{arr.sted}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-gold/15 text-gold px-2 py-0.5 rounded">
                      {arr.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {arr.tittel}
                  </h3>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    {arr.beskrivelse}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-navy/40 text-sm italic mb-6">
              Datoer og detaljer for arrangementer annonseres fortløpende.
              Ressursgruppe D har ansvar for gjennomføring.
            </p>
            <Link
              href="/kontakt"
              className="text-sea-blue font-medium text-sm hover:underline"
            >
              Kontakt oss for å foreslå arrangementer &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Årshjul */}
      <section className="py-16 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Helårsaktivitet
            </h2>
            <p className="text-navy/60 mb-8">
              En av våre viktigste ambisjoner er å gjøre Skudeneshavn til en
              helårsby. Ressursgruppe B og D arbeider med et årshjul som sikrer
              minimum ett arrangement per måned — også utenfor sommersesongen.
            </p>
            <div className="bg-white rounded-xl p-8">
              <p className="font-bold text-navy mb-4">
                KPI: Minst 4 helårsaktiviteter utenfor høysesong (sep–mai)
              </p>
              <p className="text-sm text-navy/50">
                Årshjulet utvikles av Ressursgruppe B (Turisme, handel og
                opplevelse) og Ressursgruppe D (Kurs, seminarer og arrangement).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
