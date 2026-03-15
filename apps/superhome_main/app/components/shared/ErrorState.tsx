import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { RefreshCw } from 'lucide-react-native';
import { theme } from '@/theme/index';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorState = ({ title, message, onRetry, showRetry = true }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="heading" style={styles.title}>
          {title}
        </Text>
        <Text variant="body" style={styles.message}>
          {message}
        </Text>
        {showRetry && onRetry && (
          <Pressable style={styles.retryButton} onPress={onRetry}>
            <RefreshCw size={20} color={theme.colors.primary[500]} />
            <Text variant="body" style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  message: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  retryText: {
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
});
