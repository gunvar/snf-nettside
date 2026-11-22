"use client";

import { useState } from "react";

const fmt = (n: number) => n.toLocaleString("nb-NO");
const SIDE = "https://skudenesnf.no/fyrverkeri2026";

const input = {
  minHeight: 48,
  padding: "0 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.25)",
  background: "#070B1C",
  color: "#F6F1E6",
  fontFamily: "inherit",
  fontSize: 16,
  width: "100%",
  boxSizing: "border-box",
} as const;
const label = { fontSize: 14, color: "#C4C8DA", display: "flex", flexDirection: "column", gap: 6 } as const;
const pick = (on: boolean) =>
  ({
    minHeight: 46,
    borderRadius: 12,
    border: `1px solid ${on ? "#FFC86B" : "rgba(255,255,255,.2)"}`,
    background: on ? "#FFC86B" : "transparent",
    color: on ? "#070B1C" : "#F6F1E6",
    fontSize: 15,
    fontWeight: 700,
  }) as const;

function Head({ title, close }: { title: string; close: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h2 style={{ margin: 0, fontSize: 28, color: "#FFF1D0" }}>{title}</h2>
      <button type="button" onClick={close} aria-label="Lukk" style={{ width: 44, height: 44, marginRight: -10, border: 0, background: "transparent", color: "#F6F1E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

export function BedriftSheet({
  epost,
  vippsNummer,
  vippsUrl,
  close,
}: {
  epost: string;
  vippsNummer: string;
  vippsUrl: string;
  close: () => void;
}) {
  const [belop, setBelop] = useState<number | "annet">(10000);
  const [annet, setAnnet] = useState("");
  const [betaling, setBetaling] = useState<"faktura" | "vipps">("faktura");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [fil, setFil] = useState("");

  const sum = belop === "annet" ? Math.round(Number(annet)) || 0 : belop;
  const mailto = `mailto:${epost}?subject=${encodeURIComponent("Fyrverkeri 2026 – gave fra bedrift")}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("belop", String(sum));
    fd.set("betaling", betaling);
    const logo = fd.get("logo");
    if (logo instanceof File && logo.size > 2 * 1024 * 1024) {
      setState("error");
      setMsg("Logoen er for stor. Maks 2 MB.");
      return;
    }
    setState("sending");
    setMsg("");
    try {
      const r = await fetch("/api/fyrverkeri/bedrift", { method: "POST", body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setState("done");
      } else {
        setState("error");
        setMsg(j.message || "Noe gikk galt. Prøv igjen.");
      }
    } catch {
      setState("error");
      setMsg("Fikk ikke kontakt med serveren. Prøv igjen.");
    }
  }

  if (state === "done") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Head title="Takk for at dere spleiser!" close={close} />
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
          {betaling === "faktura"
            ? `Vi sender faktura til e-postadressen dere oppga. ${sum <= 20000 ? "Bedriften kommer på siden om et øyeblikk." : "Bedriften kommer på siden så snart vi har behandlet gaven."}`
            : `Betal ${fmt(sum)} kr til Vippsnummer ${vippsNummer}, og skriv bedriftsnavnet i meldingen. ${sum <= 20000 ? "Bedriften kommer på siden om et øyeblikk." : "Bedriften kommer på siden så snart vi har registrert betalingen."}`}
        </p>
        {betaling === "vipps" && (
          <a href={vippsUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 54, borderRadius: 14, background: "#FF5B24", color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: 18 }}>
            Åpne Vipps
          </a>
        )}
        <button type="button" onClick={close} style={{ minHeight: 48, borderRadius: 12, border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#F6F1E6", fontWeight: 700, fontSize: 15 }}>
          Tilbake til himmelen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Head title="Bedrift: logo og faktura" close={close} />
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
        Fra 5 000 kr får bedriften logo på siden. 10 000 kr gir dobbel størrelse.
      </p>

      <div role="group" aria-label="Beløp" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 6 }}>
        <button type="button" aria-pressed={belop === 5000} onClick={() => setBelop(5000)} style={pick(belop === 5000)}>5 000 kr</button>
        <button type="button" aria-pressed={belop === 10000} onClick={() => setBelop(10000)} style={pick(belop === 10000)}>10 000 kr</button>
        <button type="button" aria-pressed={belop === "annet"} onClick={() => setBelop("annet")} style={pick(belop === "annet")}>Annet</button>
      </div>
      {belop === "annet" && (
        <label style={label}>
          Beløp i kroner
          <input type="number" inputMode="numeric" min={500} step={100} required value={annet} onChange={(e) => setAnnet(e.target.value)} placeholder="F.eks. 15000" style={input} />
        </label>
      )}

      <label style={label}>
        Bedriftsnavn
        <input name="bedrift" required maxLength={40} autoComplete="organization" style={input} />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
        <label style={label}>
          Kontaktperson
          <input name="kontaktNavn" required maxLength={80} autoComplete="name" style={input} />
        </label>
        <label style={label}>
          Org.nr. (valgfritt)
          <input name="orgnr" inputMode="numeric" maxLength={11} style={input} />
        </label>
      </div>
      <label style={label}>
        E-post
        <input name="kontaktEpost" type="email" required maxLength={120} autoComplete="email" style={input} />
      </label>
      {/* Skjult felt mot roboter */}
      <input name="nettside" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />

      <div role="group" aria-label="Betaling" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6 }}>
        <button type="button" aria-pressed={betaling === "faktura"} onClick={() => setBetaling("faktura")} style={pick(betaling === "faktura")}>Send faktura</button>
        <button type="button" aria-pressed={betaling === "vipps"} onClick={() => setBetaling("vipps")} style={pick(betaling === "vipps")}>Vi betaler med Vipps</button>
      </div>

      <label style={label}>
        Logo (PNG, JPG eller WebP, maks 2 MB)
        <span style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 56, padding: "0 14px", borderRadius: 12, border: "1px dashed rgba(255,255,255,.35)", color: "#F6F1E6", fontSize: 15, cursor: "pointer" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC86B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
          </svg>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fil || "Velg logofil"}</span>
        </span>
        <input
          name="logo"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setFil(e.target.files?.[0]?.name || "")}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </label>
      {sum > 0 && sum < 5000 && (
        <p style={{ margin: 0, fontSize: 13, color: "#FFC86B" }}>Under 5 000 kr står bedriftsnavnet på navnelista, uten logo.</p>
      )}

      {state === "error" && (
        <p role="alert" style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: "#FFB4A0" }}>
          {msg} Du kan også sende bedriftsnavn, beløp og logo til <a href={mailto}>{epost}</a>.
        </p>
      )}

      <button type="submit" disabled={state === "sending"} style={{ minHeight: 54, border: 0, borderRadius: 14, background: "#FFC86B", color: "#070B1C", fontSize: 18, fontWeight: 800, opacity: state === "sending" ? 0.6 : 1 }}>
        {state === "sending" ? "Sender …" : `Meld inn ${sum > 0 ? fmt(sum) + " kr" : "gaven"}`}
      </button>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: "#C4C8DA" }}>
        Bedriftsnavn og logo vises offentlig på siden. Kontaktopplysningene brukes bare til faktura og oppfølging av gaven.
      </p>
    </form>
  );
}

export function ShareSheet({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const tekst = "Bli med og spleis på nyttårsfyrverkeriet over havna i Skudeneshavn!";
  const row = { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 54, borderRadius: 14, fontWeight: 800, fontSize: 17, textDecoration: "none" } as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Head title="Få med flere" close={close} />
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#E2E4EE" }}>
        Jo flere som spleiser, jo større blir smellet. Del siden med naboer, venner og kolleger.
      </p>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SIDE)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...row, background: "#1877F2", color: "#fff" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.200v2.500H7.600V14h2.700v8z" />
        </svg>
        Del på Facebook
      </a>
      {canShare && (
        <button
          type="button"
          onClick={() => navigator.share({ title: "En liten gnist", text: tekst, url: SIDE }).catch(() => {})}
          style={{ ...row, border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#F6F1E6" }}
        >
          Del på annen måte
        </button>
      )}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(SIDE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignorer */
          }
        }}
        style={{ ...row, border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#F6F1E6" }}
      >
        {copied ? "Lenken er kopiert!" : "Kopier lenke"}
      </button>
    </div>
  );
}
