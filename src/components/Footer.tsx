import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/50">
      {/* Hovedinnhold */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Venstre — identitet */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo/snf-logo.png"
                alt="Skudeneshavn Næringsforening"
                width={40}
                height={24}
                className="h-6 w-auto opacity-80"
              />
              <div className="text-[13px] leading-tight">
                <span className="text-white/70 font-medium">Skudeneshavn</span>
                <br />
                <span className="text-gold/50 text-[11px] tracking-widest uppercase">
                  Næringsforening
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8">
              Verdensledende verdiskaping i rammen av det gode liv.
              Vi arbeider for å gjøre Skudeneshavn til Karmøys mest
              attraktive sted for bosetting, næringsliv og besøk.
            </p>
            <a
              href="https://www.facebook.com/SkudeneshavnArena"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>

          {/* Høyre — navigasjon + kontakt */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {/* Sider */}
              <div>
                <p className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mb-5">
                  Utforsk
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/om-oss" className="hover:text-white/80 transition-colors">Om oss</Link></li>
                  <li><Link href="/pilarer" className="hover:text-white/80 transition-colors">Hva vi jobber med</Link></li>
                  <li><Link href="/aktuelt" className="hover:text-white/80 transition-colors">Aktuelt</Link></li>
                  <li><Link href="/arrangementer" className="hover:text-white/80 transition-colors">Arrangementer</Link></li>
                </ul>
              </div>

              {/* Engasjer */}
              <div>
                <p className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mb-5">
                  Engasjer deg
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/medlemskap" className="hover:text-white/80 transition-colors">Bli medlem</Link></li>
                  <li><Link href="/kontakt" className="hover:text-white/80 transition-colors">Kontakt oss</Link></li>
                </ul>
              </div>

              {/* Kontakt */}
              <div>
                <p className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mb-5">
                  Kontakt
                </p>
                <ul className="space-y-3 text-sm">
                  <li>Kaigaten 105</li>
                  <li>Skudeneshavn</li>
                  <li className="pt-1">
                    <a
                      href="mailto:Skude.nf@gmail.com"
                      className="text-gold/50 hover:text-gold/80 transition-colors"
                    >
                      Skude.nf@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Se også */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-6 text-xs text-white/25">
                <a
                  href="https://www.visitskudeneshavn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/50 transition-colors inline-flex items-center gap-1"
                >
                  Visit Skudeneshavn
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
                <a
                  href="https://www.karmoy.kommune.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/50 transition-colors inline-flex items-center gap-1"
                >
                  Karmøy Kommune
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/detgodeliviskudeneshavn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/50 transition-colors inline-flex items-center gap-1"
                >
                  Det gode liv i Skudeneshavn
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bunn */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>&copy; {new Date().getFullYear()} Skudeneshavn Næringsforening</p>
          <p>Nettside av Gunvar Mjølhus</p>
        </div>
      </div>
    </footer>
  );
}
