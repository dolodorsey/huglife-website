"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   HUGLIFE — WHERE CULTURE LIVES
   Design Philosophy: "POSTER ENERGY"
   
   This is a wall of concert posters come to life. Bebas Neue 
   screams event DNA. Hot pink bleeds into gold. Every section 
   feels like a flyer you'd rip off a telephone pole at 2am.
   The dark base holds the chaos. Controlled intensity.
   
   Signature Interaction: Poster-to-world — event brand cards 
   feel like physical flyers with depth, glow, and urgency.
   ═══════════════════════════════════════════════════════════════ */

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";

const EVENT_BRANDS = [
  { name: "NOIR",            type: "Upscale Night",     accent: "#D2B98B", bg: "#0B0A0C", desc: "Exclusive all-black dress code. Elegance meets nightlife.", flyer: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png` },
  { name: "REMIX",           type: "DJ Mashup",         accent: "#B6E03E", bg: "#0D0E12", desc: "Genre-bending music mashups. No rules, just vibes.", flyer: `${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png` },
  { name: "WRST BHVR",       type: "Food Fights",       accent: "#BB2C35", bg: "#111216", desc: "Napkin Wars. Food fights meet fine dining. ATL + DC.", flyer: `${SB}/wrst_bhvr_event/03-event-flyers/wrst-bhvr-napkin-wars-crime-scene.png` },
  { name: "Taste of Art",    type: "Art & Culture",     accent: "#A75C43", bg: "#111114", desc: "Live art, culture, and the creative underground.", flyer: `${SB}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG` },
  { name: "Gangsta Gospel",  type: "Sacred x Street",   accent: "#3C5B8A", bg: "#101114", desc: "Where sacred meets street. Father's Day tradition.", flyer: `${SB}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png` },
  { name: "CRVNGS",          type: "Food Festival",     accent: "#C85A1A", bg: "#1A1210", desc: "Culinary exhibition. Food truck editions. Pure flavor." },
  { name: "Stella",          type: "RnB Concert",       accent: "#D947A8", bg: "#14101A", desc: "RnB nights that bring the soul back. Live vocals." },
  { name: "Underground King", type: "Indie Concert",    accent: "#6D4AE0", bg: "#10101A", desc: "Underground music. Raw talent. No filter." },
  { name: "The Kulture",     type: "Streetwear Market",  accent: "#D9B44A", bg: "#141210", desc: "Fashion, streetwear, and urban culture marketplace." },
  { name: "Forever Futbol",  type: "Museum Experience",  accent: "#C6A65B", bg: "#0E1014", desc: "World Cup immersive experience. ATL · DC · LAX.", flyer: `${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png` },
];

const CALENDAR_2026 = [
  { month: "April", events: [
    { day: "Sat 11", name: "REMIX", color: "#B6E03E" },
    { day: "Sat 18", name: "TASTE OF ART + KULTURE", color: "#A75C43" },
    { day: "Sat 25", name: "WRST BHVR (ATL)", color: "#BB2C35" },
  ]},
  { month: "May", events: [
    { day: "Sat 2", name: "REMIX", color: "#B6E03E" },
    { day: "Tue 5", name: "CINCO DE MAYO BLOCK PARTY", color: "#C85A1A" },
    { day: "Sun 10", name: "STELLA RNB CONCERT", color: "#D947A8" },
    { day: "Sun 17", name: "NOIR", color: "#D2B98B" },
    { day: "Sun 24", name: "MEMORIAL DAY BLOCK PARTY", color: "#D9B44A" },
    { day: "Sat 30", name: "WRST BHVR (ATL)", color: "#BB2C35" },
  ]},
  { month: "June", events: [
    { day: "Thu 5", name: "FOREVER FUTBOL OPENS", color: "#C6A65B" },
    { day: "Fri 12", name: "UNDERGROUND KING", color: "#6D4AE0" },
    { day: "Sat 13", name: "REMIX", color: "#B6E03E" },
    { day: "Sun 14", name: "CRVNGS FOOD SERIES", color: "#C85A1A" },
    { day: "Thu 19", name: "JUNETEENTH BLOCK PARTY", color: "#D9B44A" },
    { day: "Sat 20", name: "TASTE OF ART + KULTURE", color: "#A75C43" },
    { day: "Sun 21", name: "GANGSTA GOSPEL", color: "#3C5B8A" },
    { day: "Fri 27", name: "WRST BHVR (DC)", color: "#BB2C35" },
  ]},
  { month: "July", events: [
    { day: "Fri 4", name: "4TH OF JULY CAR SHOW", color: "#D9B44A" },
    { day: "Sat 5", name: "CRVNGS FOOD TRUCK", color: "#C85A1A" },
    { day: "Sat 11", name: "REMIX", color: "#B6E03E" },
    { day: "Thu 17", name: "BLOCK PARTY", color: "#D947A8" },
    { day: "Sun 19", name: "NOIR", color: "#D2B98B" },
    { day: "Sat 25", name: "WRST BHVR (ATL)", color: "#BB2C35" },
  ]},
  { month: "August", events: [
    { day: "Fri 8", name: "BACK TO SCHOOL DRIVE", color: "#D9B44A" },
    { day: "Sun 9", name: "STELLA RNB CONCERT", color: "#D947A8" },
    { day: "Sat 15", name: "REMIX", color: "#B6E03E" },
    { day: "Sun 16", name: "CRVNGS FOOD SERIES", color: "#C85A1A" },
    { day: "Sat 22", name: "TASTE OF ART + KULTURE", color: "#A75C43" },
    { day: "Sat 29", name: "WRST BHVR (DC)", color: "#BB2C35" },
  ]},
  { month: "September", events: [
    { day: "Sat 5", name: "REMIX", color: "#B6E03E" },
    { day: "Sun 6", name: "NOIR", color: "#D2B98B" },
    { day: "Mon 7", name: "LABOR DAY FOOD TRUCK", color: "#C85A1A" },
    { day: "Sat 12", name: "BEAUTY & THE BEAST", color: "#D947A8" },
    { day: "Sun 13", name: "GANGSTA GOSPEL", color: "#3C5B8A" },
    { day: "Fri 18", name: "UNDERGROUND KING", color: "#6D4AE0" },
    { day: "Sat 19", name: "STELLA RNB CONCERT", color: "#D947A8" },
    { day: "Sat 26", name: "WRST BHVR (ATL)", color: "#BB2C35" },
    { day: "Sun 27", name: "CRVNGS FOOD SERIES", color: "#C85A1A" },
  ]},
  { month: "October", events: [
    { day: "Sun 18", name: "CRVNGS FOOD SERIES", color: "#C85A1A" },
    { day: "Fri 31", name: "MONSTER'S BALL", color: "#6D4AE0" },
  ]},
  { month: "November", events: [
    { day: "Sun 15", name: "NOIR", color: "#D2B98B" },
    { day: "Sat 21", name: "BLACK BALL", color: "#2D2F36" },
  ]},
  { month: "December", events: [
    { day: "Dec 4-6", name: "TASTE OF ART (ART BASEL)", color: "#A75C43" },
    { day: "Sat 12", name: "SNOW BALL", color: "#B7BCC5" },
  ]},
];

// CLEAN TICKET DATA — No cancelled brands (SHUT UP & DANCE, ESPRESSO, NAPKIN KING)
const TICKETS = [
  { name: "TASTE OF ART",       date: "Apr 18",  month: "Apr", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982512459133",      color: "#A75C43", tag: "Art & Culture",  city: "Atlanta" },
  { name: "NOIR",               date: "May 17",  month: "May", url: "https://www.eventbrite.com/e/espresso-tickets-1982507090074",          color: "#D2B98B", tag: "Upscale Night",  city: "Atlanta" },
  { name: "WRST BHVR",          date: "May 30",  month: "May", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983443338418",       color: "#BB2C35", tag: "Food Fights",    city: "Atlanta" },
  { name: "FOREVER FUTBOL",     date: "Jun 5",   month: "Jun", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046",   color: "#C6A65B", tag: "Museum Opening", city: "Atlanta" },
  { name: "FOREVER FUTBOL",     date: "Jun 15",  month: "Jun", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442556078",   color: "#C6A65B", tag: "Museum",         city: "Washington DC" },
  { name: "TASTE OF ART",       date: "Jun 20",  month: "Jun", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982513123119",      color: "#A75C43", tag: "Art & Culture",  city: "Atlanta" },
  { name: "GANGSTA GOSPEL",     date: "Jun 21",  month: "Jun", url: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983357015223",   color: "#3C5B8A", tag: "Gospel Hip-Hop", city: "Atlanta" },
  { name: "FOREVER FUTBOL",     date: "Jun 25",  month: "Jun", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442708534",   color: "#C6A65B", tag: "Museum",         city: "Los Angeles" },
  { name: "REMIX",              date: "Jul 11",  month: "Jul", url: "https://www.eventbrite.com/e/remix-tickets-1983356687242",            color: "#B6E03E", tag: "DJ Night",       city: "Atlanta" },
  { name: "NOIR",               date: "Jul 19",  month: "Jul", url: "https://www.eventbrite.com/e/espresso-tickets-1982510403986",          color: "#D2B98B", tag: "Upscale Night",  city: "Atlanta" },
  { name: "WRST BHVR",          date: "Jul 25",  month: "Jul", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983443502910",       color: "#BB2C35", tag: "Food Fights",    city: "Atlanta" },
  { name: "PAWCHELLA",          date: "Aug 8",   month: "Aug", url: "https://www.eventbrite.com/e/pawchella-summer-tickets-1983440350481", color: "#FF9500", tag: "Pet Festival",   city: "Atlanta" },
  { name: "TASTE OF ART",       date: "Aug 22",  month: "Aug", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982514621601",      color: "#A75C43", tag: "Art & Culture",  city: "Atlanta" },
  { name: "BEAUTY & THE BEAST", date: "Sep 12",  month: "Sep", url: "https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091", color: "#D947A8", tag: "Themed Party",   city: "Atlanta" },
  { name: "GANGSTA GOSPEL",     date: "Sep 13",  month: "Sep", url: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983358448510",   color: "#3C5B8A", tag: "Gospel Hip-Hop", city: "Atlanta" },
];

const MONTHS = ["All", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

const IMAGES = [
  { src: "/images/lifestyle-festival.png", label: "Festival Energy" },
  { src: "/images/lifestyle-club.png", label: "After Dark" },
  { src: "/images/lifestyle-concert.png", label: "Main Stage" },
  { src: "/images/lifestyle-stadium.png", label: "Game Day" },
  { src: "/images/lifestyle-boat.png", label: "Golden Hour" },
  { src: "/images/lifestyle-beach.png", label: "Coastline" },
];

/* ─── Utilities ─── */
function useIO(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("in"); }, { threshold, rootMargin: "0px 0px -60px 0px" });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return ref;
}

function Rev({ children, className = "rev", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useIO();
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

function Img({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} loading="lazy" />;
}

/* ═══ NAV ═══ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "12px var(--gutter)" : "22px var(--gutter)", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(13,13,16,0.95)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none", transition: "all 0.5s var(--ease)" }}>
      <img src="/images/huglife-logo.png" alt="HugLife" style={{ height: 32, width: "auto", filter: "invert(1)" }} />
      <div className="nav-links" style={{ display: "flex", gap: "clamp(16px,2.5vw,32px)", alignItems: "center" }}>
        {["Events", "Calendar", "Tickets"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", transition: "color 0.3s" }}>{n}</a>
        ))}
        <a href="#tickets" className="cta-pink" style={{ padding: "9px 22px" }}>Tickets</a>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  return (
    <section style={{ minHeight: "100vh", background: `linear-gradient(135deg,var(--dark) 0%,var(--base) 40%,var(--surface) 100%)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "120px var(--gutter) 80px" }}>
      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 1, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      {/* Orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "55vw", height: "55vw", borderRadius: "50%", background: `radial-gradient(circle,var(--pink-glow),transparent 60%)`, animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle,var(--gold-glow),transparent 60%)`, animation: "float 11s ease-in-out infinite reverse", pointerEvents: "none" }} />
      {/* BG Image at 5% per SOP */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, filter: "brightness(0.2) saturate(0.3)", backgroundImage: "url(/images/lifestyle-festival.png)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
      {/* Logo large on first load per SOP */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none", zIndex: 1 }}>
        <img src="/images/huglife-logo.png" alt="" style={{ width: "clamp(300px,35vw,500px)", filter: "invert(1)" }} />
      </div>
      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 1, height: 32, background: "rgba(217,71,168,0.3)", animation: "scrollLine 2s ease-in-out infinite" }} />
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 6, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(217,71,168,0.2)" }}>Scroll</div>
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "var(--pink)", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.2s", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 32, height: 1, background: "linear-gradient(90deg,var(--pink),var(--gold))" }} />Atlanta · Houston · LA · DC · Charlotte
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-hero)", fontWeight: 400, lineHeight: 0.88, letterSpacing: "0.02em", color: "var(--cream)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 1.1s var(--ease) 0.4s", textTransform: "uppercase" }}>
            <span style={{ color: "var(--pink)" }}>Hug</span>Life
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "var(--text-body)", lineHeight: 1.8, color: "var(--muted)", maxWidth: 520, marginTop: 28, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}>
            15+ event brands. 45+ events in 2026. Music, art, food, culture, fashion — curated experiences that connect communities across America.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 36, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1s", flexWrap: "wrap" }}>
            <a href="#calendar" className="cta-pink">View Calendar</a>
            <a href="#tickets" className="cta-outline">Get Tickets</a>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 48, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.2s", flexWrap: "wrap" }}>
            {[{ v: "15+", l: "Event Brands" }, { v: "45+", l: "Events in 2026" }, { v: "8", l: "Cities" }, { v: "50K+", l: "Attendees" }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,3.5vw,52px)", color: "var(--gold)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ EVENT BRANDS — Poster Wall ═══ */
function EventBrands() {
  return (
    <section id="events" style={{ background: "var(--base)", padding: "var(--pad) var(--gutter)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>Event Brands</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--cream)", textTransform: "uppercase" }}>The Universe</h2>
        </Rev>
        <Rev className="stagger" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
          {EVENT_BRANDS.map(b => (
            <div key={b.name} className="brand-card" style={{ background: b.bg, position: "relative", overflow: "hidden", borderTop: `3px solid ${b.accent}` }}>
              {/* BG glow */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: `radial-gradient(circle at 100% 0%,${b.accent}15,transparent 70%)`, pointerEvents: "none" }} />
              {/* Flyer image or placeholder */}
              {b.flyer ? (
                <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
                  <Img src={b.flyer} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s var(--ease)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.85))" }} />
                </div>
              ) : (
                <div style={{ padding: "28px 16px", paddingTop: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${b.accent}12`, border: `1px solid ${b.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: b.accent }}>{b.name[0]}</span>
                  </div>
                </div>
              )}
              {/* Label overlay */}
              <div style={{ position: b.flyer ? "absolute" : "relative", bottom: 0, left: 0, right: 0, padding: b.flyer ? "20px 14px 14px" : "0 16px 20px", zIndex: 2 }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: b.accent, marginBottom: 4 }}>{b.type}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(18px,2vw,28px)", color: "var(--cream)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{b.name}</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", lineHeight: 1.6, color: "var(--muted)", marginTop: 4 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </Rev>
      </div>
    </section>
  );
}

/* ═══ CALENDAR ═══ */
function Calendar() {
  const [activeMonth, setActiveMonth] = useState(0);
  const m = CALENDAR_2026[activeMonth];
  return (
    <section id="calendar" style={{ background: `linear-gradient(180deg,var(--surface) 0%,var(--base) 100%)`, padding: "var(--pad) var(--gutter)", position: "relative", overflow: "hidden" }}>
      {/* BG image */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, filter: "brightness(0.2)", backgroundImage: "url(/images/lifestyle-club.png)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>2026 Season</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--cream)", textTransform: "uppercase", marginBottom: 48 }}>The Calendar</h2>
        </Rev>

        {/* Month tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
          {CALENDAR_2026.map((mo, i) => (
            <button key={mo.month} onClick={() => setActiveMonth(i)} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: activeMonth === i ? 700 : 400, letterSpacing: "0.1em", textTransform: "uppercase", color: activeMonth === i ? "var(--pink)" : "var(--muted)", background: "none", border: "none", borderBottom: activeMonth === i ? "2px solid var(--pink)" : "2px solid transparent", padding: "12px 20px", cursor: "pointer", transition: "all 0.3s", whiteSpace: "nowrap" }}>{mo.month}</button>
          ))}
        </div>

        {/* Events list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {m.events.map((ev, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 40px", gap: 16, padding: "18px 20px", background: "var(--dark)", alignItems: "center", borderLeft: `3px solid ${ev.color}`, transition: "background 0.3s" }} onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")} onMouseLeave={e => (e.currentTarget.style.background = "var(--dark)")}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em" }}>{ev.day}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: "var(--cream)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{ev.name}</div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: ev.color, justifySelf: "end" }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, fontFamily: "'DM Mono',monospace", fontSize: "var(--text-caption)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
          {m.events.length} events in {m.month} · <span style={{ color: "var(--gold)" }}>{CALENDAR_2026.reduce((a, b) => a + b.events.length, 0)} total in 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ═══ LIFESTYLE GALLERY — even rows per SOP ═══ */
function Gallery() {
  return (
    <section style={{ background: "var(--dark)", padding: "var(--pad) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ padding: "0 var(--gutter)", maxWidth: 1400, margin: "0 auto 48px" }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>The Experience</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--cream)", textTransform: "uppercase" }}>This Is What<br /><span style={{ color: "var(--gold)" }}>It Feels Like.</span></h2>
        </Rev>
      </div>
      {/* Even 3x2 grid — uniform aspect ratios per SOP */}
      <Rev className="rev-scale" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, padding: "0 3px" }}>
        {IMAGES.map((img, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
            <img src={img.src} alt={img.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s var(--ease)" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 20px 16px", background: "linear-gradient(transparent,rgba(0,0,0,0.75))" }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--pink)" }}>{img.label}</div>
            </div>
          </div>
        ))}
      </Rev>
    </section>
  );
}

/* ═══ TICKETS ═══ */
function TicketHub() {
  const [activeMonth, setActiveMonth] = useState("All");
  const filtered = activeMonth === "All" ? TICKETS : TICKETS.filter(e => e.month === activeMonth);
  return (
    <section id="tickets" style={{ background: "var(--dark)", padding: "var(--pad) var(--gutter)", position: "relative", overflow: "hidden" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%,var(--pink-glow) 0%,transparent 50%),radial-gradient(ellipse at 70% 50%,var(--gold-glow) 0%,transparent 50%)` }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, filter: "brightness(0.2)", backgroundImage: "url(/images/lifestyle-concert.png)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>2026 Event Calendar</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,8vw,100px)", lineHeight: 0.9, color: "var(--cream)", textTransform: "uppercase" }}>
              Get Your<br /><span style={{ color: "var(--pink)" }}>Tickets.</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#4ADE80", letterSpacing: "0.1em" }}>On Sale Now</span>
            </div>
          </div>
        </Rev>

        {/* Month filter */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, flexWrap: "wrap" }}>
          {MONTHS.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: activeMonth === m ? 700 : 400, letterSpacing: "0.15em", textTransform: "uppercase", color: activeMonth === m ? "var(--pink)" : "var(--muted)", background: activeMonth === m ? "rgba(217,71,168,0.08)" : "transparent", border: `1px solid ${activeMonth === m ? "rgba(217,71,168,0.3)" : "var(--border)"}`, padding: "10px 20px", cursor: "pointer", transition: "all 0.3s" }}>{m}</button>
          ))}
        </div>

        {/* Ticket grid */}
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
          {filtered.map((event, i) => (
            <a key={i} href={event.url} target="_blank" rel="noopener noreferrer" style={{ background: "var(--surface)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 10, borderLeft: `3px solid ${event.color}`, transition: "all 0.4s var(--ease)", textDecoration: "none" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: event.color }}>{event.date}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", color: "rgba(242,235,221,0.3)", background: "rgba(242,235,221,0.04)", padding: "3px 8px" }}>{event.city}</div>
              </div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(18px,2vw,26px)", color: "var(--cream)", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.1 }}>{event.name}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(242,235,221,0.35)", letterSpacing: "0.1em" }}>{event.tag}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: event.color, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                Buy Tickets <span style={{ fontSize: 14 }}>→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Group CTA */}
        <div style={{ marginTop: 3, background: "var(--surface)", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 6 }}>Groups · Schools · Corporate</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "var(--cream)", textTransform: "uppercase" }}>Need 10+ tickets?</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Group Ticket Inquiry" className="cta-pink">Book a Group</a>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Corporate Event Inquiry" className="cta-outline">Corporate Events</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA CLOSE ═══ */
function CTAClose() {
  return (
    <section style={{ background: "var(--dark)", padding: "clamp(100px,16vh,180px) var(--gutter)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 50%,var(--pink-glow),transparent 55%),radial-gradient(ellipse at 60% 50%,var(--gold-glow),transparent 55%)` }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Rev>
          <img src="/images/huglife-logo.png" alt="HugLife" style={{ height: 56, margin: "0 auto 28px", display: "block", filter: "invert(1)", opacity: 0.4 }} />
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,8vw,120px)", color: "var(--cream)", lineHeight: 0.9, textTransform: "uppercase", marginBottom: 20 }}>
            Just<br /><span style={{ color: "var(--pink)" }}>HugLife.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.8, color: "var(--muted)", maxWidth: 440, margin: "0 auto 40px" }}>The events that connect communities. The experiences that become memories. Join us in 2026.</p>
          <a href="#calendar" className="cta-pink" style={{ padding: "15px 48px" }}>View Full Calendar</a>
        </Rev>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer style={{ background: "var(--dark)", borderTop: "1px solid var(--border)", padding: "56px var(--gutter) 36px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: 40, marginBottom: 48 }}>
          <div>
            <img src="/images/huglife-logo.png" alt="HugLife" style={{ height: 36, marginBottom: 14, filter: "invert(1)" }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, lineHeight: 1.7, color: "var(--muted)" }}>Events. Culture. Community.<br />A KHG Enterprise.</p>
          </div>
          {[
            { h: "Events", l: ["NOIR", "REMIX", "WRST BHVR", "Taste of Art", "Gangsta Gospel", "CRVNGS", "Stella"] },
            { h: "Company", l: ["About HugLife", "Tickets", "Sponsor", "Vendor Inquiry", "Press"] },
            { h: "Connect", l: ["@justhuglife", "thekollectiveworldwide@gmail.com", "Atlanta, GA"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {col.l.map(item => <li key={item} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--muted)" }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(242,235,221,0.15)" }}>© 2026 HugLife Events. A KHG Enterprise.</div>
      </div>
    </footer>
  );
}

/* ═══ MAIN ═══ */
export default function HugLifeV5() {
  return (
    <div style={{ background: "var(--base)" }}>
      <Nav />
      <Hero />
      <EventBrands />
      <Calendar />
      <Gallery />
      <TicketHub />
      <CTAClose />
      <Footer />
    </div>
  );
}
