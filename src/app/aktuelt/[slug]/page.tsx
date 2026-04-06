import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { NYHET_SLUG_QUERY } from "@/sanity/queries";
import PortableText from "@/components/PortableText";

interface Nyhet {
  _id: string;
  tittel: string;
  slug: { current: string };
  dato: string;
  kategori: string;
  ingress: string;
  innhold: unknown[];
  bilde?: { asset: unknown };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const nyhet = await client.fetch<Nyhet | null>(NYHET_SLUG_QUERY, { slug });
  if (!nyhet) return { title: "Ikke funnet" };
  const ogImages = nyhet.bilde?.asset
    ? [{ url: urlFor(nyhet.bilde).width(1200).height(630).url(), width: 1200, height: 630 }]
    : [{ url: "https://www.skudenesnf.no/images/hero/hero_01.jpg", width: 1200, height: 630 }];
  return {
    title: nyhet.tittel,
    description: nyhet.ingress,
    openGraph: { images: ogImages },
  };
}

export default async function NyhetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const nyhet = await client.fetch<Nyhet | null>(
    NYHET_SLUG_QUERY,
    { slug },
    { next: { tags: ["nyhet"] } }
  );

  if (!nyhet) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        {nyhet.bilde?.asset ? (
          <Image
            src={urlFor(nyhet.bilde).width(1600).height(800).url()}
            alt={nyhet.tittel}
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
            href="/aktuelt"
            className="text-white/50 text-sm hover:text-white/80 transition-colors mb-4 inline-block"
          >
            &larr; Alle nyheter
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/50 text-xs font-medium">
              {new Date(nyhet.dato).toLocaleDateString("nb-NO", { timeZone: "Europe/Oslo",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {nyhet.kategori && (
              <span className="text-xs font-medium bg-white/10 px-2.5 py-0.5 rounded text-white/70">
                {nyhet.kategori}
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white max-w-3xl">
            {nyhet.tittel}
          </h1>
        </div>
      </section>

      {/* Innhold */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {nyhet.ingress && (
            <p className="text-navy/70 text-lg leading-relaxed mb-8 font-medium">
              {nyhet.ingress}
            </p>
          )}
          {nyhet.innhold && <PortableText value={nyhet.innhold} />}
        </div>
      </section>
    </>
  );
}
