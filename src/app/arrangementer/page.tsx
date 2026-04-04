import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { ARRANGEMENTER_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Arrangementer",
  description: "Kommende arrangementer fra Skudeneshavn Næringsforening.",
};

interface Arrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  type: string;
  sted?: string;
  beskrivelse: string;
  pamelding?: boolean;
  pris?: number;
}

export default async function Arrangementer() {
  const arrangementer = await client.fetch<Arrangement[]>(
    ARRANGEMENTER_QUERY,
    {},
    { next: { tags: ["arrangement"] } }
  );

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/9.jpg"
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
          <h2 className="font-serif text-3xl text-navy mt-2 mb-10">
            Kommende arrangementer
          </h2>

          {arrangementer.length > 0 ? (
            <div className="space-y-5">
              {arrangementer.map((arr) => (
                <Link
                  key={arr._id}
                  href={`/arrangementer/${arr.slug.current}`}
                  className="border border-navy/8 rounded-xl p-6 hover:border-gold/30 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-5 block"
                >
                  <div className="sm:w-36 shrink-0">
                    <div className="bg-sand-light rounded-lg px-4 py-3 text-center">
                      <p className="font-semibold text-navy text-sm">
                        {new Date(arr.dato).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      {arr.sted && (
                        <p className="text-xs text-navy/40 mt-1">{arr.sted}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {arr.type && (
                        <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded">
                          {arr.type}
                        </span>
                      )}
                      {arr.pamelding && (
                        <span className="text-xs font-medium text-green bg-green-light px-2 py-0.5 rounded">
                          Påmelding åpen
                        </span>
                      )}
                      {arr.pris && arr.pris > 0 && (
                        <span className="text-xs font-medium text-navy/40">
                          {arr.pris} kr
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg text-navy mt-2 mb-2">
                      {arr.tittel}
                    </h3>
                    <p className="text-sm text-navy/50 leading-relaxed">
                      {arr.beskrivelse}
                    </p>
                  </div>
                </Link>
              ))}
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
    </>
  );
}
