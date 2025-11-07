/*
 * GitHub.js - Cliente simple para GitHub REST API
 */

const API = "https://api.github.com";
const accept = "application/vnd.github+json";

// Nota: en front no es seguro usar token. Usamos llamadas públicas con rate limit (60/h IP).
// Si se alcanza el límite, repos.js mostrará aviso y fallback.

export async function listUserRepos(user, page=1, per_page=50){
  const url = `${API}/users/${encodeURIComponent(user)}/repos?sort=updated&direction=desc&page=${page}&per_page=${per_page}`;
  const res = await fetch(url, { headers: { "Accept": accept } });
  if (!res.ok) throw await toErr(res);
  return res.json();
}

export async function getRepoTopics(full_name){
  const url = `${API}/repos/${full_name}/topics`;
  const res = await fetch(url, { headers: { "Accept": "application/vnd.github.mercy-preview+json" } });
  if (!res.ok) return { names: [] };
  return res.json();
}

async function toErr(res){
  const body = await res.json().catch(()=> ({}));
  const err = new Error(body.message || `GitHub error ${res.status}`);
  err.status = res.status; 
  err.body = body; 
  return err;
}