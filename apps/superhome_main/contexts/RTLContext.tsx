import React, { createContext, useContext, ReactNode } from 'react';
import { I18nManager, Platform } from 'react-native';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  isLoading: boolean;
  setLanguage: (language: Language) => Promise<void>;
}

const LANGUAGE_KEY = '@app_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Production-ready RTL Provider with language persistence
 * - OS-driven RTL in production (recommended)
 * - Development-only dynamic RTL switching
 * - Language persistence with AsyncStorage
 */
export const RTLProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = React.useState<Language>(defaultLanguage);
  const [isLoading, setIsLoading] = React.useState(true);
  const isRTL = language === 'ar';

  // Load saved language on mount
  React.useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.warn('Failed to load language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const handleLanguageChange = React.useCallback(async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    // Persist language preference
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
    
    // Development-only dynamic RTL switching
    // Production: Let OS handle RTL based on device locale
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
    isLoading,
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
 * @returns Language context with language, RTL state, and loading status
 */
export const useRTL = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
