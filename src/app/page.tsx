import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ARRANGEMENTER_SISTE_QUERY, NYHETER_SISTE_QUERY } from "@/sanity/queries";

interface SisteArrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  type: string;
  bilde?: { asset: unknown };
}

interface SisteNyhet {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  kategori: string;
  ingress: string;
  bilde?: { asset: unknown };
}

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
      {/* ═══ HERO — editorial split ═══ */}
      <section className="relative min-h-screen bg-navy-dark">
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero_01.jpg"
            alt="Skudeneshavn sett fra sjøen"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-navy-dark/20 lg:via-navy-dark/70 lg:to-transparent" />
        </div>

        {/* Content — left-aligned editorial block */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-end pb-20 pt-32 lg:pb-28">
          <div className="max-w-xl">
            <p className="text-gold/80 text-sm font-medium tracking-widest uppercase mb-6">
              Skudeneshavn Næringsforening
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
              Verdensledende
              <br />
              verdiskaping i rammen
              <br />
              <span className="text-gold">av det gode liv</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md mb-12">
              Vi forener næring, kultur og kystidentitet for å gjøre
              Skudeneshavn til Karmøys sterkeste sted.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/pilarer"
                className="bg-gold text-navy px-7 py-3.5 text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                Hva vi jobber med
              </Link>
              <Link
                href="/om-oss"
                className="text-white/60 text-sm font-medium hover:text-white transition-colors group"
              >
                Om foreningen
                <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
            <div className="w-px h-12 bg-white/20 mx-auto" />
          </div>
        </div>
      </section>

      {/* ═══ IDENTITET — hvem vi er, kort og tydelig ═══ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Statement */}
            <div className="lg:col-span-5">
              <div className="w-12 h-0.5 bg-gold mb-8" />
              <h2 className="font-serif text-3xl sm:text-4xl text-navy leading-snug mb-6">
                Stemmen for
                <br />næringslivet i
                <br />Skudeneshavn
              </h2>
              <p className="text-navy/50 leading-relaxed mb-10">
                Skudeneshavn Næringsforening samler 48 medlemmer fra
                næringsliv, handel og foreninger rundt én felles ambisjon:
                å bygge et lokalsamfunn der næring, kultur og livskvalitet
                forsterker hverandre.
              </p>

              {/* Nøkkeltall */}
              <div className="flex gap-10">
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

            {/* Three roles */}
            <div className="lg:col-span-7 lg:pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
                {[
                  {
                    verb: "Påvirke",
                    desc: "Vi setter dagsorden overfor kommune og region — og er premissleverandør for næringslivet på Karmøy.",
                  },
                  {
                    verb: "Koble",
                    desc: "Vi skaper arenaer der industri, handel, gründere og kapital møtes og finner hverandre.",
                  },
                  {
                    verb: "Tilrettelegge",
                    desc: "Vi driver frem konkrete prosjekter som øker attraktiviteten og skaper målbare resultater.",
                  },
                ].map((item, i) => (
                  <div key={item.verb}>
                    <span className="text-gold/60 text-xs font-semibold tracking-widest uppercase">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-xl text-navy mt-2 mb-3">
                      {item.verb}
                    </h3>
                    <p className="text-navy/45 text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PILARER — asymmetrisk, redaksjonelt ═══ */}
      <section className="bg-sand-light grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="mb-16">
            <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
              Strategi 2026–2036
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-2 max-w-lg">
              Tre pilarer for
              <br />Skudeneshavns fremtid
            </h2>
          </div>

          {/* Pilar 1 — large feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Link
              href="/pilarer#pilar-01"
              className="group relative aspect-[4/3] overflow-hidden img-zoom"
            >
              <Image
                src="/images/skudeneshavn/audun_09.jpg"
                alt="Rammevilkår for næring og industri"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="h-1 w-10 bg-sea-blue/80 rounded-full mb-4" />
                <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                  Pilar 01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 group-hover:text-gold transition-colors">
                  Rammevilkår for
                  <br />næring og industri
                </h3>
                <p className="text-white/50 text-sm mt-3 max-w-sm leading-relaxed">
                  Vi sikrer at bedriftene har arealene, infrastrukturen
                  og tilgangen de trenger for å vokse og bli værende.
                </p>
              </div>
            </Link>

            {/* Pilar 2 + 3 stacked */}
            <div className="flex flex-col gap-8">
              <Link
                href="/pilarer#pilar-02"
                className="group relative aspect-[16/9] overflow-hidden img-zoom"
              >
                <Image
                  src="/images/skudeneshavn/audun_11.jpg"
                  alt="Attraktivt bosted"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-1 w-10 bg-green/80 rounded-full mb-3" />
                  <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                    Pilar 02
                  </span>
                  <h3 className="font-serif text-xl text-white mt-1 group-hover:text-gold transition-colors">
                    Attraktivt bosted
                  </h3>
                  <p className="text-white/50 text-sm mt-2 max-w-xs leading-relaxed">
                    Vi jobber for at Skudeneshavn blir førstevalget for
                    barnefamilier og alle som søker livskvalitet.
                  </p>
                </div>
              </Link>

              <Link
                href="/pilarer#pilar-03"
                className="group relative aspect-[16/9] overflow-hidden img-zoom"
              >
                <Image
                  src="/images/skudeneshavn/sak_03.jpg"
                  alt="Levende sentrum hele året"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-1 w-10 bg-orange/80 rounded-full mb-3" />
                  <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                    Pilar 03
                  </span>
                  <h3 className="font-serif text-xl text-white mt-1 group-hover:text-gold transition-colors">
                    Levende sentrum hele året
                  </h3>
                  <p className="text-white/50 text-sm mt-2 max-w-xs leading-relaxed">
                    Vi skaper helårsaktivitet og profesjonaliserer
                    sentrumsutvikling.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/pilarer"
              className="text-navy/50 text-sm font-medium hover:text-navy transition-colors group"
            >
              Les mer om strategien
              <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BILDE-BREAK — full bredde ═══ */}
      <section className="relative h-[40vh] lg:h-[50vh]">
        <Image
          src="/images/skudeneshavn/audun_24.jpg"
          alt="Skudeneshavn sentrum en kveld"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/30" />
      </section>

      {/* ═══ ARRANGEMENTER — bildekort ═══ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                Kalender
              </span>
              <h2 className="font-serif text-3xl text-navy mt-1">
                Kommende arrangementer
              </h2>
            </div>
            <Link
              href="/arrangementer"
              className="text-navy/40 text-sm font-medium hover:text-navy transition-colors shrink-0"
            >
              Alle arrangementer &rarr;
            </Link>
          </div>

          {arrangementer.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {arrangementer.map((arr) => {
                const d = new Date(arr.dato);
                return (
                  <Link
                    key={arr._id}
                    href={`/arrangementer/${arr.slug.current}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy/5 mb-4">
                      {arr.bilde?.asset ? (
                        <Image
                          src={urlFor(arr.bilde).width(600).height(375).url()}
                          alt={arr.tittel}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-navy flex items-center justify-center">
                          <svg className="w-10 h-10 text-white/10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                          </svg>
                        </div>
                      )}
                      {/* Datoboks */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 text-center">
                        <span className="block font-serif text-xl text-navy leading-none">
                          {d.getDate()}
                        </span>
                        <span className="text-navy/50 text-[10px] uppercase font-medium">
                          {d.toLocaleDateString("nb-NO", { month: "short" })}
                        </span>
                      </div>
                    </div>
                    {arr.type && (
                      <span className="text-gold/70 text-xs font-medium">
                        {arr.type}
                      </span>
                    )}
                    <h3 className="font-serif text-lg text-navy mt-1 group-hover:text-gold transition-colors">
                      {arr.tittel}
                    </h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-navy/30 text-sm py-4">
              Ingen kommende arrangementer akkurat nå.
            </p>
          )}
        </div>
      </section>

      {/* ═══ AKTUELT — bildekort ═══ */}
      <section className="py-24 lg:py-28 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                Nyheter
              </span>
              <h2 className="font-serif text-3xl text-navy mt-1">
                Aktuelt
              </h2>
            </div>
            <Link
              href="/aktuelt"
              className="text-navy/40 text-sm font-medium hover:text-navy transition-colors shrink-0"
            >
              Alle saker &rarr;
            </Link>
          </div>

          {aktuelt.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aktuelt.map((sak) => (
                <Link
                  key={sak._id}
                  href={`/aktuelt/${sak.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy/5 mb-4">
                    {sak.bilde?.asset ? (
                      <Image
                        src={urlFor(sak.bilde).width(600).height(375).url()}
                        alt={sak.tittel}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-navy flex items-center justify-center">
                        <svg className="w-10 h-10 text-white/10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-navy/30 text-xs font-medium">
                    {new Date(sak.dato).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="font-serif text-lg text-navy mt-1 group-hover:text-gold transition-colors">
                    {sak.tittel}
                  </h3>
                  {sak.ingress && (
                    <p className="text-navy/40 text-sm mt-2 leading-relaxed line-clamp-2">
                      {sak.ingress}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-navy/30 text-sm py-4">
              Ingen nyheter publisert ennå.
            </p>
          )}
        </div>
      </section>

      {/* ═══ SAMARBEIDSPARTNERE ═══ */}
      <section className="py-14 bg-sand-light border-t border-navy/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-navy/25 tracking-widest uppercase mb-8">
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
                  className="object-contain h-10 w-auto opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — involvering ═══ */}
      <section className="bg-navy-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-snug mb-6">
                Bli med å forme
                <br />Skudeneshavns fremtid
              </h2>
              <p className="text-white/45 leading-relaxed max-w-md mb-10">
                Over 80 bedrifter og aktører har allerede valgt å investere
                i stedets utvikling. Medlemskap gir deg tilgang til
                nettverk, arrangementer og direkte innflytelse.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/medlemskap"
                  className="bg-gold text-navy px-8 py-3.5 text-sm font-semibold hover:bg-gold-light transition-colors"
                >
                  Bli medlem
                </Link>
                <Link
                  href="/kontakt"
                  className="text-white/40 text-sm font-medium hover:text-white/70 transition-colors py-3.5"
                >
                  Eller ta kontakt &rarr;
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden hidden lg:block">
              <Image
                src="/images/skudeneshavn/sak_02.jpg"
                alt="Skudeneshavn ved solnedgang"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-dark/20" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
