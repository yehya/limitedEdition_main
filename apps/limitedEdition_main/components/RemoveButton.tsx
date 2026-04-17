import React from 'react';
import { Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import theme from '../theme';

interface RemoveButtonProps {
  onPress: () => void;
}

export default function RemoveButton({ onPress }: RemoveButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <X size={20} color={theme.colors.text.tertiary} />
    </Pressable>
  );
}

const styles = {
  container: {
    padding: theme.spacing.xs,
  },
};
