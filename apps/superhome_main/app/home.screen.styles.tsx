import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  rtl: {
    direction: 'rtl',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  logoText: {
    color: theme.colors.text.inverse,
  },
  brandName: {
    color: theme.colors.text.primary,
  },
  languageButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.neutral[100],
  },
  languageText: {
    color: theme.colors.text.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  heroSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
  },
  heroTitle: {
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  features: {
    marginBottom: theme.spacing['3xl'],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.neutral[50],
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTitle: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    flex: 1,
  },
  featureDescription: {
    color: theme.colors.text.secondary,
    flex: 1,
  },
  ctaSection: {
    alignItems: 'center',
    paddingBottom: theme.spacing['3xl'],
  },
  ctaSubtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
