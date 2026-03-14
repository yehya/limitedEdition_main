/**
 * Color system for SuperHome
 * Centralized color management for consistent theming
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // Secondary brand colors
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Secondary brand color
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  
  // Accent colors
  accent: {
    amber: '#f59e0b',
    emerald: '#10b981',
    rose: '#f43f5e',
    purple: '#8b5cf6',
    orange: '#f97316',
  },
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Semantic colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Surface colors
  surface: {
    background: '#ffffff',
    card: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    border: '#e2e8f0',
  },
  
  // Text colors
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
    link: '#3b82f6',
  },
  
  // Shadow colors
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.25)',
  },
} as const;

export type ColorKeys = keyof typeof colors;
export type PrimaryColors = keyof typeof colors.primary;
export type NeutralColors = keyof typeof colors.neutral;
