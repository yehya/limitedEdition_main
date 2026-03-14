import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: theme.spacing['2xl'],
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  brandNameBold: {
    color: theme.colors.primary[500],
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  brandNameThin: {
    color: theme.colors.text.primary,
    fontSize: 42,
    fontWeight: '200',
    letterSpacing: -1,
  },
  tagline: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontSize: 32,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  textInput: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.text.primary,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  trustContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  trustIcon: {
    fontSize: 16,
    color: theme.colors.secondary[500],
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
  submitButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 20,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontSize: 12,
    marginTop: theme.spacing.md,
  },
});
