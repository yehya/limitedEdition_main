// CONTEXT: Localization types for multi-language support. Supports Arabic and English
// with extensible design for any number of languages.

export type SupportedLanguage = 'en' | 'ar';
export type LanguageCode = string; // For future extensibility

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: string;
}

// Localized type for any text field
export type Localized<T extends string> = {
  en: T;
  ar: T;
  [lang: string]: T; // Extensible for future languages
};

// Language configurations
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

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Helper function to create localized text
export const createLocalized = <T extends string>(text: Record<SupportedLanguage, T>): Localized<T> => {
  return {
    ...text, // Include all provided languages
  };
};

// Helper to get text for a specific language with fallback
export const getLocalizedText = <T extends string>(
  localized: Localized<T>,
  language: SupportedLanguage | string = DEFAULT_LANGUAGE
): T => {
  return localized[language] || localized[DEFAULT_LANGUAGE] || localized.en;
};

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

// Type for localized API responses
export type LocalizedApiResponse<T> = T & {
  // If T has Localized fields, they remain as Localized<T>
  // Client will handle language selection
};
