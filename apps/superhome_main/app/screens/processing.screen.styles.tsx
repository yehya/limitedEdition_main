import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const processingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  header: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
  backButton: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.base,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestText: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    fontStyle: 'italic',
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['3xl'],
  },
  processingText: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '500',
    marginTop: theme.spacing.xl,
  },
  spinner: {
    marginBottom: theme.spacing.lg,
  },
  trustText: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
