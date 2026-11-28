"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { FyrStatus, Gift } from "@/lib/fyrverkeri";
import { BedriftSheet, RegForm, RegSheet, ShareSheet } from "./Ark";
import "./gnisten.css";

const AMOUNTS = [200, 500, 1000, 5000, 10000];
const TIERS = [
  { col: "#FFF1D0", size: 3, glow: 4 },
  { col: "#FFC86B", size: 4, glow: 6 },
  { col: "#FF9F6B", size: 5, glow: 8 },
  { col: "#FFD98A", size: 7, glow: 12 },
  { col: "#FFFFFF", size: 9, glow: 16 },
];
const fmt = (n: number) => n.toLocaleString("nb-NO");

function pos(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const a = (h >>> 0) % 10007;
  const b = ((h >>> 0) >> 5) % 9973;
  return { x: 6 + (a / 10007) * 88, y: 4 + (b / 9973) * 82, d: (a % 34) / 10 };
}

type Burst = { id: string; x: number; y: number; col: string; tag: string };
type Sheet = "none" | "info" | "give" | "bedrift" | "share" | "reg";

const RAYS =
  "M75 75 L75 12 M75 75 L106 21 M75 75 L129 44 M75 75 L138 75 M75 75 L129 106 M75 75 L106 129 M75 75 L75 138 M75 75 L44 129 M75 75 L21 106 M75 75 L12 75 M75 75 L21 44 M75 75 L44 21";

function Rays({ col, w = 2.4 }: { col: string; w?: number }) {
  return (
    <g stroke={col} strokeWidth={w} strokeLinecap="round" fill="none">
      <path d={RAYS} />
    </g>
  );
}

function fill<T>(list: T[], min: number): T[] {
  if (!list.length) return [];
  let out = list;
  while (out.length < min) out = out.concat(list);
  return out;
}

export default function Gnisten({
  initial,
  demo,
  fundDay,
  vippsNummer,
  vippsUrl,
  epost,
  fbUrl,
  simUrl,
}: {
  initial: FyrStatus;
  demo: boolean;
  fundDay: string;
  vippsNummer: string;
  vippsUrl: string;
  epost: string;
  fbUrl: string;
  simUrl: string;
}) {
  const [status, setStatus] = useState<FyrStatus>(initial);
  const [tier, setTier] = useState(500);
  const [mode, setMode] = useState<"named" | "anon">("named");
  const [sheet, setSheet] = useState<Sheet>("none");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [newId, setNewId] = useState<string | null>(null);
  const [days] = useState<number | null>(() => {
    const t = new Date(fundDay).getTime();
    if (isNaN(t)) return null;
    const diff = t - Date.now();
    if (diff < -6 * 3600e3) return null; // spleisedagen er over
    if (new Date(t).toDateString() === new Date().toDateString()) return 0; // i dag
    return Math.ceil(Math.max(0, diff) / 864e5);
  });
  const [shown, setShown] = useState<Set<string>>(
    () => new Set(initial.gifts.map((g) => g.id))
  );
  const seen = useRef<Set<string>>(new Set(initial.gifts.map((g) => g.id)));
  const [copied, setCopied] = useState(false);
  const tickRef = useRef<(() => void) | null>(null);

  const launch = useCallback((g: Gift) => {
    const p = pos(g.id);
    const t = TIERS[g.tier];
    setBursts((b) =>
      b
        .concat([
          {
            id: g.id,
            x: p.x,
            y: p.y,
            col: t.col,
            tag: g.kind === "anon" || !g.name ? "En anonym gnist" : g.name,
          },
        ])
        .slice(-3)
    );
    setTimeout(() => {
      setShown((s) => new Set(s).add(g.id));
      setNewId(g.id);
    }, 1000);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== g.id)), 4400);
  }, []);

  // Esc lukker ark
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet("none");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Poll for nye gaver
  useEffect(() => {
    if (demo) {
      const t = setTimeout(
        () => launch({ id: "demo-ny", tier: 2, kind: "name", name: "Familien Austrheim" }),
        400
      );
      return () => clearTimeout(t);
    }
    let stop = false;
    const tick = async () => {
      if (document.hidden) return;
      try {
        const r = await fetch("/api/fyrverkeri/status", { cache: "no-store" });
        if (!r.ok) return;
        const s: FyrStatus = await r.json();
        if (stop) return;
        const fresh = s.gifts.filter((g) => !seen.current.has(g.id));
        fresh.slice(-3).forEach((g, i) => setTimeout(() => launch(g), i * 1500));
        fresh.forEach((g) => seen.current.add(g.id));
        // Hold tallene tilbake til smellet, så summen og stjernene henger sammen
        setStatus(s);
        const hidden = new Set(fresh.map((g) => g.id));
        setShown((prev) => {
          const n = new Set(prev);
          s.gifts.forEach((g) => {
            if (!hidden.has(g.id)) n.add(g.id);
          });
          return n;
        });
      } catch {
        /* prøver igjen neste runde */
      }
    };
    tickRef.current = tick;
    const iv = setInterval(tick, 12000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [launch, demo]);

  const { raised, goal } = status;
  const p = Math.max(0, Math.min(1, raised / goal));
  const lit = raised >= goal;
  const pct = Math.floor(p * 100);

  const stars = useMemo(
    () =>
      status.gifts
        .filter((g) => shown.has(g.id))
        .slice(-120)
        .map((g) => ({ g, ...pos(g.id), t: TIERS[g.tier] })),
    [status.gifts, shown]
  );
  const logos = useMemo(
    () =>
      status.gifts
        .filter((g) => g.kind === "logo" && g.logo)
        .sort((a, b) => b.tier - a.tier),
    [status.gifts]
  );
  const names = useMemo(
    () => status.gifts.filter((g) => g.kind === "name" && g.name).reverse(),
    [status.gifts]
  );
  const nameStyle = (g: Gift) => ({
    fs: g.tier >= 4 ? 20 : g.tier === 3 ? 18 : g.tier === 2 ? 16 : 14,
    fw: g.tier >= 2 ? 700 : 500,
    col: g.tier >= 3 ? "#FFC86B" : "#F6F1E6",
  });
  // Rullestripene gjentar lista for å gå i sømløs sløyfe – bare når det er nok innhold
  const namesRoll = names.length >= 6;
  const logosRoll = logos.length >= 3;
  const names2 = namesRoll ? fill(names, 10) : names;
  const logos2 = logosRoll ? fill(logos, 6) : logos;

  const copyNr = async () => {
    try {
      await navigator.clipboard.writeText(vippsNummer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignorer */
    }
  };

  const btn = (on: boolean) => ({
    minHeight: 48,
    padding: "0 2px",
    borderRadius: 12,
    border: `1px solid ${on ? "#FFC86B" : "rgba(255,255,255,.18)"}`,
    background: on ? "#FFC86B" : "rgba(255,255,255,.04)",
    color: on ? "#070B1C" : "#F6F1E6",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap" as const,
  });
  const seg = (on: boolean) => ({
    minHeight: 42,
    border: 0,
    borderRadius: 9,
    background: on ? "#F6F1E6" : "transparent",
    color: on ? "#070B1C" : "#F6F1E6",
    fontSize: 14,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  });

  return (
    <div className="gn">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fyrverkeri2026/havn-natt.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "48% 45%",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(7,11,28,.78) 0%, rgba(7,11,28,.15) 38%, rgba(7,11,28,.1) 55%, rgba(7,11,28,.85) 100%)",
        }}
      />

      <div className="gn-wrap">
        {/* Venstre: logoer (PC) */}
        <aside
          className="gn-side gn-glass"
          aria-label="Bedrifter som spleiser"
          style={{
            flexDirection: "column",
            gap: 14,
            padding: 22,
            borderRadius: 20,
            maxHeight: "78svh",
            overflow: "hidden",
            width: "100%",
            maxWidth: 340,
            justifySelf: "end",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 24 }}>Bedriftene som spleiser</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#C4C8DA" }}>
            Logoen vises fra 5 000 kr. 10 000 kr gir dobbel størrelse.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: 8,
              overflow: "hidden",
            }}
          >
            {logos.map((l) => (
              <div
                key={l.id}
                style={{
                  gridColumn: `span ${l.tier >= 4 ? 6 : 3}`,
                  height: l.tier >= 4 ? 90 : 72,
                  borderRadius: 10,
                  background: "rgba(255,255,255,.92)",
                  border: `1px solid ${l.tier >= 4 ? "rgba(255,200,107,.9)" : "rgba(255,255,255,.14)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  boxSizing: "border-box",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.logo}
                  alt={l.name || "Bedriftslogo"}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            ))}
            {!logos.length && (
              <p style={{ gridColumn: "span 6", margin: 0, fontSize: 14, color: "#E2E4EE" }}>
                Her er det plass til din bedrift. Vær den første!
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSheet("bedrift")}
            style={{ marginTop: "auto", minHeight: 48, borderRadius: 12, border: "1px solid rgba(255,200,107,.7)", background: "transparent", color: "#FFC86B", fontSize: 15, fontWeight: 700 }}
          >
            Få logoen deres her →
          </button>
        </aside>

        <main className="gn-col">
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px 0",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#F6F1E6",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: ".14em",
                lineHeight: 1.15,
                textTransform: "uppercase",
              }}
            >
              Skudeneshavn
              <br />
              <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: ".24em" }}>
                Næringsforening
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setSheet("share")}
              style={{ marginLeft: "auto", minHeight: 44, padding: "0 12px", border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, background: "rgba(9,13,32,.45)", color: "#F6F1E6", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7" />
              </svg>
              Del
            </button>
            <button
              type="button"
              onClick={() => setSheet("info")}
              aria-label="Om fyrverkeriet"
              style={{
                width: 44,
                height: 44,
                marginLeft: 4,
                marginRight: -10,
                border: 0,
                background: "transparent",
                color: "#F6F1E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 11v6" />
                <path d="M12 7.5v.5" />
              </svg>
            </button>
          </header>

          <section
            aria-label="Status for innsamlingen"
            style={{ padding: "10px 22px 0", display: "flex", flexDirection: "column", gap: 6 }}
          >
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px 10px" }}>
              <span style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 38, lineHeight: 1, color: "#FFC86B" }}>
                {fmt(raised)} kr
              </span>
              <span style={{ fontSize: 16, color: "#E2E4EE" }}>av {fmt(goal)} kr</span>
              {demo && (
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "#FFC86B", border: "1px solid rgba(255,200,107,.5)", borderRadius: 999, padding: "3px 9px" }}>
                  Eksempel
                </span>
              )}
            </div>
            <div
              role="progressbar"
              aria-label="Lunta mot raketten"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              style={{ position: "relative", height: 40, marginTop: 2 }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 40,
                  top: 19,
                  height: 4,
                  borderRadius: 4,
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(246,241,230,.5) 0 6px, rgba(246,241,230,.12) 6px 10px)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 17,
                  height: 8,
                  width: `calc((100% - 40px) * ${p.toFixed(4)})`,
                  borderRadius: 8,
                  background: "linear-gradient(90deg, rgba(255,200,107,.15), #FFC86B 70%, #FFF1D0)",
                  boxShadow: "0 0 14px rgba(255,200,107,.8)",
                  transition: "width 1s ease",
                }}
              />
              {!lit && (
                <svg
                  className="gn-spark"
                  aria-hidden="true"
                  width="34"
                  height="34"
                  viewBox="0 0 22 22"
                  style={{
                    position: "absolute",
                    top: 21,
                    left: `calc((100% - 40px) * ${p.toFixed(4)})`,
                    transform: "translate(-50%, -50%)",
                    transition: "left 1s ease",
                    overflow: "visible",
                  }}
                >
                  <g stroke="#FFF1D0" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M11 0v6M11 16v6M0 11h6M16 11h6M3 3l4 4M15 15l4 4M19 3l-4 4M3 19l4-4" />
                  </g>
                  <circle cx="11" cy="11" r="4" fill="#FFC86B" />
                  <circle cx="11" cy="11" r="2" fill="#FFFFFF" />
                </svg>
              )}
              <svg aria-hidden="true" width="32" height="40" viewBox="0 0 24 30" style={{ position: "absolute", right: 0, top: 0 }}>
                <path d="M12 1 Q18 6 18 13 V21 H6 V13 Q6 6 12 1 Z" fill="#F6F1E6" />
                <path d="M6 16 L1.5 23 H6 Z M18 16 L22.5 23 H18 Z" fill="#FF8A5B" />
                <circle cx="12" cy="11" r="2.4" fill="#070B1C" />
                <path d="M12 21 V29" stroke="#FFC86B" strokeWidth="1.6" strokeDasharray="2 1.5" />
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: -4, fontSize: 14 }}>
              <span>
                <strong style={{ color: "#FFF1D0" }}>{fmt(Math.max(0, goal - raised))} kr</strong>{" "}
                <span style={{ color: "#E2E4EE" }}>igjen til raketten</span>
              </span>
              <strong style={{ color: "#FFC86B" }}>{pct} %</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px", fontSize: 13, color: "#E2E4EE" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFC86B" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                Julegrantenning lør. 28. nov
              </span>
              {days !== null && days > 0 && <span suppressHydrationWarning>{days} {days === 1 ? "dag" : "dager"} til spleisedagen</span>}
              {days === 0 && <span suppressHydrationWarning>I dag er spleisedagen!</span>}
              {fbUrl && (
                <a href={fbUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
                  Facebook-arrangement →
                </a>
              )}
            </div>
          </section>

          <div style={{ padding: "14px 22px 0", textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(30px, 9.2vw, 38px)", lineHeight: 1.04, color: "#FFF1D0" }}>
              {lit ? (
                <>Vi klarte det!<br />Vi ses over havna.</>
              ) : (
                <>En liten gnist.<br />En stor felles feiring.</>
              )}
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "#E2E4EE" }}>
              {lit && raised > goal
                ? "Alt over målet går til neste års fyrverkeri."
                : "Hver gave tenner en ny stjerne – og drar gnisten nærmere raketten."}
            </p>
          </div>

          {/* Himmelen */}
          <div style={{ position: "relative", flex: "1 1 0", minHeight: 16 }}>
            {stars.map((s) => (
              <span
                key={s.g.id}
                className={`gn-tw${s.g.id === newId ? " gn-newstar" : ""}`}
                aria-hidden="true"
                style={{
                  left: `${s.x.toFixed(1)}%`,
                  top: `${s.y.toFixed(1)}%`,
                  width: s.t.size,
                  height: s.t.size,
                  background: s.t.col,
                  boxShadow: `0 0 ${s.t.glow}px ${s.t.col}`,
                  animationDelay: `${s.d}s`,
                }}
              />
            ))}
            {status.gifts.length === 0 && (
              <p style={{ position: "absolute", left: 0, right: 0, top: "38%", margin: 0, textAlign: "center", fontSize: 14, color: "#E2E4EE", textShadow: "0 1px 8px rgba(7,11,28,.9)" }}>
                Himmelen er mørk ennå.
                <br />
                <strong style={{ color: "#FFF1D0" }}>Tenn den første stjernen.</strong>
              </p>
            )}
            {bursts.map((b) => (
              <div key={b.id} aria-hidden="true" style={{ position: "absolute", left: `${b.x}%`, top: `${b.y}%`, width: 0, height: 0 }}>
                <div className="gn-trail" />
                <svg className="gn-boom" viewBox="0 0 150 150">
                  <Rays col={b.col} />
                  <g fill="#FFF1D0">
                    {[[75,8],[108,17],[133,42],[142,75],[133,108],[108,133],[75,142],[42,133],[17,108],[8,75],[17,42],[42,17]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r={i % 2 ? 2.5 : 3} />
                    ))}
                  </g>
                </svg>
                <span
                  className="gn-tag"
                  style={{
                    padding: "6px 11px",
                    borderRadius: 10,
                    background: "rgba(9,13,32,.82)",
                    border: "1px solid rgba(255,200,107,.6)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#F6F1E6",
                  }}
                >
                  {b.tag}
                </span>
              </div>
            ))}
            {lit && (
              <div aria-hidden="true">
                <svg className="gn-boomloop" viewBox="0 0 150 150" style={{ left: "10%", top: "2%", width: 150, height: 150 }}><Rays col="#FFC86B" /></svg>
                <svg className="gn-boomloop" viewBox="0 0 150 150" style={{ left: "52%", top: "-6%", width: 190, height: 190, animationDelay: ".9s" }}><Rays col="#FFF1D0" w={2} /></svg>
                <svg className="gn-boomloop" viewBox="0 0 150 150" style={{ left: "30%", top: "20%", width: 130, height: 130, animationDelay: "1.8s" }}><Rays col="#FF9F6B" /></svg>
                <svg className="gn-boomloop" viewBox="0 0 150 150" style={{ left: "66%", top: "26%", width: 120, height: 120, animationDelay: "2.6s" }}><Rays col="#FFD98A" /></svg>
              </div>
            )}
          </div>

          {/* Striper (mobil) */}
          <div className="gn-mq" style={{ padding: "0 0 8px", overflow: "hidden" }}>
            {logos2.length > 0 && (
              <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
                <div className={logosRoll ? "gn-mqx" : ""} aria-label="Bedrifter som spleiser" style={{ padding: "2px 0", ...(logosRoll ? {} : { display: "flex", gap: 10, justifyContent: "center" }) }}>
                  {(logosRoll ? logos2.concat(logos2) : logos2).map((l, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={l.logo}
                      alt={i < logos2.length ? l.name || "Bedriftslogo" : ""}
                      aria-hidden={i >= logos2.length}
                      style={{
                        flex: "0 0 auto",
                        height: l.tier >= 4 ? 60 : 40,
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,.92)",
                        border: `1px solid ${l.tier >= 4 ? "rgba(255,200,107,.9)" : "rgba(255,255,255,.18)"}`,
                        objectFit: "contain",
                        boxSizing: "content-box",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {names2.length > 0 && (
              <div style={{ overflow: "hidden", marginTop: 6, WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
                <div className={namesRoll ? "gn-mqx gn-mqx2" : ""} aria-label="Givere" style={{ gap: 16, ...(namesRoll ? {} : { display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }) }}>
                  {(namesRoll ? names2.concat(names2) : names2).map((n, i) => {
                    const s = nameStyle(n);
                    return (
                      <span key={i} aria-hidden={i >= names2.length} style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: s.fs, fontWeight: s.fw, color: s.col, whiteSpace: "nowrap" }}>
                        <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: "#FFC86B" }} />
                        {n.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Gi-panel */}
          <form
            className="gn-glass"
            onSubmit={(e) => {
              e.preventDefault();
              setSheet("give");
            }}
            style={{ position: "relative", zIndex: 2, margin: "0 12px 12px", padding: 12, borderRadius: 20, display: "flex", flexDirection: "column", gap: 10 }}
          >
            <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
              <legend style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Velg beløp</legend>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 6 }}>
                {AMOUNTS.map((a) => (
                  <button key={a} type="button" aria-pressed={tier === a} onClick={() => setTier(a)} style={btn(tier === a)}>
                    {fmt(a)}
                    <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 3 }}>kr</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div role="group" aria-label="Synlighet" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", border: "1px solid rgba(255,255,255,.16)", borderRadius: 12, padding: 3 }}>
              <button type="button" aria-pressed={mode === "named"} onClick={() => setMode("named")} style={seg(mode === "named")}>
                Vis navn / logo
              </button>
              <button type="button" aria-pressed={mode === "anon"} onClick={() => setMode("anon")} style={seg(mode === "anon")}>
                Anonym
              </button>
            </div>
            <button
              type="submit"
              style={{ minHeight: 54, border: 0, borderRadius: 14, background: "#FF5B24", color: "#fff", fontSize: 19, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
            >
              Gi {fmt(tier)} kr med Vipps
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6, borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 8 }}>
              <button type="button" onClick={() => setSheet("bedrift")} style={{ minHeight: 44, border: 0, borderRadius: 10, background: "rgba(255,200,107,.14)", color: "#FFC86B", fontSize: 14, fontWeight: 700 }}>
                For bedrifter
              </button>
              <button type="button" onClick={() => setSheet("reg")} style={{ minHeight: 44, border: 0, borderRadius: 10, background: "rgba(255,255,255,.08)", color: "#F6F1E6", fontSize: 14, fontWeight: 700 }}>
                Jeg har vippset ✓
              </button>
            </div>
          </form>
        </main>

        {/* Høyre: navneliste (PC) */}
        <aside
          className="gn-side gn-glass"
          aria-label="Alle som har tent en gnist"
          style={{ flexDirection: "column", gap: 12, padding: 22, borderRadius: 20, height: "78svh", overflow: "hidden", width: "100%", maxWidth: 320, justifySelf: "start", boxSizing: "border-box" }}
        >
          <h2 style={{ margin: 0, fontSize: 24 }}>Alle som har tent en gnist</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#C4C8DA" }}>
            {status.donors > 0 ? `${status.donors} ${status.donors === 1 ? "giver" : "givere"} så langt. Takk!` : "Bli den første som tenner en gnist."}
          </p>
          <div style={{ flex: "1 1 auto", minHeight: 0, overflow: "hidden", WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 90%, transparent)", maskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 90%, transparent)" }}>
            <ul className={names.length > 12 ? "gn-roll" : ""} style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {(names.length > 12 ? names.concat(names) : names).map((n, i) => {
                const s = nameStyle(n);
                return (
                  <li key={i} style={{ padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.07)", fontSize: s.fs, fontWeight: s.fw, color: s.col }}>
                    {n.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {sheet !== "none" && (
        <div className="gn-fade" role="dialog" aria-modal="true" aria-label={{ info: "Om fyrverkeriet", give: "Slik gir du", bedrift: "Bedrift: logo og faktura", share: "Del siden", reg: "Sett deg på lista" }[sheet]} style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
          <button type="button" aria-label="Lukk" onClick={() => setSheet("none")} style={{ position: "absolute", inset: 0, border: 0, background: "rgba(4,6,16,.66)" }} />
          <div className="gn-sheet" style={{ position: "relative", width: "100%", maxWidth: 500, boxSizing: "border-box", maxHeight: "90%", overflowY: "auto", background: "#111733", border: "1px solid rgba(255,255,255,.12)", borderBottom: 0, borderRadius: "22px 22px 0 0", padding: "12px 20px 22px" }}>
            <div aria-hidden="true" style={{ width: 40, height: 4, borderRadius: 999, background: "rgba(255,255,255,.25)", margin: "0 auto 10px" }} />
            {sheet === "give" && (
              <GiveSheet
                amount={tier}
                anon={mode === "anon"}
                vippsNummer={vippsNummer}
                vippsUrl={vippsUrl}
                copied={copied}
                copyNr={copyNr}
                openBedrift={() => setSheet("bedrift")}
                openShare={() => setSheet("share")}
                onRegistered={() => tickRef.current?.()}
                close={() => setSheet("none")}
              />
            )}
            {sheet === "info" && (
              <InfoSheet goal={goal} epost={epost} simUrl={simUrl} openBedrift={() => setSheet("bedrift")} close={() => setSheet("none")} />
            )}
            {sheet === "bedrift" && (
              <BedriftSheet epost={epost} vippsNummer={vippsNummer} vippsUrl={vippsUrl} close={() => setSheet("none")} />
            )}
            {sheet === "share" && <ShareSheet close={() => setSheet("none")} />}
            {sheet === "reg" && (
              <RegSheet defaultAmount={tier} defaultAnon={mode === "anon"} onDone={() => tickRef.current?.()} close={() => setSheet("none")} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const closeBtn = (close: () => void) => (
  <button type="button" onClick={close} aria-label="Lukk" style={{ width: 44, height: 44, marginRight: -10, border: 0, background: "transparent", color: "#F6F1E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  </button>
);

function GiveSheet({
  amount, anon, vippsNummer, vippsUrl, copied, copyNr, openBedrift, openShare, onRegistered, close,
}: {
  amount: number; anon: boolean; vippsNummer: string; vippsUrl: string;
  copied: boolean; copyNr: () => void; openBedrift: () => void; openShare: () => void; onRegistered: () => void; close: () => void;
}) {
  const step = { display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.45, color: "#E2E4EE" } as const;
  const num = { flex: "0 0 28px", height: 28, borderRadius: 999, background: "#FFC86B", color: "#070B1C", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 } as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 28, color: "#FFF1D0" }}>Slik gir du {fmt(amount)} kr</h2>
        {closeBtn(close)}
      </div>
      {vippsNummer ? (
        <>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <li style={step}><span style={num}>1</span><span>Trykk <strong>Åpne Vipps</strong> under. Du kan også søke opp Vippsnummeret i appen.</span></li>
            <li style={step}><span style={num}>2</span><span>Legg inn <strong>{fmt(amount)} kr</strong>.</span></li>
            <li style={step}><span style={num}>3</span><span>Skriv «Fyrverkeri» i meldingen og betal.</span></li>
            <li style={step}><span style={num}>4</span><span>Kom tilbake hit og trykk <strong>Jeg har vippset</strong> nederst, så tennes stjernen din.</span></li>
          </ol>
          {vippsUrl && (
            <a href={vippsUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56, borderRadius: 14, background: "#FF5B24", color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: 19 }}>
              Åpne Vipps
            </a>
          )}
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: "#C4C8DA" }}>Vippsnummer</div>
              <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 32, color: "#FFC86B" }}>{vippsNummer}</div>
            </div>
            <button type="button" onClick={copyNr} style={{ minHeight: 48, padding: "0 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,.3)", background: "transparent", color: "#F6F1E6", fontWeight: 700, fontSize: 15 }}>
              {copied ? "Kopiert!" : "Kopier"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fyrverkeri2026/vipps-qr.png" alt="QR-kode til Vippsnummer 586326" width={104} height={104} style={{ borderRadius: 10, background: "#fff", flex: "0 0 auto" }} />
            <span style={{ fontSize: 13, color: "#C4C8DA", lineHeight: 1.4 }}>Sitter du på PC? Skann QR-koden med mobilen for å åpne Vipps.</span>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 22, color: "#FFF1D0" }}>Har du vippset?</h3>
            <RegForm defaultAmount={amount} defaultAnon={anon} onDone={onRegistered} />
            <p style={{ margin: 0, fontSize: 13, color: "#C4C8DA" }}>Vi sjekker registreringene mot Vipps i etterkant.</p>
          </div>
        </>
      ) : (
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
          Betaling med Vipps åpner snart. Send oss en e-post så sørger vi for at du får gitt din gave.
        </p>
      )}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
        <button type="button" onClick={openBedrift} style={{ minHeight: 48, borderRadius: 12, border: "1px solid rgba(255,200,107,.7)", background: "transparent", color: "#FFC86B", fontWeight: 700, fontSize: 14 }}>
          Bedrift? Logo og faktura
        </button>
        <button type="button" onClick={openShare} style={{ minHeight: 48, borderRadius: 12, border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#F6F1E6", fontWeight: 700, fontSize: 14 }}>
          Del med venner
        </button>
      </div>
    </div>
  );
}

const QA: [string, (p: { goal: number; epost: string }) => React.ReactNode][] = [
  ["Kan bedriften betale med faktura?", ({ epost }) => <>Ja. Trykk «For bedrifter», fyll ut skjemaet og last opp logoen. Dere kan også sende e-post til {epost}. Bedriften kommer på siden med en gang skjemaet er sendt.</>],
  ["Hva får bedriften igjen for gaven?", () => <>Gaver fra 5 000 kr gir logo på siden, og 10 000 kr gir dobbel størrelse. Alle gaver med navn kommer på lista over dem som har tent en gnist.</>],
  ["Hva skjer hvis vi samler inn mer enn målet?", ({ goal }) => <>Alt over {fmt(goal)} kr settes av til neste års nyttårsfyrverkeri.</>],
  ["Hva om fyrverkeriet må avlyses?", () => <>Ved avlysning videreføres pengene til neste års fyrverkeri.</>],
  ["Kan jeg gi uten at navnet mitt vises?", () => <>Ja. Velg «Anonym», så blir gaven en stjerne uten navn.</>],
  ["Får jeg kvittering?", () => <>Ja, kvitteringen ligger i Vipps-appen.</>],
];

function InfoSheet({ goal, epost, simUrl, openBedrift, close }: { goal: number; epost: string; simUrl: string; openBedrift: () => void; close: () => void }) {
  const box = { background: "rgba(255,255,255,.05)", borderRadius: 12, padding: 12 } as const;
  const big = { fontFamily: "var(--font-dm-serif), serif", fontSize: 26, color: "#FFC86B" } as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 28, color: "#FFF1D0" }}>Om fyrverkeriet</h2>
        {closeBtn(close)}
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
        Fyrverkeriet over havna nyttårsaften finnes bare fordi folk og bedrifter i byen spleiser på det.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
        {[["ca. 7 min", "varighet"], ["731", "effekter"], ["331", "luftbomber"], ["Karmøy", "lokale pyroteknikere"]].map(([a, b]) => (
          <div key={b} style={box}><div style={big}>{a}</div><div style={{ fontSize: 13, color: "#C4C8DA" }}>{b}</div></div>
        ))}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <li style={{ display: "flex", gap: 12, alignItems: "baseline" }}><strong style={{ flex: "0 0 116px", color: "#FFC86B" }}>Lør. 28. nov</strong><span style={{ fontSize: 15 }}>Julegrantenning – store spleisedagen</span></li>
        <li style={{ display: "flex", gap: 12, alignItems: "baseline" }}><strong style={{ flex: "0 0 116px", color: "#FFC86B" }}>31. des 00:00</strong><span style={{ fontSize: 15 }}>Fyrverkeriet over havna</span></li>
      </ul>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
        Målet er {fmt(goal)} kr. <strong style={{ color: "#FFF1D0" }}>Alt over målet går til neste års fyrverkeri.</strong>{" "}
        Oppskytingen gjøres av ASO Pyroteknikk, og restene kan leveres til gjenvinning.
      </p>
      {simUrl && (
        <a href={simUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 48, border: "1px solid rgba(255,255,255,.25)", borderRadius: 12, color: "#F6F1E6", textDecoration: "none", fontWeight: 700 }}>
          Se simulering av showet
        </a>
      )}
      <button type="button" onClick={openBedrift} style={{ minHeight: 48, borderRadius: 12, border: "1px solid rgba(255,200,107,.7)", background: "transparent", color: "#FFC86B", fontWeight: 700, fontSize: 15 }}>
        Bedrift? Meld inn gave med logo og faktura
      </button>
      <h3 style={{ margin: "6px 0 0", fontSize: 22, color: "#FFF1D0" }}>Spørsmål og svar</h3>
      <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,.12)" }}>
        {QA.map(([q, a]) => (
          <details key={q} style={{ borderBottom: "1px solid rgba(255,255,255,.12)", padding: "12px 0" }}>
            <summary>{q}</summary>
            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "#E2E4EE" }}>{a({ goal, epost })}</p>
          </details>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#C4C8DA" }}>Arrangør: Skudeneshavn Næringsforening · {epost}</p>
    </div>
  );
}
