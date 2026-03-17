"use client";
import { useState, useEffect, useRef } from "react";

// ─── HUGLIFE BRAND PALETTE ───────────────────────────────────────────────────
// #0D0D10 base, #F2EBDD cream, #D947A8 pink, #D9B44A gold, #2D2F36 dark
const C={
  base:"#0D0D10",dark:"#08080B",surface:"#14141A",surface2:"#1A1A22",
  cream:"#F2EBDD",pink:"#D947A8",pinkGlow:"rgba(217,71,168,0.12)",
  gold:"#D9B44A",goldGlow:"rgba(217,180,74,0.10)",
  slate:"#2D2F36",muted:"#8A8690",dim:"rgba(242,235,221,0.12)",
  border:"rgba(242,235,221,0.06)"
};
const F={serif:"'Playfair Display',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"};
function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}
function Reveal({children,d=0}:{children:React.ReactNode;d?:number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(32px)",opacity:v?1:0,transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}
const Grain=({o=0.03}:{o?:number})=>(<div style={{position:"absolute",inset:0,opacity:o,pointerEvents:"none",zIndex:1,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>);

function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);return(
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:s?"12px clamp(24px,4vw,56px)":"22px clamp(24px,4vw,56px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?`${C.base}f2`:"transparent",backdropFilter:s?"blur(24px)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
<img src="/images/huglife-logo.png" alt="HugLife" style={{height:"32px",width:"auto",filter:"invert(1)"}}/>
<div style={{display:"flex",gap:"clamp(14px,2.5vw,32px)",alignItems:"center"}}>
{["Events","Calendar","About"].map(n=>(<a key={n} href={`#${n.toLowerCase()}`} style={{fontFamily:F.sans,fontSize:"9px",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.cream} onMouseLeave={e=>(e.target as HTMLElement).style.color=C.muted}>{n}</a>))}
<button style={{fontFamily:F.sans,fontSize:"9px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.base,background:`linear-gradient(135deg,${C.pink},${C.gold})`,border:"none",padding:"9px 22px",cursor:"pointer"}}>Tickets</button></div></nav>)}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero(){const[loaded,setLoaded]=useState(false);useEffect(()=>{setTimeout(()=>setLoaded(true),200)},[]);return(
<section style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.dark} 0%,${C.base} 40%,${C.surface} 100%)`,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",padding:"120px clamp(32px,6vw,80px) 80px"}}>
<Grain o={0.04}/>
{/* Animated pink + gold glow orbs */}
<div style={{position:"absolute",top:"-10%",right:"-8%",width:"55vw",height:"55vw",borderRadius:"50%",background:`radial-gradient(circle,${C.pinkGlow},transparent 60%)`,animation:"hugfloat 8s ease-in-out infinite",pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:"-15%",left:"-5%",width:"50vw",height:"50vw",borderRadius:"50%",background:`radial-gradient(circle,${C.goldGlow},transparent 60%)`,animation:"hugfloat 11s ease-in-out infinite reverse",pointerEvents:"none"}}/>
<style>{`@keyframes hugfloat{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-18px)}}`}</style>

<div style={{position:"relative",zIndex:2,maxWidth:"1400px",margin:"0 auto",width:"100%"}}>
<div style={{maxWidth:"700px"}}>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.pink,opacity:loaded?1:0,transition:"opacity 0.8s ease 0.2s",marginBottom:"20px",display:"flex",alignItems:"center",gap:"12px"}}><span style={{width:"32px",height:"1px",background:`linear-gradient(90deg,${C.pink},${C.gold})`}}/>Atlanta · Houston · LA · DC</div>
<h1 style={{fontFamily:F.serif,fontSize:"clamp(52px,10vw,140px)",fontWeight:400,lineHeight:0.88,letterSpacing:"-0.03em",color:C.cream,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s"}}><em style={{color:C.pink}}>Hug</em>Life</h1>
<p style={{fontFamily:F.sans,fontSize:"clamp(14px,1.2vw,17px)",lineHeight:1.8,color:C.muted,maxWidth:"500px",marginTop:"28px",opacity:loaded?1:0,transition:"opacity 0.8s ease 0.8s"}}>15+ event brands. 45+ events in 2026. Music, art, food, culture, fashion — curated experiences that connect communities across America.</p>
<div style={{display:"flex",gap:"14px",marginTop:"36px",opacity:loaded?1:0,transition:"opacity 0.8s ease 1s",flexWrap:"wrap"}}>
<a href="#calendar" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.base,background:`linear-gradient(135deg,${C.pink},${C.gold})`,border:"none",padding:"14px 36px",cursor:"pointer",textDecoration:"none",display:"inline-block"}}>View Calendar</a>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.dim}`,padding:"14px 30px",cursor:"pointer"}}>Get Tickets</button></div>
<div style={{display:"flex",gap:"28px",marginTop:"48px",opacity:loaded?1:0,transition:"opacity 0.8s ease 1.2s"}}>
{[{v:"15+",l:"Event Brands"},{v:"45+",l:"Events in 2026"},{v:"8",l:"Cities"},{v:"50K+",l:"Attendees"}].map(s=>(<div key={s.l}><div style={{fontFamily:F.serif,fontSize:"clamp(24px,2.5vw,36px)",fontWeight:400,fontStyle:"italic",color:C.gold}}>{s.v}</div><div style={{fontFamily:F.sans,fontSize:"8px",letterSpacing:"0.3em",textTransform:"uppercase",color:C.muted,marginTop:"4px"}}>{s.l}</div></div>))}</div>
</div></div></section>)}

// ─── EVENT BRANDS ────────────────────────────────────────────────────────────
const EVENT_BRANDS=[
{name:"NOIR",type:"Semi-Formal",accent:"#D2B98B",bg:"#0B0A0C",desc:"Exclusive all-black dress code. Elegance meets nightlife."},
{name:"REMIX",type:"Mashup Session",accent:"#B6E03E",bg:"#0D0E12",desc:"Genre-bending music mashups. No rules, just vibes."},
{name:"WRST BHVR",type:"Napkin Wars",accent:"#BB2C35",bg:"#111216",desc:"Food fights meet fine dining. ATL + DC."},
{name:"Taste of Art",type:"Art Show",accent:"#A75C43",bg:"#111114",desc:"Live art, culture, and the creative underground."},
{name:"Gangsta Gospel",type:"Mashup Session",accent:"#3C5B8A",bg:"#101114",desc:"Where sacred meets street. Father's Day tradition."},
{name:"CRVNGS",type:"Food Festival",accent:"#C85A1A",bg:"#1A1210",desc:"Culinary exhibition. Food truck editions. Pure flavor."},
{name:"Stella",type:"RnB Concert",accent:"#D947A8",bg:"#14101A",desc:"RnB nights that bring the soul back. Live vocals."},
{name:"Underground King",type:"Indie Concert",accent:"#6D4AE0",bg:"#10101A",desc:"Underground music. Raw talent. No filter."},
{name:"The Kulture",type:"Streetwear Market",accent:"#D9B44A",bg:"#141210",desc:"Fashion, streetwear, and urban culture marketplace."},
{name:"Forever Futbol",type:"Soccer Museum",accent:"#C6A65B",bg:"#0E1014",desc:"World Cup immersive experience. ATL · DC · LAX."},
];

function EventBrands(){return(
<section id="events" style={{background:C.base,padding:"120px clamp(32px,6vw,80px)"}}><div style={{maxWidth:"1400px",margin:"0 auto"}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.pink,marginBottom:"16px"}}>Event Brands</div><h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,68px)",fontWeight:400,fontStyle:"italic",lineHeight:0.95,color:C.cream}}>The Universe</h2></Reveal>
<div style={{marginTop:"48px",display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px"}}>
{EVENT_BRANDS.map(b=>(<div key={b.name} style={{background:b.bg,padding:"24px 16px",position:"relative",overflow:"hidden",borderTop:`2px solid ${b.accent}`}}>
<div style={{position:"absolute",top:0,right:0,width:"50%",height:"50%",background:`radial-gradient(circle at 100% 0%,${b.accent}12,transparent 70%)`,pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:1}}>
{/* Logo placeholder — brand initial */}
<div style={{width:"48px",height:"48px",borderRadius:"50%",background:`${b.accent}15`,border:`1px solid ${b.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"14px"}}><span style={{fontFamily:F.serif,fontSize:"20px",fontWeight:400,fontStyle:"italic",color:b.accent}}>{b.name[0]}</span></div>
<div style={{fontFamily:F.sans,fontSize:"7px",fontWeight:600,letterSpacing:"0.38em",textTransform:"uppercase",color:b.accent,marginBottom:"4px"}}>{b.type}</div>
<div style={{fontFamily:F.serif,fontSize:"16px",fontWeight:400,fontStyle:"italic",color:C.cream,marginBottom:"6px"}}>{b.name}</div>
<p style={{fontFamily:F.sans,fontSize:"10px",lineHeight:1.6,color:C.muted}}>{b.desc}</p></div></div>))}</div></div></section>)}

// ─── 2026 CALENDAR — DOPE INTERACTIVE DISPLAY ────────────────────────────────
const CALENDAR_2026=[
{month:"April",events:[{day:"Sat 11",name:"REMIX",color:"#B6E03E"},{day:"Sat 18",name:"TASTE OF ART + KULTURE",color:"#A75C43"},{day:"Sat 25",name:"WRST BHVR (ATL)",color:"#BB2C35"}]},
{month:"May",events:[{day:"Sat 2",name:"REMIX",color:"#B6E03E"},{day:"Tue 5",name:"CINCO DE MAYO BLOCK PARTY",color:"#C85A1A"},{day:"Sun 10",name:"STELLA RNB CONCERT",color:"#D947A8"},{day:"Sun 17",name:"NOIR",color:"#D2B98B"},{day:"Sun 24",name:"MEMORIAL DAY BLOCK PARTY",color:"#D9B44A"},{day:"Sat 30",name:"WRST BHVR (ATL)",color:"#BB2C35"}]},
{month:"June",events:[{day:"Fri 5",name:"FOREVER FUTBOL OPENS",color:"#C6A65B"},{day:"Fri 12",name:"UNDERGROUND KING",color:"#6D4AE0"},{day:"Sat 13",name:"REMIX",color:"#B6E03E"},{day:"Sun 14",name:"CRVNGS FOOD SERIES",color:"#C85A1A"},{day:"Fri 19",name:"JUNETEENTH BLOCK PARTY",color:"#D9B44A"},{day:"Sat 20",name:"TASTE OF ART + KULTURE",color:"#A75C43"},{day:"Sun 21",name:"GANGSTA GOSPEL",color:"#3C5B8A"},{day:"Sat 27",name:"WRST BHVR (DC)",color:"#BB2C35"}]},
{month:"July",events:[{day:"Sat 4",name:"4TH OF JULY CAR SHOW",color:"#D9B44A"},{day:"Sun 5",name:"CRVNGS FOOD TRUCK",color:"#C85A1A"},{day:"Sat 11",name:"REMIX",color:"#B6E03E"},{day:"Fri 17",name:"BLOCK PARTY",color:"#D947A8"},{day:"Sun 19",name:"NOIR",color:"#D2B98B"},{day:"Sat 25",name:"WRST BHVR (ATL)",color:"#BB2C35"}]},
{month:"August",events:[{day:"Sat 8",name:"BACK TO SCHOOL DRIVE",color:"#D9B44A"},{day:"Sun 9",name:"STELLA RNB CONCERT",color:"#D947A8"},{day:"Sat 15",name:"REMIX",color:"#B6E03E"},{day:"Sun 16",name:"CRVNGS FOOD SERIES",color:"#C85A1A"},{day:"Sat 22",name:"TASTE OF ART + KULTURE",color:"#A75C43"},{day:"Sat 29",name:"WRST BHVR (DC)",color:"#BB2C35"}]},
{month:"September",events:[{day:"Sat 5",name:"REMIX",color:"#B6E03E"},{day:"Sun 6",name:"NOIR",color:"#D2B98B"},{day:"Mon 7",name:"LABOR DAY FOOD TRUCK",color:"#C85A1A"},{day:"Sat 12",name:"BEAUTY & THE BEAST",color:"#D947A8"},{day:"Sun 13",name:"GANGSTA GOSPEL",color:"#3C5B8A"},{day:"Fri 18",name:"UNDERGROUND KING",color:"#6D4AE0"},{day:"Sat 19",name:"STELLA RNB CONCERT",color:"#D947A8"},{day:"Sat 26",name:"WRST BHVR (ATL)",color:"#BB2C35"},{day:"Sun 27",name:"CRVNGS FOOD SERIES",color:"#C85A1A"}]},
{month:"October",events:[{day:"Sun 18",name:"CRVNGS FOOD SERIES",color:"#C85A1A"},{day:"Sat 31",name:"MONSTER'S BALL",color:"#6D4AE0"}]},
{month:"November",events:[{day:"Sun 15",name:"NOIR",color:"#D2B98B"},{day:"Sat 21",name:"BLACK BALL",color:"#2D2F36"}]},
{month:"December",events:[{day:"Dec 4-6",name:"TASTE OF ART (ART BASEL)",color:"#A75C43"},{day:"Sat 12",name:"SNOW BALL",color:"#B7BCC5"}]},
];

function Calendar(){const[activeMonth,setActiveMonth]=useState(0);const m=CALENDAR_2026[activeMonth];return(
<section id="calendar" style={{background:`linear-gradient(180deg,${C.surface} 0%,${C.base} 100%)`,padding:"120px clamp(32px,6vw,80px)",position:"relative",overflow:"hidden"}}><Grain o={0.025}/>
<div style={{maxWidth:"1400px",margin:"0 auto"}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.pink,marginBottom:"16px"}}>2026 Season</div><h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,68px)",fontWeight:400,fontStyle:"italic",lineHeight:0.95,color:C.cream,marginBottom:"48px"}}>The Calendar</h2></Reveal>

{/* Month tabs — horizontal scroll */}
<div style={{display:"flex",gap:"0",marginBottom:"32px",borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
{CALENDAR_2026.map((mo,i)=>(<button key={mo.month} onClick={()=>setActiveMonth(i)} style={{fontFamily:F.sans,fontSize:"11px",fontWeight:activeMonth===i?700:400,letterSpacing:"0.1em",textTransform:"uppercase",color:activeMonth===i?C.pink:C.muted,background:"none",border:"none",borderBottom:activeMonth===i?`2px solid ${C.pink}`:"2px solid transparent",padding:"12px 20px",cursor:"pointer",transition:"all 0.3s",whiteSpace:"nowrap"}}>{mo.month}</button>))}</div>

{/* Event list for active month */}
<div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
{m.events.map((ev,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"100px 1fr 40px",gap:"16px",padding:"18px 20px",background:C.dark,alignItems:"center",borderLeft:`3px solid ${ev.color}`,transition:"background 0.3s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surface2} onMouseLeave={e=>e.currentTarget.style.background=C.dark}>
<div style={{fontFamily:F.sans,fontSize:"12px",fontWeight:600,color:C.cream,letterSpacing:"0.02em"}}>{ev.day}</div>
<div style={{fontFamily:F.serif,fontSize:"18px",fontWeight:400,fontStyle:"italic",color:C.cream}}>{ev.name}</div>
<div style={{width:"10px",height:"10px",borderRadius:"50%",background:ev.color,justifySelf:"end"}}/>
</div>))}</div>

{/* Event count badge */}
<div style={{marginTop:"20px",fontFamily:F.sans,fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted}}>{m.events.length} events in {m.month} · <span style={{color:C.gold}}>{CALENDAR_2026.reduce((a,b)=>a+b.events.length,0)} total in 2026</span></div>
</div></section>)}

// ─── "THIS IS WHAT IT FEELS LIKE" — lifestyle from Pronto + Infinity ─────────
function FeelsLike(){const images=[{src:"/images/lifestyle-festival.png",label:"Festival Energy"},{src:"/images/lifestyle-club.png",label:"After Dark"},{src:"/images/lifestyle-concert.png",label:"Main Stage"},{src:"/images/lifestyle-stadium.png",label:"Game Day"},{src:"/images/lifestyle-boat.png",label:"Golden Hour"},{src:"/images/lifestyle-beach.png",label:"Coastline"}];return(
<section style={{background:C.dark,padding:"120px 0",position:"relative",overflow:"hidden"}}><Grain o={0.03}/>
<div style={{padding:"0 clamp(32px,6vw,80px)",maxWidth:"1400px",margin:"0 auto 48px"}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.pink,marginBottom:"16px"}}>The Experience</div><h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,6vw,80px)",fontWeight:400,fontStyle:"italic",lineHeight:0.95,color:C.cream}}>This Is What<br/><span style={{color:C.gold}}>It Feels Like.</span></h2></Reveal></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px",padding:"0 3px"}}>
{images.map((img,i)=>(<div key={i} style={{position:"relative",overflow:"hidden",aspectRatio:i===0||i===3?"16/10":"3/4"}}><img src={img.src} alt={img.label} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 20px 16px",background:"linear-gradient(transparent,rgba(0,0,0,0.75))"}}><div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:C.pink}}>{img.label}</div></div></div>))}</div></section>)}

// ─── CTA ─────────────────────────────────────────────────────────────────────

// ─── ALL EVENTBRITE TICKET DATA ───────────────────────────────────────────────
const ALL_EVENTS = [
  // ── HAPPENING SOON ──
  { name:"TASTE OF ART",      date:"Apr 18",  month:"Apr", url:"https://www.eventbrite.com/e/taste-of-art-tickets-1982512459133",      color:"#A75C43", tag:"Art & Culture",     city:"Atlanta" },
  { name:"PAPARAZZI",         date:"May 1",   month:"May", url:"https://www.eventbrite.com/e/paparazzi-tickets-1983361435444",         color:"#BEC3CB", tag:"Nightlife",         city:"Atlanta" },
  { name:"NO SECTIONS PARTY", date:"May 1",   month:"May", url:"https://www.eventbrite.com/e/shut-up-dance-tickets-1982516283572",     color:"#D947A8", tag:"Dance Night",       city:"Atlanta" },
  { name:"NOIR",              date:"May 17",  month:"May", url:"https://www.eventbrite.com/e/espresso-tickets-1982507090074",          color:"#D2B98B", tag:"Upscale Night",     city:"Atlanta" },
  { name:"NAPKIN WARS",       date:"May 30",  month:"May", url:"https://www.eventbrite.com/e/napkin-wars-tickets-1983443338418",       color:"#BB2C35", tag:"WRST BHVR",         city:"Atlanta" },
  { name:"PAPARAZZI",         date:"Jun 1",   month:"Jun", url:"https://www.eventbrite.com/e/paparazzi-tickets-1983361684188",         color:"#BEC3CB", tag:"Nightlife",         city:"Atlanta" },
  { name:"FOREVER FUTBOL",    date:"Jun 5",   month:"Jun", url:"https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046",   color:"#C6A65B", tag:"Museum Opening",    city:"Atlanta" },
  { name:"FOREVER FUTBOL",    date:"Jun 15",  month:"Jun", url:"https://www.eventbrite.com/e/forever-futbol-tickets-1983442556078",   color:"#C6A65B", tag:"Museum",            city:"Washington DC" },
  { name:"TASTE OF ART",      date:"Jun 20",  month:"Jun", url:"https://www.eventbrite.com/e/taste-of-art-tickets-1982513123119",      color:"#A75C43", tag:"Art & Culture",     city:"Atlanta" },
  { name:"GANGSTA GOSPEL",    date:"Jun 21",  month:"Jun", url:"https://www.eventbrite.com/e/gangsta-gospel-tickets-1983357015223",   color:"#3C5B8A", tag:"Gospel Hip-Hop",    city:"Atlanta" },
  { name:"FOREVER FUTBOL",    date:"Jun 25",  month:"Jun", url:"https://www.eventbrite.com/e/forever-futbol-tickets-1983442708534",   color:"#C6A65B", tag:"Museum",            city:"Los Angeles" },
  { name:"PAPARAZZI",         date:"Jul 1",   month:"Jul", url:"https://www.eventbrite.com/e/paparazzi-tickets-1983430772834",         color:"#BEC3CB", tag:"Nightlife",         city:"Atlanta" },
  { name:"SUNDAY'S BEST",     date:"Jul 1",   month:"Jul", url:"https://www.eventbrite.com/e/sundays-best-tickets-1983552321389",      color:"#D8BA7C", tag:"R&B Brunch",        city:"Atlanta" },
  { name:"REMIX",             date:"Jul 11",  month:"Jul", url:"https://www.eventbrite.com/e/remix-tickets-1983356687242",            color:"#B6E03E", tag:"DJ Night",          city:"Atlanta" },
  { name:"NOIR",              date:"Jul 19",  month:"Jul", url:"https://www.eventbrite.com/e/espresso-tickets-1982510403986",          color:"#D2B98B", tag:"Upscale Night",     city:"Atlanta" },
  { name:"NAPKIN WARS",       date:"Jul 25",  month:"Jul", url:"https://www.eventbrite.com/e/napkin-wars-tickets-1983443502910",       color:"#BB2C35", tag:"WRST BHVR",         city:"Atlanta" },
  { name:"PAPARAZZI",         date:"Aug 1",   month:"Aug", url:"https://www.eventbrite.com/e/paparazzi-tickets-1983432236211",         color:"#BEC3CB", tag:"Nightlife",         city:"Atlanta" },
  { name:"PAWCHELLA",         date:"Aug 8",   month:"Aug", url:"https://www.eventbrite.com/e/pawchella-summer-tickets-1983440350481", color:"#FF9500", tag:"Pet Festival",       city:"Atlanta" },
  { name:"TASTE OF ART",      date:"Aug 22",  month:"Aug", url:"https://www.eventbrite.com/e/taste-of-art-tickets-1982514621601",      color:"#A75C43", tag:"Art & Culture",     city:"Atlanta" },
  { name:"PAPARAZZI",         date:"Sep 1",   month:"Sep", url:"https://www.eventbrite.com/e/paparazzi-tickets-1983432751753",         color:"#BEC3CB", tag:"Nightlife",         city:"Atlanta" },
  { name:"NO SECTIONS PARTY", date:"Sep 4",   month:"Sep", url:"https://www.eventbrite.com/e/shut-up-dance-tickets-1982517496199",    color:"#D947A8", tag:"Dance Night",       city:"Atlanta" },
  { name:"NOIR",              date:"Sep 6",   month:"Sep", url:"https://www.eventbrite.com/e/espresso-tickets-1982511951615",          color:"#D2B98B", tag:"Upscale Night",     city:"Atlanta" },
  { name:"BEAUTY & THE BEAST",date:"Sep 12",  month:"Sep", url:"https://www.eventbrite.com/e/beauty-the-beast-tickets-1983359980091", color:"#D947A8", tag:"Themed Party",      city:"Atlanta" },
  { name:"GANGSTA GOSPEL",    date:"Sep 13",  month:"Sep", url:"https://www.eventbrite.com/e/gangsta-gospel-tickets-1983358448510",   color:"#3C5B8A", tag:"Gospel Hip-Hop",    city:"Atlanta" },
];

const MONTHS = ["All","Apr","May","Jun","Jul","Aug","Sep"];

function Tickets(){
  const [activeMonth, setActiveMonth] = useState("All");
  const filtered = activeMonth === "All" ? ALL_EVENTS : ALL_EVENTS.filter(e => e.month === activeMonth);

  return (
    <section id="tickets" style={{background:C.dark,padding:"100px clamp(32px,6vw,80px)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 50%, ${C.pinkGlow} 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, ${C.goldGlow} 0%, transparent 50%)`}}/>
      <Grain o={0.03}/>
      <div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:2}}>

        {/* Header */}
        <Reveal>
          <div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.pink,marginBottom:"16px"}}>
            2026 Event Calendar
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"24px",marginBottom:"48px"}}>
            <h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5.5vw,76px)",fontWeight:400,fontStyle:"italic",lineHeight:0.9,color:C.cream}}>
              Get Your<br/><span style={{color:C.pink}}>Tickets.</span>
            </h2>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#4ADE80",boxShadow:"0 0 8px #4ADE80",animation:"hl_pulse 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:F.sans,fontSize:"11px",fontWeight:600,color:"#4ADE80",letterSpacing:"0.1em"}}>On Sale Now</span>
            </div>
          </div>
        </Reveal>

        {/* Month filter */}
        <div style={{display:"flex",gap:"0",marginBottom:"32px",borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
          {MONTHS.map(m=>(
            <button key={m} onClick={()=>setActiveMonth(m)} style={{
              fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",
              textTransform:"uppercase",color:activeMonth===m?C.cream:C.muted,
              background:"transparent",border:"none",padding:"14px 24px",cursor:"pointer",
              borderBottom:activeMonth===m?`2px solid ${C.pink}`:"2px solid transparent",
              transition:"all 0.3s",whiteSpace:"nowrap",flexShrink:0,
            }}>
              {m}
            </button>
          ))}
        </div>

        {/* Event grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"2px",background:C.border}}>
          {filtered.map((event, i) => (
            <a key={`${event.name}-${event.date}-${i}`} href={event.url} target="_blank" rel="noopener noreferrer"
              style={{textDecoration:"none",display:"block"}}>
              <div style={{
                background:C.surface,padding:"28px 24px",
                display:"flex",flexDirection:"column",gap:"10px",
                transition:"background 0.25s",cursor:"pointer",
                borderTop:`2px solid ${event.color}20`,
                position:"relative",overflow:"hidden",
              }}
                onMouseEnter={e=>{
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = `${event.color}12`;
                  el.style.borderTopColor = event.color;
                }}
                onMouseLeave={e=>{
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "";
                  el.style.borderTopColor = `${event.color}20`;
                }}
              >
                {/* Date badge */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{
                    fontFamily:F.sans,fontSize:"11px",fontWeight:700,
                    color:event.color,letterSpacing:"0.05em",
                  }}>
                    {event.date}
                  </div>
                  <div style={{
                    fontFamily:F.sans,fontSize:"8px",fontWeight:600,
                    letterSpacing:"0.2em",textTransform:"uppercase",
                    color:"rgba(242,235,221,0.35)",
                    background:"rgba(242,235,221,0.05)",
                    padding:"4px 8px",
                  }}>
                    {event.city}
                  </div>
                </div>

                {/* Event name */}
                <div style={{fontFamily:F.serif,fontSize:"clamp(17px,1.8vw,22px)",fontStyle:"italic",color:C.cream,lineHeight:1.1}}>
                  {event.name}
                </div>

                {/* Tag */}
                <div style={{fontFamily:F.sans,fontSize:"10px",color:"rgba(242,235,221,0.4)",letterSpacing:"0.1em"}}>
                  {event.tag}
                </div>

                {/* CTA arrow */}
                <div style={{
                  fontFamily:F.sans,fontSize:"9px",fontWeight:700,
                  letterSpacing:"0.2em",textTransform:"uppercase",
                  color:event.color,marginTop:"4px",
                  display:"flex",alignItems:"center",gap:"6px",
                }}>
                  Buy Tickets <span style={{fontSize:"14px"}}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div style={{marginTop:"3px",background:C.surface,padding:"28px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"20px"}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.pink,marginBottom:"6px"}}>Groups · Schools · Corporate</div>
            <div style={{fontFamily:F.serif,fontSize:"18px",fontStyle:"italic",color:C.cream}}>Need 10+ tickets?</div>
          </div>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Group Ticket Inquiry" style={{
              fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
              color:C.dark,background:C.pink,padding:"13px 32px",textDecoration:"none",display:"inline-block",
            }}>Book a Group</a>
            <a href="mailto:thekollectiveworldwide@gmail.com?subject=Corporate Event Inquiry" style={{
              fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",
              color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"13px 28px",
              textDecoration:"none",display:"inline-block",
            }}>Corporate Events</a>
          </div>
        </div>

        {/* Trust */}
        <div style={{marginTop:"24px",display:"flex",gap:"28px",justifyContent:"center",flexWrap:"wrap"}}>
          {["Powered by Eventbrite","Secure Checkout","Instant Confirmation","All Ages Unless Noted"].map(s=>(
            <div key={s} style={{fontFamily:F.sans,fontSize:"9px",color:"rgba(242,235,221,0.2)",letterSpacing:"0.15em"}}>{s}</div>
          ))}
        </div>
      </div>
      <style>{`@keyframes hl_pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}

function CTA(){return(<section style={{background:C.dark,padding:"140px clamp(32px,6vw,80px)",position:"relative",overflow:"hidden"}}><Grain o={0.04}/>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 40% 50%,${C.pinkGlow},transparent 55%),radial-gradient(ellipse at 60% 50%,${C.goldGlow},transparent 55%)`}}/>
<div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}><Reveal>
<img src="/images/huglife-logo.png" alt="HugLife" style={{height:"56px",margin:"0 auto 28px",display:"block",filter:"invert(1)",opacity:0.5}}/>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,6vw,80px)",fontWeight:400,fontStyle:"italic",color:C.cream,lineHeight:0.9,marginBottom:"20px"}}>Just<br/><span style={{color:C.pink}}>HugLife.</span></h2>
<p style={{fontFamily:F.sans,fontSize:"15px",lineHeight:1.8,color:C.muted,maxWidth:"440px",margin:"0 auto 40px"}}>The events that connect communities. The experiences that become memories. Join us in 2026.</p>
<a href="#calendar" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.base,background:`linear-gradient(135deg,${C.pink},${C.gold})`,border:"none",padding:"15px 48px",cursor:"pointer",textDecoration:"none",display:"inline-block"}}>View Full Calendar</a></Reveal></div></section>)}

function Footer(){return(<footer style={{background:C.dark,borderTop:`1px solid ${C.border}`,padding:"56px clamp(32px,6vw,80px) 36px"}}><div style={{maxWidth:"1400px",margin:"0 auto"}}><div style={{display:"grid",gridTemplateColumns:"1.5fr repeat(3,1fr)",gap:"40px",marginBottom:"48px"}}><div><img src="/images/huglife-logo.png" alt="HugLife" style={{height:"36px",marginBottom:"14px",filter:"invert(1)"}}/><p style={{fontFamily:F.sans,fontSize:"12px",lineHeight:1.7,color:C.muted}}>Events. Culture. Community. A KHG Enterprise.</p></div>{[{h:"Events",l:["NOIR","REMIX","WRST BHVR","Taste of Art","Gangsta Gospel","CRVNGS","Stella"]},{h:"Company",l:["About HugLife","Tickets","Sponsor","Vendor Inquiry","Press"]},{h:"Connect",l:["@justhuglife","justhuglife.forever@gmail.com","Atlanta, GA"]}].map(col=>(<div key={col.h}><div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:C.pink,marginBottom:"16px"}}>{col.h}</div><ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px"}}>{col.l.map(item=><li key={item} style={{fontFamily:F.sans,fontSize:"12px",color:C.muted}}>{item}</li>)}</ul></div>))}</div><div style={{borderTop:`1px solid ${C.border}`,paddingTop:"20px",fontFamily:F.sans,fontSize:"10px",color:"rgba(242,235,221,0.2)"}}>© 2026 HugLife Events. A KHG Enterprise.</div></div></footer>)}

export default function HugLifeV4(){return(<div style={{background:C.base}}><Nav/><Hero/><EventBrands/><Calendar/><FeelsLike/><Tickets/><CTA/><Footer/></div>)}
