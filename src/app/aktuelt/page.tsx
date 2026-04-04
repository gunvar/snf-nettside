import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { NYHETER_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Aktuelt",
  description: "Nyheter og saker fra Skudeneshavn Næringsforening.",
};

interface Nyhet {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  kategori: string;
  ingress: string;
}

export default async function Aktuelt() {
  const nyheter = await client.fetch<Nyhet[]>(NYHETER_QUERY, {}, { next: { tags: ["nyhet"] } });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/audun_24.jpg"
          alt="Skudeneshavn gate"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nyheter.map((nyhet) => (
                <Link
                  key={nyhet._id}
                  href={`/aktuelt/${nyhet.slug.current}`}
                  className="border border-navy/8 rounded-xl p-7 hover:border-gold/30 hover:shadow-sm transition-all block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-navy/35 font-medium">
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
                  <h2 className="font-serif text-xl text-navy mb-3">
                    {nyhet.tittel}
                  </h2>
                  <p className="text-sm text-navy/50 leading-relaxed">
                    {nyhet.ingress}
                  </p>
                </Link>
              ))}
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
