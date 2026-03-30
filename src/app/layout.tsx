import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HugLife — Where Culture Lives",
  description: "15+ event brands. 45+ events in 2026. Music, art, food, culture, fashion — curated experiences that connect communities across America. A KHG Enterprise.",
  keywords: "HugLife, events, Atlanta, Houston, nightlife, NOIR, REMIX, Taste of Art, concerts, food festival, KHG, Dr. Dorsey",
  openGraph: {
    title: "HugLife — Where Culture Lives",
    description: "15+ event brands. 45+ events in 2026. Curated cultural experiences across America.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HugLife Events",
              "description": "Atlanta's premier event collective.",
              "url": "https://huglife.com",
              "sameAs": ["https://instagram.com/huglife"],
              "parentOrganization": {
                "@type": "Organization",
                "name": "The Kollective Hospitality Group"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
