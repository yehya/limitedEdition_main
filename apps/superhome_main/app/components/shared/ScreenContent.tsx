import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

interface ScreenContentProps {
  children: React.ReactNode;
}

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
});
