# Ignacio Vallejos - DevSecOps Portfolio

Portfolio personal web estático minimalista con enfoque en DevSecOps y Red Team operations.

## 🚀 Inicio Rápido

### Levantar servidor local

#### Opción 1: Python
```bash
# Python 3
python -m http.server 8000

# Python 2 (legacy)
python -m SimpleHTTPServer 8000
```

#### Opción 2: Node.js
```bash
# Instalar servidor estático global
npm install -g http-server

# Ejecutar
http-server -p 8000
```

#### Opción 3: VS Code Live Server
1. Instalar extensión "Live Server"
2. Clic derecho en `index.html` → "Open with Live Server"

Luego visitar: `http://localhost:8000`

## 📁 Estructura del Proyecto

```
/
├─ index.html              # Página principal
├─ manifest.webmanifest    # Web app manifest
├─ robots.txt             # Configuración SEO
├─ sitemap.xml            # Mapa del sitio
├─ README.md              # Esta documentación
├─ /assets
│   ├─ /css
│   │   ├─ tokens.css     # Variables CSS (colores, espacios, etc.)
│   │   ├─ base.css       # Reset + estilos globales + helpers
│   │   └─ home.css       # Estilos específicos de la landing
│   ├─ /js
│   │   ├─ main.js        # Orquestación e init de módulos
│   │   ├─ animations.js  # Microinteracciones, parallax, reveals
│   │   ├─ nav.js         # Header sticky, menú móvil, progress bar
│   │   └─ a11y.js        # Utilidades de accesibilidad
│   ├─ /img              # Imágenes (placeholders .webp)
│   ├─ /icons            # Íconos SVG + favicon
│   └─ /videos           # (opcional) hero.mp4
```

## 🎨 Personalización

### Colores y Tokens

Editar `/assets/css/tokens.css` para modificar:

```css
:root {
  /* Colores principales */
  --bg: #0b0c10;           /* Fondo principal */
  --surface: #111317;      /* Superficie de cards */
  --text: #e6e6e6;         /* Texto principal */
  --accent: #7c5cff;       /* Color de acento */
  
  /* Espacios */
  --space-4: 1rem;         /* 16px */
  --space-8: 2rem;         /* 32px */
  
  /* Radios */
  --r-lg: 0.5rem;          /* 8px */
  --r-xl: 0.75rem;         /* 12px */
}
```

### Tipografías

Las fuentes están configuradas en `base.css`. Para cambiar:

1. Modificar `@font-face` declarations
2. Actualizar variables CSS:
   ```css
   --font-sans: 'Tu Fuente', system-ui, sans-serif;
   --font-mono: 'Tu Fuente Mono', 'SF Mono', monospace;
   ```

### Contenido

- **Textos**: Editar directamente en `index.html`
- **Casos/Proyectos**: Modificar sección `#cases`
- **Timeline**: Actualizar sección `#timeline`
- **Skills**: Editar badges en sección `#toolchain`

## 🚀 Deploy a Donweb (GitHub Actions)

### 1. Requisitos previos
- Dominio apuntado a Donweb y hosting activo.
- SSL (Let's Encrypt) habilitado desde el panel.
- `index.html` en la raíz del repo.

### 2. Secrets requeridos (Repo → Settings → Secrets → Actions)
- `DONWEB_HOST` = ej. `ftp.tudominio.com`
- `DONWEB_USER` = usuario FTP/SFTP
- `DONWEB_PASS` = contraseña/token
- `DONWEB_PROTOCOL` = `sftp` (recomendado) o `ftps` o `ftp`
- `DONWEB_REMOTE_DIR` = `/public_html/`

### 3. Workflow
- Cada push a `main` publica el contenido (excepto lo excluido).
- También podés disparar manualmente en **Actions → Deploy to Donweb → Run workflow**.

### 4. Estructura sugerida
```
/index.html
/assets/css/**
/assets/js/**
/assets/img/**
/assets/videos/**
/legal/privacidad.html
/legal/aviso-legal.html
.htaccess
```

### 5. Troubleshooting
- ❌ *"No se encontró index.html"*: confirmá que está en la raíz del repo.
- ❌ *Permisos o login fallido*: revisá `DONWEB_USER/DONWEB_PASS`, protocolo y ruta `DONWEB_REMOTE_DIR`.
- ❌ *No veo cambios*: limpiá caché del navegador y verificá que el workflow subió archivos (logs).

### 6. Seguridad
- No guardes credenciales en el repo. Usá **Secrets**.
- Preferí **SFTP** sobre FTP/FTPS cuando el plan lo permita.

## ⚡ Características

### Rendimiento
- **Sin dependencias externas** (CSS/JS vanilla)
- **Carga progresiva** con intersection observers
- **Lazy loading** de imágenes (implementable)
- **Optimizado para Core Web Vitals**

### Accesibilidad
- **WCAG 2.1 AA compliant**
- **Navegación por teclado** completa
- **Screen reader friendly**
- **Focus management** robusto
- **Skip links** para navegación rápida

### SEO
- **Meta tags completos** (Open Graph, Twitter Cards)
- **Structured data** (JSON-LD)
- **Sitemap XML** automático
- **Robots.txt** configurado

### UX/UI
- **Dark-first design** con contraste optimizado
- **Microinteracciones** sutiles
- **Parallax responsivo** (respeta `prefers-reduced-motion`)
- **Mobile-first responsive**

## 🛠️ Desarrollo

### Scripts Útiles

```bash
# Verificar HTML
npx html-validate index.html

# Optimizar SVGs
npx svgo assets/icons/*.svg

# Comprimir imágenes
npx imagemin assets/img/* --out-dir=assets/img

# Auditoría de accesibilidad
npx @axe-core/cli index.html
```

### Testing

#### Lighthouse Audit
```bash
npx lighthouse http://localhost:8000 --output html --output-path lighthouse-report.html
```

#### Accesibilidad
```bash
npx @axe-core/cli http://localhost:8000
```

#### Performance
- Usar DevTools > Lighthouse
- Verificar Core Web Vitals
- Testear en dispositivos reales

## 🚀 Despliegue

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=.
```

### GitHub Pages
1. Push a repositorio GitHub
2. Settings > Pages > Source: Deploy from branch
3. Seleccionar branch y carpeta

### Cloudflare Pages
1. Conectar repositorio GitHub
2. Build command: (vacío para sitio estático)
3. Output directory: `/`

## 📈 Roadmap

### Próximas mejoras

- [ ] **Hero con video** background
- [ ] **Microinteracciones** estilo Awwwards
- [ ] **Internacionalización** (i18n) ES/EN
- [ ] **Blog** con generador estático
- [ ] **Modo claro** opcional
- [ ] **Progressive Web App** completa
- [ ] **Animaciones** con Web Animations API
- [ ] **Contact form** con backend serverless

### Optimizaciones técnicas

- [ ] **Critical CSS** inline
- [ ] **Preload** de recursos críticos
- [ ] **Service Worker** para caching
- [ ] **WebP/AVIF** para imágenes
- [ ] **Bundle optimization** con build tools

## 🐛 Troubleshooting

### Problemas comunes

#### Las animaciones no funcionan
- Verificar que `prefers-reduced-motion` no esté activado
- Comprobar que JavaScript está habilitado
- Revisar consola para errores de ES modules

#### El menú móvil no se abre
- Verificar que el JavaScript se carga correctamente
- Comprobar que no hay errores en la consola
- Asegurar que los event listeners están registrados

#### Problemas de contraste/accesibilidad
- Usar herramientas como Lighthouse o axe
- Verificar que los ratios de contraste cumplan WCAG AA
- Testear con lectores de pantalla

### Browser support

- **Modernos**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **ES Modules**: Requerido para JavaScript
- **CSS Grid**: Requerido para layout
- **Intersection Observer**: Requerido para animaciones

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

**Desarrollado con ❤️ por Ignacio Vallejos**  
DevSecOps Engineer & Red Team Specialist