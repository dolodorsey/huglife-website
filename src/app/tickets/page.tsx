import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets — HugLife Events",
  description: "Get your tickets to the most sought-after events in Atlanta and beyond.",
};

const SB_URL = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SB_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'DM Sans', system-ui, sans-serif";

interface TicketProduct {
  id: string;
  brand_key: string;
  event_name: string;
  event_date: string;
  city: string;
  ticket_type: string;
  price: number | null;
  capacity: number;
  tickets_sold: number;
  ghl_order_form_link: string | null;
}

interface EventRow {
  event_name: string;
  brand_key: string;
  event_date: string;
  city: string;
  eventbrite_url: string;
}

async function getTicketProducts(): Promise<TicketProduct[]> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/ghl_ticket_products?is_active=eq.true&order=event_date.asc&select=*`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getUpcomingEvents(): Promise<EventRow[]> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `${SB_URL}/rest/v1/eventbrite_events?is_active=eq.true&event_date=gte.${today}&order=event_date.asc&select=event_name,brand_key,event_date,city,eventbrite_url&limit=40`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const BRAND_ACCENTS: Record<string, string> = {
  noir: "#C9A84C",
  taste_of_art: "#BF360C",
  wrst_bhvr: "#C62828",
  remix: "#7CB342",
  gangsta_gospel: "#8D6E63",
  soul_sessions: "#AD1457",
  secret_society: "#7B1FA2",
  underground_king: "#4A148C",
  crvngs: "#E65100",
  block_party: "#2E7D32",
  forever_futbol: "#C9A84C",
  huglife: "#FF6B35",
  paparazzi: "#E91E63",
  sundays_best: "#1565C0",
  five_de_mayo: "#388E3C",
  cinco_de_mayo: "#388E3C",
  stella: "#AD1457",
  kulture: "#F9A825",
  the_kulture: "#F9A825",
};

export default async function TicketsPage() {
  const [products, events] = await Promise.all([
    getTicketProducts(),
    getUpcomingEvents(),
  ]);

  // Group ticket products by event key
  const productsByEvent: Record<string, TicketProduct[]> = {};
  for (const p of products) {
    const key = `${p.brand_key}__${p.event_date}`;
    if (!productsByEvent[key]) productsByEvent[key] = [];
    productsByEvent[key].push(p);
  }

  // Sort tiers: GA first, VIP second
  for (const key of Object.keys(productsByEvent)) {
    productsByEvent[key].sort((a, b) => {
      const order = (t: string) =>
        t.toLowerCase().includes("vvip") ? 3 :
        t.toLowerCase().includes("vip") ? 2 :
        t.toLowerCase().includes("early") ? 0 : 1;
      return order(a.ticket_type) - order(b.ticket_type);
    });
  }

  // Eventbrite fallbacks — events without direct GHL products
  const directKeys = new Set(Object.keys(productsByEvent));
  const ebFallbacks = events.filter(
    (e) => !directKeys.has(`${e.brand_key}__${e.event_date}`)
  );

  const hasDirectTickets = Object.keys(productsByEvent).length > 0;

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        fontFamily: SANS,
        color: "#ffffff",
        paddingBottom: "100px",
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #141414",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: SERIF,
            fontSize: "20px",
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          HugLife
        </a>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#C9A84C",
            textTransform: "uppercase",
          }}
        >
          Tickets
        </span>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "80px 32px 64px",
          textAlign: "center",
          background:
            "radial-gradient(ellipse at 50% -20%, rgba(201,168,76,0.10) 0%, transparent 65%)",
          borderBottom: "1px solid #141414",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "20px",
            fontFamily: SANS,
          }}
        >
          The Kollective Hospitality Group
        </p>
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(52px, 11vw, 110px)",
            fontWeight: 300,
            letterSpacing: "-2px",
            lineHeight: 0.9,
            marginBottom: "28px",
          }}
        >
          Get Your
          <br />
          <em style={{ fontStyle: "italic" }}>Tickets.</em>
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "14px",
            maxWidth: "420px",
            margin: "0 auto",
            lineHeight: 1.7,
            letterSpacing: "0.3px",
          }}
        >
          Direct from KHG. No markups. No middlemen.
          <br />
          Atlanta · DC · Houston · LA · Charlotte · Miami
        </p>
      </section>

      {/* ── DIRECT TICKETS ── */}
      {hasDirectTickets && (
        <section
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "64px 24px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "4px",
                color: "#C9A84C",
                textTransform: "uppercase",
              }}
            >
              Direct Purchase
            </span>
            <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {Object.entries(productsByEvent).map(([key, tiers]) => {
              const evt = tiers[0];
              const accent = BRAND_ACCENTS[evt.brand_key] || "#C9A84C";
              const hasLinks = tiers.some((t) => t.ghl_order_form_link);
              const soldOut = tiers.every(
                (t) => t.tickets_sold >= t.capacity
              );

              return (
                <div
                  key={key}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #1c1c1c",
                    borderLeft: `4px solid ${accent}`,
                    padding: "28px 32px",
                  }}
                >
                  {/* Event header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: SERIF,
                          fontSize: "clamp(22px, 3.5vw, 32px)",
                          fontWeight: 400,
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        {evt.event_name}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          fontSize: "12px",
                          color: "#555",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <span>{formatDate(evt.event_date)}</span>
                        <span>·</span>
                        <span>{evt.city}</span>
                      </div>
                    </div>

                    {soldOut && (
                      <span
                        style={{
                          fontSize: "9px",
                          letterSpacing: "2px",
                          color: "#C62828",
                          border: "1px solid #C62828",
                          padding: "4px 10px",
                          textTransform: "uppercase",
                          alignSelf: "flex-start",
                        }}
                      >
                        Sold Out
                      </span>
                    )}

                    {!hasLinks && !soldOut && (
                      <span
                        style={{
                          fontSize: "9px",
                          letterSpacing: "2px",
                          color: "#444",
                          border: "1px solid #252525",
                          padding: "4px 10px",
                          textTransform: "uppercase",
                          alignSelf: "flex-start",
                        }}
                      >
                        On Sale Soon
                      </span>
                    )}
                  </div>

                  {/* Ticket tier buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {tiers.map((tier) => {
                      const isTierSoldOut = tier.tickets_sold >= tier.capacity;
                      const isVip =
                        tier.ticket_type.toLowerCase().includes("vip") ||
                        tier.ticket_type.toLowerCase().includes("vvip");
                      const btnBg = isTierSoldOut
                        ? "#1a1a1a"
                        : tier.ghl_order_form_link
                        ? isVip
                          ? "#C9A84C"
                          : accent
                        : "#1a1a1a";
                      const btnColor =
                        isTierSoldOut || !tier.ghl_order_form_link
                          ? "#383838"
                          : "#000";

                      return (
                        <a
                          key={tier.id}
                          href={
                            tier.ghl_order_form_link && !isTierSoldOut
                              ? tier.ghl_order_form_link
                              : undefined
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 24px",
                            background: btnBg,
                            color: btnColor,
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            cursor:
                              tier.ghl_order_form_link && !isTierSoldOut
                                ? "pointer"
                                : "default",
                            fontFamily: SANS,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span>{tier.ticket_type}</span>
                          {tier.price != null && (
                            <span
                              style={{
                                opacity: 0.7,
                                fontWeight: 400,
                                letterSpacing: "1px",
                              }}
                            >
                              ${tier.price}
                            </span>
                          )}
                          {isTierSoldOut && (
                            <span style={{ fontWeight: 300, letterSpacing: "1px" }}>
                              — Sold Out
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── EVENTBRITE FALLBACKS ── */}
      {ebFallbacks.length > 0 && (
        <section
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "64px 24px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "4px",
                color: "#444",
                textTransform: "uppercase",
              }}
            >
              More Events
            </span>
            <div style={{ flex: 1, height: "1px", background: "#141414" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {ebFallbacks.map((event, i) => {
              const accent = BRAND_ACCENTS[event.brand_key] || "#333";
              return (
                <div
                  key={i}
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid #161616",
                    borderLeft: `4px solid ${accent}`,
                    padding: "20px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: "20px",
                        fontWeight: 400,
                        marginBottom: "6px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {event.event_name}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#444",
                        display: "flex",
                        gap: "12px",
                      }}
                    >
                      <span>{formatDate(event.event_date)}</span>
                      <span>·</span>
                      <span>{event.city}</span>
                    </div>
                  </div>
                  <a
                    href={event.eventbrite_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "10px 20px",
                      border: "1px solid #242424",
                      color: "#555",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      fontFamily: SANS,
                      flexShrink: 0,
                    }}
                  >
                    Tickets →
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "64px auto 0",
          padding: "32px 24px",
          borderTop: "1px solid #141414",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#2a2a2a", fontSize: "12px", letterSpacing: "1px" }}>
          Questions?{" "}
          <a
            href="mailto:justhuglife.forever@gmail.com"
            style={{ color: "#C9A84C", textDecoration: "none" }}
          >
            justhuglife.forever@gmail.com
          </a>
          {" "}· © 2026 The Kollective Hospitality Group
        </p>
      </section>
      {/* VENUE */}
      <section style={{padding:"48px 32px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <p style={{fontSize:"10px", letterSpacing:"4px", color:"#C9A84C", textTransform:"uppercase", marginBottom:"16px"}}>Location</p>
        <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(24px,4vw,40px)", fontWeight:300, marginBottom:"8px"}}>
          The Gallery Complex
        </h3>
        <p style={{color:"#888", fontSize:"13px", letterSpacing:"1px", marginBottom:"20px"}}>
          245 Ted Turner Drive SW, Atlanta, GA 30303
        </p>
        <a href="https://maps.google.com/?q=245+Ted+Turner+Drive+SW+Atlanta+GA+30303" target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block", padding:"12px 28px", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", textDecoration:"none"}}>
          Get Directions →
        </a>
      </section>

    </main>
  );
}
