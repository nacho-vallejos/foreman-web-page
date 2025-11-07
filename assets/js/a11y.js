/*
 * Accessibility JS - Utilidades de accesibilidad
 */

let a11yState = {
  focusVisibleSupported: false,
  skipLinksInitialized: false,
  keyboardNavigationActive: false
};

/**
 * Inicializar utilidades de accesibilidad
 */
export function initAccessibility() {
  setupFocusVisible();
  setupSkipLinks();
  setupKeyboardNavigation();
  setupAriaLiveRegions();
  setupFormAccessibility();
  
  console.log('♿ Accesibilidad inicializada');
}

/**
 * Configurar focus-visible polyfill y comportamiento
 */
function setupFocusVisible() {
  // Verificar si el navegador soporta :focus-visible nativo
  try {
    document.querySelector(':focus-visible');
    a11yState.focusVisibleSupported = true;
  } catch (e) {
    a11yState.focusVisibleSupported = false;
  }
  
  // Si no hay soporte nativo, implementar polyfill
  if (!a11yState.focusVisibleSupported) {
    implementFocusVisiblePolyfill();
  }
  
  // Detectar navegación por teclado vs mouse
  let hadKeyboardEvent = true;
  
  const keyboardThrottledUpdate = window.AppUtils.throttle(() => {
    hadKeyboardEvent = true;
  }, 100);
  
  const pointerThrottledUpdate = window.AppUtils.throttle(() => {
    hadKeyboardEvent = false;
  }, 100);
  
  document.addEventListener('keydown', keyboardThrottledUpdate);
  document.addEventListener('mousedown', pointerThrottledUpdate);
  document.addEventListener('pointerdown', pointerThrottledUpdate);
  document.addEventListener('touchstart', pointerThrottledUpdate);
  
  // Aplicar/remover focus-visible en elementos focusables
  document.addEventListener('focusin', (e) => {
    if (hadKeyboardEvent || e.target.matches(':focus-visible')) {
      e.target.classList.add('focus-visible');
      a11yState.keyboardNavigationActive = true;
    }
  });
  
  document.addEventListener('focusout', (e) => {
    e.target.classList.remove('focus-visible');
  });
}

/**
 * Implementar polyfill básico para focus-visible
 */
function implementFocusVisiblePolyfill() {
  const focusableElements = [
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(',');
  
  document.addEventListener('focusin', (e) => {
    if (e.target.matches(focusableElements)) {
      e.target.setAttribute('data-focus-visible-added', '');
    }
  });
  
  document.addEventListener('focusout', (e) => {
    e.target.removeAttribute('data-focus-visible-added');
  });
}

/**
 * Configurar skip links mejorados
 */
function setupSkipLinks() {
  if (a11yState.skipLinksInitialized) return;
  
  const skipLink = document.querySelector('.skip-link');
  if (!skipLink) {
    createSkipLink();
  }
  
  // Mejorar comportamiento de skip links existentes
  const skipLinks = document.querySelectorAll('.skip-link, [href^="#main"], [href^="#content"]');
  
  skipLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        
        // Hacer el target focusable temporalmente
        const originalTabIndex = target.getAttribute('tabindex');
        target.setAttribute('tabindex', '-1');
        target.focus();
        
        // Scroll suave al target
        window.AppUtils.scrollTo(target);
        
        // Restaurar tabindex después del focus
        target.addEventListener('blur', () => {
          if (originalTabIndex === null) {
            target.removeAttribute('tabindex');
          } else {
            target.setAttribute('tabindex', originalTabIndex);
          }
        }, { once: true });
      }
    });
  });
  
  a11yState.skipLinksInitialized = true;
}

/**
 * Crear skip link si no existe
 */
function createSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Saltar al contenido principal';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Configurar navegación por teclado mejorada
 */
function setupKeyboardNavigation() {
  // Manejar Escape para cerrar elementos modales/overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleEscapeKey(e);
    }
    
    // Navegación por flechas en grids/listas donde sea apropiado
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      handleArrowNavigation(e);
    }
  });
  
  // Mejorar navegación en componentes custom
  setupCustomComponentNavigation();
}

/**
 * Manejar tecla Escape
 */
function handleEscapeKey(e) {
  // Cerrar menú móvil si está abierto
  const mobileMenu = document.querySelector('.mobile-menu.open');
  if (mobileMenu) {
    e.preventDefault();
    // Importar función desde nav.js si está disponible
    if (window.setMobileMenuState) {
      window.setMobileMenuState(false);
    }
    return;
  }
  
  // Cerrar otros overlays/modales en el futuro
  const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
  if (openModal) {
    e.preventDefault();
    // Implementar cierre de modal
    closeModal(openModal);
  }
}

/**
 * Manejar navegación con flechas
 */
function handleArrowNavigation(e) {
  const currentElement = document.activeElement;
  
  // Navegación en toolchain badges
  if (currentElement.classList.contains('tool-badge')) {
    e.preventDefault();
    navigateInGrid(currentElement, '.tool-badge', e.key);
    return;
  }
  
  // Navegación en grids de cards
  const cardSelectors = ['.case-card', '.repo-card', '.note-card'];
  for (const selector of cardSelectors) {
    if (currentElement.matches(selector)) {
      e.preventDefault();
      navigateInGrid(currentElement, selector, e.key);
      return;
    }
  }
}

/**
 * Navegar en grid de elementos
 */
function navigateInGrid(currentElement, selector, key) {
  const allElements = Array.from(document.querySelectorAll(selector));
  const currentIndex = allElements.indexOf(currentElement);
  
  if (currentIndex === -1) return;
  
  let targetIndex;
  
  switch (key) {
    case 'ArrowLeft':
      targetIndex = currentIndex > 0 ? currentIndex - 1 : allElements.length - 1;
      break;
    case 'ArrowRight':
      targetIndex = currentIndex < allElements.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
      // Intentar ir una fila arriba (esto es aproximado)
      targetIndex = Math.max(0, currentIndex - 3);
      break;
    case 'ArrowDown':
      // Intentar ir una fila abajo
      targetIndex = Math.min(allElements.length - 1, currentIndex + 3);
      break;
  }
  
  if (targetIndex !== undefined && allElements[targetIndex]) {
    allElements[targetIndex].focus();
  }
}

/**
 * Configurar navegación en componentes custom
 */
function setupCustomComponentNavigation() {
  // Hacer cards focusables para navegación por teclado
  const cards = document.querySelectorAll('.case-card, .repo-card, .note-card, .service-card');
  
  cards.forEach(card => {
    // Hacer focusable si no tiene link interno
    if (!card.querySelector('a') && !card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      
      // Añadir comportamiento de click con Enter/Space
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    }
  });
  
  // Mejorar accesibilidad de botones de idioma
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.setAttribute('aria-label', 'Cambiar idioma');
    langToggle.setAttribute('role', 'button');
  }
}

/**
 * Configurar regiones ARIA live
 */
function setupAriaLiveRegions() {
  // Crear región para anuncios dinámicos
  let liveRegion = document.getElementById('aria-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    document.body.appendChild(liveRegion);
  }
  
  // Función global para anunciar mensajes
  window.announceToScreenReader = (message, priority = 'polite') => {
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;
    
    // Limpiar después de un tiempo
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  };
}

/**
 * Configurar accesibilidad de formularios
 */
function setupFormAccessibility() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Asociar labels con inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`) || 
                   input.closest('.form-group')?.querySelector('label');
      
      if (label && !input.hasAttribute('aria-labelledby')) {
        if (!label.id) {
          label.id = `label-${input.id || Math.random().toString(36).substr(2, 9)}`;
        }
        input.setAttribute('aria-labelledby', label.id);
      }
      
      // Configurar validación accesible
      setupInputValidation(input);
    });
    
    // Manejar envío de formulario
    form.addEventListener('submit', (e) => {
      const invalidInputs = form.querySelectorAll(':invalid');
      if (invalidInputs.length > 0) {
        e.preventDefault();
        
        // Focus en el primer input inválido
        invalidInputs[0].focus();
        
        // Anunciar error
        window.announceToScreenReader('Por favor, corrige los errores en el formulario', 'assertive');
      }
    });
  });
}

/**
 * Configurar validación accesible para inputs
 */
function setupInputValidation(input) {
  // Crear contenedor para mensajes de error si no existe
  let errorContainer = input.parentElement.querySelector('.form-error');
  
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.className = 'form-error visually-hidden';
    errorContainer.id = `error-${input.id || Math.random().toString(36).substr(2, 9)}`;
    input.parentElement.appendChild(errorContainer);
    
    input.setAttribute('aria-describedby', errorContainer.id);
  }
  
  // Validación en tiempo real
  input.addEventListener('invalid', () => {
    const errorMessage = input.validationMessage || 'Este campo tiene un error';
    errorContainer.textContent = errorMessage;
    errorContainer.classList.remove('visually-hidden');
    input.setAttribute('aria-invalid', 'true');
  });
  
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      errorContainer.textContent = '';
      errorContainer.classList.add('visually-hidden');
      input.setAttribute('aria-invalid', 'false');
    }
  });
}

/**
 * Cerrar modal (para uso futuro)
 */
function closeModal(modal) {
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
  
  // Devolver focus al elemento que abrió el modal
  const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
  if (trigger) {
    trigger.focus();
  }
}

/**
 * Verificar contraste de colores (para debugging)
 */
export function checkColorContrast() {
  const elements = document.querySelectorAll('*');
  const issues = [];
  
  elements.forEach(element => {
    const styles = getComputedStyle(element);
    const bgColor = styles.backgroundColor;
    const textColor = styles.color;
    
    // Implementación básica - en producción usar librerías especializadas
    if (bgColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'rgba(0, 0, 0, 0)') {
      // Aquí iría el cálculo real de contraste
      // Por ahora solo logueamos elementos potencialmente problemáticos
      if (element.textContent.trim().length > 0) {
        issues.push({
          element,
          bgColor,
          textColor
        });
      }
    }
  });
  
  return issues;
}

/**
 * Obtener estadísticas de accesibilidad
 */
export function getA11yStats() {
  return {
    focusVisibleSupported: a11yState.focusVisibleSupported,
    skipLinksCount: document.querySelectorAll('.skip-link').length,
    ariaLabelsCount: document.querySelectorAll('[aria-label]').length,
    headingStructure: getHeadingStructure(),
    formIssues: checkFormAccessibility()
  };
}

/**
 * Verificar estructura de headings
 */
function getHeadingStructure() {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  return headings.map(h => ({
    level: parseInt(h.tagName.charAt(1)),
    text: h.textContent.trim(),
    element: h
  }));
}

/**
 * Verificar accesibilidad de formularios
 */
function checkFormAccessibility() {
  const issues = [];
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (!input.hasAttribute('aria-label') && 
        !input.hasAttribute('aria-labelledby') && 
        !input.closest('label')) {
      issues.push({
        element: input,
        issue: 'Missing label'
      });
    }
  });
  
  return issues;
}