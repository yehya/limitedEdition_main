import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import { useAuth } from '../../contexts/AuthContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

export default function AdminDashboard() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

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

  const handleEmailAuth = async () => {
    setAuthError('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      setAuthError(error.message || 'Authentication failed');
    }
  };

  if (loading || checkingAdmin) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.authCenter}>
          <Typography variant="caption" color="secondary" style={styles.eyebrow}>
            RESTRICTED ACCESS
          </Typography>
          <Typography variant="h1" style={styles.authTitle}>ADMIN</Typography>
          <View style={styles.accentRule} />
          <Typography variant="body" color="secondary" style={styles.authDescription}>
            Authorized personnel only. Sign in to continue.
          </Typography>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.text.tertiary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.text.tertiary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          {authError ? (
            <Typography variant="caption" color="error" style={styles.errorText}>
              {authError}
            </Typography>
          ) : null}

          <Pressable style={styles.primaryButton} onPress={handleEmailAuth}>
            <Typography variant="body" style={styles.primaryButtonText}>
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </Typography>
          </Pressable>

          <Pressable onPress={() => setIsSignUp(!isSignUp)}>
            <Typography variant="caption" color="secondary" style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Typography>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.secondaryButton} onPress={signInWithGoogle}>
            <Typography variant="body" style={styles.secondaryButtonText}>SIGN IN WITH GOOGLE</Typography>
          </Pressable>
        </View>
      </View>
    );
  }

  if (isAdminUser === false) {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.topBack}>
          <Typography variant="caption" color="secondary">← BACK</Typography>
        </Pressable>

        <View style={styles.authCenter}>
          <Typography variant="caption" style={{ ...styles.eyebrow, color: theme.colors.error }}>
            403 · FORBIDDEN
          </Typography>
          <Typography variant="h1" style={styles.authTitle}>ACCESS{'\n'}DENIED</Typography>
          <View style={[styles.accentRule, { backgroundColor: theme.colors.error }]} />
          <Typography variant="body" color="secondary" style={styles.authDescription}>
            This account is not authorized to access the admin panel.
          </Typography>
          {user.email && (
            <Typography variant="caption" color="tertiary" style={styles.emailLabel}>
              Signed in as {user.email}
            </Typography>
          )}

          <Pressable style={styles.secondaryButton} onPress={signOut}>
            <Typography variant="body" style={styles.secondaryButtonText}>SIGN OUT</Typography>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="h2">ADMIN</Typography>
          <Pressable style={styles.signOutButton} onPress={signOut}>
            <Typography variant="caption" color="secondary">SIGN OUT</Typography>
          </Pressable>
        </View>

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

        <View style={styles.menuItem}>
          <Pressable 
            style={styles.menuItemContent}
            onPress={() => router.push('/admin/settings')}
          >
            <Typography variant="h3">SETTINGS</Typography>
            <Typography variant="caption" color="secondary">Payment settings</Typography>
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
  topBack: {
    padding: theme.spacing.lg,
  },
  authCenter: {
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
  authTitle: {
    letterSpacing: 2,
    marginBottom: theme.spacing.lg,
  },
  accentRule: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.xl,
  },
  authDescription: {
    marginBottom: theme.spacing.xxl,
    lineHeight: 24,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    color: theme.colors.text.primary,
  },
  errorText: {
    marginBottom: theme.spacing.md,
  },
  toggleText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surface.border,
    marginVertical: theme.spacing.xl,
  },
  emailLabel: {
    marginTop: -theme.spacing.md,
    marginBottom: theme.spacing.xxl,
    letterSpacing: 1,
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
    marginBottom: theme.spacing.xxxl,
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
