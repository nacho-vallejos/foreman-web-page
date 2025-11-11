// iv-forms.js
// Validación y sanitización de formularios
// (c) 2025 - IV Security Namespace
(function(){
  'use strict';
  function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }
  
  document.addEventListener('submit', (e)=>{
    const f = e.target;
    if(!(f instanceof HTMLFormElement)) return;
    
    // Sanitizar campos de texto
    f.querySelectorAll('input[type="text"], input[type="search"], input[type="email"], textarea').forEach(el=>{
      const v = clean(el.value);
      el.value = v;
    });
    
    // Anti-attr-injection para inputs ocultos con URLs
    f.querySelectorAll('input[type="hidden"]').forEach(el=>{
      if(/^javascript:/i.test(el.value||'')) el.value = '';
    });
    
    // Validación simple de longitud
    const tooLong = [...f.elements].some(el => 
      (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && 
      (el.value||'').length > 5000
    );
    if(tooLong){ 
      e.preventDefault(); 
      alert('Entrada demasiado larga. Máximo 5000 caracteres por campo.'); 
    }
    
    // Validación de email
    const emailInputs = f.querySelectorAll('input[type="email"]');
    emailInputs.forEach(el => {
      if (el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        e.preventDefault();
        alert('Email inválido: ' + el.name);
      }
    });
  }, true);
  
  // Rate limiting simple (anti-spam)
  const submits = new Map();
  document.addEventListener('submit', (e)=>{
    const f = e.target;
    if(!(f instanceof HTMLFormElement)) return;
    
    const now = Date.now();
    const last = submits.get(f) || 0;
    if (now - last < 3000) { // 3 segundos entre submits
      e.preventDefault();
      alert('Por favor espera unos segundos antes de reenviar.');
      return;
    }
    submits.set(f, now);
  }, true);
})();
