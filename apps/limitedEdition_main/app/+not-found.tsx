import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import theme from '../theme';
import { Typography } from '../components/Typography';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography variant="caption" color="secondary" style={styles.eyebrow}>
            ERROR · 404
          </Typography>
          <Typography variant="h1" style={styles.code}>404</Typography>
          <View style={styles.accentRule} />
          <Typography variant="h3" style={styles.title}>PAGE NOT FOUND</Typography>
          <Typography variant="body" color="secondary" style={styles.description}>
            The page you are looking for does not exist or has been moved.
          </Typography>

          <Pressable style={styles.primaryButton} onPress={() => router.replace('/')}>
            <Typography variant="body" style={styles.primaryButtonText}>BACK TO SHOP</Typography>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  eyebrow: {
    letterSpacing: 3,
    marginBottom: theme.spacing.lg,
  },
  code: {
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: 4,
    marginBottom: theme.spacing.md,
  },
  accentRule: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.xl,
  },
  title: {
    letterSpacing: 2,
    marginBottom: theme.spacing.md,
  },
  description: {
    marginBottom: theme.spacing.xxl,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.background.primary,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
