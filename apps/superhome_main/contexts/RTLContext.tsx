import React, { createContext, useContext, ReactNode } from 'react';
import { I18nManager, Platform } from 'react-native';
import * as Updates from 'expo-updates';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Provider for managing language state and RTL layout using Expo's approach
 */
export const RTLProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);
  const isRTL = language === 'ar';

  const handleLanguageChange = React.useCallback(async (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Expo's dynamic RTL approach for development/testing
    // In production, let OS handle RTL based on device locale
    if (__DEV__ && Platform.OS !== 'web') {
      const shouldBeRTL = newLanguage === 'ar';
      if (shouldBeRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        await Updates.reloadAsync();
      }
    }
  }, []);

  const value = {
    language,
    isRTL,
    setLanguage: handleLanguageChange,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access language context
 * @returns Language context with language and RTL state
 */
export const useRTL = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
