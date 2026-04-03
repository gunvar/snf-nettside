import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Skudeneshavn Næringsforening – hvem vi er, vår strategi og organisasjon.",
};

const styret = [
  { navn: "Styreleder", rolle: "Styreleder" },
  { navn: "Nestleder", rolle: "Nestleder" },
  { navn: "Styremedlem", rolle: "Styremedlem" },
  { navn: "Styremedlem", rolle: "Styremedlem" },
  { navn: "Styremedlem", rolle: "Styremedlem" },
];

export default function OmOss() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">
            Om oss
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Fra festkomité til utviklingsmotor
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Skudeneshavn Næringsforening gjennomgår en strategisk transformasjon
            for å bli en profesjonell kraft som kan påvirke byens fremtid.
          </p>
        </div>
      </section>

      {/* Formål */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-navy mb-6">Vårt formål</h2>
            <blockquote className="border-l-4 border-gold pl-6 text-lg text-navy/80 italic mb-8">
              «Skudeneshavn Næringsforening skal arbeide for å gjøre Skudeneshavn
              til Karmøys mest attraktive sted for bosetting, næringsliv og besøk
              — gjennom profesjonelt påvirkningsarbeid, strategisk nettverksbygging
              og koordinert stedsutvikling.»
            </blockquote>

            <h3 className="text-xl font-bold text-navy mb-4">Vår visjon</h3>
            <p className="text-navy/70 mb-8 text-lg italic">
              «Skudeneshavn — verdensledende verdiskaping i rammen av det gode liv.»
            </p>

            <h3 className="text-xl font-bold text-navy mb-4">Vår misjon</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  verb: "Påvirke",
                  desc: "Være premissleverandør som setter dagsorden overfor kommune og region.",
                },
                {
                  verb: "Koble",
                  desc: "Skape arenaer der industri, handel, gründere og kapital møtes.",
                },
                {
                  verb: "Tilrettelegge",
                  desc: "Initiere og drive frem konkrete prosjekter som øker attraktiviteten.",
                },
              ].map((item) => (
                <div key={item.verb} className="bg-sand-light rounded-lg p-5">
                  <h4 className="font-bold text-navy mb-2">{item.verb}</h4>
                  <p className="text-sm text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategien */}
      <section className="py-16 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Strategiplan 2026–2036
          </h2>
          <p className="text-navy/60 mb-10 max-w-2xl">
            Vedtatt av styret 8. januar 2026. Strategien bygger på tre gjensidig
            forsterkende pilarer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                pilar: "Pilar 1",
                title: "Rammevilkår for næring og industri",
                maal: "Næringslivet har tilgang på tomter, infrastruktur og rammevilkår. Storamyr 2 realisert innen 5 år.",
                color: "border-sea-blue bg-white",
              },
              {
                pilar: "Pilar 2",
                title: "Attraktivitet for bosetting",
                maal: "Økt tilflytting. Førstevalg for barnefamilier på Haugalandet.",
                color: "border-green bg-white",
              },
              {
                pilar: "Pilar 3",
                title: "Levende sentrum hele året",
                maal: "Liv i sentrum hele året. Maks 2 tomme lokaler.",
                color: "border-orange bg-white",
              },
            ].map((p) => (
              <div key={p.pilar} className={`border-l-4 ${p.color} rounded-lg p-6`}>
                <span className="text-xs font-semibold text-navy/40 uppercase tracking-wider">
                  {p.pilar}
                </span>
                <h3 className="text-lg font-bold text-navy mt-1 mb-3">{p.title}</h3>
                <p className="text-sm text-navy/60">{p.maal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisasjon */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10">Organisasjonen</h2>

          <div className="max-w-3xl mx-auto">
            {/* Org chart */}
            <div className="flex flex-col items-center gap-4 mb-12">
              <div className="bg-navy text-white px-8 py-4 rounded-lg text-center">
                <p className="font-bold text-lg">Styret</p>
                <p className="text-white/60 text-sm">Strategi, beslutninger og politikk</p>
              </div>
              <div className="w-0.5 h-6 bg-navy/20" />
              <div className="bg-gold/20 text-navy border border-gold px-8 py-4 rounded-lg text-center">
                <p className="font-bold text-lg">Drift & Koordinering</p>
                <p className="text-navy/60 text-sm">Operativ motor, fremdrift, kommunikasjon</p>
              </div>
              <div className="w-0.5 h-6 bg-navy/20" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {[
                  { name: "Byutvikling", letter: "A", color: "bg-sea-light border-sea-blue" },
                  { name: "Turisme & handel", letter: "B", color: "bg-green-light border-green" },
                  { name: "Næring & industri", letter: "C", color: "bg-orange-light border-orange" },
                  { name: "Kurs & arrangement", letter: "D", color: "bg-sand border-gold" },
                ].map((g) => (
                  <div key={g.letter} className={`${g.color} border rounded-lg p-3 text-center`}>
                    <p className="font-bold text-sm text-navy">
                      Gruppe {g.letter}
                    </p>
                    <p className="text-xs text-navy/60 mt-1">{g.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styret */}
      <section className="py-16 bg-sand-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10">Styret</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {styret.map((medlem, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-20 h-20 bg-navy/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-navy/30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <p className="font-bold text-navy">{medlem.navn}</p>
                <p className="text-sm text-navy/50">{medlem.rolle}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-navy/40 mt-8 italic">
            Styremedlemmer oppdateres etter årsmøtet 2026.
          </p>
        </div>
      </section>
    </>
  );
}
