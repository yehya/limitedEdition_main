import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import theme from '../theme';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  style,
}) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.secondary;
      case 'tertiary':
        return theme.colors.text.tertiary;
      case 'accent':
        return theme.colors.accent;
      default:
        return theme.colors.text.primary;
    }
  };

  return (
    <Text
      style={[
        styles[variant],
        { color: getColor() },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: '700',
    lineHeight: theme.typography.lineHeight.h1,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: '600',
    lineHeight: theme.typography.lineHeight.h2,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: '600',
    lineHeight: theme.typography.lineHeight.h3,
  },
  body: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '400',
    lineHeight: theme.typography.lineHeight.body,
  },
  caption: {
    fontSize: theme.typography.fontSize.caption,
    fontWeight: '400',
    lineHeight: theme.typography.lineHeight.caption,
  },
  small: {
    fontSize: theme.typography.fontSize.small,
    fontWeight: '400',
    lineHeight: theme.typography.lineHeight.small,
  },
});
