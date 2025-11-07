/*
 * Navigation JS - Header sticky, menú móvil, barra de progreso
 */

let navState = {
  isMenuOpen: false,
  scrollProgress: 0,
  lastScrollY: 0,
  isHeaderVisible: true
};

/**
 * Inicializar navegación
 */
export function initNavigation() {
  setupScrollProgress();
  setupMobileMenu();
  setupSmoothScrolling();
  setupHeaderBehavior();
  
  console.log('📱 Navegación inicializada');
}

/**
 * Configurar barra de progreso de scroll
 */
function setupScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;
  
  const updateProgress = window.AppUtils.throttle(() => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    
    navState.scrollProgress = progress;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, 16);
  
  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Ejecutar una vez al inicio
}

/**
 * Configurar menú móvil
 */
function setupMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuButton || !mobileMenu) return;
  
  // Toggle menú
  menuButton.addEventListener('click', () => {
    toggleMobileMenu();
  });
  
  // Cerrar menú al hacer click en un link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (navState.isMenuOpen && 
        !mobileMenu.contains(e.target) && 
        !menuButton.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Cerrar menú con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navState.isMenuOpen) {
      closeMobileMenu();
      menuButton.focus(); // Devolver foco al botón
    }
  });
  
  // Trap focus en menú móvil
  setupFocusTrap(mobileMenu);
}

/**
 * Abrir/cerrar menú móvil
 */
function toggleMobileMenu() {
  if (navState.isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuButton = document.querySelector('.mobile-menu-button');
  
  navState.isMenuOpen = true;
  mobileMenu.classList.add('open');
  menuButton.setAttribute('aria-expanded', 'true');
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
  
  // Focus en el primer link
  const firstLink = mobileMenu.querySelector('.mobile-nav-link');
  if (firstLink) {
    setTimeout(() => firstLink.focus(), 100);
  }
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuButton = document.querySelector('.mobile-menu-button');
  
  navState.isMenuOpen = false;
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  
  // Restaurar scroll del body
  document.body.style.overflow = '';
}

/**
 * Configurar smooth scrolling para links internos
 */
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar # solo
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.AppUtils.scrollTo(targetElement);
        
        // Cerrar menú móvil si está abierto
        if (navState.isMenuOpen) {
          closeMobileMenu();
        }
        
        // Actualizar URL sin triggear scroll
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

/**
 * Configurar comportamiento del header (hide/show en scroll)
 */
function setupHeaderBehavior() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const handleScroll = window.AppUtils.throttle(() => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > navState.lastScrollY;
    const scrollThreshold = 100;
    
    // Solo ocultar/mostrar después de un threshold
    if (Math.abs(currentScrollY - navState.lastScrollY) > scrollThreshold) {
      if (scrollingDown && currentScrollY > 200) {
        // Scrolling down - ocultar header
        if (navState.isHeaderVisible) {
          header.style.transform = 'translateY(-100%)';
          navState.isHeaderVisible = false;
        }
      } else {
        // Scrolling up - mostrar header
        if (!navState.isHeaderVisible) {
          header.style.transform = 'translateY(0)';
          navState.isHeaderVisible = true;
        }
      }
      
      navState.lastScrollY = currentScrollY;
    }
    
    // Si estamos en el top, siempre mostrar
    if (currentScrollY <= 0) {
      header.style.transform = 'translateY(0)';
      navState.isHeaderVisible = true;
    }
  }, 16);
  
  // Solo activar si no hay motion reducido
  if (!window.AppUtils.prefersReducedMotion()) {
    window.addEventListener('scroll', handleScroll);
  }
}

/**
 * Configurar focus trap para menú móvil
 */
function setupFocusTrap(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

/**
 * Obtener estado actual de navegación
 */
export function getNavState() {
  return { ...navState };
}

/**
 * Programáticamente abrir/cerrar menú móvil
 */
export function setMobileMenuState(isOpen) {
  if (isOpen !== navState.isMenuOpen) {
    toggleMobileMenu();
  }
}