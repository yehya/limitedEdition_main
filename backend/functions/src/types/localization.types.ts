export type SupportedLanguage = 'en' | 'ar';
export type LanguageCode = string;

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: string;
}

export type Localized<T extends string> = {
  en: T;
  ar: T;
  [lang: string]: T;
};

export const LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    rtl: false,
    dateFormat: 'MM/dd/yyyy',
    numberFormat: 'en-US',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    rtl: true,
    dateFormat: 'dd/MM/yyyy',
    numberFormat: 'ar-SA',
  },
} as const;

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const createLocalized = <T extends string>(text: Record<SupportedLanguage, T>): Localized<T> => {
  return {
    ...text,
  };
};

export const getLocalizedText = <T extends string>(
  localized: Localized<T>,
  language: SupportedLanguage | string = DEFAULT_LANGUAGE
): T => {
  return localized[language] || localized[DEFAULT_LANGUAGE] || localized.en;
};

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

export type LocalizedApiResponse<T> = T & {
};
