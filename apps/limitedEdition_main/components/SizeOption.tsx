import React from 'react';
import { Pressable } from 'react-native';
import theme from '../theme';
import { Typography } from './Typography';

interface SizeOptionProps {
  size: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SizeOption({ size, isSelected, onPress }: SizeOptionProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Typography
        variant="body"
        color={isSelected ? 'tertiary' : 'secondary'}
        style={isSelected && styles.selectedText}
      >
        {size}
      </Typography>
    </Pressable>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    minWidth: 60,
    alignItems: 'center' as const,
  },
  selected: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  selectedText: {
    color: '#000000',
  },
};
