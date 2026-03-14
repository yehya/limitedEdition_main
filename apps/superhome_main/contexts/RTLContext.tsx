import React, { createContext, useContext, ReactNode } from 'react';
import { I18nManager } from 'react-native';

export type Language = 'en' | 'ar';

interface RTLContextType {
  isRTL: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Provider for managing RTL layout and language state
 * Automatically updates React Native's I18nManager for proper RTL layout
 */
export const RTLProvider: React.FC<RTLProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);
  const isRTL = language === 'ar';

  React.useEffect(() => {
    // Force RTL layout when language is Arabic
    if (language === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (language === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  }, [language]);

  const value = {
    isRTL,
    language,
    setLanguage,
  };

  return (
    <RTLContext.Provider value={value}>
      {children}
    </RTLContext.Provider>
  );
};

/**
 * Hook to access RTL context
 * @returns RTL context with language and layout state
 */
export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
