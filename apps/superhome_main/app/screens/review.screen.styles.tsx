import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const reviewStyles = StyleSheet.create({
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
  ratingContainer: {
    marginBottom: theme.spacing.xl,
  },
  question: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  ratingButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  ratingButtonGoodActive: {
    backgroundColor: theme.colors.semantic.success,
    borderColor: theme.colors.semantic.success,
  },
  ratingButtonBadActive: {
    backgroundColor: theme.colors.semantic.error,
    borderColor: theme.colors.semantic.error,
  },
  ratingButtonText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  ratingButtonTextActive: {
    color: theme.colors.text.inverse,
  },
  commentContainer: {
    marginBottom: theme.spacing.xl,
  },
  commentLabel: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  commentInput: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    color: theme.colors.text.primary,
    minHeight: 120,
  },
  trustContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  trustText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
  },
  skipButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral[200],
    paddingVertical: 20,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  skipButtonText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 20,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
  },
  submitButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '600',
  },
});
