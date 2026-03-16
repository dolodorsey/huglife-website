"use client";
import { useState, useEffect, useRef } from "react";

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

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const ArrowRight = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const Crown = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5z"/></svg>;
const MapPin = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const CalendarIcon = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const Users = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Camera = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
const Music4 = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const Sparkles = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const Star = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Zap = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Building2 = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
const Wine = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>;
const Utensils = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const Car = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
const Dog = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/></svg>;
const Football = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>;


// ─── 2026 EVENT CALENDAR (FROM PDF) ──────────────────────────────────────────
interface CalendarEvent {
  date: string;
  day: string;
  event: string;
  subtitle?: string;
  city: string;
  color: string;
  ticketUrl?: string;
}

const CALENDAR_2026: Record<string, CalendarEvent[]> = {
  "APRIL 2026": [
    { date: "Apr 11", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E" },
    { date: "Apr 18", day: "Sat", event: "TASTE OF ART", subtitle: "+ Streetwear Market", city: "ATL", color: "#A75C43", ticketUrl: "https://www.eventbrite.com/e/taste-of-art-tickets-1982512459133" },
    { date: "Apr 25", day: "Sat", event: "WRST BHVR", city: "ATL", color: "#BB2C35", },
  ],
  "MAY 2026": [
    { date: "May 2", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E" },
    { date: "May 5", day: "Tue", event: "CINCO DE MAYO", subtitle: "Taco Tuesday Block Party", city: "ATL", color: "#FF6B35" },
    { date: "May 10", day: "Sun", event: "STELLA GOT HER GROOVE BACK", subtitle: "RNB Concert · Mother's Day Weekend", city: "ATL", color: "#D947A8" },
    { date: "May 17", day: "Sun", event: "NOIR", city: "ATL", color: "#C8A96E", ticketUrl: "https://www.eventbrite.com/e/espresso-tickets-1982507090074" },
    { date: "May 24", day: "Sun", event: "MEMORIAL DAY BLOCK PARTY", subtitle: "+ Fireworks", city: "ATL", color: "#FF6B35" },
    { date: "May 30", day: "Sat", event: "WRST BHVR", city: "ATL", color: "#BB2C35" },
  ],
  "JUNE 2026": [
    { date: "Jun 5", day: "Fri", event: "FOREVER FUTBOL", subtitle: "Museum Opens", city: "ATL · DC · LAX", color: "#335A42", ticketUrl: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046" },
    { date: "Jun 12", day: "Fri", event: "UNDERGROUND KING", subtitle: "Indie Concert", city: "ATL", color: "#8B5CF6" },
    { date: "Jun 13", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E" },
    { date: "Jun 14", day: "Sun", event: "CRVNGS FOOD SERIES", city: "ATL", color: "#F97316" },
    { date: "Jun 19", day: "Fri", event: "JUNETEENTH BLOCK PARTY", subtitle: "+ Cultural Activation", city: "ATL", color: "#FF6B35" },
    { date: "Jun 20", day: "Sat", event: "TASTE OF ART", subtitle: "+ Streetwear Market", city: "ATL", color: "#A75C43", ticketUrl: "https://www.eventbrite.com/e/taste-of-art-tickets-1982513123119" },
    { date: "Jun 21", day: "Sun", event: "GANGSTA GOSPEL", subtitle: "Father's Day Weekend", city: "ATL", color: "#D9AF4A", ticketUrl: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983357015223" },
    { date: "Jun 27", day: "Sat", event: "WRST BHVR", city: "DC", color: "#BB2C35" },
  ],
  "JULY 2026": [
    { date: "Jul 4", day: "Sat", event: "PARKING LOT PIMPIN", subtitle: "4th of July Car Show", city: "ATL", color: "#EF4444" },
    { date: "Jul 5", day: "Sun", event: "CRVNGS FOOD TRUCK FESTIVAL", city: "ATL", color: "#F97316" },
    { date: "Jul 11", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E", ticketUrl: "https://www.eventbrite.com/e/remix-tickets-1983356687242" },
    { date: "Jul 17", day: "Fri", event: "SHUT UP & DANCE", city: "ATL", color: "#EC4899" },
    { date: "Jul 19", day: "Sun", event: "NOIR", city: "ATL", color: "#C8A96E", ticketUrl: "https://www.eventbrite.com/e/espresso-tickets-1982510403986" },
    { date: "Jul 25", day: "Sat", event: "WRST BHVR", city: "ATL", color: "#BB2C35" },
  ],
  "AUGUST 2026": [
    { date: "Aug 8", day: "Sat", event: "BACK TO SCHOOL DRIVE", city: "ATL", color: "#3B82F6" },
    { date: "Aug 9", day: "Sun", event: "STELLA GOT HER GROOVE BACK", subtitle: "RNB Concert", city: "ATL", color: "#D947A8" },
    { date: "Aug 15", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E" },
    { date: "Aug 16", day: "Sun", event: "CRVNGS FOOD SERIES", city: "ATL", color: "#F97316" },
    { date: "Aug 22", day: "Sat", event: "TASTE OF ART", subtitle: "+ Streetwear Market", city: "ATL", color: "#A75C43", ticketUrl: "https://www.eventbrite.com/e/taste-of-art-tickets-1982514621601" },
    { date: "Aug 29", day: "Sat", event: "WRST BHVR", city: "DC", color: "#BB2C35" },
  ],
  "SEPTEMBER 2026": [
    { date: "Sep 4", day: "Fri", event: "SHUT UP & DANCE", city: "ATL", color: "#EC4899" },
    { date: "Sep 5", day: "Sat", event: "REMIX", city: "ATL", color: "#B6E03E" },
    { date: "Sep 6", day: "Sun", event: "NOIR", city: "ATL", color: "#C8A96E", ticketUrl: "https://www.eventbrite.com/e/espresso-tickets-1982511951615" },
    { date: "Sep 7", day: "Mon", event: "LABOR DAY", subtitle: "+ Food Truck Festival", city: "ATL", color: "#F97316" },
    { date: "Sep 12", day: "Sat", event: "BEAUTY & THE BEAST", city: "ATL", color: "#D947A8", ticketUrl: "https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091" },
    { date: "Sep 13", day: "Sun", event: "GANGSTA GOSPEL", city: "ATL", color: "#D9AF4A", ticketUrl: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983358448510" },
    { date: "Sep 18", day: "Fri", event: "UNDERGROUND KING", subtitle: "Indie Concert", city: "ATL", color: "#8B5CF6" },
    { date: "Sep 19", day: "Sat", event: "STELLA GOT HER GROOVE BACK", subtitle: "RNB Concert", city: "ATL", color: "#D947A8" },
    { date: "Sep 26", day: "Sat", event: "WRST BHVR", city: "ATL", color: "#BB2C35" },
    { date: "Sep 27", day: "Sun", event: "CRVNGS FOOD SERIES", city: "ATL", color: "#F97316" },
  ],
  "OCTOBER 2026": [
    { date: "Oct 18", day: "Sun", event: "CRVNGS FOOD SERIES", city: "ATL", color: "#F97316" },
    { date: "Oct 31", day: "Sat", event: "MONSTER'S BALL", city: "ATL", color: "#6B2F8A", ticketUrl: "https://www.eventbrite.com/e/haunted-house-tickets-1983440545063" },
  ],
  "NOVEMBER 2026": [
    { date: "Nov 15", day: "Sun", event: "NOIR", city: "ATL", color: "#C8A96E" },
    { date: "Nov 21", day: "Sat", event: "BLACK BALL", city: "ATL", color: "#1a1a1a", ticketUrl: "https://www.eventbrite.com/e/black-ball-tickets-1983359039277" },
  ],
  "DECEMBER 2026": [
    { date: "Dec 4–6", day: "Fri–Sun", event: "TASTE OF ART", subtitle: "Art Basel Edition", city: "MIA", color: "#A75C43", ticketUrl: "https://www.eventbrite.com/e/taste-of-art-tickets-1982515491202" },
    { date: "Dec 12", day: "Sat", event: "SNOW BALL", city: "ATL", color: "#87CEEB", ticketUrl: "https://www.eventbrite.com/e/snow-ball-tickets-1983441304334" },
  ],
};

// ─── EVENT WORLDS ─────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "noir", name: "NOIR", tag: "Exclusive All Black Semi-Formal",
    thesis: "The Art of Being Selective.",
    body: "A luxury nightlife property built around access, curation, and social prestige. The room is intentional. The energy is controlled. The memory is premium.",
    cta: "Enter NOIR", mood: "Obsidian · Gold · Shadow · Velvet",
    accent: ["#d8b26e", "#8b6b3d"], glow: "rgba(216,178,110,0.12)",
    Icon: Crown, cities: ["Atlanta", "Houston", "Charlotte", "Miami"], status: "Active",
    dates: ["May 17", "Jul 19", "Sep 6", "Nov 15"],
  },
  {
    id: "taste-of-art", name: "Taste of Art", tag: "Art Show + Streetwear Market",
    thesis: "Where the Canvas Becomes the Table.",
    body: "An immersive social experience where food, creativity, culture, and conversation live in the same frame. Art is the atmosphere. Cuisine is the medium.",
    cta: "Enter Taste of Art", mood: "Cream · Wine · Brushstroke · Gold",
    accent: ["#c9a87a", "#7d5a3c"], glow: "rgba(201,168,122,0.12)",
    Icon: Sparkles, cities: ["Atlanta", "Los Angeles", "DC", "Miami"],
    status: "Apr 18", dates: ["Apr 18", "Jun 20", "Aug 22", "Dec 4–6 (Art Basel)"],
  },
  {
    id: "remix", name: "REMIX", tag: "The Mashup Music Experience",
    thesis: "Where Sounds Collide and the Room Shifts.",
    body: "A high-energy sound-driven experience where genres collide and the crowd has range. No rules. No predictable playlist. Pure room momentum.",
    cta: "Enter REMIX", mood: "Obsidian · Electric Silver · Motion",
    accent: ["#B6E03E", "#6a8a1a"], glow: "rgba(182,224,62,0.10)",
    Icon: Music4, cities: ["Atlanta", "Houston", "Charlotte"],
    status: "Apr 11", dates: ["Apr 11", "May 2", "Jun 13", "Jul 11", "Aug 15", "Sep 5"],
  },
  {
    id: "wrst-bhvr", name: "WRST BHVR", tag: "Napkin Wars Edition",
    thesis: "Where the Napkins Fly and the Room Goes Up.",
    body: "A high-impact celebration built for spectacle, participation, chaos, and the kind of moment people do not forget. The room becomes the content.",
    cta: "Enter Napkin Wars", mood: "Black · Chrome · Silver Motion Bursts",
    accent: ["#BB2C35", "#8a1a22"], glow: "rgba(187,44,53,0.10)",
    Icon: Zap, cities: ["Atlanta", "DC"],
    status: "ATL + DC", dates: ["ATL: Apr 25, May 30, Jul 25, Sep 26", "DC: Jun 27, Aug 29"],
  },
  {
    id: "gangsta-gospel", name: "Gangsta Gospel", tag: "Mashup Session",
    thesis: "Soulful. Rebellious. Unforgettable.",
    body: "A bold cultural gathering blending spiritual undertones, cultural expression, and unforgettable room energy. Church clothes optional. Presence required.",
    cta: "Enter Gangsta Gospel", mood: "Burgundy · Cream · Stained-Light · Black",
    accent: ["#D9AF4A", "#6b3a28"], glow: "rgba(184,122,90,0.12)",
    Icon: Star, cities: ["Atlanta", "Houston"],
    status: "Jun 21", dates: ["Jun 21 (Father's Day)", "Sep 13"],
  },
  {
    id: "crvngs", name: "CRVNGS", tag: "Food Series + Food Truck Festival",
    thesis: "Where Culture Meets Cuisine.",
    body: "A culinary exhibition series celebrating local chefs, food truck culture, and community dining. Multiple formats from plated experiences to outdoor festivals.",
    cta: "Enter CRVNGS", mood: "Amber · Fire · Gold · Smoke",
    accent: ["#F97316", "#c2410c"], glow: "rgba(249,115,22,0.12)",
    Icon: Utensils, cities: ["Atlanta"],
    status: "Jun 14", dates: ["Jun 14", "Jul 5 (Truck)", "Aug 16", "Sep 7 (Truck)", "Sep 27", "Oct 18"],
  },
  {
    id: "stella", name: "Stella Got Her Groove Back", tag: "RNB Concert Series",
    thesis: "Fashion, Soul, and Live Performance.",
    body: "A live concert experience celebrating RNB culture, live vocalists, fashion energy, and premium nightlife atmosphere.",
    cta: "Enter Stella", mood: "Hot Pink · Black · Neon · Velvet",
    accent: ["#D947A8", "#8b2a6e"], glow: "rgba(217,71,168,0.12)",
    Icon: Music4, cities: ["Atlanta"],
    status: "May 10", dates: ["May 10 (Mother's Day)", "Aug 9", "Sep 19"],
  },
  {
    id: "forever-futbol", name: "Forever Futbol", tag: "World Cup Soccer Museum",
    thesis: "The Beautiful Game, Exhibited.",
    body: "A multi-city soccer museum experience celebrating the culture, history, and community of the world's most popular sport. Jun 5 – Jul 6.",
    cta: "Enter Forever Futbol", mood: "Forest Green · Gold · Pitch Black",
    accent: ["#335A42", "#1a3a22"], glow: "rgba(51,90,66,0.12)",
    Icon: Football, cities: ["Atlanta", "DC", "Los Angeles"],
    status: "Jun 5–Jul 6", dates: ["Jun 5 – Jul 6 (ATL · DC · LAX)"],
  },
];

// ─── ACTIVATIONS ──────────────────────────────────────────────────────────────
const ACTIVATIONS = [
  { date: "May 5", event: "Cinco de Mayo Block Party", color: "#FF6B35" },
  { date: "May 24", event: "Memorial Day Block Party + Fireworks", color: "#FF6B35" },
  { date: "Jun 12", event: "Underground King — Indie Concert", color: "#8B5CF6" },
  { date: "Jun 19", event: "Juneteenth Block Party + Cultural Activation", color: "#FF6B35" },
  { date: "Jul 4", event: "Parking Lot Pimpin — 4th of July Car Show", color: "#EF4444" },
  { date: "Jul 17", event: "Shut Up & Dance", color: "#EC4899" },
  { date: "Aug 8", event: "Back to School Drive", color: "#3B82F6" },
  { date: "Sep 4", event: "Shut Up & Dance", color: "#EC4899" },
  { date: "Sep 12", event: "Beauty & The Beast", color: "#D947A8" },
  { date: "Sep 18", event: "Underground King — Indie Concert", color: "#8B5CF6" },
  { date: "Oct 31", event: "Monster's Ball — Halloween", color: "#6B2F8A" },
  { date: "Nov 21", event: "Black Ball", color: "#1a1a1a" },
  { date: "Dec 12", event: "Snow Ball", color: "#87CEEB" },
];

// ─── TICKET ACCORDION DATA (from Eventbrite) ─────────────────────────────────
const TICKET_BRANDS = [
  {
    brand: "NOIR", subtitle: "Exclusive All Black Semi-Formal", color: "#C8A96E",
    events: [
      { month: "May 17", url: "https://www.eventbrite.com/e/espresso-tickets-1982507090074" },
      { month: "Jul 19", url: "https://www.eventbrite.com/e/espresso-tickets-1982510403986" },
      { month: "Sep 6", url: "https://www.eventbrite.com/e/espresso-tickets-1982511951615" },
    ],
  },
  {
    brand: "TASTE OF ART", subtitle: "Canvas, Cuisine & Culture", color: "#A75C43",
    events: [
      { month: "Apr 18", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982512459133" },
      { month: "Jun 20", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982513123119" },
      { month: "Aug 22", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982514621601" },
      { month: "Dec 4–6 Art Basel", url: "https://www.eventbrite.com/e/taste-of-art-tickets-1982515491202" },
    ],
  },
  {
    brand: "REMIX", subtitle: "Mashup Music Experience", color: "#B6E03E",
    events: [
      { month: "Jul 11", url: "https://www.eventbrite.com/e/remix-tickets-1983356687242" },
    ],
  },
  {
    brand: "GANGSTA GOSPEL", subtitle: "Soul & Spirit", color: "#D9AF4A",
    events: [
      { month: "Jun 21", url: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983357015223" },
      { month: "Sep 13", url: "https://www.eventbrite.com/e/gangsta-gospel-tickets-1983358448510" },
    ],
  },
  {
    brand: "WRST BHVR", subtitle: "Napkin Wars", color: "#BB2C35",
    events: [
      { month: "May 30 (ATL)", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983443338418" },
      { month: "Jul 25 (ATL)", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983443502910" },
      { month: "Sep 26 (ATL)", url: "https://www.eventbrite.com/e/napkin-wars-tickets-1983447530958" },
    ],
  },
  {
    brand: "PAPARAZZI", subtitle: "Flash & Fashion", color: "#BEC3CB",
    events: [
      { month: "May", url: "https://www.eventbrite.com/e/paparazzi-tickets-1983361435444" },
      { month: "June", url: "https://www.eventbrite.com/e/paparazzi-tickets-1983361684188" },
      { month: "July", url: "https://www.eventbrite.com/e/paparazzi-tickets-1983430772834" },
      { month: "August", url: "https://www.eventbrite.com/e/paparazzi-tickets-1983432236211" },
      { month: "September", url: "https://www.eventbrite.com/e/paparazzi-tickets-1983432751753" },
    ],
  },
  {
    brand: "SUNDAY'S BEST", subtitle: "Brunch & Vibes", color: "#D8BA7C",
    events: [
      { month: "May", url: "https://www.eventbrite.com/e/sunday-best-tickets-1983529471043" },
      { month: "July", url: "https://www.eventbrite.com/e/sundays-best-tickets-1983552321389" },
      { month: "September", url: "https://www.eventbrite.com/e/sundays-best-tickets-1983552570133" },
      { month: "November", url: "https://www.eventbrite.com/e/sundays-best-tickets-1983552744655" },
    ],
  },
  {
    brand: "PAWCHELLA", subtitle: "Dog Lover's Festival", color: "#FFB347",
    events: [
      { month: "August", url: "https://www.eventbrite.com/e/pawchella-summer-tickets-1983440350481" },
    ],
  },
  {
    brand: "FOREVER FUTBOL", subtitle: "The Beautiful Game", color: "#335A42",
    events: [
      { month: "Jun 5–Jul 6 (ATL)", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046" },
      { month: "Jun 5–Jul 6 (DC)", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442556078" },
      { month: "Jun 5–Jul 6 (LAX)", url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442708534" },
    ],
  },
  {
    brand: "BEAUTY & THE BEAST", subtitle: "Signature Gala", color: "#D947A8",
    events: [{ month: "Sep 12", url: "https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091" }],
  },
  {
    brand: "MONSTER'S BALL", subtitle: "Halloween", color: "#6B2F8A",
    events: [{ month: "Oct 31", url: "https://www.eventbrite.com/e/haunted-house-tickets-1983440545063" }],
  },
  {
    brand: "BLACK BALL", subtitle: "The Annual Affair", color: "#1a1a1a",
    events: [{ month: "Nov 21", url: "https://www.eventbrite.com/e/black-ball-tickets-1983359039277" }],
  },
  {
    brand: "SNOW BALL", subtitle: "Winter Formal", color: "#87CEEB",
    events: [{ month: "Dec 12", url: "https://www.eventbrite.com/e/snow-ball-tickets-1983441304334" }],
  },
];

// ─── AUDIENCE PATHS ───────────────────────────────────────────────────────────
const PATHS = [
  { title: "For Attendees", Icon: Users, body: "Access upcoming experiences, RSVP, VIP tables, and early drops before the crowd catches up.", cta: "Get Access" },
  { title: "For Promoters", Icon: Zap, body: "Join city campaigns, push awareness, drive turnout, and earn through structured event promotion.", cta: "Apply as Promoter" },
  { title: "For Talent", Icon: Music4, body: "DJs, hosts, photographers, creators, performers, and event staff ready for premium cultural experiences.", cta: "Join Talent Network" },
  { title: "For Sponsors", Icon: Building2, body: "Activate through culture, content, audience access, and visual placement at premium social experiences.", cta: "Partner as Sponsor" },
  { title: "For Venues & Cities", Icon: MapPin, body: "Host recurring energy and bring premium event IP into your venue or market.", cta: "Bring HUGLIFE Here" },
];

// ─── CITY MARKETS ─────────────────────────────────────────────────────────────
const CITIES = [
  { city: "Atlanta", status: "Flagship", events: ["NOIR", "Taste of Art", "REMIX", "WRST BHVR", "Gangsta Gospel", "CRVNGS"], note: "Flagship Market — All Events" },
  { city: "DC", status: "Active", events: ["WRST BHVR", "Taste of Art", "Forever Futbol"], note: "Expansion Market" },
  { city: "Los Angeles", status: "Active", events: ["Taste of Art", "Forever Futbol", "Paparazzi"], note: "West Coast Launch" },
  { city: "Houston", status: "Active", events: ["NOIR", "Gangsta Gospel", "REMIX"], note: "High-Social Market" },
  { city: "Charlotte", status: "Active", events: ["NOIR", "REMIX", "WRST BHVR"], note: "Event Expansion" },
  { city: "Miami", status: "Active", events: ["NOIR", "Taste of Art (Art Basel)", "Paparazzi"], note: "Art Basel + Premium" },
];


// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
      <div className="w-1 h-1 rounded-full" style={{ background: GOLD.mid }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.mid}40, transparent)` }} />
    </div>
  );
}

function StatusPill({ label, size = "sm" }: { label: string; size?: "sm" | "md" }) {
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

function SectionLabel({ eyebrow, headline, sub, center = false }: { eyebrow: string; headline: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: GOLD.mid }}>{eyebrow}</div>
      <h2 className="text-4xl font-black tracking-[-0.04em] leading-[1.05] md:text-5xl" style={{ color: "#f0ece4" }}>{headline}</h2>
      {sub && (
        <p className="mt-4 text-base leading-7" style={{ color: "rgba(255,255,255,0.5)", maxWidth: center ? "600px" : undefined, margin: center ? "16px auto 0" : "16px 0 0" }}>{sub}</p>
      )}
    </div>
  );
}


// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(7,7,10,0.95)" : "rgba(7,7,10,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? BG.border : "transparent"}`,
      }}
    >
      <div>
        <div className="text-[9px] uppercase tracking-[0.38em]" style={{ color: GOLD.mid }}>Multi-City Event IP</div>
        <div className="text-xl font-black tracking-tight text-white mt-0.5">HUGLIFE</div>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.58)" }}>
        {["Events", "Calendar", "Cities", "Tickets", "Access"].map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-white transition-colors">{n}</a>
        ))}
      </nav>
      <a href="#tickets" className="rounded-full px-6 py-2.5 text-sm font-semibold no-underline"
        style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
        Get Tickets
      </a>
    </header>
  );
}


// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  // Find next upcoming event
  const today = new Date();
  const allEvents = Object.values(CALENDAR_2026).flat();
  const nextEvent = allEvents.find(e => {
    const dateStr = e.date.split("–")[0].trim();
    const parsed = new Date(`${dateStr}, 2026`);
    return parsed >= today;
  }) || allEvents[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-32 pb-20 px-6 lg:px-12"
      style={{ background: "linear-gradient(180deg, #06060a 0%, #0a0810 50%, #07070a 100%)" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-[600px] h-[600px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD.mid}20, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(255,200,150,0.15), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_1fr] gap-16 items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em] mb-8"
            style={{ background: `${GOLD.mid}12`, color: GOLD.light, border: `1px solid ${GOLD.mid}25` }}>
            2026 Season · Multi-City Cultural Experiences
          </div>
          <h1 className="text-6xl font-black tracking-[-0.05em] leading-[0.9] md:text-7xl xl:text-[5.5rem]" style={{ color: "#f0ece4" }}>
            Moments Don't
            <span className="block" style={{ color: "rgba(255,255,255,0.28)" }}>Go Viral</span>
            <span className="block" style={{ backgroundImage: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.mid}, ${GOLD.deep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              By Accident.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            HUGLIFE creates premium nightlife, brunch, art, music, food, and social experiences designed to move crowds, activate cities, and turn live moments into cultural momentum.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#calendar" className="rounded-full px-8 py-3.5 text-sm font-semibold no-underline" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>
              View 2026 Calendar
            </a>
            <a href="#tickets" className="rounded-full px-8 py-3.5 text-sm font-semibold no-underline" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.88)", border: `1px solid ${BG.border}` }}>
              Get Tickets
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
            {["15+ Event Brands", "8 City Markets", "45+ Events in 2026", "All Tickets on Eventbrite"].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: GOLD.mid }} />
                <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.38)" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel: Next Event + mini calendar */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-[2.5rem] overflow-hidden" style={{ background: "linear-gradient(145deg, #0e0c12, #141018)", border: `1px solid ${BG.border}`, minHeight: "520px" }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 30%, ${GOLD.mid}15, transparent 60%)` }} />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "520px" }}>
              {/* Mini event grid */}
              <div className="grid grid-cols-2 gap-3">
                {EVENTS.slice(0, 4).map((ev) => (
                  <div key={ev.id} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: ev.accent[0] }}>{ev.tag.split("·")[0]}</div>
                    <div className="font-black text-sm text-white">{ev.name}</div>
                  </div>
                ))}
              </div>
              {/* Next drop card */}
              <div className="rounded-2xl p-5 mt-4" style={{ background: `linear-gradient(135deg, ${GOLD.mid}18, ${GOLD.deep}10)`, border: `1px solid ${GOLD.mid}25` }}>
                <div className="text-[9px] uppercase tracking-[0.35em] mb-2" style={{ color: GOLD.light }}>Next Up</div>
                <div className="text-lg font-black text-white">{nextEvent.event} — {nextEvent.city}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{nextEvent.date} · {nextEvent.day}</div>
                {nextEvent.ticketUrl && (
                  <a href={nextEvent.ticketUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] flex items-center gap-1 no-underline" style={{ color: GOLD.mid }}>
                    Get Tickets <ArrowRight size={10} />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["ATL", "HTX", "LA", "DC", "CLT", "MIA", "PHX", "NYC"].map((c) => (
                  <span key={c} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>{c}</span>
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
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="events" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel eyebrow="Event Portfolio · 2026 Season" headline="Choose Your Experience"
          sub="Every HUGLIFE event is built with its own atmosphere, audience, and signature moment. 15+ brands. 8 cities. 45+ events this year." />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev) => {
            const Icon = ev.Icon;
            const isActive = active === ev.id;
            return (
              <div key={ev.id}
                className="rounded-[1.5rem] overflow-hidden relative cursor-pointer transition-all duration-500"
                style={{
                  background: "linear-gradient(145deg, #0c0c0e, #121212)",
                  border: `1px solid ${isActive ? ev.accent[0] + "40" : "rgba(255,255,255,0.07)"}`,
                  minHeight: "280px",
                }}
                onMouseEnter={() => setActive(ev.id)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 60% 40%, ${ev.glow}, transparent 65%)`, opacity: isActive ? 1 : 0.3 }} />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ minHeight: "280px" }}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <StatusPill label={ev.status} />
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ev.accent[0]}18` }}>
                        <Icon size={14} />
                      </div>
                    </div>
                    <h4 className="text-2xl font-black" style={{ color: "#f0ece4" }}>{ev.name}</h4>
                    <div className="text-[10px] uppercase tracking-[0.28em] mt-1" style={{ color: ev.accent[0] }}>{ev.tag}</div>
                    <p className="mt-3 text-xs leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>{ev.body}</p>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] mb-2 mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {ev.dates[0]}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {ev.cities.slice(0, 3).map(c => (
                          <span key={c} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>{c}</span>
                        ))}
                      </div>
                      <button className="text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1" style={{ color: ev.accent[0] }}>
                        Enter <ArrowRight size={9} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ─── 2026 CALENDAR ────────────────────────────────────────────────────────────
function FullCalendar() {
  const [expandedMonth, setExpandedMonth] = useState<string | null>("APRIL 2026");
  const months = Object.keys(CALENDAR_2026);

  return (
    <section id="calendar" className="py-28 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel eyebrow="Full Calendar" headline={<>2026 Event<br />Calendar</>}
          sub="Every date. Every city. Every event. The complete HUGLIFE 2026 season — April through December." center />

        <div className="mt-16 flex flex-col gap-3">
          {months.map((month) => {
            const events = CALENDAR_2026[month];
            const isExpanded = expandedMonth === month;
            return (
              <div key={month} className="rounded-[1.25rem] overflow-hidden transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${isExpanded ? GOLD.mid + "30" : "rgba(255,255,255,0.06)"}` }}>
                <button onClick={() => setExpandedMonth(isExpanded ? null : month)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
                  <div className="flex items-center gap-4">
                    <CalendarIcon size={16} />
                    <span className="text-base font-black tracking-wide">{month}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold" style={{ background: `${GOLD.mid}15`, color: GOLD.mid }}>
                      {events.length} {events.length === 1 ? "EVENT" : "EVENTS"}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)", transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease", display: "inline-block", fontSize: "18px" }}>▾</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 flex flex-col gap-2">
                    {events.map((ev, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center" style={{ minWidth: "52px" }}>
                            <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{ev.day}</span>
                            <span className="text-lg font-black tabular-nums" style={{ color: ev.color }}>{ev.date.split(" ")[1]}</span>
                          </div>
                          <div>
                            <div className="font-bold text-sm" style={{ color: "#f0ece4" }}>{ev.event}</div>
                            {ev.subtitle && <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{ev.subtitle}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>{ev.city}</span>
                          {ev.ticketUrl ? (
                            <a href={ev.ticketUrl} target="_blank" rel="noopener noreferrer"
                              className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider no-underline"
                              style={{ background: `linear-gradient(135deg, ${ev.color}, ${ev.color}cc)`, color: "#000" }}>
                              TICKETS
                            </a>
                          ) : (
                            <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }}>
                              SOON
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
        <SectionLabel eyebrow="City Rollout" headline="Built to Move From City to City"
          sub="HUGLIFE develops event experiences designed to live, evolve, and scale across markets with the right venues, talent, partnerships, and cultural timing." />

        <div className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-6">
          <div className="space-y-2">
            {CITIES.map((c, i) => (
              <button key={c.city} onClick={() => setSelected(i)}
                className="w-full text-left rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: selected === i ? `linear-gradient(135deg, ${GOLD.mid}15, ${GOLD.deep}08)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected === i ? GOLD.mid + "30" : "rgba(255,255,255,0.07)"}`,
                }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-base" style={{ color: selected === i ? "#f0ece4" : "rgba(255,255,255,0.65)" }}>{c.city}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: selected === i ? GOLD.mid : "rgba(255,255,255,0.3)" }}>{c.note}</div>
                  </div>
                  <StatusPill label={c.status} />
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] p-8 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #0e0c12, #181420)", border: `1px solid ${BG.border}`, minHeight: "400px" }}>
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
                    <span key={ev} className="rounded-full px-4 py-1.5 text-[11px] font-semibold" style={{ background: `${GOLD.mid}12`, color: GOLD.light, border: `1px solid ${GOLD.mid}25` }}>{ev}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <a href="#calendar" className="rounded-full px-6 py-2.5 text-sm font-semibold no-underline" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>View Calendar</a>
                <a href="#tickets" className="rounded-full px-6 py-2.5 text-sm font-semibold no-underline" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>Get Tickets</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── EVENTBRITE TICKETS ───────────────────────────────────────────────────────
function EventbriteTickets() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <section id="tickets" className="py-28 px-6 lg:px-12" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionLabel eyebrow="HUGLIFE × ICONIC PRESENTS" headline={<>2026 Tickets</>}
          sub="Every event. Every city. All tickets powered by Eventbrite." center />

        <div className="mt-12 flex flex-col gap-3">
          {TICKET_BRANDS.map((brand) => (
            <div key={brand.brand} className="rounded-[1.25rem] overflow-hidden transition-all duration-500"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${activeSection === brand.brand ? brand.color + "40" : "rgba(255,255,255,0.06)"}` }}>
              <button onClick={() => setActiveSection(activeSection === brand.brand ? null : brand.brand)}
                style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", color: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: brand.color, boxShadow: `0 0 12px ${brand.color}60` }} />
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "0.02em" }}>{brand.brand}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{brand.subtitle}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "8px", background: `${brand.color}15`, color: brand.color, fontSize: "10px", fontWeight: 800 }}>
                    {brand.events.length} {brand.events.length === 1 ? "DATE" : "DATES"}
                  </span>
                  <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.3)", transform: activeSection === brand.brand ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease", display: "inline-block" }}>▾</span>
                </div>
              </button>

              {activeSection === brand.brand && (
                <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {brand.events.map((ev) => (
                    <a key={ev.month} href={ev.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 18px", borderRadius: "12px",
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                        textDecoration: "none", color: "inherit", transition: "all 0.25s ease",
                      }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: brand.color, opacity: 0.6 }} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{ev.month}</span>
                      </div>
                      <div style={{
                        padding: "6px 14px", borderRadius: "8px",
                        background: `linear-gradient(135deg, ${brand.color}, ${brand.color}cc)`,
                        color: ["#1a1a1a", "#335A42", "#6B2F8A"].includes(brand.color) ? "#fff" : "#000",
                        fontSize: "10px", fontWeight: 800, letterSpacing: "0.06em",
                      }}>GET TICKETS</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>All tickets powered by Eventbrite · Secure checkout</p>
        </div>
      </div>
    </section>
  );
}


// ─── AUDIENCE PATHWAYS ────────────────────────────────────────────────────────
function AudiencePathways() {
  return (
    <section id="access" className="py-28 px-6 lg:px-12" style={{ background: "#07070a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel eyebrow="Entry Points" headline="Find Your Place in the World of HUGLIFE"
          sub="Whether you are coming to experience it, build with it, work it, promote it, or partner around it — HUGLIFE has a path for you." center />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PATHS.map((p) => {
            const Icon = p.Icon;
            return (
              <div key={p.title} className="rounded-2xl p-6 relative overflow-hidden cursor-pointer group transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 50% 0%, ${GOLD.mid}10, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${GOLD.mid}15`, border: `1px solid ${GOLD.mid}25` }}>
                    <Icon size={18} />
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
          <SectionLabel eyebrow="Operating System" headline="The System Behind the Scene"
            sub="HUGLIFE is built to concept, launch, staff, market, monetize, and amplify live experiences across multiple cities and audiences." />
          <div className="mt-8 flex flex-col gap-3">
            {["15+ Event Properties", "8 City Markets Active", "Full Talent Network", "45+ Events in 2026"].map(s => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD.mid }} />
                <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.45)" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => (
            <div key={m.n} className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-[10px] uppercase tracking-[0.38em] mb-3 font-semibold" style={{ color: GOLD.deep }}>{m.n}</div>
              <h5 className="font-black text-sm mb-2" style={{ color: "#f0ece4" }}>{m.title}</h5>
              <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.42)" }}>{m.body}</p>
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
    <section className="py-32 px-6 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #07070a 0%, #0a0810 50%, #07070a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, ${GOLD.mid}15, transparent 65%)` }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.45em] mb-8" style={{ color: GOLD.mid }}>Access · Culture · Moments</div>
        <h2 className="text-5xl font-black tracking-[-0.04em] leading-[1.05] md:text-6xl" style={{ color: "#f0ece4" }}>
          Not Every Event Deserves Your Presence.
          <span className="block mt-2" style={{ backgroundImage: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.mid}, ${GOLD.deep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Ours Do.
          </span>
        </h2>
        <p className="mt-6 text-base leading-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          Get access, join the network, or build unforgettable experiences with HUGLIFE.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#tickets" className="rounded-full px-9 py-3.5 text-sm font-semibold no-underline" style={{ background: `linear-gradient(135deg, ${GOLD.mid}, ${GOLD.deep})`, color: "#0a0a0c" }}>Get Tickets</a>
          <a href="#access" className="rounded-full px-8 py-3.5 text-sm font-semibold no-underline" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>Join the Talent Network</a>
          <a href="#access" className="rounded-full px-8 py-3.5 text-sm font-semibold no-underline" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: `1px solid ${BG.border}` }}>Partner With HUGLIFE</a>
        </div>
      </div>
    </section>
  );
}


// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { label: "Events", links: ["NOIR", "Taste of Art", "REMIX", "Gangsta Gospel", "WRST BHVR", "CRVNGS", "Stella", "Paparazzi", "Pawchella", "Forever Futbol"] },
    { label: "Cities", links: ["Atlanta", "Houston", "Los Angeles", "DC", "Charlotte", "Miami", "Phoenix", "New York"] },
    { label: "Access", links: ["Get Tickets", "VIP Tables", "Early Access", "RSVP", "Bottle Service"] },
    { label: "Connect", links: ["Talent Network", "Sponsors", "Venues", "Promoters", "Contact"] },
  ];

  return (
    <footer className="px-6 lg:px-12 pb-12 pt-20" style={{ background: "#06060a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)] mb-16">
          <div>
            <div className="text-[9px] uppercase tracking-[0.38em] mb-1" style={{ color: GOLD.mid }}>Multi-City Event IP</div>
            <div className="text-2xl font-black text-white mb-4">HUGLIFE</div>
            <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.38)" }}>
              Premium nightlife, brunch, art, music, food, and social experiences across 8+ cities. 2026 season live now.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.label}>
              <div className="text-[10px] uppercase tracking-[0.35em] mb-5 font-semibold" style={{ color: GOLD.mid }}>{col.label}</div>
              <ul className="space-y-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm no-underline" style={{ color: "rgba(255,255,255,0.38)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 HUGLIFE Events. A Kollective Hospitality Group Enterprise Property. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-[11px] no-underline" style={{ color: "rgba(255,255,255,0.28)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function HUGLIFEFlagshipV3() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#07070a" }}>
      <Nav />
      <Hero />
      <EventUniverse />
      <FullCalendar />
      <CityTakeover />
      <EventbriteTickets />
      <AudiencePathways />
      <OperatingEngine />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
