import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

interface ScreenTitleProps {
  title: string;
  subtitle?: string;
}

export const ScreenTitle = ({ title, subtitle }: ScreenTitleProps) => {
  return (
    <View style={styles.container}>
      <Text variant="heading" style={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 18,
    lineHeight: 28,
  },
});
