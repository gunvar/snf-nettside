import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { ARRANGEMENTER_SISTE_QUERY, NYHETER_SISTE_QUERY } from "@/sanity/queries";

interface SisteArrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  type: string;
}

interface SisteNyhet {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  kategori: string;
  ingress: string;
}

const pilarer = [
  {
    number: "01",
    title: "Rammevilkår for næring og industri",
    description:
      "Vi sikrer at bedriftene har arealene, infrastrukturen og tilgangen de trenger for å vokse og bli værende.",
    image: "/images/skudeneshavn/audun_09.jpg",
    color: "bg-sea-blue",
  },
  {
    number: "02",
    title: "Attraktivt bosted",
    description:
      "Vi jobber for at Skudeneshavn blir førstevalget for barnefamilier og alle som søker livskvalitet.",
    image: "/images/skudeneshavn/audun_11.jpg",
    color: "bg-green",
  },
  {
    number: "03",
    title: "Levende sentrum hele året",
    description:
      "Vi skaper helårsaktivitet og profesjonaliserer sentrumsutvikling.",
    image: "/images/skudeneshavn/sak_03.jpg",
    color: "bg-orange",
  },
];

export default async function Home() {
  const [arrangementer, aktuelt] = await Promise.all([
    client.fetch<SisteArrangement[]>(
      ARRANGEMENTER_SISTE_QUERY,
      {},
      { next: { tags: ["arrangement"] } }
    ),
    client.fetch<SisteNyhet[]>(
      NYHETER_SISTE_QUERY,
      {},
      { next: { tags: ["nyhet"] } }
    ),
  ]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src="/images/hero/hero_01.jpg"
          alt="Skudeneshavn — utsikt over havet"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/50 to-navy/20" />

        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-32">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="accent-line mb-8" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight mb-6">
              Verdensledende verdiskaping
              <br />
              <span className="text-gold">i rammen av det gode liv</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-lg">
              Skudeneshavn Næringsforening arbeider for å gjøre Skudeneshavn
              til Karmøys mest attraktive sted for bosetting, næringsliv og besøk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pilarer"
                className="bg-gold text-navy px-6 py-3 rounded text-sm font-semibold text-center hover:bg-gold-light transition-colors"
              >
                Se hva vi jobber med
              </Link>
              <Link
                href="/medlemskap"
                className="border border-white/30 text-white px-6 py-3 rounded text-sm font-medium text-center hover:bg-white/10 transition-colors"
              >
                Bli medlem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PÅVIRKE / KOBLE / TILRETTELEGGE ═══ */}
      <section className="py-16 bg-white grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                verb: "Påvirke",
                desc: "Vi setter dagsorden overfor kommune og region og er premissleverandør for næringslivet.",
              },
              {
                verb: "Koble",
                desc: "Vi skaper arenaer der industri, handel, gründere og kapital møtes og finner hverandre.",
              },
              {
                verb: "Tilrettelegge",
                desc: "Vi driver frem konkrete prosjekter som øker attraktiviteten og skaper resultater.",
              },
            ].map((item, i) => (
              <div
                key={item.verb}
                className={`animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-2xl text-navy mt-1 mb-3">
                  {item.verb}
                </h3>
                <p className="text-navy/55 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRE STRATEGISKE PILARER ═══ */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Strategi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-1">
                Tre pilarer for fremtiden
              </h2>
            </div>
            <Link
              href="/pilarer"
              className="text-sea-blue text-sm font-medium hover:underline underline-offset-4 shrink-0"
            >
              Les mer om pilarene &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pilarer.map((pilar, i) => (
              <Link
                key={pilar.number}
                href={`/pilarer#pilar-${pilar.number}`}
                className={`group relative rounded-xl overflow-hidden aspect-[4/5] flex flex-col justify-end img-zoom animate-scale-in delay-${
                  (i + 1) * 100
                }`}
              >
                <Image
                  src={pilar.image}
                  alt={pilar.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy/30 to-transparent" />
                <div className="relative p-6 sm:p-7">
                  <div
                    className={`${pilar.color} h-1 w-8 rounded-full mb-4 opacity-80`}
                  />
                  <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                    Pilar {pilar.number}
                  </span>
                  <h3 className="font-serif text-xl text-white mt-1 mb-2 group-hover:text-gold transition-colors">
                    {pilar.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {pilar.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARRANGEMENTER ═══ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Kalender
              </span>
              <h2 className="font-serif text-3xl text-navy mt-1">
                Kommende arrangementer
              </h2>
            </div>
            <Link
              href="/arrangementer"
              className="text-sea-blue text-sm font-medium hover:underline underline-offset-4 shrink-0"
            >
              Se alle arrangementer &rarr;
            </Link>
          </div>

          {arrangementer.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {arrangementer.map((arr) => (
                <Link
                  key={arr._id}
                  href={`/arrangementer/${arr.slug.current}`}
                  className="group border border-navy/8 rounded-xl p-6 hover:border-gold/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-navy/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-navy/40 font-medium">
                        {new Date(arr.dato).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {arr.type && (
                        <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded ml-2 font-medium">
                          {arr.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-navy group-hover:text-gold transition-colors">
                    {arr.tittel}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-navy/30 text-sm italic text-center py-6">
              Ingen kommende arrangementer akkurat nå.
            </p>
          )}
        </div>
      </section>

      {/* ═══ AKTUELT ═══ */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Nyheter
              </span>
              <h2 className="font-serif text-3xl text-navy mt-1">Aktuelt</h2>
            </div>
            <Link
              href="/aktuelt"
              className="text-sea-blue text-sm font-medium hover:underline underline-offset-4 shrink-0"
            >
              Se alle saker &rarr;
            </Link>
          </div>

          {aktuelt.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aktuelt.map((sak) => (
                <Link
                  key={sak._id}
                  href={`/aktuelt/${sak.slug.current}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block"
                >
                  <span className="text-xs text-navy/35 font-medium">
                    {new Date(sak.dato).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="font-serif text-lg text-navy mt-2 mb-3">
                    {sak.tittel}
                  </h3>
                  <p className="text-sm text-navy/55 leading-relaxed">
                    {sak.ingress}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-navy/30 text-sm italic text-center py-6">
              Ingen nyheter publisert ennå.
            </p>
          )}
        </div>
      </section>

      {/* ═══ SAMARBEIDSPARTNERE ═══ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-navy/30 tracking-widest uppercase mb-10">
            Hovedsamarbeidspartnere
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {[
              { src: "/images/logo_samarbeidspartnere/solstad-offshore.png", alt: "Solstad Offshore" },
              { src: "/images/logo_samarbeidspartnere/brodr-olsen.png", alt: "Brødr. Olsen" },
              { src: "/images/logo_samarbeidspartnere/sponsorer_0014_Layer-1-1.webp", alt: "Samarbeidspartner" },
            ].map((logo) => (
              <div key={logo.alt} className="h-12 flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={48}
                  className="object-contain h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/skudeneshavn/sak_02.jpg"
          alt="Skudeneshavn ved solnedgang"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Bli med å forme Skudeneshavns fremtid
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-10 text-[15px] leading-relaxed">
            Vi selger ikke et medlemskap. Vi selger en investering i stedets fremtid.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/medlemskap"
              className="bg-gold text-navy px-8 py-3 rounded text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Bli medlem
            </Link>
            <Link
              href="/kontakt"
              className="border border-white/30 text-white px-8 py-3 rounded text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Ta kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
