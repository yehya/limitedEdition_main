import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, Platform } from 'react-native';
import { theme } from '@/theme/index';

export interface ScaledTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof typeof theme.typography.variants;
  color?: string;
  weight?: keyof typeof theme.typography.fontWeight;
  numberOfLines?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  /** Disable Arabic scaling for this text (useful for large headlines) */
  disableScaling?: boolean;
  /** Current language for RTL/scaling detection */
  language?: 'en' | 'ar';
}

/**
 * Text component that automatically scales font size for Arabic text
 * Use this instead of regular <Text> for better Arabic readability
 * 
 * @example
 * <Text style={{ fontSize: 16 }}>Hello World</Text>
 * // In Arabic: font size will be 18 (16 * 1.1)
 * 
 * @example
 * <Text style={{ fontSize: 56 }} disableScaling>Large Headline</Text>
 * // Keeps original size even in Arabic
 */
export const Text: React.FC<ScaledTextProps> = ({ 
  children,
  style,
  variant = 'body',
  color,
  weight = 'normal',
  numberOfLines,
  textAlign,
  disableScaling = false,
  language = 'en',
}) => {
  const isArabic = language === 'ar';

  // If scaling is disabled, just render regular Text
  if (disableScaling) {
    return (
      <RNText
        style={[
          getVariantStyle(variant),
          getWeightStyle(weight),
          getColorStyle(color),
          textAlign && { textAlign },
          style,
        ]}
        numberOfLines={numberOfLines}
      >
        {children}
      </RNText>
    );
  }

  // Arabic font scale factor (10% larger)
  const ARABIC_SCALE = 1.1;

  // Get base styles from variant and weight
  const variantStyle = getVariantStyle(variant);
  const weightStyle = getWeightStyle(weight);
  const colorStyle = getColorStyle(color);
  
  // Extract fontSize, lineHeight, and textAlign from style and scale/adjust if Arabic
  const flatStyle = StyleSheet.flatten([variantStyle, weightStyle, colorStyle, style]);
  const baseFontSize = flatStyle?.fontSize || 14; // Default to 14 if not specified
  const existingLineHeight = flatStyle?.lineHeight;
  const existingTextAlign = flatStyle?.textAlign || textAlign;
  const scaledFontSize = isArabic ? Math.round(baseFontSize * ARABIC_SCALE) : baseFontSize;

  // Scale lineHeight proportionally if it exists, or set a reasonable default
  const adjustedLineHeight =
    isArabic && existingLineHeight
      ? Math.round(existingLineHeight * ARABIC_SCALE)
      : existingLineHeight;

  // For RTL (Arabic), use 'left' alignment which becomes 'right' in RTL mode
  // Only apply if textAlign is not explicitly set to 'center' or 'justify'
  const shouldApplyRTLAlign =
    isArabic && existingTextAlign !== 'center' && existingTextAlign !== 'justify';
  const finalTextAlign = shouldApplyRTLAlign ? 'left' : existingTextAlign;

  return (
    <RNText
      style={[
        variantStyle,
        weightStyle,
        colorStyle,
        style,
        isArabic && {
          fontSize: scaledFontSize,
          lineHeight: adjustedLineHeight,
          textAlign: finalTextAlign,
          // On Android, remove extra font padding and use includeFontPadding
          ...(Platform.OS === 'android' && {
            includeFontPadding: false,
          }),
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

function getVariantStyle(variant: keyof typeof theme.typography.variants): TextStyle {
  return theme.typography.variants[variant];
}

function getWeightStyle(weight: keyof typeof theme.typography.fontWeight): TextStyle {
  return { fontWeight: theme.typography.fontWeight[weight] };
}

function getColorStyle(color?: string): TextStyle {
  if (!color) return {};
  return { color };
}
