import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const priceApprovalStyles = StyleSheet.create({
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
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
    textAlign: 'center',
  },
  priceCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
  },
  priceLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.sm,
  },
  priceValue: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: '700',
  },
  tasksContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  tasksTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  taskName: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
  },
  taskPrice: {
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
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  supportText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
  },
  bottomSection: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral[200],
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
  },
  approveButton: {
    flex: 2,
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  approveButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
  },
});
