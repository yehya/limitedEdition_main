// CONTEXT: Localization utilities for backend services.

import { Localized, SupportedLanguage, DEFAULT_LANGUAGE, getLocalizedText } from '../types/localization.types';

// Extract language from Accept-Language header
export const getLanguageFromHeader = (acceptLanguage?: string): SupportedLanguage => {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;
  
  // Parse Accept-Language header: "en-US,en;q=0.9,ar;q=0.8"
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code.toLowerCase();
  });
  
  // Check for exact matches
  for (const lang of languages) {
    if (lang.startsWith('ar')) return 'ar';
    if (lang.startsWith('en')) return 'en';
  }
  
  return DEFAULT_LANGUAGE;
};

// Get language from user preference or header
export const getUserLanguage = (
  userPreferredLanguage?: SupportedLanguage,
  acceptLanguage?: string
): SupportedLanguage => {
  return userPreferredLanguage || getLanguageFromHeader(acceptLanguage);
};

// Format localized text for API response
export const formatLocalizedResponse = <T>(
  data: T,
  language?: SupportedLanguage
): T => {
  // If no language specified, return data as-is (client will handle)
  if (!language) return data;
  
  // Recursively process Localized fields
  const processLocalized = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(processLocalized);
    }
    
    if (obj && typeof obj === 'object') {
      const processed: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'en' in value && 'ar' in value) {
          // This is a Localized<T> object
          processed[key] = getLocalizedText(value as Localized<string>, language);
        } else {
          processed[key] = processLocalized(value);
        }
      }
      return processed;
    }
    
    return obj;
  };
  
  return processLocalized(data);
};

// Validate localized object has required languages
export const validateLocalized = <T extends string>(
  localized: Localized<T>
): boolean => {
  return !!(localized.en && localized.ar);
};

// Create localized error messages
export const createLocalizedError = (
  enMessage: string,
  arMessage: string
): Localized<string> => {
  return {
    en: enMessage,
    ar: arMessage,
  };
};

// Common localized messages
export const COMMON_MESSAGES = {
  // Success messages
  SUCCESS: {
    en: 'Operation completed successfully',
    ar: 'تمت العملية بنجاح',
  },
  
  // Error messages
  NOT_FOUND: {
    en: 'Resource not found',
    ar: 'المورد غير موجود',
  },
  
  UNAUTHORIZED: {
    en: 'Unauthorized access',
    ar: 'وصول غير مصرح به',
  },
  
  INVALID_INPUT: {
    en: 'Invalid input provided',
    ar: 'مدخلات غير صالحة',
  },
  
  // Job status messages
  JOB_CREATED: {
    en: 'Job created successfully',
    ar: 'تم إنشاء الوظيفة بنجاح',
  },
  
  JOB_ACCEPTED: {
    en: 'Job accepted by provider',
    ar: 'تم قبول الوظيفة من مقدم الخدمة',
  },
  
  JOB_COMPLETED: {
    en: 'Job completed successfully',
    ar: 'تم إكمال الوظيفة بنجاح',
  },
} as const;
