import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const demoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingStart: theme.spacing.lg,
    paddingEnd: theme.spacing.lg,
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
    marginEnd: theme.spacing.md,
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
    paddingStart: theme.spacing.lg,
    paddingEnd: theme.spacing.lg,
  },
  demoHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  demoTitle: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  demoSubtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  messagesContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageWrapper: {
    marginBottom: theme.spacing.md,
    maxWidth: '85%',
  },
  messageBubble: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xs,
  },
  userMessage: {
    backgroundColor: theme.colors.primary[500],
  },
  aiMessage: {
    backgroundColor: theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  systemMessage: {
    backgroundColor: theme.colors.secondary[100],
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
  },
  messageText: {
    lineHeight: 22,
  },
  userMessageText: {
    color: theme.colors.text.inverse,
  },
  aiMessageText: {
    color: theme.colors.text.primary,
  },
  systemMessageText: {
    color: theme.colors.secondary[700],
  },
  timestamp: {
    color: theme.colors.text.tertiary,
    fontSize: 11,
    marginTop: 2,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    alignSelf: 'flex-start',
    maxWidth: 80,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text.tertiary,
    marginHorizontal: 2,
  },
  typingDot2: {
    backgroundColor: theme.colors.text.secondary,
  },
  typingDot3: {
    backgroundColor: theme.colors.text.primary,
  },
  restartContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  restartButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  restartButtonText: {
    color: theme.colors.text.inverse,
  },
});
