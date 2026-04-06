import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Medlemskap",
  description:
    "Bli medlem i Skudeneshavn Næringsforening — invester i stedets fremtid.",
  openGraph: {
    images: [{ url: "https://www.skudenesnf.no/images/skudeneshavn/audun_13.jpg", width: 1200, height: 630 }],
  },
};

const kontingenter = [
  {
    navn: "Privatperson",
    pris: "300 kr",
    beskrivelse: "Har ikke stemmerett, men kan delta på arrangementer og møter i regi av Næringsforeningen som medlem",
  },
  {
    navn: "Forening",
    pris: "1 000 kr",
    beskrivelse: "Lag, foreninger og frivillige organisasjoner",
  },
  {
    navn: "Bedrift",
    pris: "fra 2 375 kr",
    beskrivelse: "Varierer etter bedriftens størrelse og rolle",
  },
  {
    navn: "Butikk med gavekort",
    pris: "6 000 kr",
    beskrivelse: "Butikker som deltar i den felles gavekortordningen",
  },
  {
    navn: "Hovedpartner",
    pris: "12 000 kr",
    beskrivelse: "Store bedrifter med strategisk engasjement",
  },
];

export default function Medlemskap() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <Image
          src="/images/skudeneshavn/audun_13.jpg"
          alt="Skudeneshavn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy/20" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32">
          <div className="accent-line mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 animate-fade-in-up">
            Medlemskap
          </h1>
          <p className="text-white/65 text-lg max-w-lg animate-fade-in-up delay-100">
            En investering i sterkere bedrifter, et mer levende sentrum
            og et mer attraktivt sted å bo.
          </p>
        </div>
      </section>

      {/* Hovedbudskap */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="w-12 h-0.5 bg-gold mb-8" />
            <p className="font-serif text-2xl sm:text-3xl text-navy leading-snug mb-8">
              Medlemskap i Skudeneshavn Næringsforening er en investering
              i sterkere bedrifter, et mer levende sentrum og et mer
              attraktivt sted å bo.
            </p>
            <p className="text-navy/50 leading-relaxed">
              Arbeidet til næringsforeningen handler ikke bare om bedriftene.
              Det handler også om sentrum, møteplasser, handel, trivsel og bolyst.
              Når næringslivet lykkes, styrkes også grunnlaget for aktivitet,
              investeringer og et lokalsamfunn flere ønsker å bo i.
            </p>
          </div>
        </div>
      </section>

      {/* Fakta — troverdighet */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                Et fellesskap med tyngde
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-6">
                Sammen representerer
                <br />vi mer enn enkeltbedrifter
              </h2>
              <p className="text-navy/50 leading-relaxed">
                Skudeneshavn Næringsforening samler 48 medlemmer fra næringsliv,
                handel, foreninger og lokalt engasjement. Til sammen representerer
                medlemsmassen 4 233 arbeidsplasser og over 4,5 milliarder kroner
                i omsetning. Det gir tyngde når vi jobber for bedre vilkår
                for bedriftene, et levende sentrum og et mer attraktivt sted å bo.
              </p>
            </div>

            {/* Nøkkeltall */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6">
              {[
                { tall: "48", enhet: "medlemmer", desc: "fra næringsliv, handel og foreninger" },
                { tall: "4 233", enhet: "arbeidsplasser", desc: "representert i medlemsmassen" },
                { tall: "4,5", enhet: "mrd. kr", desc: "i samlet omsetning" },
              ].map((item) => (
                <div key={item.enhet} className="text-center lg:text-left">
                  <p className="font-serif text-4xl text-navy leading-none">
                    {item.tall}
                  </p>
                  <p className="text-gold/70 text-sm font-medium mt-1">
                    {item.enhet}
                  </p>
                  <p className="text-navy/35 text-xs mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* To perspektiver */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Bedriftseier */}
            <div>
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                For bedriftseiere
              </span>
              <h3 className="font-serif text-2xl text-navy mt-2 mb-5">
                Invester i grunnlaget
                <br />for egen vekst
              </h3>
              <p className="text-navy/50 leading-relaxed mb-6">
                Som medlem investerer du ikke bare i egen virksomhet.
                Du investerer i et sterkere Skudeneshavn. Når vi jobber for
                bedre rammevilkår, flere møteplasser, et mer levende sentrum
                og økt attraktivitet for familier og tilflytting, styrker det
                også grunnlaget for handel, rekruttering og vekst.
              </p>
              <p className="text-navy/40 text-sm leading-relaxed">
                Medlemskap gir deg en stemme i utviklingen av stedet
                bedriften din er en del av.
              </p>
            </div>

            {/* Privatperson */}
            <div>
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                For privatpersoner og ildsjeler
              </span>
              <h3 className="font-serif text-2xl text-navy mt-2 mb-5">
                Bidra til et bedre
                <br />lokalsamfunn
              </h3>
              <p className="text-navy/50 leading-relaxed mb-6">
                Du trenger ikke eie en bedrift for å bry deg om utviklingen
                i Skudeneshavn. Et levende sentrum, flere møteplasser, sterkere
                lokalt næringsliv og økt attraktivitet for nye innbyggere
                kommer hele lokalsamfunnet til gode.
              </p>
              <p className="text-navy/40 text-sm leading-relaxed mb-6">
                Vil du ha et mer levende sentrum, flere møteplasser og et mer
                attraktivt Skudeneshavn? Da er medlemskap en konkret måte å bidra på.
              </p>
              <div className="bg-sand-light p-5 inline-block">
                <p className="text-navy font-semibold text-sm mb-1">
                  Meld deg inn med Vipps
                </p>
                <p className="text-navy/50 text-sm">
                  Søk opp <span className="font-semibold text-navy">#586326</span> i Vipps og betal 300 kr
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontingent */}
      <section className="py-20 bg-sand-light grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold/70 text-xs font-semibold tracking-widest uppercase">
                Kontingent
              </span>
              <h2 className="font-serif text-3xl text-navy mt-2 mb-4">
                Medlemsnivåer
              </h2>
              <p className="text-navy/45 text-[15px] leading-relaxed max-w-lg mx-auto">
                Vi har medlemsnivåer tilpasset både bedrifter, foreninger
                og enkeltpersoner som ønsker å bidra til utviklingen av
                Skudeneshavn.
              </p>
            </div>

            <div className="space-y-4">
              {kontingenter.map((k) => (
                <div
                  key={k.navn}
                  className="bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy text-[15px]">
                      {k.navn}
                    </h3>
                    <p className="text-navy/40 text-sm mt-0.5">
                      {k.beskrivelse}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-navy font-serif text-xl">
                      {k.pris}
                    </p>
                    {k.navn === "Privatperson" && (
                      <div className="mt-3">
                        <p className="text-[#ff5b24] text-xs font-semibold">
                          Vipps #586326
                        </p>
                        <p className="text-navy/30 text-[11px] mt-0.5">
                          Søk opp nummeret i Vipps
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-navy/30 text-xs mt-6">
              Kontingenten avhenger av bedriftens størrelse og rolle.
              Ta kontakt for å finne riktig nivå.
            </p>
          </div>
        </div>
      </section>

      {/* Innmelding — mailto */}
      <section id="bli-medlem" className="py-24 bg-navy-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Klar for å bli med?
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
            Send oss en e-post med navn, bedrift og eventuell melding.
            Vi tar kontakt for å finne riktig medlemsnivå.
          </p>
          <a
            href="mailto:Skude.nf@gmail.com?subject=Innmelding%20i%20Skudeneshavn%20N%C3%A6ringsforening"
            className="inline-block bg-gold text-navy px-10 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors"
          >
            Send e-post
          </a>
          <p className="text-white/20 text-xs mt-6">
            Skude.nf@gmail.com
          </p>
        </div>
      </section>
    </>
  );
}
