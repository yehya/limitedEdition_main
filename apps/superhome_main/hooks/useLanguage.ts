import { useState } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageState {
  language: Language;
  isRTL: boolean;
  changeLanguage: (lang: Language) => void;
}

/**
 * Hook for managing language state and RTL detection
 * Provides centralized language management for the entire app
 */
export const useLanguage = (): LanguageState => {
  const [language, setLanguage] = useState<Language>('en');
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return {
    language,
    isRTL: language === 'ar',
    changeLanguage,
  };
};
