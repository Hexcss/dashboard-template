import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n';

export type Language = 'en' | 'es'

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  // Initialize from localStorage or browser settings
  useEffect(() => {
    const stored = localStorage.getItem('zentra-lang') as Language | null;
    if (stored) {
      setLangState(stored);
      i18n.changeLanguage(stored);
    } else {
      const browserLang = (navigator.language.slice(0, 2) as Language) || 'en';
      const initial = ['en', 'es'].includes(browserLang) ? browserLang : 'en';
      setLangState(initial);
      i18n.changeLanguage(initial);
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('zentra-lang', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'es' : 'en');
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for easy access
export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
