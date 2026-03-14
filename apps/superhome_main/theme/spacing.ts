/**
 * Spacing system for SuperHome
 * Consistent margins, padding, and gaps
 */

export const spacing = {
  // Base spacing unit (4px)
  unit: 4,
  
  // Spacing scale (based on 4px unit)
  0: 0,
  1: 4,   // 4px
  2: 8,   // 8px
  3: 12,  // 12px
  4: 16,  // 16px
  5: 20,  // 20px
  6: 24,  // 24px
  8: 32,  // 32px
  10: 40, // 40px
  12: 48, // 48px
  16: 64, // 64px
  20: 80, // 80px
  24: 96, // 96px
  32: 128, // 128px
  40: 160, // 160px
  48: 192, // 192px
  56: 224, // 224px
  64: 256, // 256px
  
  // Common spacing shortcuts
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
  '4xl': 80, // 80px
  
  // Component-specific spacing
  component: {
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    margin: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    gap: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
  },
} as const;

export type SpacingKeys = keyof typeof spacing;
export type ComponentSpacingKeys = keyof typeof spacing.component;
