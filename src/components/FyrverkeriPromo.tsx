"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Midlertidig: vises på forsiden og i menyen til og med nyttårsaften. */
export const FYR_PROMO_SLUTT = new Date("2027-01-01T12:00:00+01:00");
export const fyrPromoAktiv = () => Date.now() < FYR_PROMO_SLUTT.getTime();

const fmt = (n: number) => n.toLocaleString("nb-NO");

export default function FyrverkeriPromo() {
  const [aktiv, setAktiv] = useState(true);
  const [s, setS] = useState<{ raised: number; goal: number } | null>(null);

  useEffect(() => {
    if (!fyrPromoAktiv()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skjules etter kampanjen
      setAktiv(false);
      return;
    }
    let stop = false;
    fetch("/api/fyrverkeri/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!stop && j && typeof j.raised === "number") setS({ raised: j.raised, goal: j.goal });
      })
      .catch(() => {});
    return () => {
      stop = true;
    };
  }, []);

  if (!aktiv) return null;
  const p = s ? Math.max(0, Math.min(1, s.raised / s.goal)) : 0;

  return (
    <Link
      href="/fyrverkeri2026"
      className="group mt-12 block w-full max-w-sm overflow-hidden border border-gold/40 bg-navy-dark/80 backdrop-blur-sm transition-colors hover:border-gold lg:absolute lg:right-8 lg:bottom-28 lg:mt-0"
    >
      <div className="relative aspect-[16/8] overflow-hidden">
        <Image
          src="/fyrverkeri2026/havn-natt.jpg"
          alt="Havna i Skudeneshavn en vinterkveld"
          fill
          sizes="384px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: "48% 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent" />
        <span className="absolute left-4 top-4 bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
          Nyttårsaften over havna
        </span>
      </div>
      <div className="px-5 pb-5 pt-1">
        <h2 className="font-serif text-2xl leading-snug text-white">
          Spleis på nyttårsfyrverkeriet
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-white/60">
          I fjor ble himmelen mørk. I år tenner vi den sammen.
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-1000"
            style={{ width: `${(p * 100).toFixed(1)}%` }}
          />
        </div>
        <p className="mt-2 min-h-5 text-sm text-white/70">
          {s ? (
            <>
              <strong className="text-gold">{fmt(s.raised)} kr</strong> av {fmt(s.goal)} kr
            </>
          ) : (
            " "
          )}
        </p>
        <span className="mt-4 flex items-center justify-center bg-gold px-5 py-3 text-sm font-semibold text-navy transition-colors group-hover:bg-gold-light">
          Gi en gnist med Vipps
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
