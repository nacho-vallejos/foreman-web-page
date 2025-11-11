/**
 * i18n.js - Sistema de internacionalización completo
 */

const translations = {
  es: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Qué hago',
    'nav.cases': 'Casos',
    'nav.toolchain': 'Toolchain',
    'nav.timeline': 'Timeline',
    'nav.notes': 'Notas',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'DevSecOps Engineer / Red Team',
    'hero.subtitle': 'Integro seguridad en el ciclo de vida del software y pruebo como adversario para fortalecer defensas.',
    'hero.consultant': 'Consultor independiente de Microsoft y profesional certificado en tecnologías Microsoft.',
    'hero.cta.cases': 'Ver casos',
    'hero.cta.contact': 'Contactar',
    
    // Services
    'services.title': 'Qué hago',
    'services.subtitle': 'Seguridad integrada en el ciclo de vida y ejercicios de adversario con resultados accionables.',
    'services.consultant': 'Acompaño a equipos como consultor independiente de Microsoft, diseñando soluciones seguras y auditables sobre Azure y otras plataformas.',
    'services.devsecops.title': 'DevSecOps',
    'services.devsecops.desc': 'Pipelines con gates de seguridad, observabilidad y hardening de supply chain.',
    'services.devsecops.list.0': 'SAST + DAST + SCA',
    'services.devsecops.list.1': 'SBOM + firmas; políticas OPA/Conftest',
    'services.devsecops.list.2': 'IaC segura (Terraform) + Trivy/Grype',
    'services.devsecops.list.3': 'GitOps / CI-CD con break the build por riesgo',
    'services.devsecops.list.4': 'Telemetría (Loki/ELK) → alertas accionables',
    'services.redteam.title': 'Red Team',
    'services.redteam.desc': 'Emulación de adversarios mapeada a MITRE ATT&CK y reportes ejecutivos claros.',
    'services.redteam.list.0': 'TTPs ATT&CK: Initial Access → Exfiltration',
    'services.redteam.list.1': 'Phishing simulado y ejercicio de credenciales',
    'services.redteam.list.2': 'Persistencia, C2 controlado y detección azul',
    'services.redteam.list.3': 'Recomendaciones priorizadas por riesgo',
    'services.redteam.list.4': 'Re-test y validación de remediaciones',
    'services.cta': 'Ver casos',
    'services.cta.contact': 'Contactar',
    
    // Cases
    'cases.title': 'Casos',
    'cases.pipelines.title': 'CI/CD Seguro',
    'cases.pipelines.desc': 'SAST/DAST/SCA, SBOM firmado y OPA en pipelines multi-repo.',
    'cases.redteam.title': 'Ejercicio Red Team',
    'cases.redteam.desc': 'TTPs mapeados a ATT&CK con recomendaciones priorizadas.',
    'cases.supply.title': 'Supply Chain',
    'cases.supply.desc': 'Verificación de dependencias, SBOM y políticas de firma.',
    'cases.iac.title': 'IaC Security',
    'cases.iac.desc': 'Escaneo de Terraform/ARM con políticas OPA/Conftest.',
    'cases.detections.title': 'Detecciones',
    'cases.detections.desc': 'Reglas SIEM correlacionadas con ATT&CK y falsos positivos reducidos.',
    'cases.soar.title': 'SOAR',
    'cases.soar.desc': 'Automatización de respuesta a incidentes con playbooks validados.',
    
    // Toolchain
    'toolchain.title': 'Toolchain',
    'toolchain.subtitle': 'Stack técnico y certificaciones profesionales',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2025.title': 'Consultor Independiente de Microsoft',
    'timeline.2025.desc': 'Asesoramiento en implementación segura de soluciones Azure, defensa en profundidad y cumplimiento para sectores regulados.',
    'timeline.2024.title': 'Lead DevSecOps Engineer',
    'timeline.2024.desc': 'Diseño de pipelines seguros y ejercicios de Red Team en entorno enterprise.',
    
    // Notes
    'notes.title': 'Notas',
    'notes.subtitle': 'Artículos técnicos y análisis de amenazas',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': 'Hablemos de seguridad',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.'
  },
  
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'What I do',
    'nav.cases': 'Cases',
    'nav.toolchain': 'Toolchain',
    'nav.timeline': 'Timeline',
    'nav.notes': 'Notes',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'DevSecOps Engineer / Red Team',
    'hero.subtitle': 'I integrate security into the software lifecycle and test as an adversary to strengthen defenses.',
    'hero.consultant': 'Independent Microsoft consultant and certified professional in Microsoft technologies.',
    'hero.cta.cases': 'View cases',
    'hero.cta.contact': 'Contact',
    
    // Services
    'services.title': 'What I do',
    'services.subtitle': 'Security integrated into the lifecycle and adversary exercises with actionable results.',
    'services.consultant': 'I support teams as an independent Microsoft consultant, designing secure and auditable solutions on Azure and other platforms.',
    'services.devsecops.title': 'DevSecOps',
    'services.devsecops.desc': 'Pipelines with security gates, observability and supply chain hardening.',
    'services.devsecops.list.0': 'SAST + DAST + SCA',
    'services.devsecops.list.1': 'SBOM + signatures; OPA/Conftest policies',
    'services.devsecops.list.2': 'Secure IaC (Terraform) + Trivy/Grype',
    'services.devsecops.list.3': 'GitOps / CI-CD with break the build by risk',
    'services.devsecops.list.4': 'Telemetry (Loki/ELK) → actionable alerts',
    'services.redteam.title': 'Red Team',
    'services.redteam.desc': 'Adversary emulation mapped to MITRE ATT&CK with clear executive reports.',
    'services.cta': 'View cases',
    'services.redteam.list.0': 'TTPs ATT&CK: Initial Access → Exfiltration',
    'services.redteam.list.1': 'Simulated phishing and credential exercise',
    'services.redteam.list.2': 'Persistence, controlled C2 and blue detection',
    'services.redteam.list.3': 'Risk-prioritized recommendations',
    'services.redteam.list.4': 'Re-test and remediation validation',
    'services.cta.contact': 'Contact',
    
    // Cases
    'cases.title': 'Cases',
    'cases.pipelines.title': 'Secure CI/CD',
    'cases.pipelines.desc': 'SAST/DAST/SCA, signed SBOM and OPA in multi-repo pipelines.',
    'cases.redteam.title': 'Red Team Exercise',
    'cases.redteam.desc': 'TTPs mapped to ATT&CK with prioritized recommendations.',
    'cases.supply.title': 'Supply Chain',
    'cases.supply.desc': 'Dependency verification, SBOM and signature policies.',
    'cases.iac.title': 'IaC Security',
    'cases.iac.desc': 'Terraform/ARM scanning with OPA/Conftest policies.',
    'cases.detections.title': 'Detections',
    'cases.detections.desc': 'SIEM rules correlated with ATT&CK and reduced false positives.',
    'cases.soar.title': 'SOAR',
    'cases.soar.desc': 'Incident response automation with validated playbooks.',
    
    // Toolchain
    'toolchain.title': 'Toolchain',
    'toolchain.subtitle': 'Technical stack and professional certifications',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2025.title': 'Independent Microsoft Consultant',
    'timeline.2025.desc': 'Advisory on secure implementation of Azure solutions, defense in depth and compliance for regulated sectors.',
    'timeline.2024.title': 'Lead DevSecOps Engineer',
    'timeline.2024.desc': 'Design of secure pipelines and Red Team exercises in enterprise environment.',
    
    // Notes
    'notes.title': 'Notes',
    'notes.subtitle': 'Technical articles and threat analysis',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': "Let's talk about security",
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    
    // Footer
    'footer.rights': 'All rights reserved.'
  },
  
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.services': 'ما أفعله',
    'nav.cases': 'الحالات',
    'nav.toolchain': 'مجموعة الأدوات',
    'nav.timeline': 'الجدول الزمني',
    'nav.notes': 'ملاحظات',
    'nav.contact': 'اتصل',
    
    // Hero
    'hero.title': 'مهندس DevSecOps / الفريق الأحمر',
    'hero.subtitle': 'أدمج الأمن في دورة حياة البرمجيات وأختبر كخصم لتعزيز الدفاعات.',
    'hero.consultant': 'مستشار مستقل لمايكروسوفت ومحترف معتمد في تقنيات مايكروسوفت.',
    'hero.cta.cases': 'عرض الحالات',
    'hero.cta.contact': 'اتصل',
    
    // Services
    'services.title': 'ما أفعله',
    'services.subtitle': 'الأمن المدمج في دورة الحياة وتمارين الخصم مع نتائج قابلة للتنفيذ.',
    'services.consultant': 'أدعم الفرق كمستشار مستقل لمايكروسوفت، وأصمم حلولاً آمنة وقابلة للتدقيق على Azure ومنصات أخرى.',
    'services.devsecops.title': 'DevSecOps',
    'services.devsecops.desc': 'خطوط الأنابيب مع بوابات الأمان والمراقبة وتقوية سلسلة التوريد.',
    'services.redteam.title': 'الفريق الأحمر',
    'services.devsecops.list.0': 'SAST + DAST + SCA',
    'services.devsecops.list.1': 'SBOM + التوقيعات; سياسات OPA/Conftest',
    'services.devsecops.list.2': 'IaC آمن (Terraform) + Trivy/Grype',
    'services.devsecops.list.3': 'GitOps / CI-CD مع كسر البناء حسب المخاطر',
    'services.devsecops.list.4': 'القياس عن بعد (Loki/ELK) → تنبيهات قابلة للتنفيذ',
    'services.redteam.desc': 'محاكاة الخصم المعينة إلى MITRE ATT&CK مع تقارير تنفيذية واضحة.',
    'services.cta': 'عرض الحالات',
    'services.redteam.list.0': 'TTPs ATT&CK: الوصول الأولي → التسريب',
    'services.redteam.list.1': 'التصيد المحاكى وتمرين بيانات الاعتماد',
    'services.redteam.list.2': 'الثبات، C2 المتحكم فيه والكشف الأزرق',
    'services.redteam.list.3': 'التوصيات المحددة الأولوية حسب المخاطر',
    'services.redteam.list.4': 'إعادة الاختبار والتحقق من الإصلاح',
    'services.cta.contact': 'اتصل',
    
    // Cases
    'cases.title': 'الحالات',
    'cases.pipelines.title': 'CI/CD آمن',
    'cases.pipelines.desc': 'SAST/DAST/SCA، SBOM موقع وOPA في خطوط أنابيب متعددة.',
    'cases.redteam.title': 'تمرين الفريق الأحمر',
    'cases.redteam.desc': 'TTPs معينة إلى ATT&CK مع توصيات ذات أولوية.',
    'cases.supply.title': 'سلسلة التوريد',
    'cases.supply.desc': 'التحقق من التبعيات، SBOM وسياسات التوقيع.',
    'cases.iac.title': 'أمن IaC',
    'cases.iac.desc': 'فحص Terraform/ARM مع سياسات OPA/Conftest.',
    'cases.detections.title': 'الكشف',
    'cases.detections.desc': 'قواعد SIEM مرتبطة بـ ATT&CK وتقليل الإيجابيات الكاذبة.',
    'cases.soar.title': 'SOAR',
    'cases.soar.desc': 'أتمتة الاستجابة للحوادث مع كتيبات تشغيل معتمدة.',
    
    // Toolchain
    'toolchain.title': 'مجموعة الأدوات',
    'toolchain.subtitle': 'المجموعة التقنية والشهادات المهنية',
    
    // Timeline
    'timeline.title': 'الجدول الزمني',
    'timeline.2025.title': 'مستشار مايكروسوفت المستقل',
    'timeline.2025.desc': 'الاستشارات حول التنفيذ الآمن لحلول Azure والدفاع المتعمق والامتثال للقطاعات المنظمة.',
    'timeline.2024.title': 'مهندس DevSecOps رئيسي',
    'timeline.2024.desc': 'تصميم خطوط أنابيب آمنة وتمارين الفريق الأحمر في بيئة المؤسسات.',
    
    // Notes
    'notes.title': 'ملاحظات',
    'notes.subtitle': 'مقالات تقنية وتحليل التهديدات',
    
    // Contact
    'contact.title': 'اتصل',
    'contact.subtitle': 'دعنا نتحدث عن الأمن',
    'contact.email': 'البريد الإلكتروني',
    'contact.linkedin': 'لينكد إن',
    'contact.github': 'جيت هاب',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.'
  }
};

let currentLang = 'es';

export function initI18n() {
  const savedLang = localStorage.getItem('lang') || 'es';
  setLanguage(savedLang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  applyTranslations(lang);
  
  // Disparar evento para que otros módulos actualicen
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function applyTranslations(lang) {
  const t = translations[lang];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
}
// Función para obtener traducciones dinámicamente
export function translate(key) {
  const t = translations[currentLang];
  return t[key] || key;
}

