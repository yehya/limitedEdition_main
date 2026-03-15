import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BackButton } from './BackButton';
import { theme } from '@/theme/index';

interface ScreenHeaderProps {
  onBack: () => void;
}

export const ScreenHeader = ({ onBack }: ScreenHeaderProps) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
});
