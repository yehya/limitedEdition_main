import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import theme from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.none,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.text.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: theme.colors.background.primary,
  },
  secondaryText: {
    color: theme.colors.text.primary,
  },
});
