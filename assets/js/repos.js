/*
 * Repos.js - UI, filtros, caché y paginación para repositorios GitHub
 */

import { GITHUB_USER_DEFAULT, CACHE_TTL_MS, PAGE_SIZE } from './config.js';
import { listUserRepos, getRepoTopics } from './github.js';

let STATE = {
  user: GITHUB_USER_DEFAULT,
  q: '',
  topic: 'all',
  sort: 'stars',
  page: 1,
  items: [],
  filtered: []
};

export async function initRepos(){
  const form = document.getElementById('repo-controls');
  const userInput = document.getElementById('gh-user');
  const qInput = document.getElementById('q');
  const topicSel = document.getElementById('topic');
  const sortSel = document.getElementById('sort');
  const grid = document.getElementById('repo-grid');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');
  const note = document.getElementById('repo-note');

  // init values
  userInput.value = STATE.user;
  renderSkeletons(grid);

  // Carga con caché
  try {
    const data = await loadReposWithCache(STATE.user);
    STATE.items = await enrichWithTopics(data);
  } catch (e) {
    showNote(note, `No se pudieron cargar repos (${e.message}). Probá luego.`, true);
    STATE.items = [];
  }
  applyFilters();
  render();

  // eventos
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    STATE.user = userInput.value.trim() || STATE.user;
    STATE.q = qInput.value.trim().toLowerCase();
    STATE.topic = topicSel.value;
    STATE.sort = sortSel.value;
    STATE.page = 1;
    refresh();
  });
  
  prevBtn.addEventListener('click', ()=> { 
    if (STATE.page > 1){ 
      STATE.page--; 
      render(); 
    }
  });
  
  nextBtn.addEventListener('click', ()=> {
    const totalPages = Math.max(1, Math.ceil(STATE.filtered.length / PAGE_SIZE));
    if (STATE.page < totalPages){ 
      STATE.page++; 
      render(); 
    }
  });

  async function refresh(){
    renderSkeletons(grid);
    showNote(note, '', false);
    try {
      const data = await loadReposWithCache(STATE.user, true);
      STATE.items = await enrichWithTopics(data);
      applyFilters();
      render();
    } catch(e){
      showNote(note, `Rate limit o error ("${e.message}"). Mostrando caché si existe.`, true);
      const cached = readCache(STATE.user);
      STATE.items = cached?.data || [];
      applyFilters();
      render();
    }
  }

  function applyFilters(){
    const q = STATE.q;
    let arr = [...STATE.items];
    
    if (q) {
      arr = arr.filter(r => (
        r.name?.toLowerCase().includes(q) || 
        r.description?.toLowerCase().includes(q)
      ));
    }
    
    if (STATE.topic !== 'all'){
      arr = arr.filter(r => r.topics?.includes(STATE.topic));
    } else {
      // prioridad de seguridad por default (si no hay búsqueda)
      arr = arr.sort(priorityTopicsFirst(['devsecops','red-team','security','pentest']));
    }
    
    // orden
    if (STATE.sort === 'stars') {
      arr.sort((a,b)=> (b.stargazers_count||0) - (a.stargazers_count||0));
    } else if (STATE.sort === 'updated') {
      arr.sort((a,b)=> new Date(b.pushed_at) - new Date(a.pushed_at));
    }
    
    STATE.filtered = arr;
  }

  function render(){
    grid.setAttribute('aria-busy','true');
    grid.innerHTML = '';
    const start = (STATE.page-1)*PAGE_SIZE;
    const slice = STATE.filtered.slice(start, start + PAGE_SIZE);
    
    if (!slice.length){
      grid.innerHTML = `<li class="repo-card">Sin resultados. Ajustá filtros o usuario.</li>`;
    } else {
      slice.forEach(r => grid.appendChild(repoCard(r)));
    }
    
    const totalPages = Math.max(1, Math.ceil(STATE.filtered.length / PAGE_SIZE));
    prevBtn.disabled = STATE.page <= 1;
    nextBtn.disabled = STATE.page >= totalPages;
    pageInfo.textContent = `${STATE.page} / ${totalPages}`;
    grid.setAttribute('aria-busy','false');
  }
}

// ---- helpers ----
async function loadReposWithCache(user, bust=false){
  const cached = readCache(user);
  const fresh = cached && (Date.now() - cached.time < CACHE_TTL_MS);
  if (cached && fresh && !bust) return cached.data;
  
  // juntar hasta ~150 repos recientes (3 páginas * 50)
  const pages = [1,2,3];
  let all = [];
  for (const p of pages){
    const chunk = await listUserRepos(user, p, 50);
    all = all.concat(chunk);
    if (chunk.length < 50) break;
  }
  writeCache(user, all);
  return all;
}

function readCache(user){
  try {
    const raw = localStorage.getItem(cacheKey(user));
    return raw ? JSON.parse(raw) : null;
  } catch { 
    return null; 
  }
}

function writeCache(user, data){
  try {
    localStorage.setItem(cacheKey(user), JSON.stringify({ time: Date.now(), data }));
  } catch {}
}

const cacheKey = (u)=> `gh.repos.${u}`;

function repoCard(r){
  const li = document.createElement('li');
  li.className = 'repo-card';
  const lang = r.language ? `<span>${r.language}</span>` : '';
  const stars = `<span title="Stars">★ ${r.stargazers_count||0}</span>`;
  const upd = new Date(r.pushed_at).toLocaleDateString(undefined,{
    year:'numeric',
    month:'short',
    day:'2-digit'
  });
  const topics = (r.topics||[]).slice(0,6).map(t=> `<span class="topic-pill">${t}</span>`).join('');
  
  li.innerHTML = `
    <h3 class="repo-card__title">
      <a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a>
    </h3>
    <p class="repo-card__desc">${r.description || 'Sin descripción disponible'}</p>
    <div class="repo-card__meta">${lang}${stars}<span>upd ${upd}</span></div>
    <div class="repo-card__topics" aria-label="Topics">${topics}</div>
  `;
  return li;
}

async function enrichWithTopics(arr){
  // trae topics en paralelo con throttle suave
  const out = [];
  for (const r of arr){
    try {
      const t = await getRepoTopics(r.full_name);
      r.topics = t.names || [];
      // pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch { 
      r.topics = []; 
    }
    out.push(r);
  }
  return out;
}

function priorityTopicsFirst(priorityList){
  return (a,b)=>{
    const pa = (a.topics||[]).some(t=> priorityList.includes(t)) ? 1 : 0;
    const pb = (b.topics||[]).some(t=> priorityList.includes(t)) ? 1 : 0;
    return pb - pa; // primero los que tengan topics de seguridad
  };
}

function renderSkeletons(grid){
  grid.innerHTML = '';
  for (let i=0; i<6; i++){
    const li = document.createElement('li');
    li.className = 'repo-card skeleton';
    li.style.height = '140px';
    grid.appendChild(li);
  }
}

function showNote(el, msg, warn=false){
  if (!msg) {
    el.hidden = true;
    return;
  }
  el.hidden = false;
  el.textContent = msg;
  el.style.color = warn ? '#ff6b6b' : 'var(--muted)';
}