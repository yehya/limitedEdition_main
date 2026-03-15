/**
 * Typography system for SuperHome
 * Consistent font sizes, weights, and line heights
 */

export const typography = {
  // Font families
  fontFamily: {
    primary: 'System', // Platform default
    secondary: 'System',
    mono: 'Monaco, Consolas, monospace',
  },
  
  // Font sizes (reduced by ~15% for mobile)
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 26,
    '4xl': 30,
    '5xl': 40,
    '6xl': 50,
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
  
  // Text variants (pre-computed combinations)
  variants: {
    heading: {
      fontSize: 30,
      fontWeight: 'bold' as const,
      lineHeight: 36,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
    },
    body: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
    small: {
      fontSize: 10,
      fontWeight: 'normal' as const,
      lineHeight: 14,
    },
  },
} as const;

export type FontSizeKeys = keyof typeof typography.fontSize;
export type FontWeightKeys = keyof typeof typography.fontWeight;
export type TypographyVariantKeys = keyof typeof typography.variants;
