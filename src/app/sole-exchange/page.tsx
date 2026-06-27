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

export default function SoleExchangePage() {
  return (
    <main className="sole-page">
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
