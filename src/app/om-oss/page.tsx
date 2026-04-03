import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Skudeneshavn Næringsforening — hvem vi er, vår strategi og organisasjon.",
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
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/1.jpg"
          alt="Panorama over Skudeneshavn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Om oss
          </h1>
          <p className="text-white/65 text-lg max-w-xl animate-fade-in-up delay-100">
            Vi er næringsforeningens nye ansikt — en profesjonell kraft
            som jobber for Skudeneshavns fremtid.
          </p>
        </div>
      </section>

      {/* Formål */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Vårt formål
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-6">
                Karmøys mest attraktive sted
              </h2>
              <blockquote className="border-l-3 border-gold pl-5 text-navy/70 italic text-[15px] leading-relaxed mb-8">
                Skudeneshavn Næringsforening skal arbeide for å gjøre Skudeneshavn
                til Karmøys mest attraktive sted for bosetting, næringsliv og besøk
                — gjennom profesjonelt påvirkningsarbeid, strategisk nettverksbygging
                og koordinert stedsutvikling.
              </blockquote>
              <p className="text-navy/55 text-[15px] leading-relaxed">
                Skudeneshavn har alle forutsetninger for å bli det mest attraktive
                stedet å bo og drive virksomhet på Karmøy. Med en ny strategisk
                retning jobber vi målrettet for å realisere dette potensialet.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/skudeneshavn/6.jpg"
                alt="Kafébrygge i Skudeneshavn"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misjon */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Vår tilnærming
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-10">
            Tre roller vi fyller
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
            ].map((item, i) => (
              <div key={item.verb} className="bg-white rounded-xl p-7 shadow-sm">
                <span className="text-gold text-xs font-semibold tracking-widest">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-xl text-navy mt-1 mb-3">
                  {item.verb}
                </h3>
                <p className="text-sm text-navy/55 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisasjon */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Organisasjon
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-12">
            Slik er vi organisert
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-navy text-white px-8 py-5 rounded-xl text-center w-full max-w-sm">
                <p className="font-serif text-lg">Styret</p>
                <p className="text-white/50 text-xs mt-1">
                  Strategi &middot; Beslutninger &middot; Politikk
                </p>
              </div>
              <div className="w-px h-5 bg-navy/15" />
              <div className="bg-gold/10 border border-gold/30 text-navy px-8 py-5 rounded-xl text-center w-full max-w-sm">
                <p className="font-serif text-lg">Drift & Koordinering</p>
                <p className="text-navy/45 text-xs mt-1">
                  Operativ motor &middot; Fremdrift &middot; Kommunikasjon
                </p>
              </div>
              <div className="w-px h-5 bg-navy/15" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {[
                  { name: "Byutvikling", letter: "A", bg: "bg-sea-light" },
                  { name: "Turisme & handel", letter: "B", bg: "bg-green-light" },
                  { name: "Næring & industri", letter: "C", bg: "bg-orange-light" },
                  { name: "Kurs & arrangement", letter: "D", bg: "bg-sand" },
                ].map((g) => (
                  <div
                    key={g.letter}
                    className={`${g.bg} rounded-xl p-4 text-center`}
                  >
                    <p className="font-semibold text-sm text-navy">
                      Gruppe {g.letter}
                    </p>
                    <p className="text-xs text-navy/45 mt-1">{g.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styret */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Styret
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-10">
            Mennesker med engasjement
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {styret.map((medlem, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-navy/8 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-navy/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={0.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-navy text-sm">{medlem.navn}</p>
                <p className="text-xs text-navy/40">{medlem.rolle}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-navy/30 mt-10 italic">
            Oppdateres etter årsmøtet 2026
          </p>
        </div>
      </section>
    </>
  );
}
