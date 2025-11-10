/**
 * i18n.js - Sistema de internacionalización
 */

const translations = {
  es: {
    'nav.home': 'Home',
    'nav.services': 'Qué hago',
    'nav.cases': 'Casos',
    'nav.toolchain': 'Toolchain',
    'nav.timeline': 'Timeline',
    'nav.notes': 'Notas',
    'nav.contact': 'Contacto',
    'hero.title': 'DevSecOps Engineer / Red Team',
    'hero.subtitle': 'Integro seguridad en el ciclo de vida del software y pruebo como adversario para fortalecer defensas.',
    'hero.consultant': 'Consultor independiente de Microsoft y profesional certificado en tecnologías Microsoft.',
    'hero.cta.cases': 'Ver casos',
    'hero.cta.contact': 'Contactar'
  },
  
  en: {
    'nav.home': 'Home',
    'nav.services': 'What I do',
    'nav.cases': 'Cases',
    'nav.toolchain': 'Toolchain',
    'nav.timeline': 'Timeline',
    'nav.notes': 'Notes',
    'nav.contact': 'Contact',
    'hero.title': 'DevSecOps Engineer / Red Team',
    'hero.subtitle': 'I integrate security into the software lifecycle and test as an adversary to strengthen defenses.',
    'hero.consultant': 'Independent Microsoft consultant and certified professional in Microsoft technologies.',
    'hero.cta.cases': 'View cases',
    'hero.cta.contact': 'Contact'
  },
  
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'ما أفعله',
    'nav.cases': 'الحالات',
    'nav.toolchain': 'مجموعة الأدوات',
    'nav.timeline': 'الجدول الزمني',
    'nav.notes': 'ملاحظات',
    'nav.contact': 'اتصل',
    'hero.title': 'مهندس DevSecOps / الفريق الأحمر',
    'hero.subtitle': 'أدمج الأمن في دورة حياة البرمجيات وأختبر كخصم لتعزيز الدفاعات.',
    'hero.consultant': 'مستشار مستقل لمايكروسوفت ومحترف معتمد في تقنيات مايكروسوفت.',
    'hero.cta.cases': 'عرض الحالات',
    'hero.cta.contact': 'اتصل'
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
}

function applyTranslations(lang) {
  const t = translations[lang];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}
