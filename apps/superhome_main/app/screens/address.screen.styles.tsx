import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const addressStyles = StyleSheet.create({
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
  progressContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  progressText: {
    color: theme.colors.text.tertiary,
    fontSize: 12,
    fontWeight: '500',
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
    marginBottom: theme.spacing.xl,
    fontSize: 18,
    lineHeight: 28,
  },
  locationOptions: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  locationOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  locationContent: {
    flex: 1,
  },
  locationTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  locationTitleSelected: {
    color: theme.colors.primary[500],
  },
  locationSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  selectedLocationContainer: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  selectedLabel: {
    color: theme.colors.primary[500],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  selectedAddress: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  instructionsContainer: {
    marginBottom: theme.spacing.lg,
  },
  instructionsTitle: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  instructionsInput: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  instructionsPlaceholder: {
    color: theme.colors.text.tertiary,
  },
  addressInputContainer: {
    marginBottom: theme.spacing.xl,
  },
  inputTitle: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  addressInput: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
    borderStyle: 'dashed',
  },
  addressPlaceholder: {
    color: theme.colors.text.tertiary,
    fontSize: 14,
    lineHeight: 20,
  },
  phoneContainer: {
    marginBottom: theme.spacing.xl,
  },
  phoneTitle: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  phoneInput: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary[200],
    borderStyle: 'dashed',
  },
  phoneInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  phoneIcon: {
    marginRight: theme.spacing.sm,
  },
  phonePlaceholder: {
    color: theme.colors.text.tertiary,
    fontSize: 14,
    lineHeight: 20,
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
  continueButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
