import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const jobCompletedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.semantic.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  summaryTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  summaryLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
  },
  summaryValue: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },
  paymentCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
  },
  paymentTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  paymentItem: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary[200],
  },
  paymentLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.xs,
  },
  paymentAmount: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: '700',
  },
  paymentMethod: {
    paddingTop: theme.spacing.md,
    alignItems: 'center',
  },
  paymentMethodLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.xs,
    marginBottom: theme.spacing.xs / 2,
  },
  paymentMethodValue: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },
  trustContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  trustText: {
    color: theme.colors.semantic.success,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  supportText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  reviewButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600',
  },
});
