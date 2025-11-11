// iv-secure-links.js
// Endurece enlaces externos: target="_blank" + rel="noopener noreferrer external nofollow"
// (c) 2025 - IV Security Namespace
(function(){
  'use strict';
  function isExternal(a){
    try{
      const u = new URL(a.href, location.href);
      return u.origin !== location.origin && !u.protocol.startsWith('mailto') && !u.protocol.startsWith('tel');
    }catch{ return false; }
  }
  function secure(a){
    if (!a.target) a.target = '_blank';
    const rel = (a.getAttribute('rel') || '').split(/\s+/);
    ['noopener','noreferrer','external','nofollow'].forEach(t => { if(!rel.includes(t)) rel.push(t); });
    a.setAttribute('rel', rel.join(' ').trim());
    a.dataset.ivSecure = 'external';
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('a[href]').forEach(a=>{
      if(isExternal(a)) secure(a);
    });
  });
  // Observer para enlaces dinámicos
  if (window.MutationObserver) {
    const obs = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'A' && node.href && isExternal(node)) secure(node);
            node.querySelectorAll && node.querySelectorAll('a[href]').forEach(a => {
              if (isExternal(a)) secure(a);
            });
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
})();
