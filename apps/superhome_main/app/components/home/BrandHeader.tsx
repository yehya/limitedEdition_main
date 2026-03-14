import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

export const BrandHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <Text variant="title" style={styles.brandNameBold}>Super</Text>
        <Text variant="title" style={styles.brandNameThin}>Home</Text>
      </View>
      <Text variant="caption" style={styles.tagline}>
        Professional home services, on-demand
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: theme.spacing.xl,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  brandNameBold: {
    color: theme.colors.primary[500],
    fontSize: 36,
    fontWeight: 'bold',
  },
  brandNameThin: {
    color: theme.colors.text.primary,
    fontSize: 36,
    fontWeight: '300',
  },
  tagline: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    fontSize: 14,
  },
});
