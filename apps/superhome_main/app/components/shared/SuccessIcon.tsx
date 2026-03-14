import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

export const SuccessIcon = () => {
  return (
    <View style={styles.icon}>
      <Text variant="title" style={styles.iconText}>✓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconText: {
    color: theme.colors.text.inverse,
    fontSize: 32,
  },
});
