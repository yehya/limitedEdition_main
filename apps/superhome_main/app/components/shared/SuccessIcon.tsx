import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { theme } from '@/theme/index';

export const SuccessIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CheckCircle size={48} color={theme.colors.text.inverse} strokeWidth={2.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
