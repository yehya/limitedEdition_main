import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme/index';

interface TimeSlotProps {
  time: string;
  subtitle: string;
  estimate: string;
  date: string;
  available: boolean;
  selected: boolean;
  onPress: () => void;
}

export const TimeSlot = ({ time, subtitle, estimate, date, available, selected, onPress }: TimeSlotProps) => {
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
      <View style={styles.slotContent}>
        <View style={styles.mainContent}>
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
          <Text
            variant="caption"
            style={[
              styles.subtitle,
              !available && styles.textUnavailable,
              selected && styles.subtitleSelected,
            ]}
          >
            {subtitle}
          </Text>
        </View>
        <View style={styles.metaContent}>
          <Text
            variant="caption"
            style={[
              styles.estimate,
              !available && styles.textUnavailable,
              selected && styles.estimateSelected,
            ]}
          >
            {estimate}
          </Text>
          <Text
            variant="caption"
            style={[
              styles.date,
              !available && styles.textUnavailable,
              selected && styles.dateSelected,
            ]}
          >
            {date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slot: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
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
  slotContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
  },
  metaContent: {
    alignItems: 'flex-end',
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  textSelected: {
    color: theme.colors.text.inverse,
    fontWeight: '700',
  },
  textUnavailable: {
    color: theme.colors.neutral[500],
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '400',
  },
  subtitleSelected: {
    color: theme.colors.text.inverse,
    opacity: 0.9,
  },
  estimate: {
    color: theme.colors.primary[500],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  estimateSelected: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  date: {
    color: theme.colors.text.tertiary,
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateSelected: {
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
});
