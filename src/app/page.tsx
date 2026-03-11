"use client";
import { useState, useEffect, useRef } from "react";

const C = { base: "#0D0D10", cream: "#F2EBDD", pink: "#D947A8", gold: "#D9B44A", steel: "#2D2F36", dim: "#6A6A72", warm: "#1A1218", glow: "#E85CC0", deep: "#0A0A0D" };

function useInView(t = 0.12) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]); return [ref, v] as const; }
function R({ children, delay = 0, dir = "up", style = {} }: { children: React.ReactNode; delay?: number; dir?: string; style?: React.CSSProperties }) { const [ref, vis] = useInView(); const t: Record<string, string> = { up: "translateY(50px)", left: "translateX(60px)", right: "translateX(-60px)" }; return <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "none" : t[dir] || t.up, transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`, willChange: "transform, opacity" }}>{children}</div>; }
const Grain = () => <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.04 }}><svg width="100%" height="100%"><filter id="g"><feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg></div>;

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 500); }, []);
  return (
    <section style={{ height: "100vh", position: "relative", overflow: "hidden", background: C.base }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.pink}08, transparent 60%)` }} />
      <div style={{ position: "absolute", bottom: "14vh", left: "6vw", zIndex: 3 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: C.pink, marginBottom: 24, opacity: ready ? 1 : 0, transform: ready ? "translateX(0)" : "translateX(-20px)", transition: "all 1s ease 0.1s", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 32, height: 2, background: C.pink, display: "inline-block" }} />Events · Culture · Community
        </div>
        <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(64px, 16vw, 240px)", fontWeight: 500, lineHeight: 0.85, letterSpacing: "0.02em", color: C.cream, margin: 0, textTransform: "uppercase" }}>
          <span style={{ display: "block", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(100%)", transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>Hug</span>
          <span style={{ display: "block", color: C.pink, opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(100%)", transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s", textShadow: `0 0 80px ${C.pink}20` }}>Life</span>
        </h1>
        <div style={{ marginTop: 32, marginLeft: "clamp(60px, 10vw, 160px)", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.6s" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.1vw, 16px)", fontWeight: 300, color: C.dim, lineHeight: 1.6, maxWidth: 320 }}>Where culture lives. Curated events, immersive experiences, and community that moves.</p>
        </div>
      </div>
      <div style={{ position: "absolute", right: "6vw", bottom: "14vh", zIndex: 3, fontFamily: "'Oswald', sans-serif", fontSize: "clamp(80px, 10vw, 140px)", fontWeight: 300, color: C.steel, opacity: ready ? 0.1 : 0, transition: "opacity 1.5s ease 0.8s", textTransform: "uppercase" }}>24</div>
    </section>
  );
}

function EventPosterWall() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const events = [
    { name: "NOIR", type: "Nightlife Experience", desc: "An all-black luxury nightlife event. DJs, live performers, premium bars. Pure atmosphere.", color: "#0B0A0C", accent: "#D2B98B" },
    { name: "Taste of Art", type: "Art + Food + Music", desc: "Where canvas meets cuisine. Local artists, chef collaborations, live music. A multisensory evening.", color: "#111114", accent: "#A75C43" },
    { name: "Paparazzi", type: "Red Carpet Social", desc: "Dress up. Show up. Be seen. Photography-forward social events where everyone is the star.", color: "#0F0F12", accent: "#B73A4B" },
    { name: "Sunday&apos;s Best", type: "Brunch + Fashion", desc: "The intersection of Sunday brunch culture and fashion. Come dressed. Leave inspired.", color: "#1C1B1F", accent: "#D8BA7C" },
    { name: "REMIX", type: "Music + Culture", desc: "Genre-bending music events. Where hip-hop meets house meets afrobeats meets something new.", color: "#0D0E12", accent: "#B6E03E" },
    { name: "WRST BHVR", type: "Premium Party", desc: "Controlled chaos. The party brand for people who refuse to be boring.", color: "#111216", accent: "#BB2C35" },
  ];

  return (
    <section style={{ padding: "120px 6vw", background: C.deep }}>
      <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.pink, marginBottom: 64, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.pink, display: "inline-block" }} />The Events</div></R>
      <R delay={0.1}><h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 500, lineHeight: 0.95, color: C.cream, margin: "0 0 64px", textTransform: "uppercase" }}>Every night<br /><span style={{ color: C.pink }}>tells a story.</span></h2></R>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
        {events.map((ev, i) => (
          <R key={ev.name} delay={0.06 * i}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{
              background: expanded === i ? ev.color : C.steel,
              padding: expanded === i ? "clamp(40px, 4vw, 64px)" : "clamp(32px, 3vw, 48px)",
              cursor: "pointer", position: "relative", overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              border: `1px solid ${expanded === i ? ev.accent + "30" : C.steel}`,
              gridColumn: expanded === i ? "1 / -1" : "auto",
              minHeight: expanded === i ? 240 : "auto",
            }}>
              <div style={{ position: "absolute", top: 8, right: 16, fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px, 5vw, 80px)", fontWeight: 300, color: ev.accent, opacity: expanded === i ? 0.12 : 0.04, transition: "opacity 0.4s ease", textTransform: "uppercase" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: ev.accent, marginBottom: 10 }}>{ev.type}</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: expanded === i ? "clamp(32px, 4vw, 52px)" : "clamp(22px, 2.5vw, 32px)", fontWeight: 500, color: C.cream, margin: "0 0 12px", textTransform: "uppercase", transition: "font-size 0.4s ease" }}>{ev.name}</h3>
              <div style={{ maxHeight: expanded === i ? 180 : 0, opacity: expanded === i ? 1 : 0, overflow: "hidden", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.cream, opacity: 0.55, maxWidth: 480, marginBottom: 20 }}>{ev.desc}</p>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: ev.accent, borderBottom: `1px solid ${ev.accent}40`, paddingBottom: 2 }}>Get Tickets →</span>
              </div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ padding: "140px 6vw", background: C.base }}>
      <R><h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 500, lineHeight: 0.85, color: C.cream, margin: "0 0 80px", textTransform: "uppercase" }}>The <span style={{ color: C.gold }}>Impact.</span></h2></R>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[{ v: "50", u: "K+", l: "Attendees" }, { v: "120", u: "+", l: "Events Produced" }, { v: "8", u: "", l: "Cities" }, { v: "6", u: "", l: "Event Brands" }].map((s, i) => (
          <R key={s.l} delay={0.08 + i * 0.08}>
            <div style={{ padding: "40px 20px 40px 0", borderLeft: i > 0 ? `1px solid ${C.steel}` : "none", paddingLeft: i > 0 ? 20 : 0 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 400, color: C.pink, lineHeight: 1, display: "flex", alignItems: "baseline" }}>{s.v}<span style={{ fontSize: "clamp(14px, 1.5vw, 20px)", fontFamily: "'DM Mono', monospace", marginLeft: 2, color: C.dim }}>{s.u}</span></div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.dim, marginTop: 12 }}>{s.l}</div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

function Cities() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <section style={{ padding: "140px 6vw", background: C.deep }}>
      <R><h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 7vw, 100px)", fontWeight: 500, lineHeight: 0.9, color: C.cream, margin: "0 0 64px", textTransform: "uppercase" }}>Where we<br /><span style={{ color: C.pink }}>show up.</span></h2></R>
      <R delay={0.15}><div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `1px solid ${C.steel}` }}>
        {["Atlanta", "Houston", "Miami", "LA", "Charlotte", "New York", "DC", "Las Vegas"].map((c, i) => (
          <div key={c} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ padding: "28px 16px", borderBottom: `1px solid ${C.steel}`, borderRight: (i + 1) % 4 !== 0 ? `1px solid ${C.steel}` : "none", background: hov === i ? C.pink : "transparent", transition: "all 0.3s ease", cursor: "default" }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 400, color: hov === i ? C.base : C.dim, transition: "color 0.3s ease", textTransform: "uppercase" }}>{c}</span>
          </div>
        ))}
      </div></R>
    </section>
  );
}

function Conversion() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return (
    <section id="contact" style={{ minHeight: "70vh", background: C.base, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-5vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Oswald', sans-serif", fontSize: "clamp(200px, 35vw, 500px)", fontWeight: 700, color: C.steel, opacity: 0.04, textTransform: "uppercase" }}>HUG</div>
      <div style={{ padding: "100px 6vw", position: "relative", zIndex: 1 }}>
        <R><h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 500, lineHeight: 0.85, color: C.cream, margin: "0 0 40px", textTransform: "uppercase" }}>Join the<br /><span style={{ color: C.pink }}>movement.</span></h2></R>
        <R delay={0.15}><div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.dim, marginBottom: 36 }}>Early access to events, exclusive guest lists, and culture updates.</p>
          {!done ? (
            <div style={{ display: "flex", border: `1px solid ${C.steel}` }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 13, border: "none", outline: "none", background: "transparent", color: C.cream }} />
              <button onClick={() => email && setDone(true)} style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 28px", background: C.pink, color: C.cream, border: "none", cursor: "pointer", transition: "background 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.gold; (e.target as HTMLElement).style.color = C.base; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.pink; (e.target as HTMLElement).style.color = C.cream; }}>Join</button>
            </div>
          ) : <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, textTransform: "uppercase", color: C.gold }}>You&apos;re on the list.</div>}
        </div></R>
      </div>
    </section>
  );
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 80); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", background: s ? `${C.base}F2` : "transparent", backdropFilter: s ? "blur(24px)" : "none", borderBottom: s ? `1px solid ${C.steel}` : "1px solid transparent", transition: "all 0.5s ease" }}>
    <a href="#" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 500, color: C.cream, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hug<span style={{ color: C.pink }}>Life</span></a>
    <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
      {["Events", "Cities"].map(i => <a key={i} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, textDecoration: "none", transition: "color 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.color = C.cream; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = C.dim; }}>{i}</a>)}
      <a href="#contact" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: C.base, background: C.pink, padding: "6px 18px", textDecoration: "none" }}>Tickets</a>
    </div>
  </nav>;
}

function Footer() {
  return <footer style={{ background: C.base, padding: "56px 6vw 40px", borderTop: `1px solid ${C.steel}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 500, color: C.cream, textTransform: "uppercase", marginBottom: 8 }}>Hug<span style={{ color: C.pink }}>Life</span></div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.dim, opacity: 0.3 }}>© 2026 HugLife — A Kollective Hospitality Group Brand</div>
      </div>
      <div style={{ display: "flex", gap: 24 }}>{["Instagram", "TikTok", "Contact"].map(l => <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, textDecoration: "none", opacity: 0.3, transition: "opacity 0.3s" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.3"; }}>{l}</a>)}</div>
    </div>
  </footer>;
}

export default function HugLife() {
  return <main style={{ overflowX: "hidden" }}>
    <style>{`@media (max-width: 900px) { div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; } div[style*="repeat(3"] { grid-template-columns: 1fr !important; } h1 { font-size: 56px !important; } nav > div:first-child ~ div a:not(:last-child) { display: none; } }`}</style>
    <Grain /><Nav /><Hero /><EventPosterWall /><Stats /><Cities /><Conversion /><Footer />
  </main>;
}
