import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Skudeneshavn Næringsforening — hvem vi er, vår strategi og organisasjon.",
};

const styret = [
  {
    navn: "Trond Eliassen Reiersen",
    rolle: "Styrets leder",
    bilde: "/images/styret/Trond_02.jpeg",
  },
  { navn: "Jens Inge Eng", rolle: "Styremedlem" },
  { navn: "Rebekka Sandslett", rolle: "Styremedlem" },
  { navn: "Ståle Landaas", rolle: "Styremedlem" },
  { navn: "Gunvar Mjølhus", rolle: "Styremedlem" },
  { navn: "Per Onar Stol", rolle: "Styremedlem" },
  { navn: "Nina Wareberg", rolle: "Styremedlem" },
  { navn: "Elisabeth Mortensen", rolle: "Styremedlem" },
];

const ressursgrupper = [
  {
    letter: "A",
    name: "Byutvikling og infrastruktur",
    bg: "bg-sea-light",
    borderColor: "border-sea-blue/30",
    dotColor: "bg-sea-blue",
    desc: "Ressursgruppe A jobber med den fysiske utviklingen av Skudeneshavn. Gruppen følger opp arealplaner, infrastrukturbehov og boligutvikling, og er bindeleddet mellom næringsliv og kommune i spørsmål om tomter, transport og tilgjengelighet.",
    pilarer: "Pilar 1 og 2",
  },
  {
    letter: "B",
    name: "Turisme, handel og opplevelse",
    bg: "bg-green-light",
    borderColor: "border-green/30",
    dotColor: "bg-green",
    desc: "Ressursgruppe B utvikler Skudeneshavn som reisemål og handelsdestinasjon. Gruppen koordinerer tiltak for sesongforlengelse, felles markedsføring og samarbeid mellom butikker, serveringssteder, festivaler og opplevelsesaktører.",
    pilarer: "Pilar 3",
  },
  {
    letter: "C",
    name: "Næring og industri",
    bg: "bg-orange-light",
    borderColor: "border-orange/30",
    dotColor: "bg-orange",
    desc: "Ressursgruppe C er talerrør for det lokale næringslivet. Gruppen jobber for gode rammevilkår, rekruttering og kompetanseutvikling, og driver dialogen med kommune og region om næringslivets behov.",
    pilarer: "Pilar 1",
  },
  {
    letter: "D",
    name: "Kurs, seminarer og arrangement",
    bg: "bg-sand",
    borderColor: "border-gold/30",
    dotColor: "bg-gold",
    desc: "Ressursgruppe D skaper møteplasser og helårsaktivitet. Gruppen planlegger og gjennomfører arrangementer, kurs og nettverkssamlinger som styrker samholdet og gjør sentrum levende hele året.",
    pilarer: "Pilar 3",
  },
];

export default function OmOss() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/Audun_06.jpg"
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
            Vi er næringsforeningen - og vi jobber for Skudeneshavns fremtid.
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
              <p className="text-navy/55 text-[15px] leading-relaxed mb-8">
                Skudeneshavn har alle forutsetninger for å bli det mest attraktive
                stedet å bo og drive virksomhet på Karmøy. Med en ny strategisk
                retning jobber vi målrettet for å realisere dette potensialet.
              </p>

              {/* Nøkkeltall */}
              <div className="flex gap-10 pt-6 border-t border-navy/8">
                {[
                  { tall: "48", enhet: "medlemmer" },
                  { tall: "4 233", enhet: "arbeidsplasser" },
                  { tall: "4,5 mrd", enhet: "kr i omsetning" },
                ].map((item) => (
                  <div key={item.enhet}>
                    <p className="font-serif text-2xl text-navy leading-none">
                      {item.tall}
                    </p>
                    <p className="text-navy/30 text-xs mt-1">{item.enhet}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="/images/skudeneshavn/sak_06.jpg"
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

          {/* Styreleder */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
            <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/30">
              <Image
                src="/images/styret/Trond_02.jpeg"
                alt="Trond Eliassen Reiersen"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl text-navy">
                Trond Eliassen Reiersen
              </p>
              <p className="text-gold text-sm font-medium mt-1">Styrets leder</p>
            </div>
          </div>

          {/* Styremedlemmer */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {styret
              .filter((m) => m.rolle !== "Styrets leder")
              .map((medlem, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 bg-navy/8 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-navy/20"
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
                  <p className="text-xs text-navy/40 mt-0.5">{medlem.rolle}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Ressursgrupper */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Ressursgrupper
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-4">
            Her skjer jobben
          </h2>
          <p className="text-navy/55 text-[15px] leading-relaxed max-w-2xl mb-12">
            Ressursgruppene er næringsforeningens operative arm. Det er her
            medlemmer og frivillige bidrar med kompetanse og engasjement innenfor
            sine interesseområder.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ressursgrupper.map((gruppe) => (
              <div
                key={gruppe.letter}
                className={`${gruppe.bg} border ${gruppe.borderColor} rounded-xl p-7`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`${gruppe.dotColor} h-2 w-2 rounded-full opacity-70`}
                  />
                  <span className="text-xs text-navy/40 font-medium uppercase tracking-wider">
                    Gruppe {gruppe.letter} &middot; {gruppe.pilarer}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">
                  {gruppe.name}
                </h3>
                <p className="text-sm text-navy/55 leading-relaxed">
                  {gruppe.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA - Bidra i en ressursgruppe */}
          <div className="mt-14 bg-navy rounded-xl p-8 sm:p-10 text-center">
            <h3 className="font-serif text-2xl text-white mb-3">
              Vil du bidra i en ressursgruppe?
            </h3>
            <p className="text-white/55 text-[15px] max-w-lg mx-auto mb-6 leading-relaxed">
              Ressursgruppene er åpne for alle som vil engasjere seg i
              Skudeneshavns utvikling. Ta kontakt med styret, så finner vi en
              gruppe som passer for deg.
            </p>
            <a
              href="mailto:Skude.nf@gmail.com?subject=Jeg%20vil%20bidra%20i%20en%20ressursgruppe"
              className="inline-block bg-gold text-navy px-8 py-3 rounded text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Ta kontakt
            </a>
            <p className="text-white/30 text-xs mt-4">
              Send oss en e-post til{" "}
              <a
                href="mailto:Skude.nf@gmail.com"
                className="text-gold/60 hover:text-gold/80 transition-colors"
              >
                Skude.nf@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
