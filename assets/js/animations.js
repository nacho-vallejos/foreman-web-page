/*
 * Animations JS - Microinteracciones, parallax, reveal on scroll
 */

let animationState = {
  observers: [],
  parallaxElements: [],
  isParallaxActive: false
};

/**
 * Inicializar animaciones
 */
export function initAnimations() {
  setupRevealOnScroll();
  setupParallaxEffects();
  setupHoverAnimations();
  setupLoadingAnimations();
  initHero(); // Agregar inicialización del hero
  initServiceTilt(); // Agregar micro-tilt para service cards
  
  console.log('✨ Animaciones inicializadas');
}

/**
 * Configurar reveal on scroll con Intersection Observer
 */
function setupRevealOnScroll() {
  // Elementos que se animan al entrar en viewport
  const elementsToReveal = document.querySelectorAll('.fade-in-up, .card, .service-card, .case-card, .repo-card, .note-card, .timeline-item');
  
  if (elementsToReveal.length === 0) return;
  
  // Configuración del observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que sea visible
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añadir delay escalonado para múltiples elementos
        const delay = window.AppUtils.prefersReducedMotion() ? 0 : index * 100;
        
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, delay);
        
        // Dejar de observar una vez animado
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos
  elementsToReveal.forEach(element => {
    revealObserver.observe(element);
  });
  
  animationState.observers.push(revealObserver);
}

/**
 * Configurar efectos parallax sutiles
 */
function setupParallaxEffects() {
  // Solo activar parallax si no hay motion reducido
  if (window.AppUtils.prefersReducedMotion()) return;
  
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  // Parallax en el hero basado en scroll
  const handleScrollParallax = window.AppUtils.throttle(() => {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5; // Efecto parallax sutil
    
    heroSection.style.transform = `translateY(${rate}px)`;
  }, 16);
  
  // Parallax basado en mouse para el hero
  const handleMouseParallax = window.AppUtils.throttle((e) => {
    if (!animationState.isParallaxActive) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calcular posición relativa del mouse (-1 a 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    // Aplicar transformación sutil
    const moveX = x * 10; // Máximo 10px de movimiento
    const moveY = y * 10;
    
    heroSection.style.setProperty('--mouse-x', `${moveX}px`);
    heroSection.style.setProperty('--mouse-y', `${moveY}px`);
  }, 16);
  
  // Activar parallax cuando el hero está visible
  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      animationState.isParallaxActive = entry.isIntersecting;
      
      if (entry.isIntersecting) {
        window.addEventListener('scroll', handleScrollParallax);
        window.addEventListener('mousemove', handleMouseParallax);
      } else {
        window.removeEventListener('scroll', handleScrollParallax);
        window.removeEventListener('mousemove', handleMouseParallax);
      }
    });
  });
  
  parallaxObserver.observe(heroSection);
  animationState.observers.push(parallaxObserver);
}

/**
 * Configurar animaciones de hover mejoradas
 */
function setupHoverAnimations() {
  // Cards con efecto hover mejorado
  const cards = document.querySelectorAll('.card, .case-card, .repo-card, .note-card, .service-card');
  
  cards.forEach(card => {
    // Efecto de tilt sutil en hover
    card.addEventListener('mouseenter', (e) => {
      if (window.AppUtils.prefersReducedMotion()) return;
      
      card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
      if (window.AppUtils.prefersReducedMotion()) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -5; // Máximo 5 grados
      const rotateY = (x - centerX) / centerX * 5;
      
      card.style.transform = `
        translateY(-4px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // Botones con efecto ripple
  const buttons = document.querySelectorAll('.btn, .tool-badge');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (window.AppUtils.prefersReducedMotion()) return;
      
      createRippleEffect(e, button);
    });
  });
}

/**
 * Crear efecto ripple en botones
 */
function createRippleEffect(event, element) {
  const circle = document.createElement('span');
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;
  
  const rect = element.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  
  // CSS para el ripple (se añadirá al CSS)
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.background = 'rgba(255, 255, 255, 0.3)';
  circle.style.transform = 'scale(0)';
  circle.style.animation = 'ripple 600ms linear';
  circle.style.pointerEvents = 'none';
  
  // Asegurar que el botón tenga position relative
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  
  element.style.overflow = 'hidden';
  
  const ripple = element.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  
  element.appendChild(circle);
  
  // Limpiar después de la animación
  setTimeout(() => {
    circle.remove();
  }, 600);
}

/**
 * Configurar animaciones de carga
 */
function setupLoadingAnimations() {
  // Animación de entrada para el contenido principal
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    // Animar entrada después de un breve delay
    setTimeout(() => {
      mainContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Animación escalonada para elementos del hero
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-ctas');
  heroElements.forEach((element, index) => {
    if (window.AppUtils.prefersReducedMotion()) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 300 + (index * 200));
  });
}

/**
 * Animar scroll a elemento con easing personalizado
 */
export function animateScrollTo(element, duration = 1000) {
  if (window.AppUtils.prefersReducedMotion()) {
    window.AppUtils.scrollTo(element);
    return;
  }
  
  const start = window.scrollY;
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  const targetPosition = element.offsetTop - headerHeight;
  const distance = targetPosition - start;
  const startTime = performance.now();
  
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, start + (distance * ease));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

/**
 * Limpiar observers cuando sea necesario
 */
export function cleanupAnimations() {
  animationState.observers.forEach(observer => {
    observer.disconnect();
  });
  animationState.observers = [];
  animationState.parallaxElements = [];
  animationState.isParallaxActive = false;
}

/**
 * Inicializar micro-tilt 3D para service cards
 */
export function initServiceTilt() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  
  const cards = document.querySelectorAll('.card-tilt');
  const maxTilt = 6; // grados
  const enterScale = 1.01;

  function setTilt(card, ev) {
    const r = card.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width - 0.5;
    const py = (ev.clientY - r.top) / r.height - 0.5;
    const rx = (+py * maxTilt).toFixed(2);
    const ry = (-px * maxTilt).toFixed(2);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${enterScale})`;
  }
  
  function resetTilt(card) {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }
  
  cards.forEach(card => {
    // Mouse interactions
    card.addEventListener('mousemove', (e) => setTilt(card, e), { passive: true });
    card.addEventListener('mouseleave', () => resetTilt(card));
    card.addEventListener('mouseenter', () => {
      card.style.transform = `perspective(800px) scale(${enterScale})`;
    });
    
    // Accesible por teclado
    card.addEventListener('focus', () => {
      card.style.transform = `perspective(800px) scale(${enterScale})`;
    });
    card.addEventListener('blur', () => resetTilt(card));
    
    // Touch support para móviles
    card.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setTilt(card, touch);
      }
    }, { passive: true });
    
    card.addEventListener('touchend', () => resetTilt(card), { passive: true });
  });
}

/**
 * Inicializar Hero con efectos avanzados
 */
export function initHero() {
  const root = document.documentElement;
  const hero = document.getElementById('hero');
  const gradient = hero?.querySelector('.hero__gradient');
  const reveals = hero?.querySelectorAll('[data-reveal]');
  const video = hero?.querySelector('.hero__video');
  const fallback = hero?.querySelector('.hero__fallback');

  if (!hero) return;

  // Fallback si el video no carga
  if (video) {
    video.addEventListener('error', () => {
      if (fallback) {
        fallback.style.opacity = '.35';
      }
    });
    
    video.addEventListener('loadeddata', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const reduceData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
      
      if (reduceMotion || reduceData) {
        video.style.display = 'none';
        if (fallback) {
          fallback.style.opacity = '.35';
        }
      }
    });
  }

  // Intersection Observer para reveal
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Dejar de observar una vez animado
          revealObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));
  }

  // Parallax/gradiente reactivo (suave)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && gradient) {
    const update = (x, y) => {
      gradient.style.setProperty('--mx', `${x}%`);
      gradient.style.setProperty('--my', `${y}%`);
    };
    
    const onMove = window.AppUtils.throttle((ev) => {
      const rect = hero.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      update(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
    }, 16);
    
    hero.addEventListener('mousemove', onMove, { passive: true });
    
    // Posición inicial
    update(50, 40);
  }

  // Duplicar marquee para loop infinito
  const marqueeTrack = hero.querySelector('.marquee__track');
  if (marqueeTrack && !window.AppUtils.prefersReducedMotion()) {
    const clone = marqueeTrack.cloneNode(true);
    marqueeTrack.parentElement.appendChild(clone);
  }
}

// CSS para animación ripple (para inyectar dinámicamente)
const rippleCSS = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Inyectar CSS si no existe
if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = rippleCSS;
  document.head.appendChild(style);
}