"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

// Icon stubs (replacing lucide-react)
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const Crown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5z"/></svg>;
const MapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Calendar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const Users = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Camera = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
const Music4 = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const Sparkles = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const Star = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Play = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const Building2 = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
const Wine = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>;
const Clock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Zap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

// motion stub — CSS transitions only
const motion = {
  div: ({ children, style, className, initial, animate, transition, ...rest }: any) => (
    <div style={style} className={className} {...rest}>{children}</div>
  ),
  h1: ({ children, style, className, initial, animate, transition, ...rest }: any) => (
    <h1 style={style} className={className} {...rest}>{children}</h1>
  ),
  p: ({ children, style, className, initial, animate, transition, ...rest }: any) => (
    <p style={style} className={className} {...rest}>{children}</p>
  ),
  span: ({ children, style, className, initial, animate, transition, ...rest }: any) => (
    <span style={style} className={className} {...rest}>{children}</span>
  ),
};
const AnimatePresence = ({ children }: any) => <>{children}</>;


// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const GOLD = {
  light: "#f2d39b",
  mid:   "#d8b26e",
  deep:  "#8b6b3d",
  glow:  "rgba(216,178,110,0.18)",
};

const BG = {
  base:   "#07070a",
  dark:   "#080809",
  panel:  "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
};

// ─── EVENT WORLDS ─────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "noir",
    name: "NOIR",
    tag: "Selective Nightlife",
    thesis: "The Art of Being Selective.",
    body: "A luxury nightlife property built around access, curation, and social prestige. The room is intentional. The energy is controlled. The memory is premium.",
    cta: "Enter NOIR",
    mood: "Obsidian • Gold • Shadow • Velvet",
    accent: ["#d8b26e", "#8b6b3d"],
    glow: "rgba(216,178,110,0.12)",
    icons: [Crown, Wine, Camera],
    cities: ["Atlanta", "Houston", "Charlotte", "Miami"],
    status: "Active",
  },
  {
    id: "taste-of-art",
    name: "Taste of Art",
    tag: "Canvas, Cuisine & Culture",
    thesis: "Where the Canvas Becomes the Table.",
    body: "An immersive social experience where food, creativity, culture, and conversation live in the same frame. Art is the atmosphere. Cuisine is the medium.",
    cta: "Enter Taste of Art",
    mood: "Cream • Wine • Brushstroke • Gold",
    accent: ["#c9a87a", "#7d5a3c"],
    glow: "rgba(201,168,122,0.12)",
    icons: [Sparkles, Camera, Users],
    cities: ["Atlanta", "Los Angeles", "DC"],
    status: "April Event",
  },
  {
    id: "remix",
    name: "REMIX",
    tag: "The Mashup Music Experience",
    thesis: "Where Sounds Collide and the Room Shifts.",
    body: "A high-energy sound-driven experience where genres collide and the crowd has range. No rules. No predictable playlist. Pure room momentum.",
    cta: "Enter REMIX",
    mood: "Obsidian • Electric Silver • Motion",
    accent: ["#c8c8d8", "#6a6a7a"],
    glow: "rgba(200,200,216,0.10)",
    icons: [Music4, Zap, Users],
    cities: ["Atlanta", "Houston", "Charlotte"],
    status: "Upcoming",
  },
  {
    id: "sundays-best",
    name: "Sunday's Best",
    tag: "Where Style Meets Sun",
    thesis: "Fashion, Brunch, and Rooftop Energy.",
    body: "A daytime social experience where fashion, brunch, music, and rooftop energy come together with polish. Sun-soaked luxury at its most curated.",
    cta: "Enter Sunday's Best",
    mood: "Champagne • Ivory • Warm Gold • Daylight",
    accent: ["#e8c97a", "#9a7b42"],
    glow: "rgba(232,201,122,0.12)",
    icons: [Star, Camera, Crown],
    cities: ["Atlanta", "Miami", "LA"],
    status: "Upcoming",
  },
  {
    id: "gangsta-gospel",
    name: "Gangsta Gospel",
    tag: "Not Your Average Sunday Service",
    thesis: "Soulful. Rebellious. Unforgettable.",
    body: "A bold cultural gathering blending spiritual undertones, cultural expression, and unforgettable room energy. Church clothes optional. Presence required.",
    cta: "Enter Gangsta Gospel",
    mood: "Burgundy • Cream • Stained-Light • Black",
    accent: ["#b87a5a", "#6b3a28"],
    glow: "rgba(184,122,90,0.12)",
    icons: [Sparkles, Users, Star],
    cities: ["Atlanta", "Houston"],
    status: "Upcoming",
  },
  {
    id: "wrst-bhvr",
    name: "WRST BHVR",
    tag: "Napkin Wars Edition",
    thesis: "Where the Napkins Fly and the Room Goes Up.",
    body: "A high-impact celebration built for spectacle, participation, chaos, and the kind of moment people do not forget. The room becomes the content.",
    cta: "Enter Napkin Wars",
    mood: "Black • Chrome • Silver Motion Bursts",
    accent: ["#c8c8c8", "#6a6a6a"],
    glow: "rgba(200,200,200,0.08)",
    icons: [Zap, Camera, Crown],
    cities: ["Atlanta", "Houston", "Charlotte"],
    status: "Upcoming",
  },
  {
    id: "paparazzi",
    name: "Paparazzi",
    tag: "The Ultimate Pop-Up Photo Moment Experience",
    thesis: "Built for the Moment Everyone Posts.",
    body: "A visibility-driven event built around flash moments, camera-ready arrivals, and social proof in real time. Every angle is an entrance. Every moment is shareable.",
    cta: "Enter Paparazzi",
    mood: "Flash-White • Chrome • Camera Red • Black",
    accent: ["#e8e8e8", "#8a8a8a"],
    glow: "rgba(232,232,232,0.08)",
    icons: [Camera, Star, Sparkles],
    cities: ["Atlanta", "Miami", "LA"],
    status: "Upcoming",
  },
  {
    id: "pawchella",
    name: "Pawchella",
    tag: "Dog Lover's Festival",
    thesis: "A Festival World for Dog Lovers and Their People.",
    body: "A premium lifestyle festival for the dog-obsessed, community moments, brand activations, and playful cultural energy. Canines welcome. Energy required.",
    cta: "Enter Pawchella",
    mood: "Warm Ivory • Sage • Gold Pop • Premium Playful",
    accent: ["#c8b87a", "#7a6842"],
    glow: "rgba(200,184,122,0.12)",
    icons: [Sparkles, Users, Star],
    cities: ["Atlanta", "Austin"],
    status: "Planned",
  },
];

// ─── UPCOMING DROPS ───────────────────────────────────────────────────────────
const DROPS = [
  { date: "April 12", city: "Atlanta", event: "Taste of Art", status: "VIP Tables Open", access: "Early Access Active" },
  { date: "April 26", city: "Atlanta", event: "NOIR", status: "RSVP Live", access: "Request Access" },
  { date: "May 10", city: "Houston", event: "Sunday's Best", status: "Talent Applications Open", access: "Apply Now" },
  { date: "May 25", city: "Las Vegas", event: "NOIR", status: "VIP Tables Open", access: "Reserve Table" },
  { date: "June 8", city: "Miami", event: "NOIR", status: "Sponsor Open", access: "Partner Now" },
  { date: "June 22", city: "Charlotte", event: "REMIX", status: "Tickets Open", access: "Get Tickets" },
];

// ─── CITY MARKETS ─────────────────────────────────────────────────────────────
const CITIES = [
  { city: "Atlanta", status: "Flagship", events: ["NOIR", "Taste of Art", "WRST BHVR", "Sunday's Best"], note: "Flagship Market" },
  { city: "Houston", status: "Active", events: ["NOIR", "Sunday's Best", "Gangsta Gospel"], note: "Expansion Market" },
  { city: "Los Angeles", status: "Active", events: ["NOIR", "Taste of Art", "Paparazzi"], note: "West Coast Launch" },
  { city: "DC", status: "Active", events: ["NOIR", "Taste of Art"], note: "Premium Selective" },
  { city: "Charlotte", status: "Active", events: ["NOIR", "REMIX", "WRST BHVR"], note: "High-Social Market" },
  { city: "Miami", status: "Active", events: ["NOIR", "Paparazzi"], note: "High-Visibility" },
];

// ─── AUDIENCE PATHS ───────────────────────────────────────────────────────────
const PATHS = [
  { title: "For Attendees", icon: Users, body: "Access upcoming experiences, RSVP, VIP tables, and early drops before the crowd catches up.", cta: "Get Access" },
  { title: "For Promoters", icon: Zap, body: "Join city campaigns, push awareness, drive turnout, and earn through structured event promotion.", cta: "Apply as Promoter" },
  { title: "For Talent", icon: Music4, body: "DJs, hosts, photographers, creators, performers, and event staff ready for premium cultural experiences.", cta: "Join Talent Network" },
  { title: "For Sponsors", icon: Building2, body: "Activate through culture, content, audience access, and visual placement at premium social experiences.", cta: "Partner as Sponsor" },
  { title: "For Venues & Cities", icon: MapPin, body: "Host recurring energy and bring premium event IP into your venue or market.", cta: "Bring HUGLIFE Here" },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
      <div className="w-1 h-1 rounded-full" style={{ background: GOLD.mid }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
    </div>
  );
}

function StatusPill({ label, size = "sm" }) {
  const sizeClass = size === "sm" ? "px-3 py-1 text-[10px]" : "px-4 py-1.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-[0.2em] ${sizeClass}`}
      style={{ background: `${GOLD.mid}18`, color: GOLD.light, border: `1px solid ${GOLD.mid}30` }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ eyebrow, headline, sub, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: GOLD.mid }}>
        {eyebrow}
      </div>
      <h2
        className="text-4xl font-black tracking-[-0.04em] leading-[1.05] md:text-5xl"
        style={{ color: "#f0ece4" }}
      >
        {headline}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-7" style={{ color: "rgba(255,255,255,0.5)", maxWidth: center ? "600px" : undefined, margin: center ? "16px auto 0" : "16px 0 0" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12"
      style={{
        background: "rgba(7,7,10,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${BG.border}`,
      }}
    >
      <div>
        <div className="text-[9px] uppercase tracking-[0.38em]" style={{ color: GOLD.mid }}>
          Multi-City Event IP
        </div>
        <div className="text-xl font-black tracking-tight text-white mt-0.5">HUGLIFE</div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.58)" }}>
        {["Events", "Cities", "Access", "Talent", "Partners"].map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-white transition-colors">
            {n}
          </a>
        ))}
      </nav>

      <button
        className="rounded-full px-6 py-2.5 text-sm font-semibold"
        style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}
      >
        Get Access
      </button>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-32 pb-20 px-6 lg:px-12"
      style={{ background: "linear-gradient(180deg, #06060a 0%, #0a0810 50%, #07070a 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-[600px] h-[600px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD.mid}20, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(255,200,150,0.15), transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: `radial-gradient(circle, ${GOLD.mid}10, transparent 70%)` }} />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_1fr] gap-16 items-end">
        {/* Left: Text */}
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em] mb-8"
            style={{ background: `${GOLD.mid}12`, color: GOLD.light, border: `1px solid ${GOLD.mid}25` }}
          >
            Multi-City Cultural Experiences
          </div>

          <h1 className="text-6xl font-black tracking-[-0.05em] leading-[0.9] md:text-7xl xl:text-[5.5rem]" style={{ color: "#f0ece4" }}>
            Moments Don't
            <span className="block" style={{ color: "rgba(255,255,255,0.28)" }}>Go Viral</span>
            <span
              className="block"
              style={{ backgroundImage: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.mid}, ${GOLD.deep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              By Accident.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            HUGLIFE creates premium nightlife, brunch, art, music, and social experiences designed to move crowds, activate cities, and turn live moments into cultural momentum.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
              Explore Events
            </button>
            <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.88)", border: `1px solid ${BG.border}` }}>
              Get Access
            </button>
            <button className="rounded-full px-6 py-3.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              Partner With HUGLIFE →
            </button>
          </div>

          {/* Proof strip */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
            {["Premium Event IP", "Multi-City Rollouts", "Talent Network", "VIP Access"].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: GOLD.mid }} />
                <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.38)" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual composition */}
        <div className="relative hidden lg:block">
          <div
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0e0c12, #141018)", border: `1px solid ${BG.border}`, minHeight: "520px" }}
          >
            {/* Inner ambient */}
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 30%, ${GOLD.mid}15, transparent 60%)` }} />

            {/* Event world panels */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "520px" }}>
              <div className="grid grid-cols-2 gap-3">
                {EVENTS.slice(0, 4).map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.07)` }}
                  >
                    <div className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: ev.accent[0] }}>
                      {ev.tag}
                    </div>
                    <div className="font-black text-sm text-white">{ev.name}</div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl p-5 mt-4"
                style={{ background: `linear-gradient(135deg, ${GOLD.mid}18, ${GOLD.deep}10)`, border: `1px solid ${GOLD.mid}25` }}
              >
                <div className="text-[9px] uppercase tracking-[0.35em] mb-2" style={{ color: GOLD.light }}>
                  Next Drop
                </div>
                <div className="text-lg font-black text-white">Taste of Art — Atlanta</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>April 12 · VIP Tables Open</div>
                <button className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] flex items-center gap-1" style={{ color: GOLD.mid }}>
                  Early Access <ArrowRight size={10} />
                </button>
              </div>

              {/* City tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["ATL", "HTX", "LA", "DC", "CLT", "MIA"].map((c) => (
                  <span key={c} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: `1px solid rgba(255,255,255,0.08)` }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EVENT UNIVERSE ───────────────────────────────────────────────────────────
function EventUniverse() {
  const [active, setActive] = useState(null);

  return (
    <section id="events" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="Event Portfolio"
          headline="Choose the Experience"
          sub="Every HUGLIFE event is built with its own atmosphere, audience, and signature moment. Explore the worlds shaping different rooms in different ways."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* NOIR — featured large */}
          <div
            className="md:col-span-2 lg:col-span-2 row-span-2 rounded-[2rem] overflow-hidden relative cursor-pointer group"
            style={{ background: "linear-gradient(145deg, #0e0c12, #181420)", border: `1px solid ${BG.border}`, minHeight: "420px" }}
            onMouseEnter={() => setActive("noir")}
            onMouseLeave={() => setActive(null)}
          >
            <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 60% 40%, ${GOLD.mid}20, transparent 65%)`, opacity: active === "noir" ? 1 : 0.4 }} />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "420px" }}>
              <div>
                <StatusPill label="Active" />
                <h3 className="mt-4 text-5xl font-black tracking-[-0.04em]" style={{ color: "#f0ece4" }}>NOIR</h3>
                <div className="text-[11px] uppercase tracking-[0.3em] mt-1" style={{ color: GOLD.mid }}>Selective Nightlife</div>
                <p className="mt-4 text-sm leading-7 max-w-sm" style={{ color: "rgba(255,255,255,0.52)" }}>
                  A luxury nightlife property built around access, atmosphere, curation, and social prestige. The room is intentional. The energy is controlled.
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Obsidian · Gold · Shadow · Velvet
                </div>
                <button
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}
                >
                  Enter NOIR <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Taste of Art */}
          <div
            className="rounded-[1.5rem] overflow-hidden relative cursor-pointer"
            style={{ background: "linear-gradient(145deg, #0f0c0a, #1a1208)", border: `1px solid rgba(201,168,122,0.12)`, minHeight: "200px" }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 30%, rgba(201,168,122,0.2), transparent 70%)" }} />
            <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ minHeight: "200px" }}>
              <div>
                <StatusPill label="April Event" />
                <h4 className="mt-3 text-2xl font-black" style={{ color: "#f0ece4" }}>Taste of Art</h4>
                <div className="text-[10px] uppercase tracking-[0.28em] mt-1" style={{ color: "#c9a87a" }}>Canvas · Cuisine · Culture</div>
              </div>
              <button className="text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1 mt-3" style={{ color: "#c9a87a" }}>
                Enter <ArrowRight size={10} />
              </button>
            </div>
          </div>

          {/* REMIX */}
          <div
            className="rounded-[1.5rem] overflow-hidden relative cursor-pointer"
            style={{ background: "linear-gradient(145deg, #0a0a0e, #10101a)", border: `1px solid rgba(200,200,216,0.10)`, minHeight: "200px" }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 70%, rgba(150,150,200,0.15), transparent 70%)" }} />
            <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ minHeight: "200px" }}>
              <div>
                <StatusPill label="Upcoming" />
                <h4 className="mt-3 text-2xl font-black" style={{ color: "#f0ece4" }}>REMIX</h4>
                <div className="text-[10px] uppercase tracking-[0.28em] mt-1" style={{ color: "#c8c8d8" }}>Mashup Music Experience</div>
              </div>
              <button className="text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1 mt-3" style={{ color: "#c8c8d8" }}>
                Enter <ArrowRight size={10} />
              </button>
            </div>
          </div>

          {/* Remaining events: smaller grid */}
          {EVENTS.slice(3).map((ev) => (
            <div
              key={ev.id}
              className="rounded-[1.5rem] overflow-hidden relative cursor-pointer"
              style={{ background: "linear-gradient(145deg, #0c0c0e, #121212)", border: `1px solid rgba(255,255,255,0.07)`, minHeight: "160px" }}
            >
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 60% 40%, ${ev.glow}, transparent 70%)` }} />
              <div className="relative z-10 p-5 h-full flex flex-col justify-between" style={{ minHeight: "160px" }}>
                <div>
                  <h4 className="text-xl font-black" style={{ color: "#f0ece4" }}>{ev.name}</h4>
                  <div className="text-[9px] uppercase tracking-[0.25em] mt-1" style={{ color: ev.accent[0] }}>{ev.tag}</div>
                </div>
                <button className="text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1 mt-2" style={{ color: ev.accent[0] }}>
                  Enter <ArrowRight size={9} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SIGNATURE MOMENTS ────────────────────────────────────────────────────────
function SignatureMoments() {
  const moments = [
    { title: "The Arrival", body: "The entrance that sets the tone before a single word is said.", icon: Crown },
    { title: "The Flash", body: "The frame, the fit, and the exact second the room starts paying attention.", icon: Camera },
    { title: "The Drop", body: "The music changes, the energy lifts, and the room turns into something bigger.", icon: Music4 },
    { title: "The Pour", body: "Celebration becomes content. Content becomes momentum.", icon: Wine },
    { title: "The Crowd Break", body: "The exact second the atmosphere turns into a shared experience.", icon: Users },
    { title: "The Repost Moment", body: "The clip, the photo, or the memory everybody shares after.", icon: Sparkles },
  ];

  return (
    <section className="py-28 px-6 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${GOLD.mid}08, transparent 70%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="Signature Moments"
          headline={<>The Moments<br />People Come For</>}
          sub="The real power of an event is not the flyer. It is the moment the room shifts, the cameras turn, and everybody knows they are in the right place."
        />

        <GoldDivider />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {moments.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${GOLD.mid}, transparent)`, transform: "translate(50%, -50%)" }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${GOLD.mid}18`, border: `1px solid ${GOLD.mid}28` }}>
                    <Icon size={18} style={{ color: GOLD.mid }} />
                  </div>
                  <h4 className="text-lg font-black mb-3" style={{ color: "#f0ece4" }}>{m.title}</h4>
                  <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.48)" }}>{m.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CITY TAKEOVER ────────────────────────────────────────────────────────────
function CityTakeover() {
  const [selected, setSelected] = useState(0);
  const city = CITIES[selected];

  return (
    <section id="cities" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="City Rollout"
          headline="Built to Move From City to City"
          sub="HUGLIFE develops event experiences designed to live, evolve, and scale across markets with the right venues, talent, partnerships, and cultural timing."
        />

        <div className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* City list */}
          <div className="space-y-2">
            {CITIES.map((c, i) => (
              <button
                key={c.city}
                onClick={() => setSelected(i)}
                className="w-full text-left rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: selected === i ? `linear-gradient(135deg, ${GOLD.mid}15, ${GOLD.deep}08)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected === i ? GOLD.mid + "30" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-base" style={{ color: selected === i ? "#f0ece4" : "rgba(255,255,255,0.65)" }}>
                      {c.city}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: selected === i ? GOLD.mid : "rgba(255,255,255,0.3)" }}>
                      {c.note}
                    </div>
                  </div>
                  <StatusPill label={c.status} />
                </div>
              </button>
            ))}
          </div>

          {/* City detail panel */}
          <div
            className="rounded-[2rem] p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0e0c12, #181420)", border: `1px solid ${BG.border}`, minHeight: "400px" }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 70% 30%, ${GOLD.mid}20, transparent 65%)` }} />
            <div className="relative z-10">
              <div className="text-[10px] uppercase tracking-[0.38em] mb-2" style={{ color: GOLD.mid }}>{city.status} Market</div>
              <h3 className="text-4xl font-black mb-2" style={{ color: "#f0ece4" }}>{city.city}</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{city.note}</p>

              <GoldDivider />

              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Active Events</div>
                <div className="flex flex-wrap gap-2">
                  {city.events.map((ev) => (
                    <span
                      key={ev}
                      className="rounded-full px-4 py-1.5 text-[11px] font-semibold"
                      style={{ background: `${GOLD.mid}12`, color: GOLD.light, border: `1px solid ${GOLD.mid}25` }}
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="rounded-full px-6 py-2.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
                  View City Events
                </button>
                <button className="rounded-full px-6 py-2.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>
                  Partner Opportunities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UPCOMING DROPS ───────────────────────────────────────────────────────────
function UpcomingDrops() {
  return (
    <section id="access" className="py-28 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="Upcoming"
          headline="What's Next"
          sub="The next wave of HUGLIFE experiences, city drops, and access opportunities."
        />

        <div className="mt-16 space-y-2">
          {DROPS.map((d, i) => (
            <div
              key={i}
              className="group rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 transition-all duration-300 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)` }}
            >
              <div className="flex items-center gap-6">
                <div className="text-2xl font-black tabular-nums" style={{ color: GOLD.mid, minWidth: "90px" }}>{d.date}</div>
                <div>
                  <div className="font-black text-base" style={{ color: "#f0ece4" }}>{d.event}</div>
                  <div className="text-[11px] flex items-center gap-1.5 mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <MapPin size={10} /> {d.city}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <StatusPill label={d.status} />
                <button
                  className="rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1.5"
                  style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}
                >
                  {d.access} <ArrowRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button className="rounded-full px-8 py-3 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>
            View Full Calendar
          </button>
          <button className="rounded-full px-8 py-3 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
            Join Early Access
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── AUDIENCE PATHWAYS ────────────────────────────────────────────────────────
function AudiencePathways() {
  return (
    <section id="talent" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="Entry Points"
          headline="Find Your Place in the World of HUGLIFE"
          sub="Whether you are coming to experience it, build with it, work it, promote it, or partner around it — HUGLIFE has a path for you."
          center
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PATHS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl p-6 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[color:rgba(216,178,110,0.3)]"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 50% 0%, ${GOLD.mid}10, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${GOLD.mid}15`, border: `1px solid ${GOLD.mid}25` }}>
                    <Icon size={18} style={{ color: GOLD.mid }} />
                  </div>
                  <h4 className="font-black text-sm mb-2" style={{ color: "#f0ece4" }}>{p.title}</h4>
                  <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>{p.body}</p>
                  <button className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] flex items-center gap-1" style={{ color: GOLD.mid }}>
                    {p.cta} <ArrowRight size={9} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── OPERATING ENGINE ─────────────────────────────────────────────────────────
function OperatingEngine() {
  const modules = [
    { n: "01", title: "Event Concept Development", body: "Every experience begins with a clear identity, audience behavior strategy, and signature social trigger." },
    { n: "02", title: "City Launch Strategy", body: "We align event concepts with city timing, venue fit, local talent, and rollout opportunity." },
    { n: "03", title: "Talent + Staffing", body: "From DJs and hosts to photographers, waitstaff, and support staff — the room gets built with intention." },
    { n: "04", title: "Promoter + Audience Growth", body: "Promotion systems, local influence, and demand-building to drive turnout and city-wide visibility." },
    { n: "05", title: "Sponsor Integration", body: "Brands plug into experiences through activations, placement, audience access, and live moments." },
    { n: "06", title: "Content Capture + Amplification", body: "The event does not end when the room clears. Moments are designed to keep traveling after they happen." },
  ];

  return (
    <section className="py-28 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
        <div>
          <SectionLabel
            eyebrow="Operating System"
            headline="The System Behind the Scene"
            sub="HUGLIFE is built to concept, launch, staff, market, monetize, and amplify live experiences across multiple cities and audiences."
          />
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: GOLD.mid }} />
              <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.45)" }}>8+ Event Properties</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: GOLD.mid }} />
              <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.45)" }}>6 City Markets Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: GOLD.mid }} />
              <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.45)" }}>Full Talent Network</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => (
            <div
              key={m.n}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)` }}
            >
              <div className="text-[10px] uppercase tracking-[0.38em] mb-3 font-semibold" style={{ color: GOLD.deep }}>
                {m.n}
              </div>
              <h5 className="font-black text-sm mb-2" style={{ color: "#f0ece4" }}>{m.title}</h5>
              <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.42)" }}>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ─────────────────────────────────────────────────────────────
function SocialProof() {
  const quotes = [
    { q: "You could feel the difference as soon as you walked in.", attr: "NOIR Atlanta Attendee" },
    { q: "It was not just a party. It felt like a real moment.", attr: "Sunday's Best Houston" },
    { q: "Everything about it looked, felt, and moved premium.", attr: "Taste of Art DC" },
  ];

  return (
    <section id="partners" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          eyebrow="Proof"
          headline="The Rooms. The Reach. The Reaction."
          sub="HUGLIFE experiences are built to create attention in the room and stay relevant after the room clears."
          center
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)` }}
            >
              <div className="absolute top-4 left-6 text-5xl font-black opacity-15" style={{ color: GOLD.mid }}>"</div>
              <p className="relative z-10 text-base leading-8 font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
                {q.q}
              </p>
              <div className="mt-5 text-[10px] uppercase tracking-[0.28em]" style={{ color: GOLD.mid }}>{q.attr}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLOSING CTA ──────────────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section
      className="py-32 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, ${GOLD.mid}15, transparent 65%)` }} />
        {/* Drifting city names */}
        {["NOIR", "REMIX", "Taste of Art", "Sunday's Best", "Paparazzi", "WRST BHVR", "Gangsta Gospel"].map((name, i) => (
          <div
            key={name}
            className="absolute text-[11px] uppercase tracking-[0.4em] select-none"
            style={{
              color: "rgba(255,255,255,0.04)",
              top: `${15 + i * 12}%`,
              left: `${5 + ((i * 13) % 85)}%`,
              fontWeight: 900,
              fontSize: i === 0 ? "2rem" : "0.7rem",
            }}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.45em] mb-8" style={{ color: GOLD.mid }}>
          Access · Culture · Moments
        </div>
        <h2 className="text-5xl font-black tracking-[-0.04em] leading-[1.05] md:text-6xl" style={{ color: "#f0ece4" }}>
          Not Every Event Deserves Your Presence.
          <span
            className="block mt-2"
            style={{ backgroundImage: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.mid}, ${GOLD.deep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Ours Do.
          </span>
        </h2>

        <p className="mt-6 text-base leading-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          Get access, join the network, or build unforgettable experiences with HUGLIFE.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-full px-9 py-3.5 text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
            Get Event Access
          </button>
          <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>
            Join the Talent Network
          </button>
          <button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>
            Partner With HUGLIFE
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { label: "Events", links: ["NOIR", "Taste of Art", "REMIX", "Sunday's Best", "Gangsta Gospel", "WRST BHVR", "Paparazzi", "Pawchella"] },
    { label: "Cities", links: ["Atlanta", "Houston", "Los Angeles", "DC", "Charlotte", "Miami"] },
    { label: "Access", links: ["Get Tickets", "VIP Tables", "Early Access", "RSVP", "Bottle Service"] },
    { label: "Connect", links: ["Talent Network", "Sponsors", "Venues", "Promoters", "Contact"] },
  ];

  return (
    
      <EventbriteTickets />

      <footer className="px-6 lg:px-12 pb-12 pt-20" style={{ background: "#06060a", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)] mb-16">
          <div>
            <div className="text-[9px] uppercase tracking-[0.38em] mb-1" style={{ color: GOLD.mid }}>Multi-City Event IP</div>
            <div className="text-2xl font-black text-white mb-4">HUGLIFE</div>
            <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.38)" }}>
              Premium nightlife, brunch, art, music, and social experiences across 6+ cities.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.label}>
              <div className="text-[10px] uppercase tracking-[0.35em] mb-5 font-semibold" style={{ color: GOLD.mid }}>{col.label}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 HUGLIFE. A KHG Enterprise Property. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

// ─── EVENTBRITE TICKETS SECTION ───────────────────────────────────────
function EventbriteTickets() {
  return (
    <section id="tickets" style={{
      padding:"80px 24px", maxWidth:"720px", margin:"0 auto",
      position:"relative"
    }}>
      <div style={{textAlign:"center",marginBottom:"40px"}}>
        <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",color:"#FF6B35",marginBottom:"12px",textTransform:"uppercase"}}>TICKETS</div>
        <h2 style={{fontFamily:"'Cormorant Garamond','Playfair Display',serif",fontSize:"clamp(28px,5vw,42px)",fontWeight:600,color:"#fff",lineHeight:1.15,marginBottom:"12px"}}>Upcoming Events</h2>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.45)",maxWidth:"400px",margin:"0 auto"}}>Secure your spot. All tickets powered by Eventbrite.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        
            <a href="https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091" target="_blank" rel="noopener noreferrer" style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              textDecoration:"none", color:"inherit",
              transition:"all 0.3s ease", cursor:"pointer"
            }} onMouseEnter={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateX(4px)"}}
            onMouseLeave={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateX(0)"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>September (Beauty & the Beast)</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>Eventbrite · Tickets Available</div>
              </div>
              <div style={{padding:"8px 16px",borderRadius:"10px",background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#000",fontSize:"11px",fontWeight:800,letterSpacing:"0.04em"}}>GET TICKETS</div>
            </a>
            <a href="https://www.eventbrite.com/e/haunted-house-tickets-1983440545063" target="_blank" rel="noopener noreferrer" style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              textDecoration:"none", color:"inherit",
              transition:"all 0.3s ease", cursor:"pointer"
            }} onMouseEnter={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateX(4px)"}}
            onMouseLeave={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateX(0)"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>October (Haunted House)</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>Eventbrite · Tickets Available</div>
              </div>
              <div style={{padding:"8px 16px",borderRadius:"10px",background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#000",fontSize:"11px",fontWeight:800,letterSpacing:"0.04em"}}>GET TICKETS</div>
            </a>
            <a href="https://www.eventbrite.com/e/black-ball-tickets-1983359039277" target="_blank" rel="noopener noreferrer" style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              textDecoration:"none", color:"inherit",
              transition:"all 0.3s ease", cursor:"pointer"
            }} onMouseEnter={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateX(4px)"}}
            onMouseLeave={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateX(0)"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>November (Black Ball)</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>Eventbrite · Tickets Available</div>
              </div>
              <div style={{padding:"8px 16px",borderRadius:"10px",background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#000",fontSize:"11px",fontWeight:800,letterSpacing:"0.04em"}}>GET TICKETS</div>
            </a>
            <a href="https://www.eventbrite.com/e/snow-ball-tickets-1983441304334" target="_blank" rel="noopener noreferrer" style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              textDecoration:"none", color:"inherit",
              transition:"all 0.3s ease", cursor:"pointer"
            }} onMouseEnter={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateX(4px)"}}
            onMouseLeave={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateX(0)"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>December (Snow Ball)</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>Eventbrite · Tickets Available</div>
              </div>
              <div style={{padding:"8px 16px",borderRadius:"10px",background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#000",fontSize:"11px",fontWeight:800,letterSpacing:"0.04em"}}>GET TICKETS</div>
            </a>
            <a href="https://www.eventbrite.com/e/winter-wonderland-tickets-1983440921188" target="_blank" rel="noopener noreferrer" style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              textDecoration:"none", color:"inherit",
              transition:"all 0.3s ease", cursor:"pointer"
            }} onMouseEnter={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateX(4px)"}}
            onMouseLeave={(e:any)=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateX(0)"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>December (Winter Wonderland)</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>Eventbrite · Tickets Available</div>
              </div>
              <div style={{padding:"8px 16px",borderRadius:"10px",background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#000",fontSize:"11px",fontWeight:800,letterSpacing:"0.04em"}}>GET TICKETS</div>
            </a>
      </div>
      <div style={{textAlign:"center",marginTop:"32px"}}>
        <p style={{fontSize:"11px",color:"rgba(255,255,255,0.25)"}}>Powered by Eventbrite · Secure checkout</p>
      </div>
    </section>
  );
}


export default function HUGLIFEFlagshipV3() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#07070a" }}>
      <Nav />
      <Hero />
      <EventUniverse />
      <SignatureMoments />
      <CityTakeover />
      <UpcomingDrops />
      <AudiencePathways />
      <OperatingEngine />
      <SocialProof />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
