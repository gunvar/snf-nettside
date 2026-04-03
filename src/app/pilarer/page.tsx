import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hva vi jobber med",
  description:
    "Tre strategiske pilarer: Rammevilkår, attraktivitet og levende sentrum.",
};

export default function Pilarer() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">
            Hva vi jobber med
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Tre pilarer for Skudeneshavns fremtid
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Strategien bygger på tre gjensidig forsterkende pilarer. Sammen
            skaper de grunnlaget for bosetting, verdiskaping og identitet.
          </p>
        </div>
      </section>

      {/* Pilar 1 */}
      <section id="pilar-01" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-sea-light text-sea-blue px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Pilar 01
                </span>
                <span className="text-xs text-navy/40">Ressursgruppe A + C</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Rammevilkår for næring og industri
              </h2>
              <p className="text-navy/70 text-lg mb-6">
                Vi sikrer at bedriftene har arealene, infrastrukturen og tilgangen
                de trenger for å vokse og bli værende i Skudeneshavn.
              </p>
              <div className="bg-sea-light/50 rounded-lg p-5 mb-6">
                <p className="font-semibold text-navy text-sm mb-1">Mål</p>
                <p className="text-navy/70 text-sm">
                  Næringslivet har tilgang på tomter, infrastruktur og rammevilkår
                  som gjør det attraktivt å etablere, utvide og bli værende.
                  Storamyr 2 realisert innen 5 år.
                </p>
              </div>
            </div>
            <div className="bg-sand-light rounded-xl p-8">
              <h3 className="font-bold text-navy mb-4">Konkrete tiltak</h3>
              <ul className="space-y-3">
                {[
                  "Innspill til arealplaner og kommunale planprosesser",
                  "Dialog med kommune om infrastruktur og tomtebehov",
                  "Pådriver for realisering av Storamyr 2",
                  "Etablering av coworking-hub for fjernarbeidere og gründere",
                  "Rammevilkår for at hovedkontor forblir i Skudeneshavn",
                  "Rekruttering og kompetanseutvikling",
                  "Felles stillingsportal for regionen",
                  "Være talerrør for næringslivet i Skudeneshavn",
                ].map((tiltak, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sea-blue shrink-0" />
                    {tiltak}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pilar 2 */}
      <section id="pilar-02" className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-green-light text-green px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Pilar 02
                </span>
                <span className="text-xs text-navy/40">Ressursgruppe A</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Attraktivt bosted
              </h2>
              <p className="text-navy/70 text-lg mb-6">
                Uten folk, ingen industri. Vi jobber for at Skudeneshavn blir
                førstevalget for barnefamilier og alle som søker livskvalitet.
              </p>
              <div className="bg-green-light/50 rounded-lg p-5 mb-6">
                <p className="font-semibold text-navy text-sm mb-1">Mål</p>
                <p className="text-navy/70 text-sm">
                  Økt tilflytting. Førstevalg for barnefamilier på Haugalandet
                  og populært utover regionen. Befolkningsvekst fra 3.500 til 3.800.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8">
              <h3 className="font-bold text-navy mb-4">Konkrete tiltak</h3>
              <ul className="space-y-3">
                {[
                  "Sikre skole og barnehage — moderne struktur (0-16 år)",
                  "Nye boligprosjekter: Steiningsholmen, «Tanken», Storamyr 2",
                  "Synliggjøre livskvalitet og bolyst",
                  "Vurdere tiltak for økt byggeaktivitet",
                  "Jobbe for bedre tilgjengelighet: pendling, transport, gang/sykkel",
                  "Skape et rykte om knapphet og vekst",
                  "Årlig byggeskikkpris til aktører som hever kvaliteten på byen",
                ].map((tiltak, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green shrink-0" />
                    {tiltak}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pilar 3 */}
      <section id="pilar-03" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-orange-light text-orange px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Pilar 03
                </span>
                <span className="text-xs text-navy/40">Ressursgruppe B + D</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Levende sentrum hele året
              </h2>
              <p className="text-navy/70 text-lg mb-6">
                Et dødt sentrum er dårlig omdømme. Vi profesjonaliserer
                sentrumsutvikling og skaper helårsaktivitet.
              </p>
              <div className="bg-orange-light/50 rounded-lg p-5 mb-6">
                <p className="font-semibold text-navy text-sm mb-1">Mål</p>
                <p className="text-navy/70 text-sm">
                  Liv i sentrum hele året. Maks 2 tomme lokaler. Min. 1
                  arrangement per måned utenfor høysesong.
                </p>
              </div>
            </div>
            <div className="bg-sand-light rounded-xl p-8">
              <h3 className="font-bold text-navy mb-4">Konkrete tiltak</h3>
              <ul className="space-y-3">
                {[
                  "Årshjul med aktiviteter gjennom hele året",
                  "Koordinerte åpningstider og felles kampanjer",
                  "«Nullvisjon for forfall» — dialog med gårdeiere",
                  "Turisme og opplevelsesutvikling",
                  "Sesongforlengelse og flere overnattinger",
                  "Samarbeid med lag, foreninger og kulturaktører",
                  "Se muligheter knyttet til cruise og dagsturister",
                  "Planlegge og gjennomføre kurs, seminarer og nettverksarrangement",
                ].map((tiltak, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                    {tiltak}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Besøk visitskudeneshavn */}
      <section className="py-12 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy/60 mb-4">
            For turismeinformasjon om Skudeneshavn, se
          </p>
          <a
            href="https://www.visitskudeneshavn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold hover:bg-navy-light transition-colors"
          >
            Visit Skudeneshavn &rarr;
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Vil du bidra?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Bli med og forme Skudeneshavns fremtid. Som medlem kan du engasjere
            deg i ressursgruppene og være med å påvirke.
          </p>
          <Link
            href="/medlemskap"
            className="bg-gold text-navy px-8 py-3 rounded-md font-semibold hover:bg-gold-light transition-colors"
          >
            Bli medlem
          </Link>
        </div>
      </section>
    </>
  );
}
