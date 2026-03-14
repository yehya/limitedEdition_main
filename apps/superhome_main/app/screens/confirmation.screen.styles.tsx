import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const confirmationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
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
  detailsContainer: {
    width: '100%',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  detailLabel: {
    color: theme.colors.text.secondary,
    fontSize: 16,
  },
  detailValue: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  calloutContainer: {
    width: '100%',
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary[500],
  },
  calloutText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  supportText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
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
  trustText: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
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
