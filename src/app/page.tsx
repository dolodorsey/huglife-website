"use client";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

const C={base:"#07070a",surface:"#0a0810",border:"rgba(255,255,255,0.07)",gold:"#d8b26e",goldLight:"#f2d39b",goldDeep:"#8b6b3d",cream:"#f0ece4",muted:"rgba(255,255,255,0.48)",dim:"rgba(255,255,255,0.22)"};
const F={serif:"'Cormorant Garamond','Playfair Display',Georgia,serif",sans:"'DM Sans','Inter',system-ui,sans-serif"};
function useInView(t=0.1){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(el);return()=>o.disconnect();},[]);return[ref,v];}
function Reveal({children, d = 0, y = 32}: {children: ReactNode; d?: number; y?: number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(32px)",opacity:v?1:0,transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>;}
const Grain=()=>(<div style={{position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>);

function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);return(<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:s?"14px clamp(24px,4vw,64px)":"26px clamp(24px,4vw,64px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?"rgba(7,7,10,0.96)":"transparent",backdropFilter:s?"blur(28px)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}><div><div style={{fontFamily:F.sans,fontSize:"8px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.gold,marginBottom:"3px"}}>The Event Company</div><span style={{fontFamily:F.serif,fontSize:"22px",fontWeight:600,color:C.cream}}>HUGLIFE</span></div><div style={{display:"flex",gap:"clamp(14px,2.5vw,36px)",alignItems:"center"}}>{["Events","Cities","ICONIC","Access"].map(n=>(<a key={n} href="#" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,textDecoration:"none"}}>{n}</a>))}<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"10px 28px",cursor:"pointer"}}>Get Access</button></div></nav>);}

const EVENTS=[{name:"NOIR",type:"Luxury Nightlife",desc:"Curated access. Elevated crowd. City prestige. NOIR is the standard.",accent:C.gold,cities:"ATL · HTX · CLT · MIA · LV · NY"},{name:"Taste of Art",type:"Culinary Experience",desc:"A luxury dining and art experience that redefines the evening out.",accent:"#c9a87a",cities:"ATL · LA · DC"},{name:"REMIX",type:"Music Event",desc:"Premium live music and DJ culture for the intentional crowd.",accent:"#c8c8d8",cities:"ATL · HTX · MIA"},{name:"Sunday's Best",type:"Brunch Experience",desc:"A curated Sunday ritual — elevated brunch with culture and community.",accent:"#e8c97a",cities:"ATL · MIA · LA"},{name:"Gangsta Gospel",type:"Culture Event",desc:"Where faith, culture, and community intersect in an unforgettable experience.",accent:"#b87a5a",cities:"ATL · HTX · DC"},{name:"WRST BHVR",type:"Nightlife Event",desc:"High-energy nightlife for the city's boldest crowd.",accent:"#c8c8c8",cities:"ATL · HTX · CLT · MIA"},{name:"Paparazzi",type:"Social Event",desc:"The see-and-be-seen experience built for the culturally aware.",accent:"#e8e8e8",cities:"ATL · MIA · NY"},{name:"Pawchella",type:"Pet Festival",desc:"The premium outdoor festival experience for the city's most stylish pet owners.",accent:"#c8b87a",cities:"ATL · Austin · CLT"}];

export default function HUGLIFEFlagship(){const[loaded,setLoaded]=useState(false);const[hover,setHover]=useState(null);useEffect(()=>{setTimeout(()=>setLoaded(true),80);},[]);
return(<div style={{background:C.base}}>
<Nav/>
<section style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:`radial-gradient(ellipse at 60% 20%, rgba(216,178,110,0.14) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(80,30,10,0.12) 0%, transparent 55%), ${C.base}`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 clamp(32px,6vw,96px) 96px"}}>
<Grain/>
<div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",backgroundSize:"100px 100px"}}/>
<div style={{position:"absolute",top:"20%",right:"5%",width:"500px",height:"500px",borderRadius:"50%",background:`radial-gradient(circle, rgba(216,178,110,0.12), transparent 70%)`,pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:2,maxWidth:"1400px",margin:"0 auto",width:"100%"}}>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.gold,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.3s",marginBottom:"20px"}}>The Event Company · 8 Cities · 8 Experiences</div>
<h1 style={{fontFamily:F.serif,fontSize:"clamp(60px,11vw,152px)",fontWeight:600,lineHeight:0.87,letterSpacing:"-0.02em",color:C.cream,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s"}}>This Is<br/><em style={{color:`rgba(240,236,228,0.22)`}}>What</em><br/><em style={{backgroundImage:`linear-gradient(135deg,${C.goldLight},${C.gold},${C.goldDeep})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>HUGLIFE.</em></h1>
<p style={{fontFamily:F.sans,fontSize:"clamp(14px,1.2vw,17px)",lineHeight:1.85,color:C.muted,maxWidth:"540px",marginTop:"32px",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.9s"}}>An event company operating 8 distinct experiences across 8 cities. Not every event deserves your presence. Ours do.</p>
<div style={{display:"flex",gap:"16px",marginTop:"48px",opacity:loaded?1:0,transition:"opacity 0.9s ease 1.2s",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"16px 44px",cursor:"pointer"}}>Explore Events</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"16px 38px",cursor:"pointer"}}>Get Access</button>
</div>
<div style={{display:"flex",gap:"32px",marginTop:"64px",opacity:loaded?1:0,transition:"opacity 1s ease 1.4s",flexWrap:"wrap"}}>
{[["8","Event Brands"],["8","Active Cities"],["NOIR","Gold Standard"],["Prestige","Access Level"]].map(([v,l])=>(<div key={l}><div style={{fontFamily:F.serif,fontSize:"clamp(24px,3vw,40px)",fontWeight:600,color:C.gold,fontStyle:"italic"}}>{v}</div><div style={{fontFamily:F.sans,fontSize:"9px",fontWeight:500,letterSpacing:"0.3em",textTransform:"uppercase",color:C.dim,marginTop:"6px"}}>{l}</div></div>))}
</div></div></section>

<section style={{background:C.base,padding:"120px clamp(32px,6vw,96px)"}}>
<div style={{maxWidth:"1400px",margin:"0 auto"}}>
<Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.gold,marginBottom:"16px"}}>Event Universe</div>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,72px)",fontWeight:600,lineHeight:1.0,color:C.cream,marginBottom:"64px"}}>8 Experiences.<br/><em>1 Standard.</em></h2></Reveal>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"2px",background:C.border}}>
{EVENTS.map((ev,i)=>(<div key={ev.name} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{background:hover===i?"#0a0810":C.base,padding:"44px 32px",cursor:"pointer",transition:"background 0.3s",position:"relative",overflow:"hidden"}}>
{hover===i&&<div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 80% 20%, ${ev.accent}12, transparent 70%)`}}/>}
<div style={{position:"relative",zIndex:1}}>
<div style={{width:"40px",height:"2px",background:`linear-gradient(90deg,${ev.accent},transparent)`,marginBottom:"24px"}}/>
<div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.38em",textTransform:"uppercase",color:ev.accent,marginBottom:"10px"}}>{ev.type}</div>
<div style={{fontFamily:F.serif,fontSize:"28px",fontWeight:600,color:C.cream,marginBottom:"12px"}}>{ev.name}</div>
<p style={{fontFamily:F.sans,fontSize:"13px",lineHeight:1.7,color:C.muted,marginBottom:"16px"}}>{ev.desc}</p>
<div style={{fontFamily:F.sans,fontSize:"9px",fontWeight:500,letterSpacing:"0.25em",color:ev.accent}}>{ev.cities}</div>
</div></div>))}
</div></div></section>

<section style={{background:C.surface,padding:"120px clamp(32px,6vw,96px)",position:"relative",overflow:"hidden"}}>
<Grain/>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 50%, rgba(216,178,110,0.08), transparent 65%)`}}/>
<div style={{maxWidth:"860px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
<Reveal>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.gold,marginBottom:"28px"}}>The Standard</div>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,6vw,88px)",fontWeight:600,lineHeight:0.92,color:C.cream,marginBottom:"24px"}}>Not Every Event<br/><em style={{backgroundImage:`linear-gradient(135deg,${C.goldLight},${C.gold},${C.goldDeep})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Deserves You.</em></h2>
<p style={{fontFamily:F.sans,fontSize:"16px",lineHeight:1.85,color:C.muted,maxWidth:"520px",margin:"0 auto 52px"}}>HUGLIFE does. Explore the city nearest you and find your next unforgettable experience.</p>
<div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"16px 48px",cursor:"pointer"}}>Find My City</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"16px 40px",cursor:"pointer"}}>Get on the List</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.dim,background:"transparent",border:"none",padding:"16px 24px",cursor:"pointer"}}>Promote an Event →</button>
</div></Reveal></div></section>

<footer style={{background:"#04040a",borderTop:`1px solid ${C.border}`,padding:"64px clamp(32px,6vw,96px) 40px"}}>
<div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"}}>
<div><div style={{fontFamily:F.serif,fontSize:"24px",fontWeight:600,color:C.cream,marginBottom:"8px"}}>HUGLIFE</div><p style={{fontFamily:F.sans,fontSize:"13px",color:C.muted}}>The Event Company. 8 Cities. 8 Experiences.</p><div style={{marginTop:"12px",fontFamily:F.sans,fontSize:"12px",color:C.dim}}>justhuglife.forever@gmail.com</div></div>
<div style={{fontFamily:F.sans,fontSize:"11px",color:"rgba(255,255,255,0.22)"}}>© 2026 HUGLIFE. A KHG Enterprise. All rights reserved.</div>
</div></footer>
</div>);}
