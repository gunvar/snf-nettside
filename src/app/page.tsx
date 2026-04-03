import Link from "next/link";

const pilarer = [
  {
    number: "01",
    title: "Rammevilkår for næring og industri",
    description:
      "Vi sikrer at bedriftene har arealene, infrastrukturen og tilgangen de trenger for å vokse og bli værende i Skudeneshavn.",
    color: "bg-sea-light text-sea-blue",
    borderColor: "border-sea-blue",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Attraktivt bosted",
    description:
      "Uten folk, ingen industri. Vi jobber for at Skudeneshavn blir førstevalget for barnefamilier og alle som søker livskvalitet.",
    color: "bg-green-light text-green",
    borderColor: "border-green",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Levende sentrum hele året",
    description:
      "Et dødt sentrum er dårlig omdømme. Vi profesjonaliserer sentrumsutvikling og skaper helårsaktivitet.",
    color: "bg-orange-light text-orange",
    borderColor: "border-orange",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
];

const aktuelt = [
  {
    date: "Januar 2026",
    title: "Ny strategi vedtatt: «Fra postkort til powerhouse»",
    excerpt: "Styret vedtok 8. januar den nye strategiplanen som transformerer foreningen til en profesjonell utviklingsmotor.",
  },
  {
    date: "2026",
    title: "Fire ressursgrupper etableres",
    excerpt: "Byutvikling, turisme/handel, næring/industri og kurs/arrangement — vi bygger gjennomføringskraft.",
  },
  {
    date: "2026",
    title: "Ny nettside lansert",
    excerpt: "Skudeneshavn Næringsforening har fått ny nettside som synliggjør foreningens arbeid og ambisjoner.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-4">
              Skudeneshavn Næringsforening
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Fra postkort til{" "}
              <span className="text-gold">powerhouse</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4 max-w-2xl">
              Skudeneshavn Næringsforening arbeider for å gjøre Skudeneshavn til
              Karmøys mest attraktive sted for bosetting, næringsliv og besøk.
            </p>
            <p className="text-base text-white/60 italic mb-10 max-w-2xl">
              «Skudeneshavn — verdensledende verdiskaping i rammen av det gode liv.»
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pilarer"
                className="bg-gold text-navy px-6 py-3 rounded-md font-semibold text-center hover:bg-gold-light transition-colors"
              >
                Se hva vi jobber med
              </Link>
              <Link
                href="/medlemskap"
                className="border-2 border-white/30 text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-white/10 transition-colors"
              >
                Bli medlem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tre roller */}
      <section className="bg-sand-light py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { verb: "Påvirke", desc: "Vi setter dagsorden overfor kommune og region" },
              { verb: "Koble", desc: "Vi skaper arenaer der industri, handel og kapital møtes" },
              { verb: "Tilrettelegge", desc: "Vi driver frem konkrete prosjekter som øker attraktiviteten" },
            ].map((item) => (
              <div key={item.verb} className="px-6 py-6">
                <h3 className="text-navy font-bold text-xl mb-2">{item.verb}</h3>
                <p className="text-navy/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategiske pilarer */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Tre strategiske pilarer
            </h2>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Strategien bygger på tre gjensidig forsterkende pilarer som
              til sammen skal transformere Skudeneshavn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pilarer.map((pilar) => (
              <Link
                key={pilar.number}
                href={`/pilarer#pilar-${pilar.number}`}
                className={`group rounded-xl border-l-4 ${pilar.borderColor} bg-white p-8 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${pilar.color} mb-5`}>
                  {pilar.icon}
                </div>
                <span className="text-xs font-semibold text-navy/40 uppercase tracking-wider">
                  Pilar {pilar.number}
                </span>
                <h3 className="text-xl font-bold text-navy mt-1 mb-3 group-hover:text-gold transition-colors">
                  {pilar.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {pilar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Paradokset / Kontekst */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Skudeneshavn-paradokset
            </h2>
            <p className="text-lg text-navy/70 leading-relaxed mb-6">
              Byen huser hovedkontoret til et av verdens største offshorerederier,
              men sliter med å få gjennomslag for basale infrastrukturtiltak.
              Vi har global kompetanse, men lokal avmakt.
            </p>
            <p className="text-base text-navy/60 italic">
              «Hvis Skudeneshavn mangler en god skole, byggeklare tomter eller
              et levende sentrum, taper bedriftene kampen om talentene.»
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelt */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-navy">Aktuelt</h2>
            <Link
              href="/aktuelt"
              className="text-sea-blue font-medium text-sm hover:underline"
            >
              Se alle saker &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aktuelt.map((sak, i) => (
              <article key={i} className="border border-navy/10 rounded-lg p-6 hover:border-gold/50 transition-colors">
                <span className="text-xs font-medium text-navy/40 uppercase tracking-wider">
                  {sak.date}
                </span>
                <h3 className="text-lg font-bold text-navy mt-2 mb-3">
                  {sak.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  {sak.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Invester i Skudeneshavns fremtid
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-4 text-lg">
            Vi selger ikke et medlemskap. Vi selger en investering i stedets fremtid.
          </p>
          <p className="text-white/50 max-w-xl mx-auto mb-10">
            Bolyst gir folk. Helårssentrum gir liv. Arbeidsplasser gir varighet.
            Sammen gir de: bosetting + verdiskaping + identitet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/medlemskap"
              className="bg-gold text-navy px-8 py-3 rounded-md font-semibold hover:bg-gold-light transition-colors"
            >
              Bli medlem
            </Link>
            <Link
              href="/kontakt"
              className="border-2 border-white/30 px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
            >
              Ta kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
