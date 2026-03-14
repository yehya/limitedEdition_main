import { useRTL } from '@/contexts/RTLContext';
import { en } from './en';
import { ar } from './ar';

// Simple translation path type
export type TranslationPath = 
  | 'common.getStarted' | 'common.back' | 'common.next' | 'common.confirm' | 'common.cancel'
  | 'common.save' | 'common.delete' | 'common.edit' | 'common.close'
  | 'common.loading' | 'common.error' | 'common.success'
  | 'common.comingSoon' | 'common.now' | 'common.today' | 'common.tomorrow'
  | 'common.free' | 'common.premium' | 'common.new' | 'common.featured'
  | 'home.title' | 'home.subtitle' | 'home.tagline'
  | 'home.aiPowered' | 'home.aiDescription'
  | 'home.instantBooking' | 'home.instantDescription'
  | 'home.trustedPros' | 'home.trustedDescription'
  | 'home.comingSoon' | 'home.freeToUse'
  | 'home.switchToArabic' | 'home.switchToEnglish';

/**
 * Hook for accessing translations with proper TypeScript support
 * Uses the current language from RTL context
 */
export const useTranslation = () => {
  const { language } = useRTL();
  
  const translations = language === 'ar' ? ar : en;
  
  /**
   * Get translation by path (e.g., 'home.title', 'common.getStarted')
   */
  const t = (path: TranslationPath): string => {
    const keys = path.split('.');
    let value: any = translations;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }
    
    return typeof value === 'string' ? value : path;
  };
  
  return {
    t,
    language,
    isRTL: language === 'ar',
  };
};
