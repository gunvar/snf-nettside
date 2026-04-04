import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo + om */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo/snf-logo.png"
                alt="Skudeneshavn Næringsforening"
                width={48}
                height={28}
                className="h-7 w-auto"
              />
              <div className="text-sm">
                <span className="text-white/80 font-medium">Skudeneshavn</span>
                <span className="text-gold/70 ml-1">Næringsforening</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Vi arbeider for å gjøre Skudeneshavn til Karmøys mest attraktive
              sted for bosetting, næringsliv og besøk.
            </p>
          </div>

          {/* Sider */}
          <div className="md:col-span-2">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
              Utforsk
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/om-oss" className="hover:text-white/90 transition-colors">Om oss</Link></li>
              <li><Link href="/pilarer" className="hover:text-white/90 transition-colors">Hva vi jobber med</Link></li>
              <li><Link href="/aktuelt" className="hover:text-white/90 transition-colors">Aktuelt</Link></li>
              <li><Link href="/arrangementer" className="hover:text-white/90 transition-colors">Arrangementer</Link></li>
              <li><Link href="/medlemskap" className="hover:text-white/90 transition-colors">Medlemskap</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-3">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
              Kontakt
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>Kaigaten 105, Skudeneshavn</li>
              <li>
                <a href="mailto:Skude.nf@gmail.com" className="hover:text-white/90 transition-colors">
                  Skude.nf@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Se også */}
          <div className="md:col-span-3">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
              Se også
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.visitskudeneshavn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/90 transition-colors inline-flex items-center gap-1"
                >
                  Visit Skudeneshavn
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.karmoy.kommune.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/90 transition-colors inline-flex items-center gap-1"
                >
                  Karmøy Kommune
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Skudeneshavn Næringsforening</p>
          <p>Verdensledende verdiskaping i rammen av det gode liv</p>
        </div>
      </div>
    </footer>
  );
}
