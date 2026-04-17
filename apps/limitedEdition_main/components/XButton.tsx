import React from 'react';
import { Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import theme from '../theme';

interface XButtonProps {
  onPress: () => void;
}

export default function XButton({ onPress }: XButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <X size={24} color={theme.colors.text.secondary} />
    </Pressable>
  );
}

const styles = {
  container: {
    marginBottom: theme.spacing.xl,
  },
};
