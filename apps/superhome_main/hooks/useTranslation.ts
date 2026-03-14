import { useState, useEffect } from 'react';
import { SupportedLanguage } from '../types/localization';

const translations = {
  en: require('../locales/en.json'),
  ar: require('../locales/ar.json'),
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Detect language from browser or localStorage
    const saved = localStorage.getItem('language') as SupportedLanguage;
    if (saved && ['en', 'ar'].includes(saved)) {
      setLanguage(saved);
    } else {
      // Detect from browser
      const browser = navigator.language;
      if (browser.startsWith('ar')) {
        setLanguage('ar');
      }
    }
  }, []);

  const changeLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    language,
    changeLanguage,
    t,
    isRTL: language === 'ar',
  };
};
