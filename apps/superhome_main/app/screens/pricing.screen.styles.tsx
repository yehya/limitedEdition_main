import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const pricingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
  backButton: {
    color: theme.colors.primary[500],
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontSize: 24,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  plansContainer: {
    marginBottom: theme.spacing.xl,
  },
  planCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
    position: 'relative',
    alignItems: 'center',
  },
  planCardSelected: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
  planName: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  price: {
    color: theme.colors.primary[500],
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  priceLabel: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  selectedText: {
    color: theme.colors.primary[700],
    marginTop: theme.spacing.sm,
    fontWeight: 'bold',
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
  selectedInfo: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  continueButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  continueButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
  },
});
