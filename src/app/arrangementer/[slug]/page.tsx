import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ARRANGEMENT_SLUG_QUERY } from "@/sanity/queries";
import PortableText from "@/components/PortableText";

interface Arrangement {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  sluttdato?: string;
  type: string;
  sted?: string;
  beskrivelse: string;
  innhold?: unknown[];
  bilde?: { asset: unknown };
  pamelding?: boolean;
  maksAntall?: number;
  pris?: number;
  prisIkkeMedlem?: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const arr = await client.fetch<Arrangement | null>(ARRANGEMENT_SLUG_QUERY, {
    slug,
  });
  if (!arr) return { title: "Ikke funnet" };
  const ogImages = arr.bilde?.asset
    ? [{ url: urlFor(arr.bilde).width(1200).height(630).url(), width: 1200, height: 630 }]
    : [{ url: "https://www.skudenesnf.no/images/hero/hero_01.jpg", width: 1200, height: 630 }];
  return {
    title: arr.tittel,
    description: arr.beskrivelse,
    openGraph: { images: ogImages },
  };
}

export default async function ArrangementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const arr = await client.fetch<Arrangement | null>(
    ARRANGEMENT_SLUG_QUERY,
    { slug },
    { next: { tags: ["arrangement"] } }
  );

  if (!arr) notFound();

  const datoFormatert = new Date(arr.dato).toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Oslo",
  });

  const tidFormatert = new Date(arr.dato).toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        {arr.bilde?.asset ? (
          <Image
            src={urlFor(arr.bilde).width(1600).height(800).url()}
            alt={arr.tittel}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <Link
            href="/arrangementer"
            className="text-white/50 text-sm hover:text-white/80 transition-colors mb-4 inline-block"
          >
            &larr; Alle arrangementer
          </Link>
          {arr.type && (
            <span className="text-xs font-medium bg-gold/20 text-gold px-2.5 py-0.5 rounded ml-3">
              {arr.type}
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl text-white max-w-3xl mt-4">
            {arr.tittel}
          </h1>
        </div>
      </section>

      {/* Innhold */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Hovedinnhold */}
            <div className="lg:col-span-2">
              {arr.beskrivelse && (
                <p className="text-navy/70 text-lg leading-relaxed mb-8 font-medium">
                  {arr.beskrivelse}
                </p>
              )}
              {arr.innhold && <PortableText value={arr.innhold} />}
            </div>

            {/* Sidebar med detaljer */}
            <div>
              <div className="bg-sand-light rounded-xl p-6 sticky top-24">
                <h3 className="font-serif text-lg text-navy mb-4">
                  Praktisk info
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-navy/40 text-xs uppercase tracking-wider">
                      Dato
                    </dt>
                    <dd className="text-navy font-medium capitalize">
                      {datoFormatert}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-navy/40 text-xs uppercase tracking-wider">
                      Tid
                    </dt>
                    <dd className="text-navy font-medium">{tidFormatert}</dd>
                  </div>
                  {arr.sted && (
                    <div>
                      <dt className="text-navy/40 text-xs uppercase tracking-wider">
                        Sted
                      </dt>
                      <dd className="text-navy font-medium">{arr.sted}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-navy/40 text-xs uppercase tracking-wider">
                      Pris
                    </dt>
                    <dd className="text-navy font-medium">
                      {arr.pris && arr.pris > 0 ? (
                        <>
                          <span>{arr.pris} kr</span>
                          <span className="text-navy/40 text-xs ml-1">medlem</span>
                          {arr.prisIkkeMedlem && arr.prisIkkeMedlem > 0 && (
                            <>
                              <br />
                              <span>{arr.prisIkkeMedlem} kr</span>
                              <span className="text-navy/40 text-xs ml-1">ikke-medlem</span>
                            </>
                          )}
                        </>
                      ) : "Gratis"}
                    </dd>
                  </div>
                </dl>

                {arr.pamelding && (
                  <div className="mt-6 pt-6 border-t border-navy/10">
                    <a
                      href={`mailto:Skude.nf@gmail.com?subject=P%C3%A5melding%3A%20${encodeURIComponent(arr.tittel)}`}
                      className="block w-full bg-gold text-navy px-6 py-3 rounded text-sm font-semibold text-center hover:bg-gold-light transition-colors"
                    >
                      Meld deg på
                    </a>
                    <p className="text-xs text-navy/30 text-center mt-2">
                      Send e-post til Skude.nf@gmail.com
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
