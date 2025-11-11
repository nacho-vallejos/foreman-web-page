# 🔒 Security Hardening - DevSecOps Implementation

Este proyecto implementa medidas de seguridad a nivel de código siguiendo principios DevSecOps.

## 📋 Características de Seguridad

### 1. Sanitización de HTML (XSS Prevention)
- **DOMPurify 3.0.8**: Biblioteca oficial para sanitizar HTML
- **IVSafe wrapper**: API centralizada en `/assets/js/security/iv-sanitize.js`
- Uso: `IVSafe.setHTML(element, unsafeHTML)` en lugar de `element.innerHTML = unsafeHTML`

### 2. Enlaces Externos Seguros
- Auto-aplicación de `target="_blank"` con `rel="noopener noreferrer external nofollow"`
- Prevención de tabnapping y tracking
- Observer pattern para enlaces dinámicos
- Implementado en: `/assets/js/security/iv-secure-links.js`

### 3. Validación de Formularios
- Sanitización automática de inputs de texto
- Validación de longitud máxima (5000 chars)
- Rate limiting simple (3 segundos entre submits)
- Anti-injection para campos ocultos
- Implementado en: `/assets/js/security/iv-forms.js`

### 4. Content Security Policy (CSP)
- Meta tags en HTML como fallback
- Configuración para Apache/Nginx en `/security/headers/`
- Políticas:
  - `script-src 'self'` - Solo scripts del mismo origen
  - `style-src 'self' 'unsafe-inline'` - Estilos propios + inline (mínimo necesario)
  - `object-src 'none'` - Sin plugins
  - `frame-ancestors 'none'` - Anti-clickjacking
  - `upgrade-insecure-requests` - Forzar HTTPS

### 5. Security Headers
Implementados vía meta tags y configuración de servidor:
- **HSTS**: Force HTTPS por 1 año con subdomains
- **X-Content-Type-Options**: `nosniff` para prevenir MIME sniffing
- **X-Frame-Options**: `DENY` para prevenir clickjacking
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: Deshabilitar APIs no usadas (camera, mic, geolocation, etc.)

### 6. Divulgación Responsable
- **security.txt** en `/.well-known/security.txt` (RFC 9116)
- Contacto: security@ignaciovallejos.dev
- Expiración: 2026-12-31

## 🛠️ Configuración

### Instalación de Dependencias
```bash
npm install
```

### Linting de Seguridad
```bash
# Ejecutar ESLint con reglas de seguridad
npm run lint

# Auto-fix issues
npm run lint:fix

# Audit de npm
npm run security:audit
```

### ESLint Security Rules
Configurado en `.eslintrc.cjs`:
- ❌ Prohibido `eval`, `new Function`, `setTimeout(string)`
- ❌ Prohibido `innerHTML` directo (usar `IVSafe.setHTML`)
- ⚠️  Warnings para RegExp no literales y object injection
- ✅ Plugin `eslint-plugin-security` activo

## 🚀 Deployment

### Apache (.htaccess)
```bash
cp security/headers/apache-htaccess .htaccess
```

### Nginx
Incluir en tu bloque `server`:
```nginx
include /path/to/security/headers/nginx.conf;
```

### Cloudflare
Los headers se pueden configurar en:
- **Rules** > **Transform Rules** > **HTTP Response Header Modification**
- O usando **Cloudflare Workers** con el script en `security/headers/cloudflare-worker.js` (si existe)

## 📊 CI/CD Security

### GitHub Actions
1. **CodeQL** (`.github/workflows/codeql.yml`):
   - Análisis semanal de vulnerabilidades
   - Scan en cada push/PR
   - Queries: `security-extended` + `security-and-quality`

2. **Security Lint** (`.github/workflows/security-lint.yml`):
   - ESLint con reglas de seguridad en cada push
   - Falla el build si hay errores críticos

3. **Dependabot** (`.github/dependabot.yml`):
   - Updates semanales de npm y GitHub Actions
   - Alertas automáticas de vulnerabilidades

## 🔍 Verificación

### Checklist de Implementación
- [x] DOMPurify instalado y funcional
- [x] IVSafe wrapper implementado
- [x] Enlaces externos con rel attributes
- [x] Validación de formularios
- [x] CSP headers configurados
- [x] Security headers en HTML
- [x] security.txt publicado
- [x] ESLint con reglas de seguridad
- [x] GitHub Actions workflows
- [x] Dependabot configurado

### Testing Manual
```bash
# 1. Verificar DOMPurify
curl -I http://localhost:8080/assets/vendor/dompurify.min.js

# 2. Verificar security.txt
curl http://localhost:8080/.well-known/security.txt

# 3. Verificar headers (con servidor configurado)
curl -I https://ignaciovallejos.dev | grep -E "(Strict-Transport|Content-Security|X-Frame)"

# 4. Test XSS (debe ser sanitizado)
# Abrir consola del navegador:
IVSafe.setHTML(document.body, '<img src=x onerror=alert(1)>'); // No debe ejecutar
```

## 📚 Referencias
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [CSP Reference](https://content-security-policy.com/)
- [security.txt RFC 9116](https://www.rfc-editor.org/rfc/rfc9116.html)
- [ESLint Security Plugin](https://github.com/eslint-community/eslint-plugin-security)

## 🤝 Contribuciones de Seguridad
Si encontrás una vulnerabilidad, por favor seguí la política de divulgación responsable:
1. **NO** abras un issue público
2. Enviá un email a: security@ignaciovallejos.dev
3. Incluí detalles técnicos y PoC si es posible
4. Esperá respuesta en 48-72 horas

---
**Última actualización**: 2025-11-11  
**Mantenedor**: Ignacio Vallejos (DevSecOps Engineer)
