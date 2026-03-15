import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const serviceStyles = StyleSheet.create({
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
    marginBottom: theme.spacing.lg,
    fontSize: 18,
    lineHeight: 28,
  },
  priceContainer: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
    gap: theme.spacing.lg,
    shadowColor: theme.colors.primary[200],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  visitFeeSection: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary[200],
    paddingBottom: theme.spacing.md,
  },
  visitFeeLabel: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs / 2,
  },
  visitFeeValue: {
    color: theme.colors.primary[500],
    fontSize: 20,
    fontWeight: '700',
  },
  priceRangeSection: {
    paddingBottom: theme.spacing.md,
  },
  priceLabel: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs / 2,
  },
  price: {
    color: theme.colors.primary[500],
    fontSize: 32,
    fontWeight: '700',
  },
  arrivalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary[200],
  },
  arrivalLeft: {
    gap: theme.spacing.xs / 2,
  },
  arrivalLabel: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs / 2,
  },
  arrivalTime: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  trustMessageContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing['2xl'],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    alignItems: 'center',
  },
  trustMessage: {
    color: theme.colors.primary[500],
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: theme.spacing['2xl'],
  },
  featureItem: {
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  continueButton: {
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
  continueButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
