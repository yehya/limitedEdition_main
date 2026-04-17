import React from 'react';
import { View, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import theme from '../theme';
import { Typography } from './Typography';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityControl({ quantity, onIncrease, onDecrease }: QuantityControlProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onDecrease}>
        <Minus size={16} color={theme.colors.text.secondary} />
      </Pressable>
      <Typography variant="body" style={styles.text}>
        {quantity}
      </Typography>
      <Pressable style={styles.button} onPress={onIncrease}>
        <Plus size={16} color={theme.colors.text.secondary} />
      </Pressable>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.sm,
  },
  text: {
    paddingHorizontal: theme.spacing.sm,
  },
};
