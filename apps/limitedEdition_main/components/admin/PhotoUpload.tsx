import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Image, Alert, Linking, Platform } from 'react-native';
import { storage } from '../../config/firebase';
import theme from '../../theme';
import { Typography } from '../Typography';

interface PhotoUploadProps {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onFileChange?: (file: File | null) => void;
}

const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

export default function PhotoUpload({ imageUrl, onImageUrlChange, onFileChange }: PhotoUploadProps) {
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
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeInKB = Math.round(file.size / 1024);
      Alert.alert(
        'File Too Large',
        `Your photo is ${sizeInKB}KB. Maximum allowed size is 300KB. Please compress your image or choose a smaller file.`
      );
      return;
    }

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

      // Convert file to base64 for local storage
      const reader = new FileReader();
      reader.onload = () => {
        onImageUrlChange(reader.result as string);
        onFileChange?.(file);
      };
      reader.readAsDataURL(file);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      Alert.alert('Error', 'Failed to load image. Please try a different file.');
    };

    img.src = url;
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
          ⚠️ Max file size: 300KB. Square images only.
        </Typography>
        <Typography variant="caption" color="secondary" style={styles.infoText}>
          Need to compress or crop?
        </Typography>
        <Pressable onPress={() => Linking.openURL('https://www.iloveimg.com/compress-image')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            iloveimg.com/compress-image
          </Typography>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.iloveimg.com/crop-image')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            iloveimg.com/crop-image
          </Typography>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://imagecompressor.com/')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            imagecompressor.com
          </Typography>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.freeconvert.com/image-compressor')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            freeconvert.com/image-compressor
          </Typography>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://imageresizer.com/crop-image')}>
          <Typography variant="caption" color="accent" style={styles.linkText}>
            imageresizer.com/crop-image
          </Typography>
        </Pressable>
      </View>

      {imageUrl ? (
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
