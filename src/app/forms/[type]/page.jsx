'use client';
import { useState } from 'react';

const BRAND_KEY = 'huglife';
const BRAND = { name: 'HugLife', accent: '#080604', accentGold: '#B8954E', font: "'Cormorant Garamond', serif" };
const WEBHOOK = 'https://dorsey.app.n8n.cloud/webhook/khg-form-submit';

const FORMS = {
  vendor:{title:'Vendor Application',sub:'Join our vendor network',icon:'🏪',cat:'Business',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'business_name',l:'Business Name',t:'text',r:1},{n:'vendor_type',l:'Vendor Type',t:'select',r:1,o:['Food & Beverage','Merchandise','Art','Services','Technology','Other']},
    {n:'website',l:'Website / Social',t:'text'},{n:'description',l:'Describe what you offer',t:'textarea',r:1}]},
  artist_painter:{title:'Artist (Painter)',sub:'Showcase your visual art',icon:'🎨',cat:'Creative',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'artist_name',l:'Artist / Stage Name',t:'text'},{n:'medium',l:'Primary Medium',t:'select',r:1,o:['Oil','Acrylic','Watercolor','Mixed Media','Digital','Sculpture','Mural','Other']},
    {n:'portfolio',l:'Portfolio / Instagram',t:'text',r:1},{n:'description',l:'Tell us about your work',t:'textarea',r:1}]},
  artist_music:{title:'Artist (Music)',sub:'Perform at our events',icon:'🎵',cat:'Creative',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'artist_name',l:'Artist / Stage Name',t:'text',r:1},{n:'genre',l:'Genre',t:'select',r:1,o:["R&B","Hip Hop","Afrobeats","Neo Soul","Pop","Jazz","DJ","Live Band","Other"]},
    {n:'music_link',l:'Music Link (Spotify / SoundCloud)',t:'text',r:1},{n:'social',l:'Instagram Handle',t:'text'},{n:'bio',l:'Short Bio',t:'textarea',r:1}]},
  influencer:{title:'Influencer',sub:'Partner with us for content',icon:'📸',cat:'Creative',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'instagram',l:'Instagram Handle',t:'text',r:1},{n:'tiktok',l:'TikTok Handle',t:'text'},
    {n:'follower_count',l:'Total Following',t:'select',r:1,o:['Under 5K','5K–10K','10K–25K','25K–50K','50K–100K','100K+']},
    {n:'niche',l:'Content Niche',t:'text',r:1},{n:'pitch',l:'Why should we work together?',t:'textarea',r:1}]},
  sponsor:{title:'Sponsor Inquiry',sub:'Sponsor our events & experiences',icon:'🤝',cat:'Business',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'company',l:'Company / Brand',t:'text',r:1},{n:'title',l:'Your Title',t:'text'},
    {n:'budget_range',l:'Budget Range',t:'select',r:1,o:['Under $1,000','$1,000–$5,000','$5,000–$10,000','$10,000–$25,000','$25,000+']},
    {n:'interest',l:'What are you looking to achieve?',t:'textarea',r:1}]},
  consultation:{title:'Consultation',sub:'Book a consultation',icon:'💬',cat:'Business',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'service_interest',l:'Service Interest',t:'text',r:1},{n:'preferred_date',l:'Preferred Date',t:'date'},{n:'details',l:'Tell us what you need',t:'textarea',r:1}]},
  onboarding:{title:'Onboarding',sub:'Welcome aboard',icon:'🚀',cat:'Team',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'role',l:'Role / Position',t:'text',r:1},{n:'start_date',l:'Start Date',t:'date'},
    {n:'emergency_contact',l:'Emergency Contact',t:'text',r:1},{n:'notes',l:'Anything else?',t:'textarea'}]},
  what_you_do:{title:'What You Do',sub:'Tell us your skills & talents',icon:'⚡',cat:'General',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'profession',l:'What do you do?',t:'text',r:1},{n:'skills',l:'Key Skills / Talents',t:'textarea',r:1},
    {n:'social',l:'Instagram / Website',t:'text'},{n:'interest',l:'How would you like to be involved?',t:'textarea'}]},
  rsvp:{title:'RSVP',sub:'Reserve your spot',icon:'🎟️',cat:'Events',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'guest_count',l:'Number of Guests',t:'select',r:1,o:['1','2','3','4','5+']},{n:'event_name',l:'Event',t:'text'}]},
  intern:{title:'Intern Application',sub:'Launch your career with us',icon:'🎓',cat:'Team',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'school',l:'School / University',t:'text',r:1},{n:'major',l:'Major',t:'text',r:1},
    {n:'department_interest',l:'Department Interest',t:'select',r:1,o:['Marketing','Events','Design','Operations','Content','Tech','Sales','Other']},
    {n:'availability',l:'Availability',t:'select',r:1,o:['Full-time','Part-time','Weekends Only','Flexible']},
    {n:'why',l:'Why do you want to intern with us?',t:'textarea',r:1}]},
  volunteer:{title:'Volunteer',sub:'Be part of something bigger',icon:'🙌',cat:'Team',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'availability',l:'Availability',t:'select',r:1,o:['Weekdays','Weekends','Evenings','Flexible','Event-Day Only']},
    {n:'skills',l:'Skills / Experience',t:'text'},{n:'interest',l:'What interests you?',t:'textarea',r:1}]},
  hiring_inquiry:{title:'Hiring Inquiry',sub:'Explore career opportunities',icon:'💼',cat:'Team',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'position_interest',l:'Position of Interest',t:'text',r:1},
    {n:'experience',l:'Years of Experience',t:'select',r:1,o:['0–1','1–3','3–5','5–10','10+']},
    {n:'resume_link',l:'Resume / LinkedIn',t:'text'},{n:'cover',l:'Why should we hire you?',t:'textarea',r:1}]},
  inquiry:{title:'General Inquiry',sub:'Get in touch',icon:'📩',cat:'General',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel'},
    {n:'subject',l:'Subject',t:'text',r:1},{n:'message',l:'Your Message',t:'textarea',r:1}]},
  group_pricing:{title:'Group Pricing',sub:'Special rates for groups',icon:'👥',cat:'Events',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'group_size',l:'Group Size',t:'select',r:1,o:['10–20','20–50','50–100','100–200','200+']},
    {n:'event_name',l:'Event / Experience',t:'text'},{n:'preferred_date',l:'Preferred Date',t:'date'},{n:'details',l:'Details',t:'textarea'}]},
  table_reservation:{title:'Table / Section',sub:'Secure your section',icon:'🍾',cat:'Events',fields:[
    {n:'full_name',l:'Full Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'party_size',l:'Party Size',t:'select',r:1,o:['2–4','4–6','6–10','10–15','15+']},
    {n:'event_name',l:'Event',t:'text',r:1},{n:'section_pref',l:'Section',t:'select',o:['VIP','Standard','Stage-Side','No Preference']},
    {n:'special_requests',l:'Special Requests',t:'textarea'}]},
  nda:{title:'NDA',sub:'Confidentiality agreement',icon:'🔒',cat:'Business',fields:[
    {n:'full_name',l:'Full Legal Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'company',l:'Company / Organization',t:'text'},{n:'title',l:'Title / Role',t:'text'},
    {n:'acknowledge',l:'I acknowledge and agree to the terms of confidentiality',t:'checkbox',r:1}]},
  'non-compete':{title:'Non-Compete Agreement',sub:'Restrictive covenant',icon:'🛡️',cat:'Business',fields:[
    {n:'full_name',l:'Full Legal Name',t:'text',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone',t:'tel',r:1},
    {n:'address',l:'Mailing Address',t:'textarea',r:1},
    {n:'role',l:'Role / Position with KHG',t:'text',r:1},
    {n:'effective_date',l:'Effective Date',t:'date',r:1},
    {n:'duration_months',l:'Duration (months)',t:'select',r:1,o:['6','12','18','24','36']},
    {n:'restricted_categories',l:'Restricted Categories / Industry',t:'textarea',r:1},
    {n:'restricted_geography',l:'Restricted Geography (cities / states)',t:'text',r:1},
    {n:'acknowledge',l:'I acknowledge and agree to the terms of this non-compete',t:'checkbox',r:1}]},
};

const CATS = ['Events','Creative','Business','Team','General'];
const CAT_ICONS = {Events:'🎪',Creative:'🎨',Business:'💼',Team:'👥',General:'📋'};

function Input({field:f,value:v,onChange:c,brand:b}){
  const base={width:'100%',padding:'16px 18px',background:'#FAFAFA',border:'1.5px solid #E5E5E5',borderRadius:8,color:'#080604',fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:'none',boxSizing:'border-box',transition:'border-color 0.2s'};
  const focus=e=>e.target.style.borderColor=b.accentGold;
  const blur=e=>e.target.style.borderColor='#E5E5E5';
  if(f.t==='textarea')return<textarea name={f.n} required={f.r} rows={4} value={v||''} onChange={e=>c(f.n,e.target.value)} style={{...base,resize:'vertical'}} onFocus={focus} onBlur={blur}/>;
  if(f.t==='select')return<select name={f.n} required={f.r} value={v||''} onChange={e=>c(f.n,e.target.value)} style={{...base,color:v?'#080604':'#888',cursor:'pointer'}}><option value="">Select...</option>{(f.o||[]).map(o=><option key={o} value={o}>{o}</option>)}</select>;
  if(f.t==='checkbox')return<label style={{display:'flex',alignItems:'flex-start',gap:14,cursor:'pointer',fontSize:15,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,color:'#1a1a1a'}}><input type="checkbox" name={f.n} required={f.r} checked={v||false} onChange={e=>c(f.n,e.target.checked)} style={{marginTop:4,accentColor:b.accentGold,width:20,height:20,flexShrink:0}}/>{f.l}</label>;
  return<input type={f.t} name={f.n} required={f.r} value={v||''} onChange={e=>c(f.n,e.target.value)} style={base} onFocus={focus} onBlur={blur}/>;
}

function FormsIndex({notFound,attemptedSlug}){
  const [filter,setFilter]=useState('All');
  const filtered=Object.entries(FORMS).filter(([,f])=>filter==='All'||f.cat===filter);
  return(
    <div style={{minHeight:'100vh',background:'#FFFFFF',position:'relative'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'clamp(60px,10vw,120px) 24px 80px'}}>
        {notFound&&(
          <div style={{maxWidth:560,margin:'0 auto 56px',padding:'24px 28px',background:'#FFF8E1',border:'1.5px solid #B8954E',borderRadius:12,textAlign:'center'}}>
            <div style={{fontSize:28,marginBottom:8}}>🔍</div>
            <h2 style={{fontSize:22,fontWeight:600,color:'#080604',margin:'0 0 6px',fontFamily:BRAND.font}}>Form Not Found</h2>
            <p style={{fontSize:15,color:'#3a3a3a',margin:0,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>
              {attemptedSlug?<>We couldn't find a form for <strong style={{color:'#080604'}}>"{attemptedSlug}"</strong>. Browse the available forms below.</>:'Browse our available forms below.'}
            </p>
          </div>
        )}
        <div style={{textAlign:'center',marginBottom:48}}>
          <div style={{display:'inline-block',padding:'8px 24px',border:`2px solid ${BRAND.accentGold}`,borderRadius:100,marginBottom:24}}>
            <span style={{fontSize:12,letterSpacing:4,textTransform:'uppercase',color:BRAND.accentGold,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{BRAND.name}</span>
          </div>
          <h1 style={{fontSize:'clamp(40px,7vw,68px)',fontWeight:400,lineHeight:1.05,margin:'0 0 20px',letterSpacing:'-0.03em',color:'#080604',fontFamily:BRAND.font}}>Connect With Us</h1>
          <p style={{fontSize:'clamp(16px,1.5vw,18px)',color:'#3a3a3a',maxWidth:560,margin:'0 auto',lineHeight:1.6,fontFamily:"'DM Sans',sans-serif"}}>
            Whether you are a vendor, artist, sponsor, volunteer, or just want to collaborate — we would love to hear from you.
          </p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:10,marginBottom:48,flexWrap:'wrap'}}>
          {['All',...CATS].map(c=>(
            <button key={c} onClick={()=>setFilter(c)} style={{
              padding:'10px 22px',borderRadius:100,border:filter===c?`2px solid ${BRAND.accentGold}`:'2px solid #E5E5E5',
              background:filter===c?`${BRAND.accentGold}15`:'#FFFFFF',
              color:filter===c?'#080604':'#3a3a3a',fontSize:13,fontFamily:"'DM Sans',sans-serif",
              fontWeight:600,letterSpacing:1,textTransform:'uppercase',cursor:'pointer',transition:'all 0.2s'
            }}>
              {c!=='All'&&<span style={{marginRight:6}}>{CAT_ICONS[c]}</span>}{c}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:18}}>
          {filtered.map(([key,form])=>(
            <a key={key} href={`/forms/${key}`} style={{
              display:'block',padding:'28px 26px',background:'#FFFFFF',
              border:'1.5px solid #E5E5E5',borderRadius:14,textDecoration:'none',color:'#080604',
              transition:'all 0.3s ease',position:'relative',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.accentGold;e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(184,149,78,0.15)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#E5E5E5';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.04)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
                <span style={{fontSize:30}}>{form.icon}</span>
                <span style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:BRAND.accentGold,fontFamily:"'DM Sans',sans-serif",background:`${BRAND.accentGold}18`,padding:'5px 12px',borderRadius:100,fontWeight:600}}>{form.cat}</span>
              </div>
              <h3 style={{fontSize:19,fontWeight:600,margin:'0 0 8px',fontFamily:"'DM Sans',sans-serif",letterSpacing:'-0.01em',color:'#080604'}}>{form.title}</h3>
              <p style={{fontSize:14,color:'#5a5a5a',margin:0,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{form.sub}</p>
            </a>
          ))}
        </div>
        <p style={{textAlign:'center',marginTop:60,fontSize:12,color:'#888',fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>
          © {new Date().getFullYear()} {BRAND.name} — Powered by The Kollective Hospitality Group
        </p>
      </div>
    </div>
  );
}

export default function FormPage({params}){
  const type=params?.type;
  const form=FORMS[type];
  const [data,setData]=useState({});
  const [status,setStatus]=useState('idle');
  const set=(n,v)=>setData(p=>({...p,[n]:v}));
  const submit=async(e)=>{
    e.preventDefault();setStatus('submitting');
    try{await fetch(WEBHOOK,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brand_key:BRAND_KEY,form_type:type,full_name:data.full_name||'',email:data.email||'',phone:data.phone||'',form_data:data,source:'standalone_form',submitted_at:new Date().toISOString()})});setStatus('success');}catch{setStatus('error');}
  };

  if(!form) return <FormsIndex notFound={true} attemptedSlug={type}/>;

  if(status==='success') return(
    <div style={{minHeight:'100vh',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{textAlign:'center',maxWidth:520}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:`${BRAND.accentGold}18`,border:`2.5px solid ${BRAND.accentGold}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',fontSize:36,color:BRAND.accentGold}}>✓</div>
        <h1 style={{fontSize:38,fontWeight:400,marginBottom:14,color:'#080604',fontFamily:BRAND.font}}>Submitted</h1>
        <p style={{fontSize:17,color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,margin:'0 0 36px'}}>Thank you{data.full_name?', '+data.full_name:''}. We received your {form.title.toLowerCase()} and will be in touch shortly.</p>
        <a href={'/forms/'+type} style={{display:'inline-block',padding:'14px 36px',background:'#080604',color:'#FFFFFF',borderRadius:8,textDecoration:'none',fontSize:14,letterSpacing:1.5,textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Submit Another</a>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:'100vh',background:'#FFFFFF'}}>
      <div style={{padding:'clamp(60px,10vw,100px) 24px 80px'}}>
        <div style={{maxWidth:600,margin:'0 auto'}}>
          <div style={{background:'#FFFFFF',border:'1.5px solid #E5E5E5',borderRadius:16,padding:'clamp(32px,5vw,56px)',boxShadow:'0 4px 32px rgba(0,0,0,0.06)'}}>
            <div style={{textAlign:'center',marginBottom:40}}>
              <a href="/forms" style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:BRAND.accentGold,textDecoration:'none',fontFamily:"'DM Sans',sans-serif",display:'inline-block',marginBottom:20,fontWeight:600}}>← {BRAND.name} Forms</a>
              <div style={{fontSize:42,marginBottom:14}}>{form.icon}</div>
              <h1 style={{fontSize:'clamp(28px,4vw,40px)',fontWeight:400,lineHeight:1.15,margin:'0 0 10px',letterSpacing:'-0.02em',color:'#080604',fontFamily:BRAND.font}}>{form.title}</h1>
              <p style={{fontSize:16,color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.5}}>{form.sub}</p>
              <div style={{width:48,height:2,background:BRAND.accentGold,margin:'24px auto 0'}}/>
            </div>
            <form onSubmit={submit}>
              <div style={{display:'flex',flexDirection:'column',gap:22}}>
                {form.fields.map(f=><div key={f.n}>
                  {f.t!=='checkbox'&&<label style={{display:'block',fontSize:12,letterSpacing:1.5,textTransform:'uppercase',marginBottom:10,color:'#1a1a1a',fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>{f.l}{f.r?<span style={{color:BRAND.accentGold,marginLeft:4}}>*</span>:null}</label>}
                  <Input field={f} value={data[f.n]} onChange={set} brand={BRAND}/>
                </div>)}
              </div>
              {status==='error'&&<p style={{color:'#C62828',fontSize:15,fontFamily:"'DM Sans',sans-serif",marginTop:20,textAlign:'center',padding:14,background:'#FFEBEE',borderRadius:8,border:'1.5px solid #FFCDD2'}}>Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status==='submitting'} style={{width:'100%',marginTop:32,padding:'18px 32px',background:status==='submitting'?'#888':'#080604',color:'#FFFFFF',border:'none',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:2,textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",cursor:status==='submitting'?'wait':'pointer',transition:'all 0.2s'}}>
                {status==='submitting'?'Submitting...':'Submit'}
              </button>
            </form>
          </div>
          <p style={{textAlign:'center',marginTop:36,fontSize:12,color:'#888',fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>© {new Date().getFullYear()} {BRAND.name} — Powered by The Kollective</p>
        </div>
      </div>
    </div>
  );
}
