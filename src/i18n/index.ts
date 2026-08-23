import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

// العربية هي اللغة الافتراضية والأساسية للتطبيق
export const DEFAULT_LANGUAGE = 'ar';
export const RTL_LANGUAGES = ['ar'];
export const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const isRTL = (lang: string) => RTL_LANGUAGES.includes(lang);

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
    fr: { translation: fr }
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false
  },
  compatibilityJSON: 'v3'
});

export default i18n;
