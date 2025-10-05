import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import or dynamically load your translation resources
import en from './resources/en/translation.json';
import es from './resources/es/translation.json';

i18n
  .use(LanguageDetector) // detects user language (navigator, localStorage, etc.)
  .use(initReactI18next) // connects with react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
