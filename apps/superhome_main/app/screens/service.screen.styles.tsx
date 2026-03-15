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
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
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
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
  },
  price: {
    color: theme.colors.primary[500],
    fontSize: 24,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  arrivalTime: {
    color: theme.colors.text.secondary,
    fontSize: 16,
  },
  description: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    fontSize: 18,
    lineHeight: 28,
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
