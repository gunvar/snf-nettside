import type { Metadata } from "next";
import Image from "next/image";

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
  },
  {
    navn: "Grunnmur",
    pris: "2.500 – 5.000 kr",
    malgruppe: "Små bedrifter (1–5 ans.)",
    fordeler: ["Stemmerett", "Nettverk og møteplasser", "Delta i ressursgruppe"],
    stemmerett: true,
  },
  {
    navn: "Vekstbedrift",
    pris: "10.000 – 15.000 kr",
    malgruppe: "Mellomstore (6–20 ans.)",
    fordeler: [
      "Alt i Grunnmur",
      "Rabatter på arrangementer",
      "Alle ressursgrupper",
      "Vertskap-muligheter",
    ],
    stemmerett: true,
    featured: true,
  },
  {
    navn: "Lokomotiv",
    pris: "25.000 – 40.000 kr",
    malgruppe: "Store bedrifter (20+ ans.)",
    fordeler: [
      "Alt i Vekstbedrift",
      "Prioritert profilering",
      "Direkte dialog med styret",
    ],
    stemmerett: true,
  },
  {
    navn: "Strategisk partner",
    pris: "Særskilt avtale",
    malgruppe: "Globale aktører",
    fordeler: [
      "Strategisk dialog med styret",
      "Rekrutteringspakke",
      "Påvirkningskraft",
      "Omdømmebygging",
    ],
    stemmerett: true,
  },
];

export default function Medlemskap() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/3n.jpg"
          alt="Skudeneshavn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Medlemskap
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Invester i stedets fremtid. Bli med og form Skudeneshavns
            utvikling.
          </p>
        </div>
      </section>

      {/* Hvorfor */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Hvorfor bli medlem
            </span>
            <h2 className="font-serif text-3xl text-navy mt-2 mb-8">
              Mer enn et medlemskap
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                <div key={item.title} className="bg-sand-light rounded-xl p-6">
                  <h3 className="font-semibold text-navy mb-2 text-[15px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nivåer */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Nivåer
            </span>
            <h2 className="font-serif text-3xl text-navy mt-2">
              Finn ditt nivå
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {nivaaer.map((nivaa) => (
              <div
                key={nivaa.navn}
                className={`bg-white rounded-xl p-6 shadow-sm relative ${
                  nivaa.featured ? "ring-2 ring-gold/30" : ""
                }`}
              >
                {nivaa.featured && (
                  <span className="absolute -top-2.5 left-6 bg-gold text-navy text-[11px] font-semibold px-3 py-0.5 rounded-full">
                    Populær
                  </span>
                )}
                <h3 className="font-serif text-xl text-navy mb-1">
                  {nivaa.navn}
                </h3>
                <p className="text-gold font-semibold mb-1">{nivaa.pris}</p>
                <p className="text-xs text-navy/35 mb-5">{nivaa.malgruppe}</p>
                <ul className="space-y-2 mb-5">
                  {nivaa.fordeler.map((fordel, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-navy/60"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 text-green/60 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {fordel}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-navy/30">
                  {nivaa.stemmerett
                    ? "Stemmerett på årsmøtet"
                    : "Ingen stemmerett"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bli medlem skjema */}
      <section id="bli-medlem" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Innmelding
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-3">
                Bli medlem
              </h2>
              <p className="text-navy/45 text-sm">
                Fyll ut skjemaet, så tar vi kontakt for å finne riktig nivå.
              </p>
            </div>
            <form className="space-y-5">
              {[
                { id: "bedrift", label: "Bedrift / Organisasjon", type: "text", placeholder: "Navn på bedrift" },
                { id: "kontakt", label: "Kontaktperson", type: "text", placeholder: "Ditt navn" },
                { id: "epost", label: "E-post", type: "email", placeholder: "din@epost.no" },
                { id: "telefon", label: "Telefon", type: "tel", placeholder: "+47" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-navy/70 mb-1.5"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    className="w-full rounded-lg border border-navy/12 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="melding"
                  className="block text-sm font-medium text-navy/70 mb-1.5"
                >
                  Melding (valgfritt)
                </label>
                <textarea
                  id="melding"
                  name="melding"
                  rows={3}
                  className="w-full rounded-lg border border-navy/12 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none transition-colors"
                  placeholder="Fortell gjerne litt om bedriften og hva du ønsker å bidra med"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors text-sm"
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
