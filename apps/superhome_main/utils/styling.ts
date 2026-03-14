import { TextStyle, ViewStyle } from 'react-native';
import { theme } from '@/theme/index';

/**
 * Utility functions for creating consistent styles
 * Helps maintain design system consistency
 */

export const createTextStyle = (
  variant: keyof typeof theme.typography.variants,
  color?: string,
  additional?: TextStyle
): TextStyle => ({
  ...theme.typography.variants[variant],
  ...(color && { color }),
  ...additional,
});

export const createViewStyle = (
  backgroundColor?: string,
  padding?: keyof typeof theme.spacing,
  margin?: keyof typeof theme.spacing,
  additional?: ViewStyle
): ViewStyle => ({
  ...(backgroundColor && { backgroundColor }),
  ...(padding && { padding: theme.spacing[padding] as number }),
  ...(margin && { margin: theme.spacing[margin] as number }),
  ...additional,
});

export const createFlexStyle = (
  direction?: 'row' | 'column',
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly',
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch',
  gap?: keyof typeof theme.spacing,
  additional?: ViewStyle
): ViewStyle => ({
  flexDirection: direction || 'column',
  justifyContent: justify,
  alignItems: align,
  ...(gap && { gap: theme.spacing[gap] as number }),
  ...additional,
});

export const createCardStyle = (
  backgroundColor: string = theme.colors.surface.card,
  padding: keyof typeof theme.spacing = 'md',
  borderRadius: keyof typeof theme.borderRadius = 'lg',
  shadow?: keyof typeof theme.shadows,
  additional?: ViewStyle
): ViewStyle => ({
  backgroundColor,
  padding: theme.spacing[padding] as number,
  borderRadius: theme.borderRadius[borderRadius],
  ...(shadow && theme.shadows[shadow]),
  ...additional,
});

export const createButtonStyle = (
  backgroundColor: string,
  textColor: string = theme.colors.text.inverse,
  paddingVertical: keyof typeof theme.spacing = 'md',
  paddingHorizontal: keyof typeof theme.spacing = 'xl',
  borderRadius: keyof typeof theme.borderRadius = 'lg',
  additional?: ViewStyle
): ViewStyle => ({
  backgroundColor,
  paddingVertical: theme.spacing[paddingVertical] as number,
  paddingHorizontal: theme.spacing[paddingHorizontal] as number,
  borderRadius: theme.borderRadius[borderRadius],
  alignItems: 'center',
  justifyContent: 'center',
  ...additional,
});

export const createButtonTextStyle = (
  variant: keyof typeof theme.typography.variants = 'body',
  color: string = theme.colors.text.inverse,
  weight: keyof typeof theme.typography.fontWeight = 'semibold',
  additional?: TextStyle
): TextStyle => ({
  ...theme.typography.variants[variant],
  color,
  fontWeight: theme.typography.fontWeight[weight],
  ...additional,
});

// Color helpers
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Color not found: ${path}`);
      return path;
    }
  }
  
  return typeof value === 'string' ? value : path;
};

// Spacing helpers
export const getSpacing = (key: keyof typeof theme.spacing): number => {
  return theme.spacing[key] as number;
};

// Responsive helpers (for future use)
export const createResponsiveStyle = (
  base: ViewStyle | TextStyle,
  sm?: Partial<ViewStyle | TextStyle>,
  md?: Partial<ViewStyle | TextStyle>,
  lg?: Partial<ViewStyle | TextStyle>
) => ({
  ...base,
  // Future: Add responsive breakpoints here
});
