import React, { createContext, useContext, ReactNode } from 'react';
import { I18nManager } from 'react-native';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Provider for managing language state and RTL layout
 * Automatically updates React Native's I18nManager for proper RTL layout
 */
export const RTLProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);

  React.useEffect(() => {
    // Force RTL layout when language is Arabic
    if (language === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (language === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access language context
 * @returns Language context with language state
 */
export const useRTL = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
