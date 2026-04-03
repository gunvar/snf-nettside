import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Skudeneshavn Næringsforening.",
};

export default function Kontakt() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/11.jpg"
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

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Kontaktinfo */}
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Finn oss
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-8">
                Kontaktinformasjon
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">E-post</p>
                    <a href="mailto:Skude.nf@gmail.com" className="text-sea-blue text-sm hover:underline underline-offset-4">
                      Skude.nf@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Adresse</p>
                    <p className="text-navy/50 text-sm">Kaigaten 105, Skudeneshavn</p>
                  </div>
                </div>
              </div>

              {/* For media */}
              <div className="bg-sand-light rounded-xl p-6 mb-8">
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
              <div>
                <h3 className="font-semibold text-navy text-sm mb-4">
                  Følg oss
                </h3>
                <div className="flex gap-3">
                  {["Facebook", "Instagram"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-10 h-10 bg-sand-light rounded-lg flex items-center justify-center hover:bg-sand transition-colors"
                      aria-label={platform}
                    >
                      <span className="text-xs text-navy/40 font-medium">
                        {platform[0]}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Kontaktskjema */}
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Melding
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-8">
                Send oss en melding
              </h2>
              <form className="space-y-5">
                {[
                  { id: "navn", label: "Navn", type: "text", placeholder: "Ditt navn" },
                  { id: "epost", label: "E-post", type: "email", placeholder: "din@epost.no" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-navy/70 mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      className="w-full rounded-lg border border-navy/12 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="emne"
                    className="block text-sm font-medium text-navy/70 mb-1.5"
                  >
                    Emne
                  </label>
                  <select
                    id="emne"
                    name="emne"
                    className="w-full rounded-lg border border-navy/12 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white transition-colors"
                  >
                    <option value="">Velg emne</option>
                    <option value="medlemskap">Medlemskap</option>
                    <option value="samarbeid">Samarbeid</option>
                    <option value="arrangement">Arrangement</option>
                    <option value="presse">Pressehenvendelse</option>
                    <option value="annet">Annet</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="melding"
                    className="block text-sm font-medium text-navy/70 mb-1.5"
                  >
                    Melding
                  </label>
                  <textarea
                    id="melding"
                    name="melding"
                    rows={5}
                    className="w-full rounded-lg border border-navy/12 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none transition-colors"
                    placeholder="Skriv din melding her..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-navy py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors text-sm"
                >
                  Send melding
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
