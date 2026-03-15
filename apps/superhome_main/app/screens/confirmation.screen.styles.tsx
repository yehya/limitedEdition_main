import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const confirmationStyles = StyleSheet.create({
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
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  successIconText: {
    color: theme.colors.text.inverse,
    fontSize: 32,
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  bookingRef: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  professionalContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  professionalCard: {
    padding: theme.spacing.lg,
  },
  professionalInfo: {
    gap: theme.spacing.sm,
  },
  professionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  professionalNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  professionalIcon: {
    marginRight: theme.spacing.sm,
  },
  professionalName: {
    color: theme.colors.text.primary,
    fontSize: 18,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  verifiedBadge: {
    color: theme.colors.semantic.success,
    fontSize: 12,
  },
  professionalStatsContainer: {
    marginTop: theme.spacing.xs,
  },
  professionalStats: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  etaContainer: {
    gap: theme.spacing.sm,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  etaLabel: {
    color: theme.colors.primary[500],
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  detailsContainer: {
    width: '100%',
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  detailIconContainer: {
    marginRight: theme.spacing.sm,
  },
  detailLabel: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    flex: 1,
  },
  detailValue: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  calloutContainer: {
    width: '100%',
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary[500],
  },
  calloutText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  trustHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  trustIcon: {
    marginRight: theme.spacing.sm,
  },
  trustTitle: {
    color: theme.colors.semantic.success,
    fontSize: 14,
    fontWeight: '600',
  },
  supportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  supportIcon: {
    marginRight: theme.spacing.sm,
  },
  supportText: {
    color: theme.colors.text.tertiary,
    fontSize: 13,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontSize: 18,
  },
  detailsCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    width: '100%',
  },
  detail: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  nextText: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  trustContainer: {
    width: '100%',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
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
  doneButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  doneButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
});
