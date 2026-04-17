import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import { useAuth } from '../../contexts/AuthContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

export default function AdminDashboard() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    setCheckingAdmin(true);
    try {
      const checkAdminStatusFn = httpsCallable(functions, 'checkAdminStatusFnV2');
      const result = await checkAdminStatusFn();
      const data = result.data as { success: boolean; isAdmin: boolean };
      setIsAdminUser(data.isAdmin);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdminUser(false);
    } finally {
      setCheckingAdmin(false);
    }
  };

  if (loading || checkingAdmin) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color={theme.colors.accent} />
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Typography variant="body">← Back</Typography>
          </Pressable>

          <Typography variant="h2" style={styles.title}>ADMIN</Typography>

          <Typography variant="body" color="secondary" style={styles.description}>
            Sign in to access
          </Typography>

          <Pressable style={styles.primaryButton} onPress={signInWithGoogle}>
            <Typography variant="body" style={styles.primaryButtonText}>Sign In</Typography>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  if (isAdminUser === false) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Typography variant="body">← Back</Typography>
          </Pressable>

          <Typography variant="h2" style={styles.title}>ACCESS DENIED</Typography>

          <Typography variant="body" color="secondary" style={styles.description}>
            Not authorized
          </Typography>

          <Pressable style={styles.secondaryButton} onPress={signOut}>
            <Typography variant="body" style={styles.secondaryButtonText}>Sign Out</Typography>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Typography variant="body">← Back</Typography>
          </Pressable>
          <Pressable style={styles.signOutButton} onPress={signOut}>
            <Typography variant="caption">Sign Out</Typography>
          </Pressable>
        </View>

        <Typography variant="h2" style={styles.title}>ADMIN</Typography>

        <View style={styles.menuItem}>
          <Pressable 
            style={styles.menuItemContent}
            onPress={() => router.push('/admin/orders')}
          >
            <Typography variant="h3">ORDERS</Typography>
            <Typography variant="caption" color="secondary">Manage orders</Typography>
          </Pressable>
        </View>

        <View style={styles.menuItem}>
          <Pressable 
            style={styles.menuItemContent}
            onPress={() => router.push('/admin/products')}
          >
            <Typography variant="h3">PRODUCTS</Typography>
            <Typography variant="caption" color="secondary">Manage products</Typography>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xxxl,
  },
  description: {
    marginBottom: theme.spacing.xl,
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
  },
  secondaryButton: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
  },
  signOutButton: {
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  menuItem: {
    backgroundColor: theme.colors.surface.card,
    marginBottom: theme.spacing.md,
  },
  menuItemContent: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
});
