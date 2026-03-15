import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const jobTrackingStyles = StyleSheet.create({
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
  statusHeader: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  statusTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  etaText: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600',
  },
  mapContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing['3xl'],
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  mapText: {
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
  },
  professionalCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  professionalHeader: {
    marginBottom: theme.spacing.md,
  },
  professionalInfo: {
    gap: theme.spacing.xs,
  },
  professionalName: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600',
  },
  verifiedBadge: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  professionalStats: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  actionButtonText: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  statusTracker: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  trackerTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.lg,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  statusDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotCompleted: {
    backgroundColor: theme.colors.primary[500],
  },
  statusDotActive: {
    backgroundColor: theme.colors.primary[500],
    borderWidth: 3,
    borderColor: theme.colors.primary[200],
  },
  statusLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
  },
  statusLabelCompleted: {
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  statusLabelActive: {
    color: theme.colors.primary[500],
    fontWeight: '700',
  },
  supportText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
  },
});
