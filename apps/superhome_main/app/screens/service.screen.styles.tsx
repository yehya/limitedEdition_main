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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  serviceIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  serviceTitleContainer: {
    flex: 1,
  },
  serviceTitle: {
    color: theme.colors.text.primary,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: theme.spacing.xs,
  },
  serviceSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    lineHeight: 24,
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
  pricingCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
  },
  visitFeeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary[200],
  },
  visitFeeLeft: {
    flex: 1,
  },
  visitFeeLabel: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  visitFeeValue: {
    color: theme.colors.primary[500],
    fontSize: 24,
    fontWeight: '700',
  },
  visitFeeIcon: {
    marginLeft: theme.spacing.md,
  },
  priceRangeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  priceLeft: {
    flex: 1,
  },
  priceLabel: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: theme.colors.primary[500],
    fontSize: 36,
    fontWeight: '800',
  },
  priceIcon: {
    marginLeft: theme.spacing.md,
  },
  featuresContainer: {
    marginBottom: theme.spacing.xl,
  },
  featuresTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureIcon: {
    marginRight: theme.spacing.sm,
  },
  featureText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  arrivalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary[100],
  },
  arrivalLeft: {
    gap: theme.spacing.sm,
  },
  arrivalLabel: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  arrivalTime: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  trustMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary[200],
  },
  trustIcon: {
    marginRight: theme.spacing.sm,
  },
  trustMessage: {
    color: theme.colors.primary[500],
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  continueButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 28,
    paddingHorizontal: 40,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
