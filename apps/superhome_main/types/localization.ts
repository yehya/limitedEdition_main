export type SupportedLanguage = 'en' | 'ar';

export interface LocalizedText {
  en: string;
  ar: string;
}

export const createLocalized = (text: Record<SupportedLanguage, string>): LocalizedText => {
  return {
    en: text.en,
    ar: text.ar,
  };
};

export const getLocalizedText = (
  localized: LocalizedText,
  language: SupportedLanguage = 'en'
): string => {
  return localized[language] || localized.en;
};
