import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Skudeneshavn Næringsforening.",
  openGraph: {
    images: [{ url: "https://www.skudenesnf.no/images/skudeneshavn/audun_15.jpg", width: 1200, height: 630 }],
  },
};

export default function Kontakt() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/audun_15.jpg"
          alt="Sjøhus i Skudeneshavn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Kontakt
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            Vi hører gjerne fra deg — enten du vil bli medlem, samarbeide,
            eller har spørsmål.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Kontaktinfo */}
            <div>
              <div className="w-12 h-0.5 bg-gold mb-8" />
              <h2 className="font-serif text-3xl text-navy mb-8">
                Ta kontakt
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy/35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">E-post</p>
                    <a
                      href="mailto:Skude.nf@gmail.com"
                      className="text-sea-blue text-sm hover:underline underline-offset-4"
                    >
                      Skude.nf@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy/35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">Adresse</p>
                    <p className="text-navy/50 text-sm">Kaigaten 105, Skudeneshavn</p>
                  </div>
                </div>
              </div>

              {/* For media */}
              <div className="bg-sand-light p-6 mb-8">
                <h3 className="font-semibold text-navy text-sm mb-2">
                  For media
                </h3>
                <p className="text-sm text-navy/50 leading-relaxed mb-3">
                  Vi stiller gjerne til intervju om næringsliv, byutvikling og
                  stedsutvikling på sør-Karmøy.
                </p>
                <a
                  href="mailto:Skude.nf@gmail.com"
                  className="text-sm text-sea-blue font-medium hover:underline underline-offset-4"
                >
                  Skude.nf@gmail.com
                </a>
              </div>

              {/* Sosiale medier */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/SkudeneshavnArena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-navy/40 hover:text-navy/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Følg oss på Facebook
                </a>
              </div>
            </div>

            {/* Send oss en melding — mailto */}
            <div>
              <div className="bg-sand-light p-10 lg:p-12">
                <h2 className="font-serif text-2xl text-navy mb-4">
                  Send oss en melding
                </h2>
                <p className="text-navy/45 text-sm leading-relaxed mb-8">
                  Har du spørsmål om medlemskap, samarbeid, arrangementer
                  eller annet? Send oss en e-post, så svarer vi så raskt
                  vi kan.
                </p>
                <a
                  href="mailto:Skude.nf@gmail.com?subject=Henvendelse%20til%20Skudeneshavn%20N%C3%A6ringsforening"
                  className="inline-block bg-gold text-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors"
                >
                  Send e-post
                </a>
                <p className="text-navy/25 text-xs mt-4">
                  Skude.nf@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
