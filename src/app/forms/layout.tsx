import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forms · The Kollective Hospitality Group',
  description:
    'Every form in the KHG ecosystem — agreements, applications, inquiries, and onboarding — in one place. NDA, Non-Compete, Vendor, Sponsor, and more.',
  openGraph: {
    title: 'Forms · The Kollective Hospitality Group',
    description: 'Agreements, applications, inquiries, and onboarding for the KHG ecosystem.',
    type: 'website',
  },
};

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
