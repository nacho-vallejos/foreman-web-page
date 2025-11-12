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
    'hero.title': 'Software más seguro. Desde el código.',
    'hero.subtitle': 'Construyo sistemas que resisten ataques reales. DevSecOps que previene. Red Team que descubre lo que otros no ven.',
    'hero.consultant': 'Consultor independiente de Microsoft. Certificado en las tecnologías que importan.',
    'hero.cta.cases': 'Ver cómo lo hago',
    'hero.cta.contact': 'Hablemos de seguridad',
    
    // Services
    'services.title': 'Lo que hago',
    'services.subtitle': 'Tu software merece seguridad que funciona. Desde el primer commit hasta el último deploy.',
    'services.consultant': 'Trabajo con equipos que toman la seguridad en serio. Azure, cloud, on-premise. Lo que necesites.',
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
    'cases.modal.stack': 'Stack:',
    'cases.modal.metrics': 'Métricas:',
    'cases.modal.ttps': 'TTPs (MITRE ATT&CK):',
    'cases.modal.button': 'Quiero algo así',
    
    // Toolchain
    'toolchain.title': 'Toolchain',
    'toolchain.subtitle': 'Stack técnico y certificaciones profesionales',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2025.title': 'Consultor Independiente de Microsoft',
    'timeline.2025.desc': 'Asesoramiento en implementación segura de soluciones Azure, defensa en profundidad y cumplimiento para sectores regulados.',
    'timeline.2024.title': 'Lead DevSecOps Engineer',
    'timeline.2024.desc': 'Diseño de pipelines seguros y ejercicios de Red Team en entorno enterprise.',
    'timeline.2023.title': 'Certificación OSCP',
    'timeline.2023.desc': 'Obtención de certificación OSCP (Offensive Security Certified Professional), validando habilidades avanzadas en penetration testing y exploitation.',
    'timeline.2022.title': 'Especialista Red Team',
    'timeline.2022.desc': 'Especialización en Red Team operations, desarrollando capacidades de threat emulation y adversary simulation para Fortune 500 companies.',
    'timeline.2021.title': 'Arquitecto de Seguridad Cloud',
    'timeline.2021.desc': 'Diseño e implementación de arquitecturas de seguridad multi-cloud, enfocándose en Zero Trust y container security en entornos Kubernetes.',
    'timeline.2019.title': 'Inicio en DevSecOps',
    'timeline.2019.desc': 'Inicio en DevSecOps como Security Engineer, automatizando procesos de seguridad y integrando security testing en pipelines CI/CD.',
    
    // Notes
    'notes.title': 'Ideas',
    'notes.subtitle': 'Artículos técnicos y análisis de amenazas',
    
    // Contact
    'contact.title': 'Hablemos',
    'contact.subtitle': 'Hablemos de seguridad',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.form.message.placeholder': 'Cuéntame sobre tu proyecto o desafío de seguridad...',
    
    // Categorías del radar

    
    'categories.devsecops': 'DevSecOps',

    
    'categories.redteam': 'Red Team',

    
    'categories.cloud': 'Cloud/Infra',

    
    'categories.observability': 'Observabilidad',

    
    'categories.programming': 'Programación',


    
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
    'hero.title': 'Software más seguro. Desde el código.',
    'hero.subtitle': 'I build systems that resist real attacks. DevSecOps that prevents. Red Team that discovers what others don\'t see.',
    'hero.consultant': 'Independent Microsoft consultant. Certified in the technologies that matter.',
    'hero.cta.cases': 'See how I do it',
    'hero.cta.contact': 'Let\'s talk security',
    
    // Services
    'services.title': 'What I do',
    'services.subtitle': 'Your software deserves security that works. From first commit to final deploy.',
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
    'cases.modal.stack': 'Stack:',
    'cases.modal.metrics': 'Metrics:',
    'cases.modal.ttps': 'TTPs (MITRE ATT&CK):',
    'cases.modal.button': 'I want something like this',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2025.title': 'Independent Microsoft Consultant',
    'timeline.2025.desc': 'Advisory on secure implementation of Azure solutions, defense in depth and compliance for regulated sectors.',
    'timeline.2024.title': 'Lead DevSecOps Engineer',
    'timeline.2024.desc': 'Design of secure pipelines and Red Team exercises in enterprise environment.',
    'timeline.2023.title': 'OSCP Certification',
    'timeline.2023.desc': 'Obtained OSCP (Offensive Security Certified Professional) certification, validating advanced skills in penetration testing and exploitation.',
    'timeline.2022.title': 'Red Team Specialist',
    'timeline.2022.desc': 'Specialization in Red Team operations, developing threat emulation and adversary simulation capabilities for Fortune 500 companies.',
    'timeline.2021.title': 'Cloud Security Architect',
    'timeline.2021.desc': 'Design and implementation of multi-cloud security architectures, focusing on Zero Trust and container security in Kubernetes environments.',
    'timeline.2019.title': 'DevSecOps Journey Begins',
    'timeline.2019.desc': 'Started in DevSecOps as Security Engineer, automating security processes and integrating security testing into CI/CD pipelines.',
    
    // Notes
    'notes.title': 'Ideas',
    'notes.subtitle': 'Technical articles and threat analysis',
    
    // Contact
    'contact.title': 'Let\'s talk',
    'contact.subtitle': "Let's talk about security",
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.form.message.placeholder': 'Tell me about your security project or challenge...',
    
    // Radar categories

    
    'categories.devsecops': 'DevSecOps',

    
    'categories.redteam': 'Red Team',

    
    'categories.cloud': 'Cloud/Infra',

    
    'categories.observability': 'Observability',

    
    'categories.programming': 'Programming',


    
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
    'hero.title': 'برمجيات أكثر أمانًا. من الكود.',
    'hero.subtitle': 'أدمج الأمن في دورة حياة البرمجيات وأختبر كخصم لتعزيز الدفاعات.',
    'hero.consultant': 'مستشار مستقل لمايكروسوفت ومحترف معتمد في تقنيات مايكروسوفت.',
    'hero.cta.cases': 'عرض الحالات',
    'hero.cta.contact': 'اتصل',
    
    // Services
    'services.title': 'ما أفعله',
    'services.subtitle': 'برمجياتك تستحق أمانًا يعمل. من أول commit إلى آخر deploy.',
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
    'cases.modal.stack': 'المكدس:',
    'cases.modal.metrics': 'المقاييس:',
    'cases.modal.ttps': 'تكتيكات وتقنيات وإجراءات (MITRE ATT&CK):',
    'cases.modal.button': 'أريد شيئًا مثل هذا',
    
    // Timeline
    'timeline.title': 'الجدول الزمني',
    'timeline.2025.title': 'مستشار مايكروسوفت المستقل',
    'timeline.2025.desc': 'الاستشارات حول التنفيذ الآمن لحلول Azure والدفاع المتعمق والامتثال للقطاعات المنظمة.',
    'timeline.2024.title': 'مهندس DevSecOps رئيسي',
    'timeline.2024.desc': 'تصميم خطوط أنابيب آمنة وتمارين الفريق الأحمر في بيئة المؤسسات.',
    'timeline.2023.title': 'شهادة OSCP',
    'timeline.2023.desc': 'الحصول على شهادة OSCP (محترف الأمن الهجومي المعتمد)، التحقق من المهارات المتقدمة في اختبار الاختراق والاستغلال.',
    'timeline.2022.title': 'أخصائي الفريق الأحمر',
    'timeline.2022.desc': 'التخصص في عمليات الفريق الأحمر، تطوير قدرات محاكاة التهديدات والخصوم لشركات Fortune 500.',
    'timeline.2021.title': 'مهندس أمن السحابة',
    'timeline.2021.desc': 'تصميم وتنفيذ هندسة الأمن متعددة السحابات، مع التركيز على الثقة الصفرية وأمن الحاويات في بيئات Kubernetes.',
    'timeline.2019.title': 'بداية رحلة DevSecOps',
    'timeline.2019.desc': 'البدء في DevSecOps كمهندس أمن، أتمتة عمليات الأمان ودمج اختبار الأمان في خطوط CI/CD.',
    
    // Notes
    'notes.title': 'أفكار',
    'notes.subtitle': 'مقالات تقنية وتحليل التهديدات',
    
    // Contact
    'contact.title': 'لنتحدث',
    'contact.subtitle': 'دعنا نتحدث عن الأمن',
    'contact.email': 'البريد الإلكتروني',
    'contact.linkedin': 'لينكد إن',
    'contact.github': 'جيت هاب',
    'contact.form.message.placeholder': 'أخبرني عن مشروع أو تحدي الأمان الخاص بك...',
    
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
  
  // Translate placeholders
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}
// Función para obtener traducciones dinámicamente
export function translate(key) {
  const t = translations[currentLang];
  return t[key] || key;
}

