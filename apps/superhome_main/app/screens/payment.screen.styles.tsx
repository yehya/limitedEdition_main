import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const paymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    fontSize: 18,
    lineHeight: 28,
  },
  paymentOptionsContainer: {
    gap: theme.spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  paymentOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  paymentOptionContent: {
    flex: 1,
  },
  paymentOptionLabel: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  paymentOptionLabelSelected: {
    color: theme.colors.primary[500],
  },
  paymentOptionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  paymentOptionSubtitleSelected: {
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
  trustContainer: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  trustText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  confirmButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  confirmButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
