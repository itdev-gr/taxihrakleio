import { translations } from './translations';

const STORAGE_KEY = 'lp-taxi-lang';
const DEFAULT_LANG = 'en';

export function getLang(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === 'en' || stored === 'el')) return stored;
  return DEFAULT_LANG;
}

export function setLang(lang: string): void {
  if (lang !== 'en' && lang !== 'el') return;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations(lang);
  updateHtmlLang(lang);
  updateToggleUI(lang);
}

export function toggleLang(): void {
  const current = getLang();
  setLang(current === 'en' ? 'el' : 'en');
}

function applyTranslations(lang: string): void {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key && dict[key]) {
      el.innerHTML = dict[key];
    }
  });
}

function updateHtmlLang(lang: string): void {
  document.documentElement.setAttribute('lang', lang);
}

function updateToggleUI(lang: string): void {
  const pairs = [
    ['lang-en', 'lang-el'],
    ['lang-en-mobile', 'lang-el-mobile'],
  ];
  pairs.forEach(([enId, elId]) => {
    const en = document.getElementById(enId);
    const el = document.getElementById(elId);
    if (en && el) {
      en.classList.toggle('text-gold', lang === 'en');
      en.classList.toggle('font-bold', lang === 'en');
      en.classList.toggle('text-gray-400', lang !== 'en');
      el.classList.toggle('text-gold', lang === 'el');
      el.classList.toggle('font-bold', lang === 'el');
      el.classList.toggle('text-gray-400', lang !== 'el');
    }
  });
}

export function initI18n(): void {
  const lang = getLang();
  if (lang !== DEFAULT_LANG) {
    applyTranslations(lang);
  }
  updateHtmlLang(lang);
  updateToggleUI(lang);
}
