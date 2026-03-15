import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

interface BottomButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

export const BottomButton = ({ onPress, text, disabled = false }: BottomButtonProps) => {
  return (
    <View style={styles.bottomSection}>
      <Pressable 
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text variant="body" weight="medium" style={styles.buttonText}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.neutral[300],
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
