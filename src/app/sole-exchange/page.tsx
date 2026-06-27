import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sole Exchange — Sneaker Giveback by HugLife',
  description: 'A HugLife community initiative collecting, cleaning, restoring, and distributing sneakers through culture-forward drives and partner activations.',
};

const CTAS = [
  {
    label: 'Donate Sneakers',
    href: 'mailto:thekollectiveworldwide@gmail.com?subject=Sole%20Exchange%20Donation',
  },
  {
    label: 'Become a Partner',
    href: 'mailto:thekollectiveworldwide@gmail.com?subject=Sole%20Exchange%20Partner%20Inquiry',
  },
  {
    label: 'Request Shoes',
    href: 'mailto:thekollectiveworldwide@gmail.com?subject=Sole%20Exchange%20Shoe%20Request',
  },
];

const STEPS = [
  ['01', 'Collect', 'Sneaker drives at events, schools, barbershops, gyms, venues, and partner locations.'],
  ['02', 'Clean + Restore', 'Pairs are sorted, cleaned, restored, and prepped for distribution or creative programming.'],
  ['03', 'Distribute', 'Shoes move to youth programs, athletes, shelters, families, and community giveback activations.'],
];

const PARTNERS = [
  'Schools',
  'Churches',
  'Gyms',
  'Barbershops',
  'Sneaker stores',
  'Event venues',
  'Athletic programs',
  'Corporate teams',
];

const styles = `
  .sole-page {
    background: #090807;
    color: #f7efe0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .sole-page * { box-sizing: border-box; }
  .sole-hero {
    min-height: 100vh;
    padding: 28px clamp(20px, 5vw, 72px) 72px;
    background:
      radial-gradient(circle at 18% 22%, rgba(201,168,76,0.22), transparent 34%),
      radial-gradient(circle at 86% 12%, rgba(217,71,168,0.18), transparent 30%),
      linear-gradient(135deg, #080604 0%, #15110c 52%, #271c0d 100%);
    position: relative;
  }
  .sole-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: clamp(72px, 12vh, 140px);
  }
  .sole-brand {
    font-family: var(--serif);
    font-size: clamp(24px, 4vw, 40px);
    font-style: italic;
    color: #f7efe0;
    letter-spacing: -0.02em;
  }
  .sole-nav-cta,
  .sole-cta-row a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 14px 22px;
    border: 1px solid rgba(247,239,224,0.22);
    color: #f7efe0;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    transition: transform 220ms ease, background 220ms ease, color 220ms ease;
  }
  .sole-nav-cta:hover,
  .sole-cta-row a:hover {
    transform: translateY(-2px);
    background: #c9a84c;
    color: #080604;
  }
  .sole-hero-grid,
  .sole-split {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    gap: clamp(28px, 6vw, 72px);
    align-items: center;
    max-width: 1240px;
    margin: 0 auto;
  }
  .sole-kicker {
    color: #c9a84c;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .sole-page h1 {
    font-family: var(--serif);
    font-size: clamp(58px, 11vw, 148px);
    font-style: italic;
    font-weight: 400;
    line-height: 0.86;
    letter-spacing: -0.055em;
    max-width: 760px;
    margin: 0;
  }
  .sole-page h2 {
    font-family: var(--serif);
    font-size: clamp(36px, 5.4vw, 76px);
    font-style: italic;
    font-weight: 400;
    line-height: 0.96;
    letter-spacing: -0.035em;
    margin: 0 0 20px;
  }
  .sole-page h3 {
    font-family: var(--serif);
    font-size: 32px;
    font-style: italic;
    font-weight: 500;
    margin: 0 0 12px;
  }
  .sole-lead,
  .sole-section > p,
  .sole-card p,
  .sole-split p {
    color: rgba(247,239,224,0.72);
    font-family: var(--sans);
    font-size: clamp(15px, 1.8vw, 20px);
    line-height: 1.72;
  }
  .sole-lead {
    max-width: 680px;
    margin: 26px 0 32px;
  }
  .sole-cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .sole-cta-row a:first-child {
    background: #c9a84c;
    color: #080604;
    border-color: #c9a84c;
  }
  .sole-card {
    border: 1px solid rgba(247,239,224,0.13);
    background: rgba(247,239,224,0.055);
    padding: clamp(24px, 4vw, 42px);
    backdrop-filter: blur(16px);
  }
  .sole-card span {
    display: inline-block;
    color: #c9a84c;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .hero-card {
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .sole-section {
    padding: clamp(72px, 11vw, 128px) clamp(20px, 5vw, 72px);
    max-width: 1280px;
    margin: 0 auto;
  }
  .sole-section.alt {
    max-width: none;
    background: #f7efe0;
    color: #090807;
  }
  .sole-section.alt .sole-split {
    max-width: 1240px;
  }
  .sole-section.alt .sole-kicker,
  .sole-section.alt .sole-tags span {
    color: #6d5213;
  }
  .sole-section.alt p {
    color: rgba(9,8,7,0.72);
    max-width: 620px;
  }
  .sole-steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 34px;
  }
  .sole-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .sole-tags span {
    border: 1px solid rgba(9,8,7,0.15);
    padding: 12px 14px;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
  .sole-section.close {
    text-align: center;
  }
  .sole-section.close p {
    max-width: 680px;
    margin: 0 auto 28px;
  }
  .sole-cta-row.center {
    justify-content: center;
  }

  @media (max-width: 900px) {
    .sole-hero-grid,
    .sole-split,
    .sole-steps {
      grid-template-columns: 1fr;
    }
    .hero-card {
      min-height: 320px;
    }
  }

  @media (max-width: 560px) {
    .sole-hero {
      min-height: auto;
      padding: 22px 18px 58px;
    }
    .sole-nav {
      margin-bottom: 76px;
    }
    .sole-nav-cta {
      min-height: 42px;
      padding: 10px 14px;
      font-size: 10px;
    }
    .sole-page h1 {
      font-size: clamp(54px, 18vw, 76px) !important;
      line-height: 0.9 !important;
    }
    .sole-page h2 {
      font-size: clamp(34px, 12vw, 50px) !important;
    }
    .sole-cta-row,
    .sole-cta-row.center {
      flex-direction: column;
    }
    .sole-cta-row a {
      width: 100%;
    }
    .sole-section {
      padding: 64px 18px;
    }
    .sole-card {
      padding: 24px;
    }
  }
`;

export default function SoleExchangePage() {
  return (
    <main className="sole-page">
      <style>{styles}</style>
      <section className="sole-hero">
        <nav className="sole-nav">
          <a href="/" className="sole-brand">HugLife</a>
          <a href="mailto:thekollectiveworldwide@gmail.com?subject=Sole%20Exchange" className="sole-nav-cta">Contact</a>
        </nav>

        <div className="sole-hero-grid">
          <div>
            <p className="sole-kicker">HugLife Community Initiative</p>
            <h1>Sole Exchange</h1>
            <p className="sole-lead">
              We collect sneakers, restore what can be saved, and move shoes back into the community through culture, sports, and service.
            </p>
            <div className="sole-cta-row">
              {CTAS.map((cta) => (
                <a key={cta.label} href={cta.href}>{cta.label}</a>
              ))}
            </div>
          </div>

          <div className="sole-card hero-card">
            <span>Purpose</span>
            <h2>Every pair still has a story.</h2>
            <p>
              Sole Exchange turns sneaker culture into a working giveback system: drives, sorting days, cleaning workshops, distribution days, and partner-led community moments.
            </p>
          </div>
        </div>
      </section>

      <section className="sole-section">
        <p className="sole-kicker">The System</p>
        <h2>From closet to community.</h2>
        <div className="sole-steps">
          {STEPS.map(([num, title, body]) => (
            <article className="sole-card" key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sole-section alt">
        <div className="sole-split">
          <div>
            <p className="sole-kicker">Partner Network</p>
            <h2>Built to scale city by city.</h2>
            <p>
              The goal is not a one-time donation. The goal is a repeatable sneaker circulation engine that can activate through schools, events, teams, sponsors, and community partners.
            </p>
          </div>
          <div className="sole-tags">
            {PARTNERS.map((partner) => <span key={partner}>{partner}</span>)}
          </div>
        </div>
      </section>

      <section className="sole-section close">
        <p className="sole-kicker">Get Involved</p>
        <h2>Donate. Host. Sponsor. Volunteer.</h2>
        <p>
          We need sneaker donors, collection sites, restoration volunteers, delivery support, schools, coaches, brand partners, and corporate sponsors.
        </p>
        <div className="sole-cta-row center">
          {CTAS.map((cta) => (
            <a key={cta.label} href={cta.href}>{cta.label}</a>
          ))}
        </div>
      </section>
    </main>
  );
}
