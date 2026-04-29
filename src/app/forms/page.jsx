'use client';
import { useState } from 'react';

/**
 * The Kollective Hospitality Group — Forms Hub
 * URL: thekollectivegroup.com/forms
 * All form cards link to khg-forms.vercel.app/forms/<slug> where the actual
 * signing/submission UI lives.
 */

const FORMS_BASE = 'https://khg-forms.vercel.app/forms';

const FEATURED = [
  { slug: 'nda',          title: 'Non-Disclosure Agreement', sub: 'Confidentiality for partners, contractors & team', icon: '🔒', cat: 'Legal' },
  { slug: 'non-compete',  title: 'Non-Compete Agreement',    sub: 'Restrictive covenant for team & key partners',     icon: '🛡️', cat: 'Legal' },
];

const FORMS = [
  // Team
  { slug: 'onboarding',        title: 'Team Onboarding',     sub: 'Welcome aboard',                          icon: '🚀',  cat: 'Team' },
  { slug: 'hiring_inquiry',    title: 'Hiring Inquiry',      sub: 'Explore career opportunities',            icon: '💼',  cat: 'Team' },
  { slug: 'intern',            title: 'Intern Application',  sub: 'Launch your career with us',              icon: '🎓',  cat: 'Team' },
  { slug: 'volunteer',         title: 'Volunteer',           sub: 'Be part of something bigger',             icon: '🙌',  cat: 'Team' },
  { slug: 'what_you_do',       title: 'What You Do',         sub: 'Tell us your skills & talents',           icon: '⚡',  cat: 'Team' },
  // Business
  { slug: 'sponsor',           title: 'Sponsor Inquiry',     sub: 'Sponsor our events & experiences',        icon: '🤝',  cat: 'Business' },
  { slug: 'vendor',            title: 'Vendor Application',  sub: 'Join our vendor network',                 icon: '🏪',  cat: 'Business' },
  { slug: 'consultation',      title: 'Consultation',        sub: 'Book time with the team',                 icon: '💬',  cat: 'Business' },
  // Creative
  { slug: 'artist_painter',    title: 'Artist (Painter)',    sub: 'Showcase your visual art',                icon: '🎨',  cat: 'Creative' },
  { slug: 'artist_music',      title: 'Artist (Music)',      sub: 'Perform at our events',                   icon: '🎵',  cat: 'Creative' },
  { slug: 'influencer',        title: 'Influencer',          sub: 'Partner with us for content',             icon: '📸',  cat: 'Creative' },
  // Guests
  { slug: 'rsvp',              title: 'RSVP',                sub: 'Reserve your spot',                       icon: '🎟️', cat: 'Guests' },
  { slug: 'group_pricing',     title: 'Group Pricing',       sub: 'Special rates for groups',                icon: '👥',  cat: 'Guests' },
  { slug: 'table_reservation', title: 'Table / Section',     sub: 'Secure your section',                     icon: '🍾',  cat: 'Guests' },
  // General
  { slug: 'inquiry',           title: 'General Inquiry',     sub: 'Get in touch',                            icon: '📩',  cat: 'General' },
];

const CATEGORIES = ['Team', 'Business', 'Creative', 'Guests', 'General'];

const T = {
  bg: '#080604', bg2: '#0F0B07',
  text: '#F5F0E8', muted: 'rgba(245,240,232,0.55)', light: 'rgba(245,240,232,0.35)',
  accent: '#D4B87A', border: 'rgba(245,240,232,0.08)', borderHover: 'rgba(212,184,122,0.4)',
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
  mono: "'DM Mono', ui-monospace, monospace",
};

function Card({ form, featured = false }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={`${FORMS_BASE}/${form.slug}`}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         display:'block', position:'relative', padding: featured ? '36px 32px' : '28px 26px',
         background: hover ? 'rgba(212,184,122,0.04)' : T.bg2,
         border: `1px solid ${hover ? T.borderHover : T.border}`,
         textDecoration:'none', cursor:'pointer', overflow:'hidden',
         transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
         transform: hover ? 'translateY(-2px)' : 'translateY(0)',
       }}>
      {featured && (
        <div style={{ position:'absolute', top:18, right:18, fontFamily:T.mono, fontSize:10,
                      letterSpacing:'0.2em', textTransform:'uppercase', color:T.accent, opacity:0.7 }}>
          Most Used
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                    marginBottom: featured ? 24 : 18 }}>
        <span style={{ fontSize: featured ? 32 : 24, lineHeight:1 }}>{form.icon}</span>
        <span style={{ fontFamily:T.mono, fontSize:10, letterSpacing:'0.2em',
                       textTransform:'uppercase', color:T.light }}>{form.cat}</span>
      </div>
      <h3 style={{ fontFamily:T.serif, fontSize: featured ? 28 : 22, fontWeight:400,
                   fontStyle:'italic', lineHeight:1.15, color:T.text, margin:0, marginBottom:8 }}>
        {form.title}
      </h3>
      <p style={{ fontFamily:T.sans, fontSize:13, lineHeight:1.55, color:T.muted, margin:0,
                  marginBottom: featured ? 24 : 18 }}>
        {form.sub}
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:T.mono,
                    fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase',
                    color: hover ? T.accent : 'rgba(212,184,122,0.85)', transition:'color 0.3s' }}>
        <span>Open Form</span>
        <span style={{ display:'inline-block',
                       transform: hover ? 'translateX(6px)' : 'translateX(0)',
                       transition:'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>→</span>
      </div>
    </a>
  );
}

export default function FormsHub() {
  const groups = CATEGORIES
    .map(cat => ({ cat, items: FORMS.filter(f => f.cat === cat) }))
    .filter(g => g.items.length > 0);

  return (
    <main style={{ minHeight:'100vh', background:T.bg, color:T.text, fontFamily:T.sans }}>
      {/* grain */}
      <div style={{ position:'fixed', inset:0, opacity:0.03, pointerEvents:'none', zIndex:1,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />

      <div style={{ position:'relative', zIndex:2 }}>
        {/* Header */}
        <header style={{ padding:'clamp(60px,12vw,140px) clamp(24px,5vw,80px) clamp(40px,6vw,80px)',
                         maxWidth:1280, margin:'0 auto' }}>
          <div style={{ fontFamily:T.mono, fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase',
                        color:T.accent, marginBottom:24, opacity:0.85 }}>
            The Kollective Hospitality Group
          </div>
          <h1 style={{ fontFamily:T.serif, fontSize:'clamp(44px,7vw,96px)', fontWeight:300,
                       fontStyle:'italic', lineHeight:1.02, letterSpacing:'-0.02em',
                       color:T.text, margin:0, marginBottom:24, maxWidth:900 }}>
            Forms.
          </h1>
          <p style={{ fontFamily:T.sans, fontSize:'clamp(15px,1.4vw,18px)', lineHeight:1.6,
                      color:T.muted, maxWidth:580, margin:0 }}>
            Every form in our ecosystem — agreements, applications, inquiries, and onboarding —
            in one place. Choose the form you need below.
          </p>
          <div style={{ marginTop:40, paddingTop:24, borderTop:`1px solid ${T.border}`,
                        display:'flex', flexWrap:'wrap', gap:32, fontFamily:T.mono, fontSize:11,
                        letterSpacing:'0.2em', textTransform:'uppercase', color:T.light }}>
            <span>{FEATURED.length + FORMS.length} forms available</span>
            <span>{CATEGORIES.length + 1} categories</span>
            <span>Last updated · April 2026</span>
          </div>
        </header>

        {/* Featured (Legal) */}
        <section style={{ padding:'0 clamp(24px,5vw,80px) clamp(40px,6vw,80px)',
                          maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:28 }}>
            <h2 style={{ fontFamily:T.serif, fontSize:'clamp(28px,3.5vw,42px)', fontWeight:400,
                         fontStyle:'italic', color:T.text, margin:0 }}>Legal Agreements</h2>
            <span style={{ fontFamily:T.mono, fontSize:11, letterSpacing:'0.2em',
                           textTransform:'uppercase', color:T.light }}>01 / Featured</span>
          </div>
          <div style={{ display:'grid',
                        gridTemplateColumns:'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
                        gap:24 }}>
            {FEATURED.map(form => <Card key={form.slug} form={form} featured />)}
          </div>
        </section>

        {/* Other categories */}
        {groups.map((g, i) => (
          <section key={g.cat} style={{ padding:'0 clamp(24px,5vw,80px) clamp(40px,6vw,80px)',
                                         maxWidth:1280, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
                          marginBottom:28, paddingTop:24, borderTop:`1px solid ${T.border}` }}>
              <h2 style={{ fontFamily:T.serif, fontSize:'clamp(28px,3.5vw,42px)', fontWeight:400,
                           fontStyle:'italic', color:T.text, margin:0 }}>{g.cat}</h2>
              <span style={{ fontFamily:T.mono, fontSize:11, letterSpacing:'0.2em',
                             textTransform:'uppercase', color:T.light }}>
                {String(i+2).padStart(2,'0')} / {g.items.length} {g.items.length === 1 ? 'form' : 'forms'}
              </span>
            </div>
            <div style={{ display:'grid',
                          gridTemplateColumns:'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                          gap:20 }}>
              {g.items.map(form => <Card key={form.slug} form={form} />)}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer style={{ marginTop:'clamp(60px,8vw,120px)',
                         padding:'clamp(40px,5vw,60px) clamp(24px,5vw,80px)',
                         borderTop:`1px solid ${T.border}`, background:T.bg2 }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap',
                        justifyContent:'space-between', alignItems:'baseline', gap:24 }}>
            <div>
              <div style={{ fontFamily:T.serif, fontSize:20, fontWeight:400, fontStyle:'italic',
                            color:T.text, marginBottom:6 }}>
                The Kollective Hospitality Group
              </div>
              <div style={{ fontFamily:T.mono, fontSize:11, letterSpacing:'0.15em', color:T.light }}>
                Atlanta · Houston · LA · DC · Charlotte · Las Vegas · Miami · NYC
              </div>
            </div>
            <a href="mailto:thekollectiveworldwide@gmail.com"
               style={{ fontFamily:T.mono, fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase',
                        color:T.accent, textDecoration:'none',
                        borderBottom:`1px solid ${T.borderHover}`, paddingBottom:4 }}>
              thekollectiveworldwide@gmail.com
            </a>
          </div>
          <div style={{ maxWidth:1280, margin:'40px auto 0', paddingTop:24,
                        borderTop:`1px solid ${T.border}`, fontFamily:T.mono, fontSize:10,
                        letterSpacing:'0.15em', color:T.light, textTransform:'uppercase' }}>
            © 2026 The Kollective Hospitality Group · A KHG Enterprise
          </div>
        </footer>
      </div>
    </main>
  );
}
