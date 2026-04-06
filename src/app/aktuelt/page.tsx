import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { NYHETER_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Aktuelt",
  description: "Nyheter og saker fra Skudeneshavn Næringsforening.",
  openGraph: {
    images: [{ url: "https://www.skudenesnf.no/images/skudeneshavn/audun_24.jpg", width: 1200, height: 630 }],
  },
};

interface Nyhet {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  kategori: string;
  ingress: string;
  bilde?: { asset: unknown };
}

export default async function Aktuelt() {
  const nyheter = await client.fetch<Nyhet[]>(NYHETER_QUERY, {}, { next: { tags: ["nyhet"] } });

  const forsteSak = nyheter[0];
  const resten = nyheter.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/audun_24.jpg"
          alt="Skudeneshavn sentrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Aktuelt
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Nyheter, saker og oppdateringer fra Skudeneshavn Næringsforening.
          </p>
        </div>
      </section>

      {/* Nyheter */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {nyheter.length > 0 ? (
            <div className="space-y-16">
              {/* Fremhevet førstesak */}
              {forsteSak && (
                <Link
                  href={`/aktuelt/${forsteSak.slug.current}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-light">
                    {forsteSak.bilde?.asset ? (
                      <Image
                        src={urlFor(forsteSak.bilde).width(800).height(500).url()}
                        alt={forsteSak.tittel}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-sand flex items-center justify-center">
                        <span className="text-navy/20 text-sm">Ingen bilde</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-navy/30 text-xs font-medium">
                        {new Date(forsteSak.dato).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {forsteSak.kategori && (
                        <span className="text-xs font-medium bg-sand px-2.5 py-0.5 rounded text-navy/50">
                          {forsteSak.kategori}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-4 group-hover:text-gold transition-colors">
                      {forsteSak.tittel}
                    </h2>
                    <p className="text-navy/50 leading-relaxed line-clamp-3">
                      {forsteSak.ingress}
                    </p>
                    <span className="inline-block mt-6 text-sm font-medium text-navy/40 group-hover:text-gold transition-colors">
                      Les mer &rarr;
                    </span>
                  </div>
                </Link>
              )}

              {/* Resten i grid med bilder */}
              {resten.length > 0 && (
                <>
                  <div className="h-px bg-navy/8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resten.map((nyhet) => (
                      <Link
                        key={nyhet._id}
                        href={`/aktuelt/${nyhet.slug.current}`}
                        className="group block"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-sand-light mb-4">
                          {nyhet.bilde?.asset ? (
                            <Image
                              src={urlFor(nyhet.bilde).width(600).height(375).url()}
                              alt={nyhet.tittel}
                              fill
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-sand flex items-center justify-center">
                              <span className="text-navy/20 text-sm">Ingen bilde</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-navy/30 text-xs font-medium">
                            {new Date(nyhet.dato).toLocaleDateString("nb-NO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          {nyhet.kategori && (
                            <span className="text-xs font-medium bg-sand px-2.5 py-0.5 rounded text-navy/50">
                              {nyhet.kategori}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg text-navy group-hover:text-gold transition-colors mb-2">
                          {nyhet.tittel}
                        </h3>
                        <p className="text-sm text-navy/45 leading-relaxed line-clamp-3">
                          {nyhet.ingress}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-navy/30 text-sm italic">
                Ingen nyheter publisert ennå. Kom tilbake snart!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
