import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

interface TrustBadgeProps {
  icon: string;
  text: string;
}

export const TrustBadge = ({ icon, text }: TrustBadgeProps) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.icon}>{icon}</Text>
      <Text variant="caption" style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  icon: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  text: {
    color: theme.colors.text.secondary,
    fontSize: 13,
  },
});
