import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const availabilityStyles = StyleSheet.create({
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
  serviceReminder: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 14,
  },
  heading: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontSize: 32,
    fontWeight: '600',
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
  timeSlotsContainer: {
    flexDirection: 'column',
    marginBottom: theme.spacing.xl,
  },
  timeSlot: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
    width: '100%',
  },
  timeSlotSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  timeSlotUnavailable: {
    backgroundColor: theme.colors.neutral[100],
    borderColor: theme.colors.neutral[200],
    opacity: 0.5,
  },
  timeSlotText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  timeSlotTextUnavailable: {
    color: theme.colors.neutral[500],
  },
  unavailableText: {
    color: theme.colors.text.tertiary,
    fontSize: 10,
    marginTop: 2,
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
  selectionInfo: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    fontSize: 24,
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  reserveButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
  },
  reserveButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
});
