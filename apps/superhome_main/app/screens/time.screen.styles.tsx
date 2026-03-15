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
    backgroundColor: theme.colors.semantic.error + '10',
    borderColor: theme.colors.semantic.error,
    borderWidth: 2,
  },
  emergencyLabel: {
    color: theme.colors.semantic.error,
    fontSize: 19,
    fontWeight: '700',
  },
  emergencySubtitle: {
    color: theme.colors.semantic.error,
    opacity: 0.8,
  },
  emergencyFee: {
    color: theme.colors.text.inverse,
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: theme.colors.semantic.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  emergencyFeeSelected: {
    backgroundColor: theme.colors.text.inverse,
    color: theme.colors.semantic.error,
  },
  emergencyOptionSelected: {
    backgroundColor: theme.colors.semantic.error,
    borderColor: theme.colors.semantic.error,
    borderWidth: 3,
  },
  emergencyLabelSelected: {
    color: theme.colors.text.inverse,
    fontSize: 19,
  },
  emergencySubtitleSelected: {
    color: theme.colors.text.inverse,
    opacity: 0.95,
  },
  emergencyCheckmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.text.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularCheckmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.text.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
