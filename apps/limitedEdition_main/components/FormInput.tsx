import React from 'react';
import { TextInput, View } from 'react-native';
import theme from '../theme';
import { Typography } from './Typography';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Typography variant="caption" color="secondary" style={styles.label}>
        {label}
      </Typography>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        keyboardType={keyboardType}
      />
      {error && <Typography variant="caption" color="error" style={styles.error}>{error}</Typography>}
    </View>
  );
}

const styles = {
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.body,
    borderRadius: theme.borderRadius.none,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    marginTop: theme.spacing.xs,
  },
};
