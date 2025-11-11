(()=>{"use strict";
const d=document,w=window;

function injectBackdrop(){
  // back layer
  const bg = d.createElement("div");
  bg.className="iv-backdrop";
  const b1 = d.createElement("div"); 
  b1.className="iv-blob"; 
  b1.style.cssText="--iv-c:rgba(123,92,255,.35);--iv-dur:26s;left:10%;top:12%;width:520px;height:520px;";
  const b2 = d.createElement("div"); 
  b2.className="iv-blob"; 
  b2.style.cssText="--iv-c:rgba(65,226,255,.35);--iv-dur:32s;left:60%;top:18%;width:420px;height:420px;";
  const b3 = d.createElement("div"); 
  b3.className="iv-blob"; 
  b3.style.cssText="--iv-c:rgba(255,122,89,.28);--iv-dur:38s;left:40%;top:60%;width:600px;height:600px;";
  bg.append(b1,b2,b3);
  d.body.prepend(bg);

  // film grain - reducido para no molestar
  const grain = d.createElement("canvas");
  grain.id="iv-grain";
  d.body.append(grain);
  const gtx = grain.getContext("2d");
  function drawGrain(){
    const dpr = Math.max(1, Math.min(2, w.devicePixelRatio||1));
    const W = Math.floor(w.innerWidth*dpr), H = Math.floor(w.innerHeight*dpr);
    grain.width=W; grain.height=H;
    const id = gtx.createImageData(W,H), buf=id.data;
    for(let i=0;i<buf.length;i+=4){ 
      const v=(Math.random()*255)|0; 
      buf[i]=v; buf[i+1]=v; buf[i+2]=v; buf[i+3]=12; 
    }
    gtx.putImageData(id,0,0);
  }
  drawGrain();
  let timer = setInterval(drawGrain, 3000);
  w.addEventListener("resize", drawGrain);
  if(!("deviceMemory" in navigator) || navigator.deviceMemory<=2){ 
    clearInterval(timer); 
  }

  // spotlight + cursor ring
  const spot = d.createElement("div"); 
  spot.className="iv-spotlight";
  const ring = d.createElement("div"); 
  ring.className="iv-ring";
  d.body.append(spot, ring);
  
  let rafId = null;
  w.addEventListener("pointermove",(e)=>{
    if(rafId) return;
    rafId = requestAnimationFrame(()=>{
      const x=e.clientX,y=e.clientY;
      spot.style.setProperty("--iv-mx", x+"px");
      spot.style.setProperty("--iv-my", y+"px");
      ring.style.left=x+"px"; 
      ring.style.top=y+"px";
      rafId = null;
    });
  });
  
  d.querySelectorAll("a,button,[role='button'],.btn,.card").forEach(el=>{
    el.addEventListener("pointerenter",()=>ring.classList.add("iv-ring--alt"));
    el.addEventListener("pointerleave",()=>ring.classList.remove("iv-ring--alt"));
  });
}

function splitify(el){
  if(!el || el.dataset.ivSplitDone==="1") return;
  const txt = (el.textContent||"").trim(); 
  if(txt.length > 100) return; // Skip si es muy largo
  el.textContent="";
  const frag = d.createDocumentFragment();
  [...txt].forEach((ch,i)=>{
    const s=d.createElement("span"); 
    s.textContent=ch; 
    s.style.animation=`iv-rise .9s cubic-bezier(.2,.75,.2,1) ${i*0.02}s forwards`;
    frag.appendChild(s);
  });
  el.appendChild(frag);
  el.classList.add("iv-split");
  el.dataset.ivSplitDone="1";
}

function revealOnScroll(){
  // Solo aplicar reveal a elementos marcados explícitamente
  const items = Array.from(d.querySelectorAll("[data-iv-reveal]"));
  if(items.length === 0) return; // Si no hay elementos marcados, no hacer nada
  
  items.forEach(el=>el.classList.add("iv-reveal"));
  if("IntersectionObserver" in w){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ 
          en.target.classList.add("iv-visible"); 
          io.unobserve(en.target); 
        }
      });
    },{threshold:.1, rootMargin: "0px 0px -50px 0px"});
    items.forEach(el=>io.observe(el));
  }else{
    items.forEach(el=>el.classList.add("iv-visible"));
  }
}

function tiltify(){
  const els = d.querySelectorAll(".card, [data-iv-tilt]");
  els.forEach(el=>{
    const P=800;
    let rafId = null;
    function onMove(e){
      if(rafId) return;
      rafId = requestAnimationFrame(()=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        el.style.transform=`perspective(${P}px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateZ(0)`;
        rafId = null;
      });
    }
    function reset(){ 
      el.style.transform=""; 
    }
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
  });
}

function autoTargetHero(){
  // Buscar solo el h1 dentro del hero
  const hero = d.querySelector(".hero, [data-hero], #hero");
  if(!hero) return;
  
  const h1 = hero.querySelector("h1");
  if(h1) splitify(h1);
  
  const subtitle = hero.querySelector("p, .hero-subtitle, [data-subtitle]");
  if(subtitle) splitify(subtitle);
}

function init(){
  // Verificar que el usuario no deshabilitó los efectos
  if(d.body.classList.contains("iv-no-fx")) return;
  
  injectBackdrop();
  
  // Esperar un frame para que el DOM esté listo
  requestAnimationFrame(()=>{
    autoTargetHero();
    revealOnScroll();
    tiltify();
  });
}

if(d.readyState!=="loading"){ init(); } 
else { d.addEventListener("DOMContentLoaded", init); }
})();
