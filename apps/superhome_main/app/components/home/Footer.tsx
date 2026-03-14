import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

export const Footer = () => {
  return (
    <Text variant="caption" style={styles.text}>
      Available in Cairo & Alexandria • EGP 950/hour
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontSize: 12,
    marginTop: theme.spacing.md,
  },
});
