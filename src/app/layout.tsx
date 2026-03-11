import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "HugLife — Where Culture Lives", description: "Events, experiences, and community. HugLife brings people together through curated cultural moments." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
