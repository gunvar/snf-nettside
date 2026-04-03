import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medlemskap",
  description:
    "Bli medlem i Skudeneshavn Næringsforening — invester i stedets fremtid.",
};

const nivaaer = [
  {
    navn: "Assosiert",
    pris: "500 kr",
    malgruppe: "Privatpersoner, lag",
    fordeler: ["Informasjon og nyhetsbrev", "Tilgang til åpne møter"],
    stemmerett: false,
    color: "border-navy/20",
  },
  {
    navn: "Grunnmur",
    pris: "2.500 – 5.000 kr",
    malgruppe: "Små bedrifter (1–5 ansatte)",
    fordeler: [
      "Stemmerett",
      "Nettverk og møteplasser",
      "Delta i ressursgruppe",
    ],
    stemmerett: true,
    color: "border-sea-blue",
  },
  {
    navn: "Vekstbedrift",
    pris: "10.000 – 15.000 kr",
    malgruppe: "Mellomstore (6–20 ansatte)",
    fordeler: [
      "Alt i Grunnmur",
      "Rabatter på arrangementer",
      "Tilgang til alle ressursgrupper",
      "Vertskap-muligheter",
    ],
    stemmerett: true,
    color: "border-green",
    featured: true,
  },
  {
    navn: "Lokomotiv",
    pris: "25.000 – 40.000 kr",
    malgruppe: "Store bedrifter (20+ ansatte)",
    fordeler: [
      "Alt i Vekstbedrift",
      "Prioritert plass og profilering",
      "Direkte dialog med styret",
    ],
    stemmerett: true,
    color: "border-gold",
  },
  {
    navn: "Strategisk partner",
    pris: "Særskilt avtale (75–150k)",
    malgruppe: "Globale aktører",
    fordeler: [
      "Direkte strategisk dialog med styret",
      "Rekrutteringspakke",
      "Påvirkningskraft",
      "Omdømmebygging",
    ],
    stemmerett: true,
    color: "border-gold",
  },
];

export default function Medlemskap() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">
            Medlemskap
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Invester i stedets fremtid
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Vi selger ikke et medlemskap. Vi selger en investering i stedets
            fremtid. De som har størst nytte av at Skudeneshavn er attraktiv —
            og størst evne — bør bidra mest.
          </p>
        </div>
      </section>

      {/* Hvorfor */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Hvorfor bli medlem?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Det angår deg",
                  desc: "Direkte relevans for din hverdag og din virksomhet.",
                },
                {
                  title: "Du får noe igjen",
                  desc: "Konkret verdi — ikke bare «feel good».",
                },
                {
                  title: "Det lønner seg",
                  desc: "Større gevinst ved å være med enn å stå utenfor.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-sand-light rounded-lg p-5">
                  <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Medlemsnivåer */}
      <section className="py-16 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10 text-center">
            Medlemsnivåer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nivaaer.map((nivaa) => (
              <div
                key={nivaa.navn}
                className={`bg-white rounded-xl border-t-4 ${nivaa.color} p-6 shadow-sm ${
                  nivaa.featured ? "ring-2 ring-green/30 relative" : ""
                }`}
              >
                {nivaa.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Populær
                  </span>
                )}
                <h3 className="text-xl font-bold text-navy mb-1">{nivaa.navn}</h3>
                <p className="text-gold font-semibold text-lg mb-1">{nivaa.pris}</p>
                <p className="text-xs text-navy/40 mb-5">{nivaa.malgruppe}</p>
                <ul className="space-y-2 mb-5">
                  {nivaa.fordeler.map((fordel, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                      <svg className="w-4 h-4 mt-0.5 text-green shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {fordel}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-navy/40">
                  {nivaa.stemmerett ? "Stemmerett på årsmøtet" : "Ingen stemmerett"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bli medlem skjema */}
      <section id="bli-medlem" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">
              Bli medlem
            </h2>
            <p className="text-navy/60 text-center mb-8">
              Fyll ut skjemaet, så tar vi kontakt med deg for å finne riktig
              medlemsnivå.
            </p>
            <form className="space-y-5">
              <div>
                <label htmlFor="bedrift" className="block text-sm font-medium text-navy mb-1">
                  Bedrift / Organisasjon
                </label>
                <input
                  type="text"
                  id="bedrift"
                  name="bedrift"
                  className="w-full rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  placeholder="Navn på bedrift"
                />
              </div>
              <div>
                <label htmlFor="kontakt" className="block text-sm font-medium text-navy mb-1">
                  Kontaktperson
                </label>
                <input
                  type="text"
                  id="kontakt"
                  name="kontakt"
                  className="w-full rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  placeholder="Ditt navn"
                />
              </div>
              <div>
                <label htmlFor="epost" className="block text-sm font-medium text-navy mb-1">
                  E-post
                </label>
                <input
                  type="email"
                  id="epost"
                  name="epost"
                  className="w-full rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  placeholder="din@epost.no"
                />
              </div>
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-navy mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  className="w-full rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  placeholder="+47"
                />
              </div>
              <div>
                <label htmlFor="melding" className="block text-sm font-medium text-navy mb-1">
                  Melding (valgfritt)
                </label>
                <textarea
                  id="melding"
                  name="melding"
                  rows={3}
                  className="w-full rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
                  placeholder="Fortell gjerne litt om bedriften din og hva du ønsker å bidra med"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3 rounded-md font-semibold hover:bg-gold-light transition-colors"
              >
                Send innmelding
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
