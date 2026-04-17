import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Image, Alert, ActivityIndicator, Linking, Platform } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import theme from '../../theme';
import { Typography } from '../Typography';

interface PhotoUploadProps {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
}

export default function PhotoUpload({ imageUrl, onImageUrlChange }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        await validateAndUploadImage(target.files[0]);
      }
    };
    input.click();
  };

  const validateAndUploadImage = async (file: File) => {
    // Validate image dimensions
    const img = new (window as any).Image();
    const url = URL.createObjectURL(file);
    
    img.onload = async () => {
      URL.revokeObjectURL(url);
      
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      
      // Allow aspect ratio between 1:1.2 and 1.2:1 (squarish images only)
      const minRatio = 0.83; // 1:1.2
      const maxRatio = 1.2;  // 1.2:1
      
      if (aspectRatio < minRatio || aspectRatio > maxRatio) {
        Alert.alert(
          'Please Use a Square Image',
          'Your image is too wide or too tall. Please use a square-shaped image (like a square photo) for best results.'
        );
        return;
      }
      
      await uploadImage(file);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      Alert.alert('Error', 'Failed to load image');
    };
    
    img.src = url;
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      const blob = file;
      const filename = `products/${Date.now()}.${file.name.split('.').pop()}`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      onImageUrlChange(downloadUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="caption" color="secondary" style={styles.label}>
        PHOTO
      </Typography>

      <View style={styles.infoBox}>
        <Typography variant="caption" color="secondary" style={styles.infoText}>
          💡 Tip: Remove the background from your photo at
        </Typography>
        <Pressable onPress={() => Linking.openURL('https://www.remove.bg/')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            https://www.remove.bg/
          </Typography>
        </Pressable>
        <Typography variant="caption" color="secondary" style={styles.infoText}>
          for a cleaner look
        </Typography>
        <Typography variant="caption" color="secondary" style={styles.infoText}>
          ⚠️ Please upload square images for best results
        </Typography>
      </View>

      {uploading ? (
        <View style={styles.uploadContainer}>
          <ActivityIndicator color={theme.colors.accent} />
        </View>
      ) : imageUrl ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUrl }} style={styles.preview} />
          <Pressable style={styles.removeButton} onPress={() => onImageUrlChange('')}>
            <Typography variant="caption" style={styles.removeButtonText}>REMOVE</Typography>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.uploadContainer} onPress={pickImage}>
          <Typography variant="body" style={styles.uploadText}>UPLOAD PHOTO</Typography>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  infoBox: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  infoText: {
    marginBottom: theme.spacing.xs,
  },
  linkText: {
    marginBottom: theme.spacing.xs,
  },
  uploadContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    borderStyle: 'dashed',
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  uploadText: {
    color: theme.colors.text.secondary,
  },
  previewContainer: {
    position: 'relative',
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: theme.borderRadius.md,
  },
  removeButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  removeButtonText: {
    color: theme.colors.text.primary,
  },
});
