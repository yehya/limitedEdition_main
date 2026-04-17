import React from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import theme from '../../theme';
import { Typography } from '../Typography';
import PhotoUpload from './PhotoUpload';

interface ProductFormProps {
  formData: {
    name: string;
    description: string;
    price: string;
    image: string;
    sizes: string;
    soldOut: boolean;
    hidden: boolean;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitButtonText: string;
  loading?: boolean;
  onFileChange?: (file: File | null) => void;
}

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;

export default function ProductForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitButtonText,
  loading = false,
  onFileChange,
}: ProductFormProps) {
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Missing Information', 'Please enter a product name');
      return false;
    }

    if (formData.name.length > MAX_NAME_LENGTH) {
      Alert.alert('Name Too Long', `Product name must be ${MAX_NAME_LENGTH} characters or less`);
      return false;
    }

    if (!formData.description.trim()) {
      Alert.alert('Missing Information', 'Please enter a product description');
      return false;
    }

    if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      Alert.alert('Description Too Long', `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
      return false;
    }

    if (!formData.image.trim()) {
      Alert.alert('Missing Photo', 'Please upload a product photo');
      return false;
    }

    if (!formData.price.trim()) {
      Alert.alert('Missing Information', 'Please enter a price');
      return false;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Invalid Price', 'Price must be a positive number');
      return false;
    }

    if (!formData.sizes.trim()) {
      Alert.alert('Missing Information', 'Please enter available sizes');
      return false;
    }

    const sizes = formData.sizes.split(',').map(s => s.trim()).filter(s => s);
    if (sizes.length === 0) {
      Alert.alert('Invalid Sizes', 'Please enter at least one size (e.g., S, M, L)');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3">{submitButtonText}</Typography>
      </View>

      <PhotoUpload
        imageUrl={formData.image}
        onImageUrlChange={(url) => setFormData({ ...formData, image: url })}
        onFileChange={onFileChange}
      />

      <View style={styles.formField}>
        <Typography variant="caption" color="secondary" style={styles.label}>
          NAME
        </Typography>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text.toUpperCase() })}
          placeholder="PRODUCT NAME"
          placeholderTextColor={theme.colors.text.secondary}
          maxLength={MAX_NAME_LENGTH}
          autoCapitalize="characters"
        />
        <Typography variant="small" color="secondary">
          {formData.name.length}/{MAX_NAME_LENGTH}
        </Typography>
      </View>

      <View style={styles.formField}>
        <Typography variant="caption" color="secondary" style={styles.label}>
          DESCRIPTION
        </Typography>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Describe your product..."
          placeholderTextColor={theme.colors.text.secondary}
          multiline
          numberOfLines={3}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        <Typography variant="small" color="secondary">
          {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
        </Typography>
      </View>

      <View style={styles.formField}>
        <Typography variant="caption" color="secondary" style={styles.label}>
          PRICE (EGP)
        </Typography>
        <TextInput
          style={styles.input}
          value={formData.price}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          placeholder="e.g., 299"
          placeholderTextColor={theme.colors.text.secondary}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formField}>
        <Typography variant="caption" color="secondary" style={styles.label}>
          SIZES (comma separated)
        </Typography>
        <TextInput
          style={styles.input}
          value={formData.sizes}
          onChangeText={(text) => setFormData({ ...formData, sizes: text })}
          placeholder="e.g., S, M, L, XL"
          placeholderTextColor={theme.colors.text.secondary}
          autoCapitalize="characters"
        />
      </View>

      <Pressable
        style={styles.toggleContainer}
        onPress={() => setFormData({ ...formData, soldOut: !formData.soldOut })}
      >
        <View style={styles.toggleTrack}>
          <View style={[styles.toggleThumb, formData.soldOut && styles.toggleThumbActive]} />
        </View>
        <Typography variant="body" style={styles.toggleLabel}>SOLD OUT</Typography>
      </Pressable>

      <Pressable
        style={styles.toggleContainer}
        onPress={() => setFormData({ ...formData, hidden: !formData.hidden })}
      >
        <View style={styles.toggleTrack}>
          <View style={[styles.toggleThumb, formData.hidden && styles.toggleThumbActive]} />
        </View>
        <Typography variant="body" style={styles.toggleLabel}>HIDDEN FROM CUSTOMERS</Typography>
      </Pressable>

      <View style={styles.actions}>
        <Pressable style={styles.cancelButton} onPress={onCancel} disabled={loading}>
          <Typography variant="body">CANCEL</Typography>
        </Pressable>
        <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={theme.colors.background.primary} />
          ) : (
            <Typography variant="body" style={styles.submitButtonText}>
              {submitButtonText}
            </Typography>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  formField: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    color: theme.colors.text.primary,
    padding: theme.spacing.md,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: theme.colors.background.primary,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 14,
    padding: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.text.secondary,
    borderRadius: 12,
  },
  toggleThumbActive: {
    backgroundColor: theme.colors.accent,
    transform: [{ translateX: 20 }],
  },
  toggleLabel: {
    marginLeft: theme.spacing.md,
  },
});
