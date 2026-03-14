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
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
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
      fontSize: 36,
      fontWeight: 'bold' as const,
      lineHeight: 44,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
} as const;

export type FontSizeKeys = keyof typeof typography.fontSize;
export type FontWeightKeys = keyof typeof typography.fontWeight;
export type TypographyVariantKeys = keyof typeof typography.variants;
