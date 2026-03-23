"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   HUGLIFE — WHERE CULTURE LIVES
   Design Reference: tibicohealth.com
   
   LIGHT CREAM BACKGROUND. Cormorant Garamond serif headlines.
   DM Sans body. Horizontal scrolling cards. Icon benefit strips.
   Category lifestyle cards. Tabbed event sections. Clean, airy,
   premium — like a wellness brand but for events & culture.
   ═══════════════════════════════════════════════════════════════ */

const S = { serif: "'Cormorant Garamond',Georgia,serif", sans: "'DM Sans',system-ui,sans-serif" };

const BRANDS = [
  { name: "NOIR", type: "Upscale Night", logo: "/images/logos/noir_logo.png", accent: "#C9A84C", desc: "All-black dress code. Elegance meets nightlife." },
  { name: "REMIX", type: "DJ Mashup", logo: "/images/logos/remix_logo.png", accent: "#7CB342", desc: "Genre-bending music. No rules, just vibes." },
  { name: "WRST BHVR", type: "Napkin Wars", logo: "/images/logos/wrst_bhvr_logo.png", accent: "#C62828", desc: "Food fights meet fine dining. ATL + DC." },
  { name: "Taste of Art", type: "Art & Culture", logo: "/images/logos/taste_of_art_logo.png", accent: "#BF360C", desc: "Live art, culture, and the creative underground." },
  { name: "Gangsta Gospel", type: "Sacred × Street", logo: "/images/logos/gangsta_gospel_logo.png", accent: "#37474F", desc: "Where sacred meets street. Father's Day tradition." },
  { name: "CRVNGS", type: "Food Festival", logo: "/images/logos/crvngs_logo.png", accent: "#E65100", desc: "Culinary exhibition. Food truck editions." },
  { name: "Stella", type: "R&B Concert", logo: "/images/logos/stella_logo.png", accent: "#AD1457", desc: "R&B nights that bring the soul back." },
  { name: "Underground King", type: "Indie Music", logo: "/images/logos/underground_king_logo.png", accent: "#4A148C", desc: "Underground music. Raw talent. No filter." },
  { name: "The Kulture", type: "Streetwear", logo: "/images/logos/the_kulture_logo.png", accent: "#F9A825", desc: "Fashion, streetwear, and urban culture." },
  { name: "Forever Futbol", type: "Museum", logo: "/images/logos/forever_futbol_logo.png", accent: "#C9A84C", desc: "World Cup immersive experience." },
];

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";

const CATEGORIES = [
  { name: "Nightlife", img: `${SB}/pronto-energy/lifestyle/club-selfie-girls.png`, desc: "Curated after-dark experiences across 8 cities" },
  { name: "Music & Concerts", img: `${SB}/pronto-energy/lifestyle/festival-crowd-all-flavors.png`, desc: "From intimate R&B sets to stadium-scale festivals" },
  { name: "Food & Culture", img: `${SB}/casper-group/food/premium-burger.png`, desc: "Food truck fests, art shows, cultural immersions" },
  { name: "Community", img: `${SB}/pronto-energy/lifestyle/beach-girls-sunset.png`, desc: "Block parties, game days, and group experiences" },
  { name: "Experiences", img: `${SB}/pronto-energy/lifestyle/cheers-boat-sunset.png`, desc: "VIP access, golden hour moments, and more" },
];

const TICKETS = [
  { name: "SECRET SOCIETY", date: "Apr 10", month: "Apr", url: "https://www.eventbrite.com/e/secret-society-the-art-of-being-selective-tickets-1985661187063", color: "#B8943E", tag: "Midnight Affair", city: "Atlanta" },
  { name: "TASTE OF ART", date: "Apr 18", month: "Apr", url: "https://www.eventbrite.com/e/taste-of-art-canvas-cuisine-culture-tickets-1985661188066", color: "#A75C43", tag: "Art & Culture", city: "Atlanta" },
  { name: "THE KULTURE", date: "Apr 18", month: "Apr", url: "https://www.eventbrite.com/e/the-kulture-streetwear-market-tickets-1985661193081", color: "#D947A8", tag: "Streetwear Market", city: "Atlanta" },
  { name: "WRST BHVR", date: "Apr 26", month: "Apr", url: "https://www.eventbrite.com/e/wrst-bhvr-napkin-wars-edt-tickets-1985661200102", color: "#BB2C35", tag: "Napkin Wars", city: "Atlanta" },
  { name: "REMIX", date: "May 2", month: "May", url: "https://www.eventbrite.com/e/remix-the-mashup-music-experience-tickets-1985661232198", color: "#B6E03E", tag: "Mashup Night", city: "Atlanta" },
  { name: "CINCO DE DRINKO", date: "May 5", month: "May", url: "https://www.eventbrite.com/e/cinco-de-drinko-cinco-de-mayo-tickets-1985661246240", color: "#E65100", tag: "Block Party", city: "Atlanta" },
  { name: "SOUL SESSIONS", date: "May 10", month: "May", url: "https://www.eventbrite.com/e/soul-sessions-rnb-all-night-tickets-1985661249249", color: "#7C3AED", tag: "Live R&B", city: "Atlanta" },
  { name: "NOIR", date: "May 17", month: "May", url: "https://www.eventbrite.com/e/noir-an-elevated-night-experience-tickets-1985661270312", color: "#D2B98B", tag: "Upscale Night", city: "Atlanta" },
  { name: "BLOCK PARTY", date: "May 24", month: "May", url: "https://www.eventbrite.com/e/block-party-huglife-outdoor-experience-tickets-1985661300402", color: "#FF6B35", tag: "Outdoor Party", city: "Atlanta" },
  { name: "FOREVER FUTBOL", date: "May 29", month: "May", url: "https://www.eventbrite.com/e/forever-futbol-museum-tickets-1985661262288", color: "#C6A65B", tag: "Museum Experience", city: "Atlanta" },
  { name: "WRST BHVR", date: "May 30", month: "May", url: "https://www.eventbrite.com/e/wrst-bhvr-napkin-wars-edt-tickets-1985661204114", color: "#BB2C35", tag: "Napkin Wars", city: "Atlanta" },
  { name: "UNDERGROUND KING", date: "Jun 12", month: "Jun", url: "https://www.eventbrite.com/e/underground-king-indie-concert-tickets-1985661283351", color: "#37474F", tag: "Indie Concert", city: "Atlanta" },
  { name: "REMIX", date: "Jun 13", month: "Jun", url: "https://www.eventbrite.com/e/remix-the-mashup-music-experience-tickets-1985661235207", color: "#B6E03E", tag: "Mashup Night", city: "Atlanta" },
  { name: "CRVNGS", date: "Jun 14", month: "Jun", url: "https://www.eventbrite.com/e/crvngs-culinary-food-truck-fest-tickets-1985661287363", color: "#E65100", tag: "Food Fest", city: "Atlanta" },
  { name: "BLOCK PARTY", date: "Jun 19", month: "Jun", url: "https://www.eventbrite.com/e/block-party-huglife-outdoor-experience-tickets-1985661301405", color: "#FF6B35", tag: "Juneteenth", city: "Atlanta" },
  { name: "TASTE OF ART", date: "Jun 20", month: "Jun", url: "https://www.eventbrite.com/e/taste-of-art-canvas-cuisine-culture-tickets-1985661189069", color: "#A75C43", tag: "Art & Culture", city: "Atlanta" },
  { name: "THE KULTURE", date: "Jun 20", month: "Jun", url: "https://www.eventbrite.com/e/the-kulture-streetwear-market-tickets-1985661194084", color: "#D947A8", tag: "Streetwear Market", city: "Atlanta" },
  { name: "GANGSTA GOSPEL", date: "Jun 21", month: "Jun", url: "https://www.eventbrite.com/e/gangsta-gospel-not-your-average-sunday-service-tickets-1985661280342", color: "#3C5B8A", tag: "Gospel Hip-Hop", city: "Atlanta" },
  { name: "WRST BHVR", date: "Jun 27", month: "Jun", url: "https://www.eventbrite.com/e/wrst-bhvr-napkin-wars-edt-tickets-1985661208126", color: "#BB2C35", tag: "Napkin Wars", city: "DC" },
  { name: "PARKING LOT PIMPIN", date: "Jul 4", month: "Jul", url: "https://www.eventbrite.com/e/parking-lot-pimpin-car-bike-show-tickets-1985661303411", color: "#FF6B35", tag: "Car & Bike Show", city: "Atlanta" },
  { name: "CRVNGS", date: "Jul 5", month: "Jul", url: "https://www.eventbrite.com/e/crvngs-culinary-food-truck-fest-tickets-1985661288366", color: "#E65100", tag: "Food Fest", city: "Atlanta" },
  { name: "REMIX", date: "Jul 11", month: "Jul", url: "https://www.eventbrite.com/e/remix-the-mashup-music-experience-tickets-1985661241225", color: "#B6E03E", tag: "Mashup Night", city: "Atlanta" },
  { name: "NOIR", date: "Jul 19", month: "Jul", url: "https://www.eventbrite.com/e/noir-an-elevated-night-experience-tickets-1985661273321", color: "#D2B98B", tag: "Upscale Night", city: "Atlanta" },
  { name: "WRST BHVR", date: "Jul 25", month: "Jul", url: "https://www.eventbrite.com/e/wrst-bhvr-napkin-wars-edt-tickets-1985661216150", color: "#BB2C35", tag: "Napkin Wars", city: "Atlanta" },
  { name: "SOUL SESSIONS", date: "Aug 9", month: "Aug", url: "https://www.eventbrite.com/e/soul-sessions-rnb-all-night-tickets-1985661252258", color: "#7C3AED", tag: "Live R&B", city: "Atlanta" },
  { name: "REMIX", date: "Aug 15", month: "Aug", url: "https://www.eventbrite.com/e/remix-the-mashup-music-experience-tickets-1985661242228", color: "#B6E03E", tag: "Mashup Night", city: "Atlanta" },
  { name: "TASTE OF ART", date: "Aug 22", month: "Aug", url: "https://www.eventbrite.com/e/taste-of-art-canvas-cuisine-culture-tickets-1985661191075", color: "#A75C43", tag: "Art & Culture", city: "Atlanta" },
  { name: "THE KULTURE", date: "Aug 22", month: "Aug", url: "https://www.eventbrite.com/e/the-kulture-streetwear-market-tickets-1985661195087", color: "#D947A8", tag: "Streetwear Market", city: "Atlanta" },
  { name: "BEAUTY & THE BEAST", date: "Sep 12", month: "Sep", url: "https://www.eventbrite.com/e/beauty-the-beast-greek-ball-tickets-1985661306420", color: "#AD1457", tag: "Greek Ball", city: "Atlanta" },
  { name: "NOIR", date: "Sep 6", month: "Sep", url: "https://www.eventbrite.com/e/noir-an-elevated-night-experience-tickets-1985661274324", color: "#D2B98B", tag: "Upscale Night", city: "Atlanta" },
  { name: "SOUL SESSIONS", date: "Sep 19", month: "Sep", url: "https://www.eventbrite.com/e/soul-sessions-rnb-all-night-tickets-1985661257273", color: "#7C3AED", tag: "Live R&B", city: "Atlanta" },
  { name: "MONSTERS BALL", date: "Oct 31", month: "Oct", url: "https://www.eventbrite.com/e/monsters-ball-halloween-tickets-1985661307423", color: "#E65100", tag: "Halloween", city: "Atlanta" },
  { name: "NOIR", date: "Nov 15", month: "Nov", url: "https://www.eventbrite.com/e/noir-an-elevated-night-experience-tickets-1985661278336", color: "#D2B98B", tag: "Upscale Night", city: "Atlanta" },
  { name: "BLACK BALL", date: "Nov 21", month: "Nov", url: "https://www.eventbrite.com/e/black-ball-all-black-semi-formal-tickets-1985661310432", color: "#1A1A2E", tag: "Semi Formal", city: "Atlanta" },
  { name: "SNOW BALL", date: "Dec 12", month: "Dec", url: "https://www.eventbrite.com/e/snow-ball-winter-white-party-tickets-1985661311435", color: "#90CAF9", tag: "Winter White", city: "Atlanta" },
];

const CALENDAR = [
  { month: "April", events: [{ day: "Sat 11", name: "REMIX" }, { day: "Sat 18", name: "TASTE OF ART + KULTURE" }, { day: "Sat 25", name: "WRST BHVR" }] },
  { month: "May", events: [{ day: "Sat 2", name: "REMIX" }, { day: "Tue 5", name: "CINCO BLOCK PARTY" }, { day: "Sun 10", name: "STELLA" }, { day: "Sun 17", name: "NOIR" }, { day: "Sun 24", name: "MEMORIAL BLOCK PARTY" }, { day: "Sat 30", name: "WRST BHVR" }] },
  { month: "June", events: [{ day: "Thu 5", name: "FOREVER FUTBOL OPENS" }, { day: "Fri 12", name: "UNDERGROUND KING" }, { day: "Sat 13", name: "REMIX" }, { day: "Sun 14", name: "CRVNGS" }, { day: "Thu 19", name: "JUNETEENTH" }, { day: "Sat 20", name: "TASTE OF ART" }, { day: "Sun 21", name: "GANGSTA GOSPEL" }, { day: "Fri 27", name: "WRST BHVR (DC)" }] },
  { month: "July", events: [{ day: "Fri 4", name: "4TH OF JULY CAR SHOW" }, { day: "Sat 5", name: "CRVNGS" }, { day: "Sat 11", name: "REMIX" }, { day: "Sun 19", name: "NOIR" }, { day: "Sat 25", name: "WRST BHVR" }] },
  { month: "August", events: [{ day: "Fri 8", name: "BACK TO SCHOOL" }, { day: "Sun 9", name: "STELLA" }, { day: "Sat 15", name: "REMIX" }, { day: "Sun 16", name: "CRVNGS" }, { day: "Sat 22", name: "TASTE OF ART" }, { day: "Sat 29", name: "WRST BHVR (DC)" }] },
  { month: "September", events: [{ day: "Sat 5", name: "REMIX" }, { day: "Sun 6", name: "NOIR" }, { day: "Sat 12", name: "BEAUTY & BEAST" }, { day: "Sun 13", name: "GANGSTA GOSPEL" }, { day: "Fri 18", name: "UNDERGROUND KING" }, { day: "Sat 26", name: "WRST BHVR" }] },
  { month: "October", events: [{ day: "Sun 18", name: "CRVNGS" }, { day: "Fri 31", name: "MONSTER'S BALL" }] },
  { month: "November", events: [{ day: "Sun 15", name: "NOIR" }, { day: "Sat 21", name: "BLACK BALL" }] },
  { month: "December", events: [{ day: "Dec 4-6", name: "TASTE OF ART (ART BASEL)" }, { day: "Sat 12", name: "SNOW BALL" }] },
];

const VALUES = [
  { icon: "✦", title: "Curated", desc: "Every event handpicked" },
  { icon: "♫", title: "Live Music", desc: "Real artists, real energy" },
  { icon: "◎", title: "Community", desc: "Built around connection" },
  { icon: "◆", title: "Culture", desc: "Art, food, fashion, soul" },
  { icon: "★", title: "Quality", desc: "Premium production always" },
  { icon: "♡", title: "Inclusive", desc: "Everyone belongs here" },
  { icon: "⚡", title: "Energy", desc: "Unforgettable atmospheres" },
  { icon: "⬡", title: "Local", desc: "Rooted in 8 cities" },
];

const MONTHS_FILTER = ["All", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ── UTILITIES ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("vis"); }, { threshold, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
function R({ children, className = "reveal", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useReveal();
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
function Btn({ children, href, variant = "primary", style }: { children: React.ReactNode; href?: string; variant?: "primary" | "outline"; style?: React.CSSProperties }) {
  const base: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: S.sans, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", textDecoration: "none", cursor: "pointer", border: "none", ...style };
  const s = variant === "primary"
    ? { ...base, background: "var(--accent)", color: "#fff", borderRadius: 0 }
    : { ...base, background: "transparent", color: "var(--text)", border: "1.5px solid var(--text)", borderRadius: 0 };
  if (href) return <a href={href} style={s}>{children}</a>;
  return <button style={s}>{children}</button>;
}

/* ═════════════════════════════════════════════════════════════ */
export default function HugLife() {
  const [calMonth, setCalMonth] = useState(0);
  const [ticketFilter, setTicketFilter] = useState("All");
  const filteredTickets = ticketFilter === "All" ? TICKETS : TICKETS.filter(t => t.month === ticketFilter);

  /* ── ANNOUNCEMENT BAR (like Tibico's "Subscribe & Save") ── */
  const Announcement = (
    <div style={{ background: "var(--dark)", padding: "10px 20px", textAlign: "center", fontFamily: S.sans, fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", color: "#fff" }}>
      2026 Season Now Live · <span style={{ color: "var(--accent)" }}>15+ Event Brands</span> · 45+ Events · Get Tickets →
    </div>
  );

  /* ── NAV ── */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const Nav = (
    <nav style={{ position: "fixed", top: scrolled ? 0 : 34, left: 0, right: 0, zIndex: 100, padding: "14px clamp(24px,4vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(253,251,247,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none", transition: "all 0.5s var(--ease)" }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: 36, width: "auto", filter: scrolled ? "none" : "brightness(10)" }} />
      </a>
      <div className="mob-hide" style={{ display: "flex", gap: "clamp(20px,3vw,40px)", alignItems: "center" }}>
        {["Events", "Calendar", "Tickets", "About"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 500, color: scrolled ? "var(--text2)" : "#fff", letterSpacing: "0.04em", transition: "color 0.3s" }}>{n}</a>
        ))}
        <Btn href="#tickets" variant="primary" style={{ padding: "10px 24px", fontSize: 11, background: "var(--accent)" }}>Get Tickets</Btn>
      </div>
    </nav>
  );

  /* ── HERO (fullscreen image like Tibico) ── */
  const Hero = (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <img src={`${SB}/huglife/website/homescreen.jpg`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800, padding: "0 24px" }}>
        <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: "clamp(50px,8vw,80px)", margin: "0 auto 24px", filter: "brightness(10)" }} />
        <h1 style={{ fontFamily: S.serif, fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "#fff", letterSpacing: "-0.01em" }}>
          Crafted with culture.<br />Curated by community.
        </h1>
        <p style={{ fontFamily: S.sans, fontSize: "clamp(14px,1.3vw,17px)", color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "20px auto 0", lineHeight: 1.7, fontWeight: 300 }}>
          15+ event brands spanning music, nightlife, art, food, and culture — curated experiences that connect communities across America.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <Btn href="#events" variant="primary">Explore Events</Btn>
          <Btn href="#tickets" variant="outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>Get Tickets</Btn>
        </div>
      </div>
    </section>
  );

  /* ── STATS STRIP (like Tibico's benefit icons) ── */
  const StatsStrip = (
    <R style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,80px)", padding: "28px clamp(24px,4vw,60px)", flexWrap: "wrap" }}>
        {[{ v: "15+", l: "Event Brands" }, { v: "45+", l: "Events in 2026" }, { v: "8", l: "Cities" }, { v: "50K+", l: "Attendees" }, { v: "6", l: "Years Running" }].map(s => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: S.serif, fontSize: "clamp(28px,3vw,44px)", fontWeight: 600, color: "var(--accent)", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </R>
  );

  /* ── EVENT BRANDS HORIZONTAL SCROLL (like Tibico's product cards) ── */
  const EventBrands = (
    <section id="events" style={{ padding: "clamp(60px,10vh,100px) 0" }}>
      <div style={{ padding: "0 clamp(24px,4vw,60px)", maxWidth: 1400, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Our Event Brands</p>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--text)" }}>Discover the Universe</h2>
          </div>
        </R>
      </div>
      <div style={{ padding: "0 clamp(24px,4vw,60px)" }}>
        <div className="hscroll" style={{ gap: 16 }}>
          {BRANDS.map(b => (
            <div key={b.name} style={{ width: 260, flexShrink: 0, background: "var(--white)", border: "1px solid var(--border)", overflow: "hidden", transition: "all 0.4s var(--ease)", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Logo area */}
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg2)", padding: 32, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: b.accent }} />
                <img src={b.logo} alt={b.name} style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain" }} loading="lazy" />
              </div>
              {/* Info */}
              <div style={{ padding: "20px 20px 24px" }}>
                <p style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: b.accent, marginBottom: 6 }}>{b.type}</p>
                <h3 style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>{b.name}</h3>
                <p style={{ fontFamily: S.sans, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── ICON BENEFIT STRIP (like Tibico's "Rich in Postbiotics..." row) ── */
  const BenefitStrip = (
    <div style={{ background: "var(--dark)", padding: "20px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 48, animation: "marquee 30s linear infinite", width: "max-content" }}>
        {[...Array(2)].flatMap((_, i) =>
          ["Curated Nightlife", "Live Music", "Food Festivals", "Art & Culture", "Block Parties", "R&B Concerts", "Indie Shows", "Streetwear Markets", "VIP Experiences", "Museum Exhibits"].map(t => (
            <span key={`${t}-${i}`} style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--accent)" }}>✦</span> {t}
            </span>
          ))
        )}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}
@media(max-width:768px){
  .dg,.DG,[style*="gridTemplateColumns"]{grid-template-columns:1fr!important}
  .nl,.desktop-nav{display:none!important}
  .fg,.stat-grid,.feature-grid{grid-template-columns:1fr!important}
  .eg{grid-template-columns:1fr!important}
  h1,h2,.hero-title{word-break:break-word}
  nav{padding:16px!important}
  section{padding-left:16px!important;padding-right:16px!important}
}
</style>
    </div>
  );

  /* ── CATEGORY CARDS (like Tibico's Gut Health / Immunity / Balance row) ── */
  const CategoryCards = (
    <section style={{ padding: "clamp(60px,10vh,100px) 0" }}>
      <div style={{ padding: "0 clamp(24px,4vw,60px)", maxWidth: 1400, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Experience Categories</p>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, fontStyle: "italic", color: "var(--text)" }}>Find Your Vibe</h2>
          </div>
        </R>
      </div>
      <div style={{ padding: "0 clamp(24px,4vw,60px)" }}>
        <div className="hscroll" style={{ gap: 12 }}>
          {CATEGORIES.map(c => (
            <div key={c.name} style={{ width: 280, height: 380, flexShrink: 0, position: "relative", overflow: "hidden", cursor: "pointer" }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}>
              {/* PLACEHOLDER: Replace with real category photos */}
              <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s var(--ease)" }} loading="lazy" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
                <h3 style={{ fontFamily: S.serif, fontSize: 26, fontWeight: 500, fontStyle: "italic", color: "#fff", marginBottom: 4 }}>{c.name}</h3>
                <p style={{ fontFamily: S.sans, fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── KHG ECOSYSTEM — Product Brands (like Tibico's featured product) ── */
  const EcosystemSection = (
    <section style={{ background: "var(--bg2)", padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>The KHG Ecosystem</p>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, fontStyle: "italic", color: "var(--text)" }}>Powered by Our Brands</h2>
            <p style={{ fontFamily: S.sans, fontSize: 14, color: "var(--muted)", maxWidth: 520, margin: "12px auto 0" }}>
              Every HugLife event is fueled by the KHG family — premium energy, hydration, food, and culture experiences.
            </p>
          </div>
        </R>
        <R className="reveal-s" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {/* Pronto Energy */}
          <a href="https://pronto-energy-website.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background: "var(--white)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "all 0.4s var(--ease)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 220, overflow: "hidden" }}>
              <img src={`${SB}/pronto_energy/website/pronto-hero.jpg`} alt="Pronto Energy" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C82424", marginBottom: 6 }}>Energy Drink</p>
              <h3 style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Pronto Energy</h3>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>7 flavors. Event fuel.</p>
            </div>
          </a>
          {/* Infinity Water */}
          <a href="https://infinity-water-website.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background: "var(--white)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "all 0.4s var(--ease)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 220, overflow: "hidden" }}>
              <img src={`${SB}/infinity_water/website/all-bottles.jpg`} alt="Infinity Water" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4B6E9A", marginBottom: 6 }}>Premium Water</p>
              <h3 style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Infinity Water</h3>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>Hydrate different.</p>
            </div>
          </a>
          {/* Casper Group */}
          <a href="https://casper-group.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background: "var(--white)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "all 0.4s var(--ease)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 220, overflow: "hidden" }}>
              <img src={`${SB}/casper-group/food/premium-burger.png`} alt="Casper Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5E1F24", marginBottom: 6 }}>Food & Beverage</p>
              <h3 style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Casper Group</h3>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>9 restaurant concepts.</p>
            </div>
          </a>
          {/* Forever Futbol */}
          <a href="https://forever-futbol.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background: "var(--white)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "all 0.4s var(--ease)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 220, overflow: "hidden" }}>
              <img src={`${SB}/forever_futbol/07_packaging_merch/MERCH_1.jpeg`} alt="Forever Futbol" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C6A65B", marginBottom: 6 }}>Museum Experience</p>
              <h3 style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Forever Futbol</h3>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>The beautiful game. Elevated.</p>
            </div>
          </a>
        </R>
      </div>
    </section>
  );

  /* ── 2026 CALENDAR (clean tabbed layout like Tibico's "Shop Our Range" tabs) ── */
  const CalendarSection = (
    <section id="calendar" style={{ background: "var(--bg2)", padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>2026 Season</p>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, fontStyle: "italic", color: "var(--text)" }}>The Calendar</h2>
          </div>
        </R>
        {/* Month tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 32, borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>
          {CALENDAR.map((m, i) => (
            <button key={m.month} onClick={() => setCalMonth(i)} style={{ fontFamily: S.sans, fontSize: 13, fontWeight: calMonth === i ? 600 : 400, color: calMonth === i ? "var(--accent)" : "var(--muted)", background: "none", border: "none", borderBottom: calMonth === i ? "2px solid var(--accent)" : "2px solid transparent", padding: "12px 20px", letterSpacing: "0.04em", transition: "all 0.3s" }}>{m.month}</button>
          ))}
        </div>
        {/* Events */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {CALENDAR[calMonth].events.map((ev, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 20, padding: "16px 20px", background: "var(--white)", alignItems: "center", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--white)"}>
              <span style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{ev.day}</span>
              <span style={{ fontFamily: S.serif, fontSize: 20, fontWeight: 500, fontStyle: "italic", color: "var(--text)" }}>{ev.name}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <span style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>
            {CALENDAR[calMonth].events.length} events in {CALENDAR[calMonth].month} · <span style={{ color: "var(--accent)" }}>{CALENDAR.reduce((a, b) => a + b.events.length, 0)} total in 2026</span>
          </span>
        </div>
      </div>
    </section>
  );

  /* ── TICKETS SECTION (like Tibico's product grid with tabs) ── */
  const TicketsSection = (
    <section id="tickets" style={{ padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>On Sale Now</p>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, fontStyle: "italic", color: "var(--text)" }}>Get Your Tickets</h2>
          </div>
        </R>
        {/* Month filter tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {MONTHS_FILTER.map(m => (
            <button key={m} onClick={() => setTicketFilter(m)} style={{ fontFamily: S.sans, fontSize: 12, fontWeight: ticketFilter === m ? 600 : 400, padding: "8px 20px", background: ticketFilter === m ? "var(--accent)" : "transparent", color: ticketFilter === m ? "#fff" : "var(--text2)", border: `1px solid ${ticketFilter === m ? "var(--accent)" : "var(--border)"}`, transition: "all 0.3s" }}>{m}</button>
          ))}
        </div>
        {/* Ticket cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filteredTickets.map((t, i) => (
            <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" style={{ background: "var(--white)", border: "1px solid var(--border)", padding: 24, display: "flex", flexDirection: "column", gap: 8, transition: "all 0.35s var(--ease)", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 700, color: t.color }}>{t.date}</span>
                <span style={{ fontFamily: S.sans, fontSize: 10, fontWeight: 500, color: "var(--muted)", background: "var(--bg2)", padding: "3px 10px", letterSpacing: "0.06em" }}>{t.city}</span>
              </div>
              <h3 style={{ fontFamily: S.serif, fontSize: 24, fontWeight: 500, fontStyle: "italic", color: "var(--text)" }}>{t.name}</h3>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>{t.tag}</p>
              <div style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                Get Tickets <span>→</span>
              </div>
            </a>
          ))}
        </div>
        {/* Group CTA */}
        <R style={{ marginTop: 24, background: "var(--bg2)", padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <p style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>Groups · Schools · Corporate</p>
            <p style={{ fontFamily: S.serif, fontSize: 24, fontStyle: "italic", color: "var(--text)" }}>Need 10+ tickets?</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn href="mailto:thekollectiveworldwide@gmail.com?subject=Group Ticket Inquiry">Book a Group</Btn>
            <Btn href="mailto:thekollectiveworldwide@gmail.com?subject=Corporate Event Inquiry" variant="outline">Corporate Events</Btn>
          </div>
        </R>
      </div>
    </section>
  );

  /* ── CORE VALUES (like Tibico's values grid with icons) ── */
  const CoreValues = (
    <section style={{ background: "var(--bg2)", padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <R>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, fontStyle: "italic", color: "var(--text)" }}>What HugLife Stands For</h2>
            <p style={{ fontFamily: S.sans, fontSize: 14, color: "var(--muted)", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}>
              Curated experiences rooted in culture, community, and quality. Every event is intentional.
            </p>
          </div>
        </R>
        <R className="reveal-s" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ background: "var(--bg)", padding: "clamp(24px,3vw,40px)", textAlign: "center" }}>
              <div style={{ fontSize: 28, color: "var(--accent)", marginBottom: 12 }}>{v.icon}</div>
              <h4 style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text)", marginBottom: 6 }}>{v.title}</h4>
              <p style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)" }}>{v.desc}</p>
            </div>
          ))}
        </R>
      </div>
    </section>
  );

  /* ── MEET THE FOUNDER (like Tibico's "Meet the Maker") ── */
  const MeetFounder = (
    <section id="about" style={{ padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "center" }} className="mob-stack">
        {/* Founder photo */}
        <R>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
            <img src={`${SB}/huglife/website/event3.jpg`} alt="Dr. Dorsey" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </R>
        <R>
          <p style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>Meet the Founder</p>
          <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--text)", marginBottom: 24 }}>
            Built by Dr. Dorsey.<br />Powered by community.
          </h2>
          <p style={{ fontFamily: S.sans, fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 16 }}>
            HugLife Events is the flagship entertainment division of The Kollective Hospitality Group — a multi-brand ecosystem spanning hospitality, events, food & beverage, museums, products, and technology across 8 cities and 50+ ventures.
          </p>
          <p style={{ fontFamily: S.sans, fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 32 }}>
            Every event is curated with intention. Every experience is designed to connect. From intimate R&B sets to massive block parties, HugLife brings people together through the universal language of culture.
          </p>
          <Btn href="https://dr-dorsey-website.vercel.app" variant="outline">Discover KHG</Btn>
        </R>
      </div>
    </section>
  );

  /* ── BTS PHOTO STRIP (like Tibico's factory photos) ── */
  const PhotoStrip = (
    <section style={{ padding: "0", overflow: "hidden" }}>
      <div className="hscroll" style={{ gap: 4, padding: 0 }}>
        {/* Real KHG brand assets from across the ecosystem */}
        {[
          `${SB}/pronto-energy/lifestyle/festival-night-crew.png`,
          `${SB}/huglife/website/event1.jpg`,
          `${SB}/casper-group/food/lemon-pepper-wings.png`,
          `${SB}/pronto-energy/lifestyle/stadium-fans-game-day.png`,
          `${SB}/infinity_water/website/life1.jpg`,
          `${SB}/huglife/website/g2.jpg`,
          `${SB}/casper-group/food/fusion-tacos.png`,
          `${SB}/pronto-energy/lifestyle/pool-party-girls.png`,
          `${SB}/forever_futbol/07_packaging_merch/MERCH_1.jpeg`,
          `${SB}/infinity_water/website/life2.jpg`,
        ].map((img, i) => (
          <div key={i} style={{ width: 260, height: 260, flexShrink: 0, overflow: "hidden" }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );

  /* ── CTA / NEWSLETTER (like Tibico's "Sign up for 20% off") ── */
  const Newsletter = (
    <section style={{ background: "var(--dark)", padding: "clamp(60px,10vh,100px) clamp(24px,4vw,60px)", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <R>
          <img src="/images/huglife-logo-white-nobg.png" alt="HugLife" style={{ height: 48, margin: "0 auto 24px", filter: "brightness(10)" }} />
          <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, fontStyle: "italic", color: "#fff", marginBottom: 12 }}>
            Stay in the loop.
          </h2>
          <p style={{ fontFamily: S.sans, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
            Be first to know about new events, exclusive access, and community drops. Join the HugLife list.
          </p>
          <div style={{ display: "flex", gap: 0, maxWidth: 440, margin: "0 auto" }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "14px 18px", fontFamily: S.sans, fontSize: 14, border: "1px solid rgba(255,255,255,0.15)", borderRight: "none", background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none" }} />
            <button style={{ padding: "14px 28px", fontFamily: S.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer" }}>Join</button>
          </div>
        </R>
      </div>
    </section>
  );

  /* ── FOOTER (like Tibico's multi-column footer) ── */
  const Footer = (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "60px clamp(24px,4vw,60px) 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: 40, marginBottom: 48 }}>
          <div>
            <img src="/images/huglife-logo-clean.png" alt="HugLife" style={{ height: 40, marginBottom: 16 }} onError={e => { (e.target as HTMLImageElement).src = "/images/huglife-logo-white-nobg.png"; }} />
            <p style={{ fontFamily: S.sans, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>Events. Culture. Community.<br />A KHG Enterprise.</p>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              {["Instagram", "Twitter"].map(s => (
                <a key={s} href="#" style={{ fontFamily: S.sans, fontSize: 12, color: "var(--muted)", textDecoration: "underline" }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { h: "Events", l: ["NOIR", "REMIX", "WRST BHVR", "Taste of Art", "Gangsta Gospel", "CRVNGS", "Stella"] },
            { h: "Company", l: ["About HugLife", "Tickets", "Sponsor", "Vendor Inquiry", "Press"] },
            { h: "Connect", l: ["@justhuglife", "thekollectiveworldwide@gmail.com", "Atlanta, GA"] },
          ].map(col => (
            <div key={col.h}>
              <h4 style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", marginBottom: 16 }}>{col.h}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {col.l.map(item => <li key={item} style={{ fontFamily: S.sans, fontSize: 13, color: "var(--muted)" }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: S.sans, fontSize: 12, color: "var(--light)" }}>© 2026 HugLife Events. A KHG Enterprise.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map(l => (
              <a key={l} href="#" style={{ fontFamily: S.sans, fontSize: 12, color: "var(--light)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <main
      {/* TICKETS STICKY BUTTON */}
      <a
        href="/tickets"
        style={{
          position: "fixed",
          top: "20px",
          right: "24px",
          zIndex: 1000,
          padding: "10px 20px",
          background: "#C9A84C",
          color: "#000",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
        }}
      >
        🎟 TICKETS
      </a>>
      {Announcement}
      {Nav}
      {Hero}
      {StatsStrip}
      {EventBrands}
      {BenefitStrip}
      {CategoryCards}
      {EcosystemSection}
      {CalendarSection}
      {TicketsSection}
      {CoreValues}
      {MeetFounder}
      {PhotoStrip}
      {Newsletter}
      {Footer}
    </main>
  );
}
