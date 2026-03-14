import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, Platform } from 'react-native';

export interface ScaledTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'heading' | 'title' | 'subtitle' | 'body' | 'caption';
  color?: string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
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

function getVariantStyle(variant: string): TextStyle {
  switch (variant) {
    case 'heading':
      return {
        fontSize: 36,
        fontWeight: 'bold' as const,
        lineHeight: 44,
      };
    case 'title':
      return {
        fontSize: 24,
        fontWeight: 'bold' as const,
        lineHeight: 32,
      };
    case 'subtitle':
      return {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 26,
      };
    case 'body':
      return {
        fontSize: 16,
        fontWeight: 'normal' as const,
        lineHeight: 24,
      };
    case 'caption':
      return {
        fontSize: 14,
        fontWeight: 'normal' as const,
        lineHeight: 20,
      };
    default:
      return {};
  }
}

function getWeightStyle(weight: string): TextStyle {
  switch (weight) {
    case 'light':
      return { fontWeight: '300' as const };
    case 'normal':
      return { fontWeight: 'normal' as const };
    case 'medium':
      return { fontWeight: '500' as const };
    case 'semibold':
      return { fontWeight: '600' as const };
    case 'bold':
      return { fontWeight: 'bold' as const };
    default:
      return {};
  }
}

function getColorStyle(color?: string): TextStyle {
  if (!color) return {};
  return { color };
}
