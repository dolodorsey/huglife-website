"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   HUGLIFE — WE CREATE ATMOSPHERE
   
   Design Philosophy: "CHAMPAGNE NOIR"
   50% Black (power) · 25% Gold (value) · 25% White (clarity)
   
   Video hero. Full-screen on first load. 
   Scattered event flyers as BG images per section (5-7% opacity).
   Event brand logos on cards. No gallery section.
   ═══════════════════════════════════════════════════════════════ */

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";

const EVENT_BRANDS = [
  { name: "NOIR",             type: "Upscale Night",     accent: "#D2B98B", desc: "Exclusive all-black dress code. Elegance meets nightlife.", flyer: `${SB}/noir_event/03_event_flyers/NOIR_NEWS.png`, logo: "/images/logos/noir_logo.png" },
  { name: "REMIX",            type: "DJ Mashup",         accent: "#B6E03E", desc: "Genre-bending music mashups. No rules, just vibes.", flyer: `${SB}/remix_event/03-event-flyers/remix-dj-dates-cities.png`, logo: "/images/logos/remix_logo.png" },
  { name: "WRST BHVR",        type: "Food Fights",       accent: "#BB2C35", desc: "Napkin Wars. Food fights meet fine dining. ATL + DC.", flyer: `${SB}/wrst_bhvr_event/03-event-flyers/wrst-bhvr-napkin-wars-crime-scene.png`, logo: "/images/logos/wrst_bhvr_logo.png" },
  { name: "Taste of Art",     type: "Art & Culture",     accent: "#A75C43", desc: "Live art, culture, and the creative underground.", flyer: `${SB}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG`, logo: "/images/logos/taste_of_art_logo.png" },
  { name: "Gangsta Gospel",   type: "Sacred × Street",   accent: "#3C5B8A", desc: "Where sacred meets street. Father's Day tradition.", flyer: `${SB}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png`, logo: "/images/logos/gangsta_gospel_logo.png" },
  { name: "CRVNGS",           type: "Food Festival",     accent: "#C85A1A", desc: "Culinary exhibition. Food truck editions. Pure flavor.", logo: "/images/logos/crvngs_logo.png" },
  { name: "Stella",           type: "RnB Concert",       accent: "#D947A8", desc: "RnB nights that bring the soul back. Live vocals.", logo: "/images/logos/stella_logo.png" },
  { name: "Underground King", type: "Indie Concert",     accent: "#6D4AE0", desc: "Underground music. Raw talent. No filter.", logo: "/images/logos/underground_king_logo.png" },
  { name: "The Kulture",      type: "Streetwear Market",  accent: "#D9B44A", desc: "Fashion, streetwear, and urban culture marketplace.", logo: "/images/logos/the_kulture_logo.png" },
  { name: "Forever Futbol",   type: "Museum Experience",  accent: "#C6A65B", desc: "World Cup immersive experience. ATL · DC · LAX.", logo: "/images/logos/forever_futbol_logo.png" },
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
    { day: "Sat 21", name: "BLACK BALL", color: "#C9A646" },
  ]},
  { month: "December", events: [
    { day: "Dec 4-6", name: "TASTE OF ART (ART BASEL)", color: "#A75C43" },
    { day: "Sat 12", name: "SNOW BALL", color: "#B7BCC5" },
  ]},
];

const TICKETS = [
  // VERIFIED WORKING (200 or 301→200)
  { name: "TASTE OF ART",       date: "Apr 18",  month: "Apr", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982512459133",      color: "#A75C43", tag: "Art & Culture",  city: "Atlanta" },
  { name: "NOIR",               date: "May 17",  month: "May", url: "https://www.eventbrite.com/e/espresso-tickets-1982507090074",          color: "#D2B98B", tag: "Upscale Night",  city: "Atlanta" },
  { name: "FOREVER FUTBOL",     date: "Jun 5",   month: "Jun", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046",   color: "#C6A65B", tag: "Museum Opening", city: "Atlanta" },
  { name: "TASTE OF ART",       date: "Jun 20",  month: "Jun", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982513123119",      color: "#A75C43", tag: "Art & Culture",  city: "Atlanta" },
  { name: "GANGSTA GOSPEL",     date: "Jun 21",  month: "Jun", url: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983357015223",   color: "#3C5B8A", tag: "Gospel Hip-Hop", city: "Atlanta" },
  { name: "REMIX",              date: "Jul 11",  month: "Jul", url: "https://www.eventbrite.com/e/remix-tickets-1983356687242",            color: "#B6E03E", tag: "DJ Night",       city: "Atlanta" },
  { name: "WRST BHVR",          date: "Jul 25",  month: "Jul", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983443502910",       color: "#BB2C35", tag: "Food Fights",    city: "Atlanta" },
  { name: "PAWCHELLA",          date: "Aug 8",   month: "Aug", url: "https://www.eventbrite.com/e/pawchella-summer-tickets-1983440350481", color: "#FF9500", tag: "Pet Festival",   city: "Atlanta" },
  { name: "BEAUTY & THE BEAST", date: "Sep 12",  month: "Sep", url: "https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091", color: "#D947A8", tag: "Themed Party",   city: "Atlanta" },
];

const MONTHS = ["All", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/* BG flyer images scattered per section */
const SECTION_BG = [
  "/images/huglife-rooftop.png",
  "/images/huglife-atmosphere.png",
  "/images/huglife-elevated.png",
  "/images/huglife-graphic-02.png",
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

/* Scattered BG image layer — each section gets a different flyer */
function SectionBg({ src, opacity = 0.06 }: { src: string; opacity?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity, filter: "brightness(0.25) saturate(0.3)", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none", zIndex: 0 }} />
  );
}

/* Gold shimmer divider */
function GoldLine() {
  return <div className="gold-divider" style={{ margin: "0 auto", maxWidth: 1400 }} />;
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
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px var(--gutter)" : "22px var(--gutter)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.5s var(--ease)"
    }}>
      <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: 36, width: "auto" }} />
      <div className="nav-links" style={{ display: "flex", gap: "clamp(16px,2.5vw,32px)", alignItems: "center" }}>
        {["Events", "Calendar", "Tickets"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 500,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)",
            transition: "color 0.3s"
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >{n}</a>
        ))}
        <a href="#tickets" className="cta-gold" style={{ padding: "9px 22px" }}>Tickets</a>
      </div>
    </nav>
  );
}

/* ═══ HERO — FULL SCREEN VIDEO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 300); }, []);
  return (
    <section style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {/* FULL SCREEN VIDEO — objectFit: cover, stretched */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0
        }}
      >
        <source src="/images/huglife-hero.mp4" type="video/mp4" />
      </video>

      {/* BORDER BLUR — all 4 edges fade into black */}
      {/* Top edge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18vh", zIndex: 1, background: "linear-gradient(180deg, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0) 100%)", pointerEvents: "none" }} />
      {/* Bottom edge */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22vh", zIndex: 1, background: "linear-gradient(0deg, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0) 100%)", pointerEvents: "none" }} />
      {/* Left edge */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "12vw", zIndex: 1, background: "linear-gradient(90deg, rgba(11,11,11,0.7) 0%, rgba(11,11,11,0) 100%)", pointerEvents: "none" }} />
      {/* Right edge */}
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "12vw", zIndex: 1, background: "linear-gradient(270deg, rgba(11,11,11,0.7) 0%, rgba(11,11,11,0) 100%)", pointerEvents: "none" }} />
      {/* Corner vignette for extra depth */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.6) 100%)", pointerEvents: "none" }} />

      {/* LOGO — top left corner, perimeter */}
      <div style={{
        position: "absolute", top: "clamp(80px,10vh,120px)", left: "var(--gutter)",
        zIndex: 5, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-20px)",
        transition: "all 1.2s var(--ease) 0.2s"
      }}>
        <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{
          height: "clamp(50px,8vw,100px)", display: "block"
        }} />
      </div>

      {/* Cities — top right corner, perimeter */}
      <div style={{
        position: "absolute", top: "clamp(90px,10vh,130px)", right: "var(--gutter)",
        zIndex: 5, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
        fontFamily: "'DM Sans',sans-serif", fontSize: "8px", letterSpacing: "0.45em",
        textTransform: "uppercase", color: "rgba(201,166,70,0.6)", textAlign: "right"
      }}>
        Atlanta · Houston · LA<br />DC · Charlotte · Miami
      </div>

      {/* BOTTOM BAR — tagline + CTAs pinned to bottom edge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: "0 var(--gutter) clamp(32px,5vh,56px)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexWrap: "wrap", gap: 20
      }}>
        {/* Left: tagline */}
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,2.5vw,28px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.4, color: "var(--ivory)",
            letterSpacing: "0.06em", marginBottom: 6
          }}>
            We Create Atmosphere.
          </p>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "11px", lineHeight: 1.6,
            color: "rgba(247,245,240,0.4)", maxWidth: 360
          }}>
            15+ event brands · 45+ events in 2026
          </p>
        </div>

        {/* Right: CTAs */}
        <div style={{
          display: "flex", gap: 14, opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 1s", flexWrap: "wrap"
        }}>
          <a href="#calendar" className="cta-gold">View Calendar</a>
          <a href="#tickets" className="cta-outline">Get Tickets</a>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 1.4s"
      }}>
        <div style={{ width: 1, height: 20, background: "rgba(201,166,70,0.3)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ═══ ABOUT — ivory/white background section (25% white) ═══ */
function About() {
  return (
    <section style={{
      background: "var(--ivory)", padding: "var(--pad) var(--gutter)",
      position: "relative", overflow: "hidden"
    }}>
      <SectionBg src={SECTION_BG[0]} opacity={0.04} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }} className="mob-stack">
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--gold-deep)", marginBottom: 16 }}>The Creative Group</div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--black)", textTransform: "uppercase", marginBottom: 24 }}>
                Elevated Events.<br />
                <span style={{ color: "var(--gold-deep)" }}>Remarkable Moods.</span><br />
                Custom Energy.
              </h2>
              <div className="gold-divider" style={{ marginBottom: 24, maxWidth: 120 }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "var(--text-body-lg)", lineHeight: 1.8, color: "#333", maxWidth: 480 }}>
                HugLife is a multi-brand event collective building curated experiences across music, art, food, fashion, and culture. From intimate dinners to festival-scale productions — we create the atmosphere.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img src="/images/huglife-elevated.png" alt="HugLife Elevated Events" style={{
                width: "100%", borderRadius: 0, display: "block",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3)"
              }} />
              {/* Gold frame accent */}
              <div style={{ position: "absolute", top: -8, left: -8, right: 8, bottom: 8, border: "1px solid var(--gold-deep)", pointerEvents: "none", opacity: 0.3 }} />
            </div>
          </div>
        </Rev>
      </div>
    </section>
  );
}

/* ═══ EVENT BRANDS — black section with brand cards ═══ */
function EventBrands() {
  return (
    <section id="events" style={{
      background: "var(--black)", padding: "var(--pad) var(--gutter)",
      position: "relative", overflow: "hidden"
    }}>
      <SectionBg src={SECTION_BG[1]} opacity={0.05} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>The Portfolio</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--white)", textTransform: "uppercase", marginBottom: 48 }}>
            Our <span style={{ color: "var(--gold)" }}>Brands</span>
          </h2>
        </Rev>

        <Rev className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }} >
          {EVENT_BRANDS.map((b, i) => (
            <div key={i} className="brand-card" style={{
              background: "var(--surface)", minHeight: 280, display: "flex",
              flexDirection: "column", justifyContent: "center", alignItems: "center",
              position: "relative", padding: "32px 16px 20px"
            }}>
              {/* Scattered flyer as card BG */}
              {b.flyer && (
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.10,
                  filter: "brightness(0.25) saturate(0.4)",
                  backgroundImage: `url(${b.flyer})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  pointerEvents: "none", zIndex: 0
                }} />
              )}
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(180deg, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.7) 100%)"
              }} />
              {/* LOGO — centered, the hero of each card */}
              <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                {b.logo ? (
                  <Img src={b.logo} alt={b.name} style={{
                    maxHeight: 140, maxWidth: "90%", objectFit: "contain",
                    filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))"
                  }} />
                ) : (
                  <div style={{
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,3vw,42px)",
                    color: "var(--white)", textTransform: "uppercase", letterSpacing: "0.03em",
                    textAlign: "center"
                  }}>{b.name}</div>
                )}
              </div>
              {/* Description below logo */}
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: 12 }}>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "9px", lineHeight: 1.5,
                  color: "var(--muted)", maxWidth: 200, margin: "0 auto"
                }}>{b.desc}</p>
              </div>
              {/* Accent line at bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: b.accent, opacity: 0.5, zIndex: 3 }} />
            </div>
          ))}
        </Rev>
      </div>
    </section>
  );
}

/* ═══ MARQUEE — gold-accented ═══ */
function Marquee() {
  const txt = "NOIR · REMIX · WRST BHVR · TASTE OF ART · GANGSTA GOSPEL · CRVNGS · STELLA · UNDERGROUND KING · THE KULTURE · FOREVER FUTBOL · ";
  return (
    <div style={{ background: "var(--gold-deep)", overflow: "hidden", padding: "14px 0" }}>
      <div className="marquee-track">
        {[0, 1, 2].map(k => (
          <span key={k} style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(14px,1.5vw,20px)",
            letterSpacing: "0.15em", color: "var(--black)", whiteSpace: "nowrap", padding: "0 8px"
          }}>{txt}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══ CALENDAR — ivory/white section (25% white) ═══ */
function Calendar() {
  const [activeMonth, setActiveMonth] = useState(0);
  const m = CALENDAR_2026[activeMonth];
  return (
    <section id="calendar" style={{
      background: "var(--white)", padding: "var(--pad) var(--gutter)",
      position: "relative", overflow: "hidden"
    }}>
      <SectionBg src={SECTION_BG[2]} opacity={0.035} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.48em", textTransform: "uppercase", color: "var(--gold-deep)", marginBottom: 16 }}>2026 Season</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "var(--text-section)", lineHeight: 0.95, color: "var(--black)", textTransform: "uppercase", marginBottom: 48 }}>
            The <span style={{ color: "var(--gold-deep)" }}>Calendar</span>
          </h2>
        </Rev>

        {/* Month tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid rgba(11,11,11,0.08)", overflowX: "auto" }}>
          {CALENDAR_2026.map((mo, i) => (
            <button key={mo.month} onClick={() => setActiveMonth(i)} style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: activeMonth === i ? 700 : 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: activeMonth === i ? "var(--gold-deep)" : "#999",
              background: "none", border: "none",
              borderBottom: activeMonth === i ? "2px solid var(--gold-deep)" : "2px solid transparent",
              padding: "12px 20px", cursor: "pointer", transition: "all 0.3s", whiteSpace: "nowrap"
            }}>{mo.month}</button>
          ))}
        </div>

        {/* Events list — on white bg, black text, gold accents */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {m.events.map((ev, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "100px 1fr 40px", gap: 16,
              padding: "18px 20px", background: "rgba(11,11,11,0.03)", alignItems: "center",
              borderLeft: `3px solid ${ev.color}`, transition: "background 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(11,11,11,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(11,11,11,0.03)")}
            >
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "var(--black)", letterSpacing: "0.02em" }}>{ev.day}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: "var(--black)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{ev.name}</div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: ev.color, justifySelf: "end" }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, fontFamily: "'DM Mono',monospace", fontSize: "var(--text-caption)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>
          {m.events.length} events in {m.month} · <span style={{ color: "var(--gold-deep)" }}>{CALENDAR_2026.reduce((a, b) => a + b.events.length, 0)} total in 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ═══ TICKETS — black section, gold prestige ═══ */
function TicketHub() {
  const [activeMonth, setActiveMonth] = useState("All");
  const filtered = activeMonth === "All" ? TICKETS : TICKETS.filter(e => e.month === activeMonth);
  return (
    <section id="tickets" style={{
      background: "var(--black)", padding: "var(--pad) var(--gutter)",
      position: "relative", overflow: "hidden"
    }}>
      <SectionBg src={SECTION_BG[3]} opacity={0.05} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, var(--gold-glow) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(201,166,70,0.06) 0%, transparent 50%)" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>2026 Event Calendar</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,8vw,100px)", lineHeight: 0.9, color: "var(--white)", textTransform: "uppercase" }}>
              Get Your<br /><span style={{ color: "var(--gold)" }}>Tickets.</span>
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
            <button key={m} onClick={() => setActiveMonth(m)} style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: activeMonth === m ? 700 : 400,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: activeMonth === m ? "var(--gold)" : "var(--muted)",
              background: activeMonth === m ? "rgba(201,166,70,0.08)" : "transparent",
              border: `1px solid ${activeMonth === m ? "rgba(201,166,70,0.3)" : "var(--border)"}`,
              padding: "10px 20px", cursor: "pointer", transition: "all 0.3s"
            }}>{m}</button>
          ))}
        </div>

        {/* Ticket grid */}
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
          {filtered.map((event, i) => (
            <a key={i} href={event.url} target="_blank" rel="noopener noreferrer" style={{
              background: "var(--surface)", padding: "24px 20px",
              display: "flex", flexDirection: "column", gap: 10,
              borderLeft: `3px solid ${event.color}`, transition: "all 0.4s var(--ease)",
              textDecoration: "none"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: event.color }}>{event.date}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", color: "var(--muted)", background: "var(--faint)", padding: "3px 8px" }}>{event.city}</div>
              </div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(18px,2vw,26px)", color: "var(--white)", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.1 }}>{event.name}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>{event.tag}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                Buy Tickets <span style={{ fontSize: 14 }}>→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Group CTA */}
        <div style={{ marginTop: 3, background: "var(--surface)", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, borderLeft: "3px solid var(--gold)" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Groups · Schools · Corporate</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "var(--white)", textTransform: "uppercase" }}>Need 10+ tickets?</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Group Ticket Inquiry" className="cta-gold">Book a Group</a>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Corporate Event Inquiry" className="cta-outline">Corporate Events</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA CLOSE — gold-accented ivory ═══ */
function CTAClose() {
  return (
    <section style={{
      background: "var(--ivory)", padding: "clamp(100px,16vh,180px) var(--gutter)",
      position: "relative", overflow: "hidden"
    }}>
      <SectionBg src={SECTION_BG[0]} opacity={0.035} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,166,70,0.06), transparent 55%)" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Rev>
          <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: 56, margin: "0 auto 28px", display: "block", filter: "brightness(0) saturate(0)", opacity: 0.15 }} />
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,8vw,120px)", color: "var(--black)", lineHeight: 0.9, textTransform: "uppercase", marginBottom: 20 }}>
            Just<br /><span style={{ color: "var(--gold-deep)" }}>HugLife.</span>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.8, color: "#555", maxWidth: 440, margin: "0 auto 40px" }}>
            The events that connect communities. The experiences that become memories. Join us in 2026.
          </p>
          <a href="#calendar" className="cta-gold" style={{ padding: "15px 48px" }}>View Full Calendar</a>
        </Rev>
      </div>
    </section>
  );
}

/* ═══ FOOTER — black with gold + white details ═══ */
function Footer() {
  return (
    <footer style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "56px var(--gutter) 36px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: 40, marginBottom: 48 }}>
          <div>
            <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: 40, marginBottom: 14 }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, lineHeight: 1.7, color: "var(--muted)" }}>Events. Culture. Community.<br />A KHG Enterprise.</p>
          </div>
          {[
            { h: "Events", l: ["NOIR", "REMIX", "WRST BHVR", "Taste of Art", "Gangsta Gospel", "CRVNGS", "Stella"] },
            { h: "Company", l: ["About HugLife", "Tickets", "Sponsor", "Vendor Inquiry", "Press"] },
            { h: "Connect", l: ["@justhuglife", "thekollectiveworldwide@gmail.com", "Atlanta, GA"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {col.l.map(item => <li key={item} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--muted)" }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-divider" style={{ marginBottom: 20 }} />
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(247,245,240,0.15)" }}>© 2026 HugLife Events. A KHG Enterprise.</div>
      </div>
    </footer>
  );
}

/* ═══ MAIN — SECTION ORDER ═══
  Hero (black + video) → About (ivory) → Brands (black) → 
  Marquee (gold) → Calendar (white) → Tickets (black) → 
  CTA (ivory) → Footer (black)
  = Alternating exactly per the 50/25/25 ratio
═══════════════════════════════════════════════════════ */
export default function HugLifeV6() {
  return (
    <div style={{ background: "var(--black)" }}>
      <Nav />
      <Hero />
      <About />
      <EventBrands />
      <Marquee />
      <Calendar />
      <TicketHub />
      <CTAClose />
      <Footer />
    </div>
  );
}
