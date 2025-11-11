import { translate } from './i18n.js';

/*
 * Cases JS - Lógica de modal para casos de estudio
 */

let lastFocused = null;
let dataCache = null;

/**
 * Inicializar funcionalidad de casos
 */
export async function initCases() {
  // Carga de datos (opcional: si no existe el JSON, usar data-attrs)
  try {
    const res = await fetch('/assets/data/cases-i18n.json', { cache: 'no-store' });
    if (res.ok) {
      dataCache = await res.json();
      console.log('📊 Datos de casos cargados desde JSON');
    }
  } catch (error) {
    console.log('📊 Usando datos fallback del DOM');
  }

  // Event listeners para abrir modal
  const openBtns = document.querySelectorAll('[data-open-case]');
  openBtns.forEach(btn => {
    btn.addEventListener('click', onOpenCase);
  });

  // Event listeners para cerrar modal
  const modal = document.getElementById('case-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-case]')) {
        closeModal();
      }
    });
  }

  // Event listeners globales
  document.addEventListener('keydown', (e) => {
    if (!modal || modal.hasAttribute('hidden')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    }
    
    if (e.key === 'Tab') {
      trapFocus(modal, e);
    }
  });

  console.log('📁 Casos inicializados');
}

/**
 * Abrir modal de caso
 */
function onOpenCase(e) {
  e.preventDefault();
  
  const id = e.currentTarget.getAttribute('data-open-case');
  const modal = document.getElementById('case-modal');
  
  if (!modal) return;
  
  // Guardar elemento que tenía el foco
  lastFocused = document.activeElement;
  
  // Llenar modal con datos
  fillModal(modal, id);
  
  // Mostrar modal
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus inicial en el botón de cerrar
  const closeBtn = modal.querySelector('.case-modal__close');
  if (closeBtn) {
    // Pequeño delay para asegurar que el modal esté visible
    setTimeout(() => closeBtn.focus(), 100);
  }
  
  // Anunciar a screen readers
  if (window.announceToScreenReader) {
    window.announceToScreenReader('Modal de caso abierto', 'polite');
  }
}

/**
 * Cerrar modal
 */
function closeModal() {
  const modal = document.getElementById('case-modal');
  if (!modal) return;
  
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  
  // Devolver foco al elemento que abrió el modal
  if (lastFocused) {
    lastFocused.focus();
    lastFocused = null;
  }
  
  // Anunciar a screen readers
  if (window.announceToScreenReader) {
    window.announceToScreenReader('Modal cerrado', 'polite');
  }
}

/**
 * Llenar modal con datos del caso
 */
function fillModal(modal, id) {
  // Obtener datos: primero del cache JSON, luego fallback del DOM
  const fallback = getFallbackFromDOM(id);
  const entry = (dataCache?.cases || []).find(c => c.id === id) || fallback;
  
  // Llenar título y subtítulo
  const title = modal.querySelector('#case-modal-title');
  const subtitle = modal.querySelector('.case-modal__subtitle');
  
  if (title) title.textContent = entry.title || 'Caso';
  if (subtitle) subtitle.textContent = entry.summary || '';
  
  // Llenar meta información
  const stackField = modal.querySelector('[data-field="stack"]');
  const metricsField = modal.querySelector('[data-field="metrics"]');
  
  if (stackField) {
    stackField.textContent = (entry.stack || []).join(', ') || '-';
  }
  
  if (metricsField) {
    metricsField.textContent = (entry.metrics || []).join(' · ') || '-';
  }
  
  // Llenar TTPs
  const ttpsContainer = modal.querySelector('[data-field="ttps"]');
  if (ttpsContainer) {
    ttpsContainer.innerHTML = '';
    (entry.ttps || []).forEach(ttp => {
      const li = document.createElement('li');
      li.textContent = ttp;
      ttpsContainer.appendChild(li);
    });
  }
}

/**
 * Obtener datos fallback del DOM
 */
function getFallbackFromDOM(id) {
  const card = document.querySelector(`[data-case-id="${id}"]`);
  
  if (!card) {
    return {
      id,
      title: 'Caso no encontrado',
      summary: '',
      stack: [],
      metrics: [],
      ttps: []
    };
  }
  
  const title = card.querySelector('.case-card__title')?.textContent?.trim() || 'Caso';
  const desc = card.querySelector('.case-card__desc')?.textContent?.trim() || '';
  
  // Extraer métricas del DOM
  const metrics = Array.from(card.querySelectorAll('.case-card__metrics li') || [])
    .map(li => li.textContent.trim())
    .filter(Boolean);
  
  return {
    id,
    title,
    summary: desc,
    stack: ['Docker', 'Terraform', 'GitHub Actions'], // Stack por defecto
    metrics,
    ttps: [
      'T1059 Command and Scripting',
      'T1087 Account Discovery', 
      'T1041 Exfiltration Over C2 Channel'
    ] // TTPs por defecto
  };
}

/**
 * Trap focus dentro del modal
 */
function trapFocus(modal, e) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const focusableArray = Array.from(focusableElements).filter(el => 
    !el.hasAttribute('disabled') && 
    !el.getAttribute('aria-hidden') &&
    el.offsetParent !== null // Elemento visible
  );
  
  if (focusableArray.length === 0) return;
  
  const first = focusableArray[0];
  const last = focusableArray[focusableArray.length - 1];
  
  if (e.shiftKey && document.activeElement === first) {
    last.focus();
    e.preventDefault();
  } else if (!e.shiftKey && document.activeElement === last) {
    first.focus();
    e.preventDefault();
  }
}

/**
 * Obtener datos de casos (para uso externo)
 */
export function getCasesData() {
  return dataCache;
}

/**
 * Abrir caso programáticamente
 */
export function openCase(caseId) {
  const modal = document.getElementById('case-modal');
  if (!modal) return false;
  
  // Simular evento de click
  lastFocused = document.activeElement;
  fillModal(modal, caseId);
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  
  const closeBtn = modal.querySelector('.case-modal__close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 100);
  }
  
  return true;
}

/**
 * Cerrar caso programáticamente
 */
export function closeCase() {
  closeModal();
}