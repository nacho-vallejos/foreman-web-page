// iv-sanitize.js
// Helper central para sanitizar HTML no confiable y montar de forma segura.
// (c) 2025 - IV Security Namespace
(function(){
  'use strict';
  const Safe = {
    sanitize(html, opts){
      if (window.DOMPurify) {
        return DOMPurify.sanitize(html, Object.assign({
          ALLOWED_TAGS: ['b','strong','i','em','u','br','span','code','pre','kbd','samp','sub','sup','ul','ol','li','p','h1','h2','h3','h4','h5','h6','a'],
          ALLOWED_ATTR: ['href','title','target','rel'],
          ALLOW_DATA_ATTR: false,
          FORBID_TAGS: ['style','script','iframe','object','embed','form','input'],
          FORBID_ATTR: ['style','onerror','onload','onclick'],
          ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-]|$))/i
        }, opts || {}));
      }
      // Fallback de escape si DOMPurify no está disponible
      const div = document.createElement('div');
      div.textContent = String(html ?? '');
      return div.innerHTML;
    },
    setHTML(el, html){
      if (!el) return;
      el.innerHTML = Safe.sanitize(html);
    },
    setText(el, text){
      if (!el) return;
      el.textContent = String(text ?? '');
    }
  };
  window.IVSafe = Safe;
})();
