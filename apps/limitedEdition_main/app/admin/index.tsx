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
      const checkAdminStatusFn = httpsCallable(functions, 'checkAdminStatusFn');
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

          <Typography variant="h2" style={styles.title}>Admin Access</Typography>

          <Typography variant="body" color="secondary" style={styles.description}>
            Sign in with Google to access the admin dashboard
          </Typography>

          <Pressable style={styles.signInButton} onPress={signInWithGoogle}>
            <Typography variant="body" style={styles.signInButtonText}>Sign in with Google</Typography>
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

          <Typography variant="h2" style={styles.title}>Access Denied</Typography>

          <Typography variant="body" color="secondary" style={styles.description}>
            You do not have permission to access the admin dashboard
          </Typography>

          <Pressable style={styles.signOutButton} onPress={signOut}>
            <Typography variant="body" style={styles.signOutButtonText}>Sign Out</Typography>
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

        <Typography variant="h2" style={styles.title}>Admin Dashboard</Typography>

        <Typography variant="body" color="secondary" style={styles.userInfo}>
          Signed in as {user.email}
        </Typography>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/admin/orders')}
        >
          <Typography variant="h3" style={styles.cardTitle}>Orders</Typography>
          <Typography variant="body" color="secondary">Manage customer orders</Typography>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/admin/products')}
        >
          <Typography variant="h3" style={styles.cardTitle}>Products</Typography>
          <Typography variant="body" color="secondary">Manage product inventory</Typography>
        </Pressable>
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
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  signOutButton: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  title: {
    marginBottom: theme.spacing.lg,
  },
  description: {
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: theme.spacing.xl,
  },
  signInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: theme.colors.text.primary,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  cardTitle: {
    marginBottom: theme.spacing.xs,
  },
});
