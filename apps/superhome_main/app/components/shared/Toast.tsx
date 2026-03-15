import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from '@/components/Text';
import { CheckCircle, AlertCircle, X } from 'lucide-react-native';
import { theme } from '@/theme/index';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  onHide?: () => void;
}

export const Toast = ({ type, message, duration = 3000, onHide }: ToastProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after duration
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onHide?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, duration, onHide]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color={theme.colors.text.inverse} />;
      case 'error':
        return <AlertCircle size={20} color={theme.colors.text.inverse} />;
      default:
        return <AlertCircle size={20} color={theme.colors.text.inverse} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.semantic.success;
      case 'error':
        return theme.colors.semantic.error;
      default:
        return theme.colors.primary[500];
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={[styles.toast, { backgroundColor: getBackgroundColor() }]}>
        {getIcon()}
        <Text variant="caption" style={styles.message}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.spacing['3xl'],
    left: theme.spacing.xl,
    right: theme.spacing.xl,
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
    shadowColor: theme.colors.shadow.lg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    color: theme.colors.text.inverse,
    flex: 1,
    fontWeight: '500',
  },
});
