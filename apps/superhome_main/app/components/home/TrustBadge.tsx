import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';
import { CheckCircle, Award } from 'lucide-react-native';

interface TrustBadgeProps {
  icon: 'check-circle' | 'award';
  text: string;
}

export const TrustBadge = ({ icon, text }: TrustBadgeProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'check-circle':
        return <CheckCircle size={16} color={theme.colors.text.secondary} />;
      case 'award':
        return <Award size={16} color={theme.colors.text.secondary} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.badge}>
      {getIcon()}
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
  text: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.xs,
  },
});
