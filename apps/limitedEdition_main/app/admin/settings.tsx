import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import { useAuth } from '../../contexts/AuthContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

export default function AdminSettings() {
  const { user } = useAuth();
  const [instapayPhone, setInstapayPhone] = useState('');
  const [instapayHandle, setInstapayHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const fn = httpsCallable(functions, 'getPaymentSettingsFnV2');
      const result = await fn({});
      const data = result.data as { success: boolean; data: { instapayPhone: string; instapayHandle: string } };
      if (data.success) {
        setInstapayPhone(data.data.instapayPhone);
        setInstapayHandle(data.data.instapayHandle);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const fn = httpsCallable(functions, 'updatePaymentSettingsFnV2');
      await fn({ instapayPhone, instapayHandle });
      Alert.alert('Saved', 'Payment settings updated successfully');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Typography variant="caption" color="secondary">← BACK</Typography>
        </Pressable>

        <Typography variant="h2" style={styles.title}>SETTINGS</Typography>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
          </View>
        ) : (
          <View style={styles.section}>
            <Typography variant="caption" color="secondary" style={styles.sectionLabel}>
              INSTAPAY PAYMENT DETAILS
            </Typography>
            <Typography variant="caption" color="tertiary" style={styles.sectionHint}>
              These details are shown to customers at checkout when InstaPay is selected.
            </Typography>

            <View style={styles.field}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                PHONE NUMBER
              </Typography>
              <TextInput
                style={styles.input}
                value={instapayPhone}
                onChangeText={setInstapayPhone}
                placeholder="01XXXXXXXXX"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                INSTAPAY HANDLE
              </Typography>
              <TextInput
                style={styles.input}
                value={instapayHandle}
                onChangeText={setInstapayHandle}
                placeholder="@yourhandle"
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="none"
              />
            </View>

            <Pressable
              style={[styles.saveButton, saving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color={theme.colors.background.primary} />
              ) : (
                <Typography variant="body" style={styles.saveButtonText}>SAVE</Typography>
              )}
            </Pressable>
          </View>
        )}
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
  backButton: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xxxl,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  section: {
    backgroundColor: theme.colors.surface.card,
    padding: theme.spacing.lg,
  },
  sectionLabel: {
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
  },
  sectionHint: {
    marginBottom: theme.spacing.xl,
    lineHeight: 18,
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.body,
  },
  saveButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: theme.colors.background.primary,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
