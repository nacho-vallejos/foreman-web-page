/*
 * Skills.js - Toolchain interactivo con radar chart en canvas
 */

import { translate } from \'./i18n.js\';

let SKILLS = null;


  // Mapeo de categorías a claves de traducción
  function translateCategory(label) {
    const map = {
      'DevSecOps': 'categories.devsecops',
      'Red Team': 'categories.redteam',
      'Cloud/Infra': 'categories.cloud',
      'Observabilidad': 'categories.observability',
      'Observability': 'categories.observability',
      'Programación': 'categories.programming',
      'Programming': 'categories.programming'
    };
    return translate(map[label] || label);
  }

export async function initSkills() {
  const badgesEl = document.getElementById('skill-badges');
  const tableBody = document.querySelector('#skills-table tbody');
  const filterBtns = document.querySelectorAll('[data-skill-filter]');
  const canvas = document.getElementById('skills-radar');
  const ctx = canvas?.getContext('2d', { willReadFrequently: false, alpha: true, desynchronized: true });

  // Cargar dataset
  try {
    const res = await fetch('/assets/data/skills.json', { cache: 'no-store' });
    SKILLS = res.ok ? await res.json() : getFallback();
  } catch { 
    SKILLS = getFallback(); 
  }

  // Estado UI
  const state = { filter: 'all' };

  // Render inicial
  renderBadges();
  renderTable();
  drawRadar();

  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { 
        b.classList.remove('is-active'); 
        b.setAttribute('aria-selected','false'); 
      });
      btn.classList.add('is-active'); 
      btn.setAttribute('aria-selected','true');
      state.filter = btn.dataset.skillFilter;
      renderBadges();
      drawRadar();
    });

    // Soporte para teclado
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Responsivo (debounce)
  let rAF;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => { 
      autoResize(canvas); 
      drawRadar(); 
    });
  
  // Redibujar radar cuando cambia el idioma
  window.addEventListener('languageChanged', () => {
    drawRadar();
    renderBadges();
    renderTable();
  });
  }, { passive: true });

  function renderBadges(){
    badgesEl.setAttribute('aria-busy','true');
    badgesEl.innerHTML = '';
    const items = filtered(SKILLS.items, state.filter);
    items.forEach(s => {
      const li = document.createElement('li');
      li.innerHTML = `<span class=\"tool\">${s.name}</span>
                          <span class=\"pill\">${translateCategory(s.categoryLabel)}</span>
                          <span class=\"level\">Lvl ${s.level}</span>`;
      badgesEl.appendChild(li);
    });
    badgesEl.setAttribute('aria-busy','false');
  }

  function renderTable(){
    tableBody.innerHTML = '';
    const rows = aggregateByArea(SKILLS.items);
    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${translateCategory(r.areaLabel)}</td><td>${r.level}</td>`;
      tableBody.appendChild(tr);
    });
  }

  function drawRadar(){
    if (!ctx) return;
    autoResize(canvas);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    const cx = W/2, cy = H/2;
    const radius = Math.min(W, H) * 0.36;
    const axes = aggregateByArea(filtered(SKILLS.items, state.filter)); // Filtrar también el radar
    const N = axes.length;

    if (N === 0) return; // No hay datos que mostrar

    // Estilos base (sin colores fijos)
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.fillStyle = 'rgba(255,255,255,0.04)';

    // Telaraña (anillos 1–5)
    for (let r=1; r<=5; r++){
      ctx.beginPath();
      for (let i=0; i<N; i++){
        const a = (Math.PI*2*i/N) - Math.PI/2;
        const rr = radius*(r/5);
        const x = cx + rr*Math.cos(a);
        const y = cy + rr*Math.sin(a);
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Ejes + etiquetas
    ctx.font = `${Math.max(12, Math.floor(W*0.018))}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(230,230,230,0.9)';
    axes.forEach((ax, i) => {
      const a = (Math.PI*2*i/N) - Math.PI/2;
      const x = cx + (radius+16)*Math.cos(a);
      const y = cy + (radius+16)*Math.sin(a);
      ctx.save();
      ctx.textAlign = x < cx ? 'right' : (x > cx ? 'left' : 'center');
      ctx.textBaseline = y < cy ? 'bottom' : (y > cy ? 'top' : 'middle');
      ctx.fillText(translateCategory(ax.areaLabel), x, y);
      ctx.restore();

      // eje radial
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius*Math.cos(a), cy + radius*Math.sin(a));
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.stroke();
    });

    // Polígono de valores
    ctx.beginPath();
    axes.forEach((ax, i) => {
      const a = (Math.PI*2*i/N) - Math.PI/2;
      const rr = radius*(Math.max(0, Math.min(ax.level,5))/5);
      const x = cx + rr*Math.cos(a);
      const y = cy + rr*Math.sin(a);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle = reduceMotion ? 'rgba(124,92,255,0.20)' : 'rgba(124,92,255,0.14)';
    ctx.strokeStyle = 'rgba(124,92,255,0.6)';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // Puntos en vértices para mejor visualización
    ctx.fillStyle = 'rgba(124,92,255,0.8)';
    axes.forEach((ax, i) => {
      const a = (Math.PI*2*i/N) - Math.PI/2;
      const rr = radius*(Math.max(0, Math.min(ax.level,5))/5);
      const x = cx + rr*Math.cos(a);
      const y = cy + rr*Math.sin(a);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Etiquetas de nivel en centro (opcional)
    ctx.font = `${Math.max(10, Math.floor(W*0.014))}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let r=1; r<=5; r++){
      const rr = radius*(r/5);
      ctx.fillText(r.toString(), cx + rr - 15, cy - 5);
    }
  }

  // Utils
  function aggregateByArea(items){
    // promedio simple por área
    const map = new Map();
    items.forEach(s => {
      const key = s.area;
      if (!map.has(key)) map.set(key, { sum: 0, n: 0, label: s.areaLabel });
      const obj = map.get(key); obj.sum += s.level; obj.n += 1;
    });
    return Array.from(map.entries()).map(([area, o]) => ({
      area, areaLabel: o.label, level: +(o.sum / o.n).toFixed(1)
    }));
  }

  function filtered(items, filter){
    if (filter === 'all') return items;
    return items.filter(s => s.category === filter || s.area === filter);
  }

  function autoResize(cnv){
    if (!cnv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = cnv.getBoundingClientRect();
    cnv.width = Math.floor(rect.width * dpr);
    cnv.height = Math.floor(rect.width * 0.65 * dpr);
    const ctx2 = cnv.getContext('2d');
    ctx2.setTransform(dpr,0,0,dpr,0,0);
  }

  function getFallback(){
    return {
      items: [
        { name:'Trivy', category:'devsecops', categoryLabel:'DevSecOps', area:'devsecops', areaLabel:'DevSecOps', level:5 },
        { name:'OPA/Conftest', category:'devsecops', categoryLabel:'DevSecOps', area:'devsecops', areaLabel:'DevSecOps', level:4 },
        { name:'GitHub Actions', category:'devsecops', categoryLabel:'DevSecOps', area:'devsecops', areaLabel:'DevSecOps', level:4 },
        { name:'Nuclei', category:'redteam', categoryLabel:'Red Team', area:'redteam', areaLabel:'Red Team', level:4 },
        { name:'BloodHound', category:'redteam', categoryLabel:'Red Team', area:'redteam', areaLabel:'Red Team', level:3 },
        { name:'Terraform', category:'cloud', categoryLabel:'Cloud/Infra', area:'cloud', areaLabel:'Cloud/Infra', level:4 },
        { name:'Kubernetes', category:'cloud', categoryLabel:'Cloud/Infra', area:'cloud', areaLabel:'Cloud/Infra', level:3 },
        { name:'Grafana/Loki', category:'observability', categoryLabel:'Observabilidad', area:'observability', areaLabel:'Observabilidad', level:4 },
        { name:'ELK', category:'observability', categoryLabel:'Observabilidad', area:'observability', areaLabel:'Observabilidad', level:3 },
        { name:'Python', category:'programming', categoryLabel:'Programación', area:'programming', areaLabel:'Programación', level:4 },
        { name:'FastAPI', category:'programming', categoryLabel:'Programación', area:'programming', areaLabel:'Programación', level:3 }
      ]
    };
  }
}