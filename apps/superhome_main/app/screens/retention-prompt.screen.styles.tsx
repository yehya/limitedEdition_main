import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const retentionPromptStyles = StyleSheet.create({
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
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  optionCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
    position: 'relative',
  },
  optionCardSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    paddingRight: theme.spacing['3xl'],
  },
  optionLabel: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: theme.colors.primary[500],
  },
  optionPrice: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  optionPriceSelected: {
    color: theme.colors.primary[500],
  },
  optionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: theme.spacing.md,
  },
  optionSubtitleSelected: {
    color: theme.colors.primary[500],
  },
  radioButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.neutral[300],
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  benefitsContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  benefitsTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  benefitItem: {
    marginBottom: theme.spacing.sm,
  },
  benefitText: {
    color: theme.colors.text.primary,
    fontSize: 14,
  },
  bottomSection: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
  },
  notNowButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral[200],
    paddingVertical: 20,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  notNowButtonText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    flex: 2,
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 20,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
  },
  bookButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '600',
  },
});
