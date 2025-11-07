# README - Proyecto DevSecOps Portfolio

Un portfolio web estático minimalista con diseño dark-first, micro-interacciones accesibles y arquitectura moderna sin dependencias.

## 🚀 Quick Start

### Levantar servidor local

```bash
# Opción 1: Python (recomendado)
cd /home/ruler/Documents/Foreman-Web-Page
python -m http.server 8000

# Opción 2: Node.js
npx serve .

# Opción 3: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic derecho > "Open with Live Server"
```

Visitar: `http://localhost:8000`

## 📁 Estructura del Proyecto

```
/
├── index.html                  # Página principal semántica
├── manifest.webmanifest        # PWA manifest
├── robots.txt                  # SEO crawling rules  
├── sitemap.xml                 # Mapa del sitio
├── README.md                   # Esta documentación
└── assets/
    ├── css/
    │   ├── tokens.css          # Variables de diseño (colores, espacios, etc.)
    │   ├── base.css            # Reset + componentes base + helpers
    │   └── home.css            # Estilos específicos de la landing
    ├── js/
    │   ├── main.js             # Orquestación y utilidades globales
    │   ├── animations.js       # Reveal on scroll, parallax, hero effects
    │   ├── nav.js              # Header sticky, menú móvil, scroll progress
    │   └── a11y.js             # Utilidades de accesibilidad
    ├── img/                    # Imágenes optimizadas (.webp preferible)
    ├── icons/
    │   ├── favicon.svg         # Favicon vectorial
    │   └── favicon.ico         # Fallback favicon
    └── videos/                 # Videos (opcional hero.mp4)
```

## 🎨 Personalización

### Cambiar colores y variables

Editar `assets/css/tokens.css`:

```css
:root {
  /* Paleta principal */
  --bg: #0b0c10;              /* Fondo principal */
  --surface: #111317;         /* Superficie elevated */
  --text: #e6e6e6;            /* Texto principal */
  --text-muted: #9aa0a6;      /* Texto secundario */
  --accent: #7c5cff;          /* Color de acento */
  
  /* Personalizar gradiente del hero */
  --accent-hover: #6b46ff;
}
```

### Personalizar contenido

El contenido principal está en `index.html`. Las secciones están claramente marcadas:

- `#hero` - Presentación principal
- `#services` - Servicios (DevSecOps / Red Team) 
- `#cases` - Casos de estudio / proyectos
- `#toolchain` - Tecnologías y herramientas
- `#repos` - Repositorios destacados
- `#timeline` - Timeline profesional
- `#notes` - Blog / artículos
- `#contact` - Formulario de contacto

### Agregar video al hero

1. Agregar archivo `assets/videos/hero.mp4` (recomendado: 1920x1080, <5MB)
2. Agregar imagen fallback `assets/img/hero-fallback.webp`

## ⚡ Características

### Diseño y UX
- **Dark-first** con paleta de colores moderna
- **Responsive** mobile-first con breakpoints fluidos
- **Hero "Awwwards-like"** con video background y efectos parallax
- **Micro-interacciones** sutiles en hover y scroll
- **Tipografía** del sistema optimizada para legibilidad

### Performance
- **Vanilla JS** sin dependencias externas
- **CSS modular** con variables nativas
- **Lazy loading** para imágenes
- **Prefers-reduced-motion** respetado
- **Critical path** optimizado

### Accesibilidad (WCAG 2.1 AA)
- **Skip links** para navegación por teclado
- **Focus management** visible y consistente  
- **ARIA labels** y roles semánticos
- **Color contrast** AAA en textos principales
- **Screen reader** friendly
- **Keyboard navigation** completa

### SEO
- **Meta tags** completos (Open Graph, Twitter Cards)
- **Structured data** JSON-LD
- **Sitemap** XML generado
- **Robots.txt** configurado
- **Semantic HTML** con landmarks

## 🔧 Desarrollo

### Estructura CSS

**Metodología:**
- **CSS Variables** para tokens de diseño
- **BEM-like** naming para componentes
- **Mobile-first** media queries
- **CSS Grid/Flexbox** para layouts

**Archivos:**
- `tokens.css` - Variables globales
- `base.css` - Reset, componentes base, helpers
- `home.css` - Estilos específicos de página

### Estructura JavaScript

**Arquitectura modular:**
- `main.js` - Entry point y orquestación
- `nav.js` - Navegación y header
- `animations.js` - Efectos visuales y parallax
- `a11y.js` - Características de accesibilidad

**Utilidades globales:** Disponibles en `window.AppUtils`
- `throttle()` - Throttling de eventos
- `debounce()` - Debouncing de eventos  
- `scrollTo()` - Scroll suave accesible
- `prefersReducedMotion()` - Detección de preferencias

## 📱 PWA Features

### Manifest
- **Installable** como app nativa
- **Theme colors** configurados
- **Icons** en múltiples tamaños
- **Display mode** standalone

### Future Enhancements
- **Service Worker** para caching offline
- **Push notifications** (opcional)
- **Background sync** para formularios

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# 1. Conectar repo a Vercel
# 2. Deploy automático en cada push
# Configuración: Build Command vacío, Output Directory: "."
```

### Netlify
```bash
# 1. Arrastrar carpeta a Netlify Drop
# 2. O conectar repo para deploy continuo
```

### GitHub Pages
```bash
# 1. Push a repo público
# 2. Settings > Pages > Deploy from branch main
```

### Servidor tradicional
```bash
# Subir todos los archivos al document root
# Asegurar que index.html esté en la raíz
```

## 🗺️ Roadmap

### Phase 1: Hero Enhancement
- [ ] Video background optimizado
- [ ] Particle system sutil
- [ ] Scroll-triggered animations avanzadas
- [ ] Magnetic buttons con cursor personalizado

### Phase 2: Content & Features  
- [ ] Blog dinámico con generador estático
- [ ] Case studies detallados con imágenes
- [ ] Formulario de contacto funcional (Netlify Forms / Formspree)
- [ ] Lightbox para portfolio

### Phase 3: Advanced Interactions
- [ ] Smooth page transitions
- [ ] Timeline interactiva
- [ ] Filtros dinámicos en casos/repos
- [ ] Search functionality

### Phase 4: i18n & Performance
- [ ] Internacionalización ES/EN
- [ ] Service Worker para caching
- [ ] Critical CSS inlining  
- [ ] Image optimization automatizada

### Phase 5: Analytics & SEO
- [ ] Google Analytics 4 / Plausible
- [ ] Schema.org markup avanzado
- [ ] Blog RSS feed
- [ ] Advanced meta tags per section

## 🐛 Debugging

### Verificar funcionalidad:
```javascript
// En DevTools Console
console.log(window.App);        // Estado de la aplicación
console.log(window.AppUtils);   // Utilidades disponibles
```

### Verificar accesibilidad:
```javascript
// Obtener estadísticas A11y
window.App.a11yStats = window.getA11yStats?.() || 'A11y stats no disponibles';
console.log(window.App.a11yStats);
```

### Performance monitoring:
- **Lighthouse** para métricas de performance
- **axe DevTools** para auditoría de accesibilidad
- **WAVE** para evaluación adicional

## 📄 Licencia

Este código está disponible bajo licencia MIT. Libre para uso personal y comercial.

---

**Autor:** Ignacio Vallejos  
**Email:** ignacio@example.com  
**Web:** https://ignaciovallejos.dev

*Última actualización: Noviembre 2024*