import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

interface ProgressBarProps {
  current: number;
  total: number;
  height?: number;
}

export const ProgressBar = ({ current, total, height = 4 }: ProgressBarProps) => {
  const progress = Math.min(current / total, 1);
  
  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: theme.colors.primary[500],
    height: '100%',
    borderRadius: 2,
  },
});
