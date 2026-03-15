import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const timeStyles = StyleSheet.create({
  timeOptionsContainer: {
    gap: theme.spacing.md,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  timeOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  timeOptionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeOptionText: {
    flex: 1,
  },
  timeOptionLabel: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  timeOptionLabelSelected: {
    color: theme.colors.primary[500],
  },
  timeOptionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  timeOptionSubtitleSelected: {
    color: theme.colors.primary[500],
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.neutral[300],
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  emergencyOption: {
    backgroundColor: theme.colors.semantic.error,
    borderColor: theme.colors.semantic.error,
  },
  emergencyLabel: {
    color: theme.colors.text.inverse,
  },
  emergencySubtitle: {
    color: theme.colors.text.inverse,
  },
  emergencyFee: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: theme.colors.text.inverse + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.borderRadius.sm,
  },
});
