import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function clean(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function toInt(value: string | null) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const submissionType = clean(form.get('submission_type')) ?? 'contact';
  const redirectTo = new URL('/sole-exchange', req.url);

  const payload = {
    submission_type: submissionType,
    first_name: clean(form.get('first_name')),
    last_name: clean(form.get('last_name')),
    email: clean(form.get('email')),
    phone: clean(form.get('phone')),
    shoe_size: clean(form.get('shoe_size')),
    pair_count: toInt(clean(form.get('pair_count'))),
    condition: clean(form.get('condition')),
    delivery_option: clean(form.get('delivery_option')),
    address_line_1: clean(form.get('address_line_1')),
    address_line_2: clean(form.get('address_line_2')),
    city: clean(form.get('city')),
    state: clean(form.get('state')),
    zip_code: clean(form.get('zip_code')),
    urgency: clean(form.get('urgency')),
    story: clean(form.get('story')),
    organization: clean(form.get('organization')),
    source: 'sole-exchange-vercel',
    status: 'new',
    metadata: {
      desired_pair: clean(form.get('desired_pair')),
      referral_source: clean(form.get('referral_source')),
      user_agent: req.headers.get('user-agent'),
    },
  };

  if (!payload.email) {
    redirectTo.searchParams.set('submitted', 'missing_email');
    return NextResponse.redirect(redirectTo, { status: 303 });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Sole Exchange submission failed: missing Supabase env vars.');
    redirectTo.searchParams.set('submitted', 'config_needed');
    return NextResponse.redirect(redirectTo, { status: 303 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/sole_exchange_submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Sole Exchange submission failed:', errorText);
    redirectTo.searchParams.set('submitted', 'error');
    return NextResponse.redirect(redirectTo, { status: 303 });
  }

  redirectTo.searchParams.set('submitted', 'success');
  redirectTo.searchParams.set('type', submissionType);
  return NextResponse.redirect(redirectTo, { status: 303 });
}
