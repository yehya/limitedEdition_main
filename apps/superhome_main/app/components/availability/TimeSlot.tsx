import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

interface TimeSlotProps {
  time: string;
  available: boolean;
  selected: boolean;
  onPress: () => void;
}

export const TimeSlot = ({ time, available, selected, onPress }: TimeSlotProps) => {
  return (
    <Pressable
      style={[
        styles.slot,
        !available && styles.slotUnavailable,
        selected && styles.slotSelected,
      ]}
      onPress={onPress}
      disabled={!available}
    >
      <Text
        variant="body"
        style={[
          styles.text,
          !available && styles.textUnavailable,
          selected && styles.textSelected,
        ]}
      >
        {time}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slot: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
    width: '100%',
  },
  slotSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  slotUnavailable: {
    backgroundColor: theme.colors.neutral[100],
    borderColor: theme.colors.neutral[200],
    opacity: 0.5,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  textSelected: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  textUnavailable: {
    color: theme.colors.neutral[500],
  },
});
