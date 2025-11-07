/*
 * Main JS - Orquestación e inicialización de módulos
 */

// Importar módulos
import { initNavigation } from './nav.js';
import { initAnimations } from './animations.js';
import { initAccessibility } from './a11y.js';
import { initCases } from './cases.js';
import { initSkills } from './skills.js';
import { initRepos } from './repos.js';

// Estado global de la aplicación
const app = {
  isInitialized: false,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Configuración
  config: {
    scrollThrottle: 16, // ~60fps
    intersectionThreshold: 0.1,
    animationDuration: 600
  }
};

/**
 * Inicializar la aplicación
 */
function init() {
  if (app.isInitialized) return;
  
  try {
    // Verificar soporte de funciones modernas
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver no soportado, algunas animaciones pueden no funcionar');
    }
    
    // Inicializar módulos
    initNavigation();
    initAnimations();
    initAccessibility();
    initCases();
    initSkills();
    initRepos();
    
    // Configurar listeners globales
    setupGlobalListeners();
    
    app.isInitialized = true;
    console.log('🚀 Aplicación inicializada correctamente');
    
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error);
  }
}

/**
 * Configurar listeners globales
 */
function setupGlobalListeners() {
  // Listener para cambios en prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', (e) => {
    app.reducedMotion = e.matches;
    document.documentElement.classList.toggle('reduced-motion', e.matches);
  });
  
  // Aplicar clase inicial si está activado
  if (app.reducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Listener para errores globales
  window.addEventListener('error', (e) => {
    console.error('Error global capturado:', e.error);
  });
  
  // Listener para resize (throttled)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('throttledResize'));
    }, 100);
  });
}

/**
 * Utilidades globales
 */
window.AppUtils = {
  // Throttle function
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },
  
  // Debounce function
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },
  
  // Smooth scroll to element
  scrollTo(element, offset = 0) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    if (!element) return;
    
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const targetPosition = element.offsetTop - headerHeight - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: app.reducedMotion ? 'auto' : 'smooth'
    });
  },
  
  // Get app config
  getConfig() {
    return app.config;
  },
  
  // Check if reduced motion is preferred
  prefersReducedMotion() {
    return app.reducedMotion;
  }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Hacer disponible globalmente para debugging
window.App = app;

export default app;