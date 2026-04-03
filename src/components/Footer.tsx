import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Om foreningen */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-2">
              Skudeneshavn Næringsforening
            </h3>
            <p className="text-sm italic text-gold mb-4">
              Fra postkort til powerhouse
            </p>
            <p className="text-sm leading-relaxed">
              Vi arbeider for å gjøre Skudeneshavn til Karmøys mest attraktive
              sted for bosetting, næringsliv og besøk.
            </p>
          </div>

          {/* Sider */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Sider
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/om-oss" className="hover:text-white transition-colors">Om oss</Link></li>
              <li><Link href="/pilarer" className="hover:text-white transition-colors">Hva vi jobber med</Link></li>
              <li><Link href="/aktuelt" className="hover:text-white transition-colors">Aktuelt</Link></li>
              <li><Link href="/arrangementer" className="hover:text-white transition-colors">Arrangementer</Link></li>
              <li><Link href="/medlemskap" className="hover:text-white transition-colors">Medlemskap</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Kaigaten 105, Skudeneshavn</li>
              <li>
                <a href="mailto:Skude.nf@gmail.com" className="hover:text-white transition-colors">
                  Skude.nf@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Lenker */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Se også
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.visitskudeneshavn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Visit Skudeneshavn &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.karmoy.kommune.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Karmøy Kommune &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Skudeneshavn Næringsforening. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  );
}
