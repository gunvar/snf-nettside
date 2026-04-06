import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ARRANGEMENTER_QUERY, ARRANGEMENTER_AVHOLDTE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Arrangementer",
  description: "Kommende arrangementer fra Skudeneshavn Næringsforening.",
  openGraph: {
    images: [{ url: "https://www.skudenesnf.no/images/skudeneshavn/sak_09.jpg", width: 1200, height: 630 }],
  },
};

interface Arrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  sluttdato?: string;
  type: string;
  sted?: string;
  beskrivelse: string;
  bilde?: { asset: unknown };
  pamelding?: boolean;
  pris?: number;
}

interface AvholdtArrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  type: string;
  sted?: string;
  bilde?: { asset: unknown };
}

export default async function Arrangementer() {
  const [arrangementer, avholdte] = await Promise.all([
    client.fetch<Arrangement[]>(
      ARRANGEMENTER_QUERY,
      {},
      { next: { tags: ["arrangement"] } }
    ),
    client.fetch<AvholdtArrangement[]>(
      ARRANGEMENTER_AVHOLDTE_QUERY,
      {},
      { next: { tags: ["arrangement"] } }
    ),
  ]);

  const nesteArr = arrangementer[0];
  const resten = arrangementer.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/sak_09.jpg"
          alt="Skudeneshavn havn om kvelden"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Arrangementer
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Møteplasser som bygger kompetanse, engasjement og
            gjennomføringsevne.
          </p>
        </div>
      </section>

      {/* Kommende */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Kalender
          </span>
          <h2 className="font-serif text-3xl text-navy mt-2 mb-12">
            Kommende arrangementer
          </h2>

          {arrangementer.length > 0 ? (
            <div className="space-y-16">
              {/* Neste arrangement — fremhevet */}
              {nesteArr && (
                <Link
                  href={`/arrangementer/${nesteArr.slug.current}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-light">
                    {nesteArr.bilde?.asset ? (
                      <Image
                        src={urlFor(nesteArr.bilde).width(800).height(500).url()}
                        alt={nesteArr.tittel}
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
                    {/* Datoboks over bildet */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 text-center">
                      <span className="block font-serif text-2xl text-navy leading-none">
                        {new Date(nesteArr.dato).getDate()}
                      </span>
                      <span className="text-navy/50 text-xs uppercase font-medium">
                        {new Date(nesteArr.dato).toLocaleDateString("nb-NO", { month: "short" })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {nesteArr.type && (
                        <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded">
                          {nesteArr.type}
                        </span>
                      )}
                      {nesteArr.pamelding && (
                        <span className="text-xs font-medium text-green bg-green-light px-2.5 py-1 rounded">
                          Påmelding åpen
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-navy mb-4 group-hover:text-gold transition-colors">
                      {nesteArr.tittel}
                    </h3>
                    <p className="text-navy/50 leading-relaxed mb-4 line-clamp-3">
                      {nesteArr.beskrivelse}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-navy/35">
                      {nesteArr.sted && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          {nesteArr.sted}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {new Date(nesteArr.dato).toLocaleTimeString("nb-NO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <span className="inline-block mt-6 text-sm font-medium text-navy/40 group-hover:text-gold transition-colors">
                      Les mer &rarr;
                    </span>
                  </div>
                </Link>
              )}

              {/* Resten i kortgrid med bilder */}
              {resten.length > 0 && (
                <>
                  <div className="h-px bg-navy/8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resten.map((arr) => {
                      const d = new Date(arr.dato);
                      return (
                        <Link
                          key={arr._id}
                          href={`/arrangementer/${arr.slug.current}`}
                          className="group block"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-sand-light mb-4">
                            {arr.bilde?.asset ? (
                              <Image
                                src={urlFor(arr.bilde).width(600).height(375).url()}
                                alt={arr.tittel}
                                fill
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-navy flex items-center justify-center">
                                <svg className="w-8 h-8 text-white/10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                              </div>
                            )}
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
                            <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded">
                              {arr.type}
                            </span>
                          )}
                          <h3 className="font-serif text-lg text-navy group-hover:text-gold transition-colors mt-1 mb-1">
                            {arr.tittel}
                          </h3>
                          <p className="text-sm text-navy/45 leading-relaxed line-clamp-2">
                            {arr.beskrivelse}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-navy/30 text-sm italic">
                Ingen kommende arrangementer akkurat nå. Kom tilbake snart!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Helårsambisjon */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Ambisjon
            </span>
            <h2 className="font-serif text-3xl text-navy mt-2 mb-6">
              Helårsaktivitet
            </h2>
            <p className="text-navy/50 text-[15px] leading-relaxed mb-8">
              En av våre viktigste ambisjoner er å gjøre Skudeneshavn til en
              helårsby. Vi arbeider med et årshjul som sikrer minimum ett
              arrangement per måned — også utenfor sommersesongen.
            </p>
            <Link
              href="/kontakt"
              className="text-sea-blue text-sm font-medium hover:underline underline-offset-4"
            >
              Kontakt oss for å foreslå arrangementer &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Skudeneshavn */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy/40 text-sm mb-4">
            For turismeinformasjon og aktiviteter i Skudeneshavn
          </p>
          <a
            href="https://www.visitskudeneshavn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 text-sm font-medium hover:bg-navy-light transition-colors"
          >
            Visit Skudeneshavn
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* Avholdte arrangementer */}
      {avholdte.length > 0 && (
        <section className="py-20 bg-sand-light grain">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
              Tilbakeblikk
            </span>
            <h2 className="font-serif text-3xl text-navy mt-2 mb-10">
              Avholdte arrangementer
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {avholdte.map((arr) => {
                const d = new Date(arr.dato);
                return (
                  <Link
                    key={arr._id}
                    href={`/arrangementer/${arr.slug.current}`}
                    className="group flex items-start gap-4 py-4 border-b border-navy/8 last:border-b-0"
                  >
                    <div className="shrink-0 w-14 text-center pt-0.5">
                      <span className="block font-serif text-2xl text-navy leading-none">
                        {d.getDate()}
                      </span>
                      <span className="text-navy/35 text-[10px] uppercase font-medium">
                        {d.toLocaleDateString("nb-NO", { month: "short" })}
                      </span>
                      <span className="block text-navy/20 text-[10px]">
                        {d.getFullYear()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[15px] text-navy group-hover:text-gold transition-colors">
                        {arr.tittel}
                      </h3>
                      {arr.type && (
                        <span className="text-navy/30 text-xs">
                          {arr.type}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
