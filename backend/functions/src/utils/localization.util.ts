import { Localized, SupportedLanguage, DEFAULT_LANGUAGE, getLocalizedText } from '../types/localization.types';

export const getLanguageFromHeader = (acceptLanguage?: string): SupportedLanguage => {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code.toLowerCase();
  });
  
  for (const lang of languages) {
    if (lang.startsWith('ar')) return 'ar';
    if (lang.startsWith('en')) return 'en';
  }
  
  return DEFAULT_LANGUAGE;
};

export const getUserLanguage = (
  userPreferredLanguage?: SupportedLanguage,
  acceptLanguage?: string
): SupportedLanguage => {
  return userPreferredLanguage || getLanguageFromHeader(acceptLanguage);
};

export const formatLocalizedResponse = <T>(
  data: T,
  language?: SupportedLanguage
): T => {
  if (!language) return data;
  
  const processLocalized = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(processLocalized);
    }
    
    if (obj && typeof obj === 'object') {
      const processed: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'en' in value && 'ar' in value) {
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

export const validateLocalized = <T extends string>(
  localized: Localized<T>
): boolean => {
  return !!(localized.en && localized.ar);
};

export const createLocalizedError = (
  enMessage: string,
  arMessage: string
): Localized<string> => {
  return {
    en: enMessage,
    ar: arMessage,
  };
};

export const COMMON_MESSAGES = {
  SUCCESS: {
    en: 'Operation completed successfully',
    ar: 'تمت العملية بنجاح',
  },
  
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
