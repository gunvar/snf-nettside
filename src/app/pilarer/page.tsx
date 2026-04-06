import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PhotoCredit from "@/components/PhotoCredit";

export const metadata: Metadata = {
  title: "Hva vi jobber med",
  description:
    "Tre strategiske pilarer: Rammevilkår, attraktivitet og levende sentrum.",
  openGraph: {
    images: [{ url: "https://www.skudenesnf.no/images/skudeneshavn/sak_08.jpg", width: 1200, height: 630 }],
  },
};

const pilarData = [
  {
    id: "01",
    title: "Rammevilkår for næring og industri",
    desc: "Vi sikrer at bedriftene har arealene, infrastrukturen og tilgangen de trenger for å vokse og bli værende i Skudeneshavn.",
    maal: "Næringslivet har tilgang på tomter, infrastruktur og rammevilkår som gjør det attraktivt å etablere, utvide og bli værende. Storamyr 2 realisert innen 5 år.",
    grupper: "Ressursgruppe A + C",
    image: "/images/skudeneshavn/sentinel2.jpg",
    color: "bg-sea-blue",
    colorLight: "bg-sea-light",
    dotColor: "bg-sea-blue",
    tiltak: [
      "Innspill til arealplaner og kommunale planprosesser",
      "Dialog med kommune om infrastruktur og tomtebehov",
      "Pådriver for realisering av Storamyr 2",
      "Etablering av coworking-hub for fjernarbeidere og gründere",
      "Sørge for rammevilkår slik at etablerte aktører forblir i Skudeneshavn",
      "Rekruttering og kompetanseutvikling",
      "Være talerrør for næringslivet",
    ],
  },
  {
    id: "02",
    title: "Attraktivt bosted",
    desc: "Uten folk, ingen industri. Vi jobber for at Skudeneshavn blir førstevalget for barnefamilier og alle som søker livskvalitet.",
    maal: "Økt tilflytting. Førstevalg for barnefamilier på Haugalandet. Befolkningsvekst fra 3.500 til 3.800.",
    grupper: "Ressursgruppe A",
    image: "/images/skudeneshavn/audun_10.jpg",
    color: "bg-green",
    colorLight: "bg-green-light",
    dotColor: "bg-green",
    tiltak: [
      "Sikre skole og barnehage — moderne struktur (0–16 år)",
      "Nye boligprosjekter: Steiningsholmen, «Tanken», Storamyr 2",
      "Synliggjøre livskvalitet og bolyst",
      "Tiltak for økt byggeaktivitet og bedre utnyttelse av tomter",
      "Bedre tilgjengelighet: pendling, transport, gang/sykkel",
      "Årlig byggeskikkpris",
    ],
  },
  {
    id: "03",
    title: "Levende sentrum hele året",
    desc: "Et dødt sentrum er dårlig omdømme. Vi profesjonaliserer sentrumsutvikling og skaper helårsaktivitet.",
    maal: "Liv i sentrum hele året. Maks 2 tomme lokaler. Min. 1 arrangement per måned utenfor høysesong.",
    grupper: "Ressursgruppe B + D",
    image: "/images/skudeneshavn/sak_03.jpg",
    color: "bg-orange",
    colorLight: "bg-orange-light",
    dotColor: "bg-orange",
    tiltak: [
      "Årshjul med aktiviteter gjennom hele året",
      "Koordinerte åpningstider og felles kampanjer",
      "«Nullvisjon for forfall» — dialog med gårdeiere",
      "Turisme og opplevelsesutvikling",
      "Sesongforlengelse og flere overnattinger",
      "Samarbeid med lag, foreninger og kulturaktører",
      "Kurs, seminarer og nettverksarrangement",
    ],
  },
];

export default function Pilarer() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/sak_08.jpg"
          alt="Gamle Skudeneshavn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Hva vi jobber med
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Tre gjensidig forsterkende pilarer som sammen skaper grunnlaget
            for Skudeneshavns fremtid.
          </p>
        </div>
      </section>

      {/* Pilarer */}
      {pilarData.map((pilar, idx) => (
        <section
          key={pilar.id}
          id={`pilar-${pilar.id}`}
          className={`py-20 ${idx % 2 === 0 ? "bg-white" : "bg-sand-light grain"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Tekst */}
              <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${pilar.color} h-1 w-8 rounded-full opacity-70`} />
                  <span className="text-xs text-navy/35 font-medium uppercase tracking-wider">
                    Pilar {pilar.id} &middot; {pilar.grupper}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-navy mb-4">
                  {pilar.title}
                </h2>
                <p className="text-navy/60 text-[15px] leading-relaxed mb-6">
                  {pilar.desc}
                </p>
                <div className={`${pilar.colorLight} rounded-lg p-5 mb-8`}>
                  <p className="font-semibold text-navy text-sm mb-1">Mål</p>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    {pilar.maal}
                  </p>
                </div>
                <h3 className="font-semibold text-navy text-sm mb-4 uppercase tracking-wider">
                  Tiltak
                </h3>
                <ul className="space-y-2.5">
                  {pilar.tiltak.map((tiltak, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-navy/60"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full ${pilar.dotColor} shrink-0 opacity-60`}
                      />
                      {tiltak}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bilde */}
              <div
                className={`relative overflow-hidden aspect-[4/3] ${
                  idx % 2 !== 0 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={pilar.image}
                  alt={pilar.title}
                  fill
                  className="object-cover"
                />
                {pilar.image.includes("sak_") && (
                  <PhotoCredit photographer="Svein Arthur Kallevik" />
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Visit Skudeneshavn */}
      <section className="py-14 bg-sand grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy/45 text-sm mb-4">
            For turismeinformasjon om Skudeneshavn
          </p>
          <a
            href="https://www.visitskudeneshavn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded text-sm font-medium hover:bg-navy-light transition-colors"
          >
            Visit Skudeneshavn
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/skudeneshavn/sak_09.jpg"
          alt="Skudeneshavn om kvelden"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Vil du bidra?
          </h2>
          <p className="text-white/55 mb-8 max-w-md mx-auto text-[15px]">
            Bli med og forme fremtiden. Som medlem kan du engasjere deg
            i ressursgruppene og være med å påvirke.
          </p>
          <Link
            href="/medlemskap"
            className="bg-gold text-navy px-8 py-3 rounded text-sm font-semibold hover:bg-gold-light transition-colors"
          >
            Bli medlem
          </Link>
        </div>
      </section>
    </>
  );
}
