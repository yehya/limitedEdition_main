import { TextStyle, ViewStyle } from 'react-native';
import { Language } from '@/hooks/useLanguage';

/**
 * RTL utility functions for consistent RTL behavior
 */

/**
 * Get text alignment based on language and RTL state
 */
export const getTextAlign = (
  align: 'left' | 'right' | 'center' | 'auto' = 'auto',
  language: Language
): 'left' | 'right' | 'center' | 'auto' => {
  if (align === 'center' || align === 'auto') return align;
  
  // In RTL, left becomes right and right becomes left
  if (language === 'ar') {
    return align === 'left' ? 'right' : 'left';
  }
  
  return align;
};

/**
 * Get flex direction based on RTL state
 */
export const getFlexDirection = (
  direction: 'row' | 'row-reverse' = 'row',
  language: Language
): 'row' | 'row-reverse' => {
  if (language === 'ar') {
    return direction === 'row' ? 'row-reverse' : 'row';
  }
  return direction;
};

/**
 * Get margin/padding values for RTL layouts
 */
export const getHorizontalMargin = (
  left: number,
  right: number,
  language: Language
) => {
  return language === 'ar' 
    ? { marginLeft: right, marginRight: left }
    : { marginLeft: left, marginRight: right };
};

/**
 * Get positioning for RTL layouts
 */
export const getHorizontalPosition = (
  left: number | undefined,
  right: number | undefined,
  language: Language
) => {
  return language === 'ar'
    ? { left: right, right: left }
    : { left, right };
};

/**
 * Common RTL-aware styles
 */
export const rtlStyles = {
  row: (language: Language): ViewStyle => ({
    flexDirection: getFlexDirection('row', language),
  }),
  rowReverse: (language: Language): ViewStyle => ({
    flexDirection: getFlexDirection('row-reverse', language),
  }),
  textAlignLeft: (language: Language): TextStyle => ({
    textAlign: getTextAlign('left', language),
  }),
  textAlignRight: (language: Language): TextStyle => ({
    textAlign: getTextAlign('right', language),
  }),
};
