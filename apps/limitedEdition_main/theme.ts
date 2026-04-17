// Theme System - Luxury Streetwear
// Based on Design DNA: Dark, minimal, editorial aesthetic

export const theme = {
  colors: {
    // Background colors
    background: {
      primary: '#000000', // Pure black
      secondary: '#0A0A0A', // Near-black
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF', // White
      secondary: '#A0A0A0', // Muted gray
      tertiary: '#666666', // Darker gray
    },
    
    // Accent color
    accent: '#FBF011', // Yellow from logo
    
    // Semantic colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Surface colors
    surface: {
      card: '#0A0A0A',
      overlay: 'rgba(0, 0, 0, 0.8)',
      border: '#1A1A1A',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
      light: 'Inter-Light',
    },
    fontSize: {
      h1: 42,
      h2: 32,
      h3: 24,
      body: 16,
      caption: 14,
      small: 12,
    },
    lineHeight: {
      h1: 50,
      h2: 40,
      h3: 32,
      body: 24,
      caption: 20,
      small: 18,
    },
  },
  
  // Spacing (8px scale)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export default theme;
