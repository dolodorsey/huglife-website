import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sole Exchange — No-Cost Sneaker Donation + Request Hub',
  description: 'Sole Exchange gives gently used sneakers a second life by matching donated pairs with students, workers, families, athletes, and community organizations.',
};

const STEPS = [
  ['01', 'You reach out', 'Complete a short donation, request, partner, or volunteer form. Share shoe sizes, condition, use case, and location.'],
  ['02', 'We match + prepare', 'The team sorts, cleans, photographs, catalogs, and matches every pair based on size, urgency, and need.'],
  ['03', 'Pickup or delivery', 'Approved requests are fulfilled through local drop-offs, partner organizations, events, or shipped directly when possible.'],
];

const PRIORITIES = [
  'Students needing PE or school shoes',
  'People re-entering the workforce',
  'Families in temporary housing',
  'Community sports and youth programs',
  'Refugees and recent arrivals',
  'Event-based emergency needs',
];

const PRODUCTS = [
  ['Pulse Shift', 'Good', 'Size 10', 'Available'],
  ['Nimbus Street', 'Like New', 'Size 8.5', 'Available'],
  ['Driftline Classic', 'Good', 'Size 9', 'Available'],
  ['AeroFlex Runner', 'Like New', 'Size 7', 'Available'],
  ['Velocity Glide', 'Good', 'Size 11', 'Available'],
  ['CityStride Neo', 'Fair', 'Size 10.5', 'Available'],
  ['ZenDash Pro', 'Good', 'Size 9.5', 'Available'],
  ['MonoWave Low', 'Like New', 'Size 8', 'Available'],
];

const TESTIMONIALS = [
  ['Daniel, 9', 'I did not think a pair of shoes could make me this excited. Now I can go to school, play outside, and not worry about my feet.'],
  ['Grace, 15', 'When I received a pair from Sole Exchange, I felt like someone cared. I wear them every day.'],
];

const SUBMISSION_COPY: Record<string, string> = {
  success: 'Submission received. The Sole Exchange team can now review it from our backend.',
  config_needed: 'Submission route is live, but Vercel still needs Supabase env variables attached before entries can save.',
  missing_email: 'Email is required so the team can follow up.',
  error: 'Submission did not save. Check runtime logs and Supabase env variables.',
};

const styles = `
  .sole-page {
    --sole-bg: #080706;
    --sole-ink: #f7efe0;
    --sole-muted: rgba(247,239,224,0.72);
    --sole-line: rgba(247,239,224,0.14);
    --sole-gold: #c9a84c;
    --sole-pink: #d947a8;
    background: var(--sole-bg);
    color: var(--sole-ink);
    min-height: 100vh;
    overflow-x: hidden;
  }
  .sole-page * { box-sizing: border-box; }
  .sole-wrap { max-width: 1240px; margin: 0 auto; padding: 0 clamp(18px, 5vw, 72px); }
  .sole-hero {
    min-height: 100vh;
    padding: 28px 0 84px;
    background:
      radial-gradient(circle at 18% 18%, rgba(201,168,76,0.22), transparent 32%),
      radial-gradient(circle at 86% 8%, rgba(217,71,168,0.18), transparent 30%),
      linear-gradient(135deg, #080604 0%, #14100d 52%, #2b1f0d 100%);
  }
  .sole-nav { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 4px; margin-bottom: clamp(72px, 14vh, 150px); }
  .sole-brand { font-family: var(--serif); font-size: clamp(24px, 4vw, 42px); font-style: italic; letter-spacing: -0.03em; color: var(--sole-ink); }
  .sole-nav-links { display: flex; align-items: center; gap: 18px; }
  .sole-nav-links a { font-family: var(--sans); font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(247,239,224,0.78); }
  .sole-pill, .sole-btn, .sole-form button {
    display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 14px 22px;
    border: 1px solid var(--sole-line); color: var(--sole-ink); background: transparent;
    font-family: var(--sans); font-size: 11px; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none;
    transition: transform 220ms ease, background 220ms ease, color 220ms ease, border-color 220ms ease;
  }
  .sole-btn.primary, .sole-form button { background: var(--sole-gold); border-color: var(--sole-gold); color: #080604; }
  .sole-pill:hover, .sole-btn:hover, .sole-form button:hover { transform: translateY(-2px); background: var(--sole-gold); color: #080604; border-color: var(--sole-gold); }
  .sole-hero-grid, .sole-split { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr); gap: clamp(28px, 6vw, 72px); align-items: center; }
  .sole-kicker { color: var(--sole-gold); font-family: var(--sans); font-size: 11px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 18px; }
  .sole-page h1 { font-family: var(--serif); font-size: clamp(62px, 12vw, 154px); font-style: italic; font-weight: 400; line-height: 0.86; letter-spacing: -0.058em; max-width: 820px; margin: 0; }
  .sole-page h2 { font-family: var(--serif); font-size: clamp(36px, 5.5vw, 78px); font-style: italic; font-weight: 400; line-height: 0.98; letter-spacing: -0.04em; margin: 0 0 18px; }
  .sole-page h3 { font-family: var(--serif); font-size: clamp(26px, 3vw, 36px); font-style: italic; font-weight: 500; line-height: 1.04; margin: 0 0 10px; }
  .sole-lead, .sole-copy, .sole-card p, .sole-form p { color: var(--sole-muted); font-family: var(--sans); font-size: clamp(15px, 1.75vw, 20px); line-height: 1.72; }
  .sole-lead { max-width: 700px; margin: 28px 0 34px; }
  .sole-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .sole-card { border: 1px solid var(--sole-line); background: rgba(247,239,224,0.055); padding: clamp(24px, 4vw, 42px); backdrop-filter: blur(16px); }
  .sole-card span, .sole-stat span { display: inline-block; color: var(--sole-gold); font-family: var(--sans); font-size: 11px; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 16px; }
  .hero-card { min-height: 430px; display: flex; flex-direction: column; justify-content: flex-end; }
  .sole-section { padding: clamp(76px, 11vw, 132px) 0; }
  .sole-section.alt { background: #f7efe0; color: #090807; }
  .sole-section.alt .sole-kicker, .sole-section.alt .sole-card span { color: #6d5213; }
  .sole-section.alt .sole-copy, .sole-section.alt .sole-card p { color: rgba(9,8,7,0.72); }
  .sole-steps, .sole-product-grid, .sole-form-grid, .sole-impact-grid, .sole-testimonials { display: grid; gap: 16px; }
  .sole-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 36px; }
  .sole-impact-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 34px; }
  .sole-stat { border-top: 1px solid var(--sole-line); padding-top: 22px; }
  .sole-stat strong { display: block; font-family: var(--serif); font-size: clamp(44px, 6vw, 78px); font-weight: 500; line-height: 0.9; color: var(--sole-gold); }
  .sole-list { display: grid; gap: 10px; margin-top: 26px; }
  .sole-list li { list-style: none; border: 1px solid var(--sole-line); padding: 14px 16px; color: var(--sole-muted); font-family: var(--sans); }
  .sole-product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 34px; }
  .sole-product { min-height: 220px; display: flex; flex-direction: column; justify-content: space-between; }
  .sole-product em { color: var(--sole-muted); font-style: normal; font-family: var(--sans); font-size: 13px; }
  .sole-form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 34px; }
  .sole-form { border: 1px solid var(--sole-line); background: rgba(247,239,224,0.055); padding: clamp(22px, 3vw, 34px); }
  .sole-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 22px; }
  .sole-fields .full { grid-column: 1 / -1; }
  .sole-form label { display: grid; gap: 6px; color: rgba(247,239,224,0.7); font-family: var(--sans); font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
  .sole-form input, .sole-form select, .sole-form textarea {
    width: 100%; min-height: 46px; border: 1px solid var(--sole-line); background: rgba(8,7,6,0.46); color: var(--sole-ink);
    padding: 12px 13px; font-family: var(--sans); font-size: 15px; border-radius: 0; outline: none;
  }
  .sole-form textarea { min-height: 112px; resize: vertical; }
  .sole-form button { width: 100%; margin-top: 14px; border: 0; }
  .sole-notice { border: 1px solid rgba(201,168,76,0.42); background: rgba(201,168,76,0.12); color: #f7efe0; padding: 14px 16px; margin-bottom: 22px; font-family: var(--sans); }
  .sole-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
  .sole-tags span { border: 1px solid rgba(9,8,7,0.16); padding: 12px 14px; font-family: var(--sans); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
  .sole-testimonials { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 34px; }
  .sole-footer { border-top: 1px solid var(--sole-line); padding: 38px 0; color: var(--sole-muted); font-family: var(--sans); }
  .sole-footer .sole-wrap { display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; }

  @media (max-width: 980px) {
    .sole-hero-grid, .sole-split, .sole-steps, .sole-product-grid, .sole-form-grid, .sole-impact-grid, .sole-testimonials { grid-template-columns: 1fr; }
    .hero-card { min-height: 300px; }
    .sole-product { min-height: 180px; }
  }
  @media (max-width: 640px) {
    .sole-hero { min-height: auto; padding-bottom: 58px; }
    .sole-nav { margin-bottom: 72px; }
    .sole-nav-links a:not(.sole-pill) { display: none; }
    .sole-page h1 { font-size: clamp(56px, 18vw, 80px) !important; line-height: 0.9 !important; }
    .sole-page h2 { font-size: clamp(34px, 12vw, 52px) !important; }
    .sole-actions { flex-direction: column; }
    .sole-actions a { width: 100%; }
    .sole-fields { grid-template-columns: 1fr; }
    .sole-section { padding: 64px 0; }
  }
`;

function SubmissionNotice({ submitted }: { submitted?: string }) {
  if (!submitted || !SUBMISSION_COPY[submitted]) return null;
  return <div className="sole-notice">{SUBMISSION_COPY[submitted]}</div>;
}

function DonationForm() {
  return (
    <form className="sole-form" action="/api/sole-exchange" method="post">
      <input type="hidden" name="submission_type" value="donation" />
      <p className="sole-kicker">Make a donation</p>
      <h3>Give sneakers a second life.</h3>
      <p>Use this for money donations, sneaker donations, pickup requests, or drop-off coordination.</p>
      <div className="sole-fields">
        <label>First Name<input name="first_name" required /></label>
        <label>Last Name<input name="last_name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" /></label>
        <label>Shoe Size<input name="shoe_size" /></label>
        <label>Pair Count<input name="pair_count" type="number" min="1" /></label>
        <label>Condition<select name="condition"><option>New</option><option>Like New</option><option>Good</option><option>Fair</option></select></label>
        <label>Delivery Option<select name="delivery_option"><option>Drop-off at location</option><option>Deliver at location</option><option>We pickup from your location</option></select></label>
        <label className="full">Pickup / Drop-off Address<input name="address_line_1" placeholder="Street address" /></label>
        <label>City<input name="city" /></label>
        <label>State<input name="state" /></label>
        <label>Zip Code<input name="zip_code" /></label>
        <label className="full">Notes<textarea name="story" placeholder="Tell us what you have, condition, timing, and best way to coordinate." /></label>
      </div>
      <button type="submit">Submit Donation</button>
    </form>
  );
}

function RequestForm() {
  return (
    <form className="sole-form" action="/api/sole-exchange" method="post">
      <input type="hidden" name="submission_type" value="request" />
      <p className="sole-kicker">Submit a request</p>
      <h3>Request a pair with dignity.</h3>
      <p>No bidding. No resale. Tell us what you need and why. The team reviews every request.</p>
      <div className="sole-fields">
        <label>First Name<input name="first_name" required /></label>
        <label>Last Name<input name="last_name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" /></label>
        <label>Shoe Size<input name="shoe_size" required /></label>
        <label>Urgency<select name="urgency"><option>School</option><option>Work</option><option>Sports</option><option>Temporary Housing</option><option>Emergency</option><option>General Need</option></select></label>
        <label>Desired Pair<select name="desired_pair"><option>Any available match</option>{PRODUCTS.map(([name]) => <option key={name}>{name}</option>)}</select></label>
        <label>Delivery Option<select name="delivery_option"><option>Pickup from partner location</option><option>Deliver at location</option><option>Ship if available</option></select></label>
        <label className="full">Address<input name="address_line_1" placeholder="Street address" /></label>
        <label>City<input name="city" /></label>
        <label>State<input name="state" /></label>
        <label>Zip Code<input name="zip_code" /></label>
        <label className="full">Story / Need<textarea name="story" required placeholder="Tell us who the shoes are for, what they need them for, and timing." /></label>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
}

function PartnerForm() {
  return (
    <form className="sole-form" action="/api/sole-exchange" method="post">
      <input type="hidden" name="submission_type" value="partner" />
      <p className="sole-kicker">Partner / Volunteer</p>
      <h3>Host a drive or help the system.</h3>
      <p>For schools, churches, gyms, sneaker stores, brands, volunteers, delivery support, and sponsors.</p>
      <div className="sole-fields">
        <label>First Name<input name="first_name" required /></label>
        <label>Last Name<input name="last_name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" /></label>
        <label className="full">Organization<input name="organization" placeholder="Company, school, church, team, brand, etc." /></label>
        <label>City<input name="city" /></label>
        <label>State<input name="state" /></label>
        <label className="full">How do you want to help?<textarea name="story" placeholder="Host a bin, sponsor cleaning supplies, volunteer, distribute pairs, activate at an event, etc." /></label>
      </div>
      <button type="submit">Become a Partner</button>
    </form>
  );
}

export default function SoleExchangePage({ searchParams }: { searchParams?: { submitted?: string } }) {
  return (
    <main className="sole-page">
      <style>{styles}</style>

      <section className="sole-hero" id="top">
        <div className="sole-wrap">
          <nav className="sole-nav">
            <a href="/" className="sole-brand">Sole Exchange</a>
            <div className="sole-nav-links">
              <a href="#how">How It Works</a>
              <a href="#forms">Forms</a>
              <a href="#inventory">Available Pairs</a>
              <a href="#forms" className="sole-pill">Start</a>
            </div>
          </nav>

          <div className="sole-hero-grid">
            <div>
              <p className="sole-kicker">No-cost sneaker donation + request hub</p>
              <h1>Give sneakers a second life.</h1>
              <p className="sole-lead">Sole Exchange connects gently used sneakers with people who truly need them. No resale, no bidding — just community, care, and clean kicks going to good homes.</p>
              <div className="sole-actions">
                <a href="#forms" className="sole-btn primary">Make a Donation</a>
                <a href="#forms" className="sole-btn">Submit a Request</a>
                <a href="#inventory" className="sole-btn">Claim a Pair</a>
              </div>
            </div>
            <div className="sole-card hero-card">
              <span>Rebuild Status</span>
              <h2>Now owned by our Vercel + Supabase stack.</h2>
              <p>This page duplicates the live WordPress structure and moves the intake system into our backend so we control the data, workflow, and future automation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sole-section" id="how">
        <div className="sole-wrap">
          <p className="sole-kicker">How Sole Exchange Works</p>
          <h2>A simple path from closet to new owner.</h2>
          <p className="sole-copy">Whether someone is giving or receiving, the process stays clear, safe, and human-first.</p>
          <div className="sole-steps">
            {STEPS.map(([num, title, body]) => (
              <article className="sole-card" key={title}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sole-section alt">
        <div className="sole-wrap sole-split">
          <div>
            <p className="sole-kicker">Impact You Are Part Of</p>
            <h2>Every pair moves a real story forward.</h2>
            <p className="sole-copy">From first-day-of-school confidence to safer night shifts, donated sneakers show up in everyday moments.</p>
          </div>
          <ul className="sole-list">
            {PRIORITIES.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="sole-section">
        <div className="sole-wrap">
          <p className="sole-kicker">Impact Dashboard</p>
          <h2>Numbers we can now track.</h2>
          <div className="sole-impact-grid">
            <div className="sole-stat"><span>Pairs Donated</span><strong>400+</strong></div>
            <div className="sole-stat"><span>Requests Filled</span><strong>470+</strong></div>
            <div className="sole-stat"><span>Partner Orgs</span><strong>36+</strong></div>
            <div className="sole-stat"><span>Countries Reached</span><strong>15+</strong></div>
          </div>
        </div>
      </section>

      <section className="sole-section" id="forms">
        <div className="sole-wrap">
          <SubmissionNotice submitted={searchParams?.submitted} />
          <p className="sole-kicker">Start With a Quick Form</p>
          <h2>Donate, request, or partner.</h2>
          <p className="sole-copy">These forms replace the unknown backend. Submissions are routed into our Supabase table for review, matching, fulfillment, and future GHL/n8n automation.</p>
          <div className="sole-form-grid">
            <DonationForm />
            <RequestForm />
            <PartnerForm />
          </div>
        </div>
      </section>

      <section className="sole-section alt" id="inventory">
        <div className="sole-wrap">
          <p className="sole-kicker">Featured Product / Available Pairs</p>
          <h2>Pairs currently available for claim.</h2>
          <p className="sole-copy">These are the rebuilt equivalents of the current site’s claimable product section. In Supabase, inventory can be updated, matched, archived, and fulfilled.</p>
          <div className="sole-product-grid">
            {PRODUCTS.map(([name, condition, size, status]) => (
              <article className="sole-card sole-product" key={name}>
                <div>
                  <span>{status}</span>
                  <h3>{name}</h3>
                  <em>{condition} · {size}</em>
                </div>
                <a href="#forms" className="sole-btn primary">Claim this Pair</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sole-section">
        <div className="sole-wrap sole-split">
          <div>
            <p className="sole-kicker">About Sole Exchange</p>
            <h2>From a sneaker conversation to a movement.</h2>
            <p className="sole-copy">Sole Exchange started with a simple idea: sneakers have stories, and every pair deserves a second life. The new build turns that mission into a scalable intake, inventory, and fulfillment system.</p>
            <div className="sole-tags">
              <span>Global delivery</span><span>Verified partners</span><span>Requests fulfilled</span><span>Worldwide impact</span>
            </div>
          </div>
          <div className="sole-card hero-card">
            <span>Sneaker Swap Nights</span>
            <h2>Every pair tells a story.</h2>
            <p>Donated shoes can power collection drives, cleaning workshops, sports activations, back-to-school giveaways, and pop-up distribution nights.</p>
          </div>
        </div>
      </section>

      <section className="sole-section alt">
        <div className="sole-wrap">
          <p className="sole-kicker">Testimonials</p>
          <h2>Our clients say.</h2>
          <div className="sole-testimonials">
            {TESTIMONIALS.map(([name, quote]) => (
              <article className="sole-card" key={name}>
                <span>{name}</span>
                <p>{quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sole-section">
        <div className="sole-wrap" style={{ textAlign: 'center' }}>
          <p className="sole-kicker">Ready to give or receive a pair?</p>
          <h2>One short form starts the process.</h2>
          <p className="sole-copy" style={{ maxWidth: 700, margin: '0 auto 28px' }}>Tell us what you have, what you need, or how you want to help. A Sole Exchange volunteer can follow up from our owned backend.</p>
          <div className="sole-actions" style={{ justifyContent: 'center' }}>
            <a href="#forms" className="sole-btn primary">Start a Donation</a>
            <a href="#forms" className="sole-btn">Submit a Request</a>
          </div>
        </div>
      </section>

      <footer className="sole-footer">
        <div className="sole-wrap">
          <span>© 2026 Sole Exchange. Rebuilt on KHG Vercel + Supabase.</span>
          <span>Donation · Request · Inventory · Partner Intake</span>
        </div>
      </footer>
    </main>
  );
}
