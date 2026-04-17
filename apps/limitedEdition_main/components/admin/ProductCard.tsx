import React from 'react';
import { View, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import theme from '../../theme';
import { Typography } from '../Typography';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  soldOut?: boolean;
  hidden?: boolean;
}

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function ProductCard({ product, onEdit, onDelete, isDeleting = false }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.nameRow}>
          <Typography variant="body" style={styles.productName}>
            {product.name}
          </Typography>
          <View style={styles.statusBadges}>
            {product.soldOut && (
              <View style={styles.statusBadge}>
                <Typography variant="small" style={styles.statusBadgeText}>SOLD OUT</Typography>
              </View>
            )}
            {product.hidden && (
              <View style={[styles.statusBadge, styles.hiddenBadge]}>
                <Typography variant="small" style={styles.statusBadgeText}>HIDDEN</Typography>
              </View>
            )}
          </View>
        </View>
        <Typography variant="caption" color="secondary" style={styles.productDescription}>
          {product.description}
        </Typography>
        <Typography variant="h3" color="accent" style={styles.productPrice}>
          EGP {product.price}
        </Typography>
        <Typography variant="caption" color="secondary">
          {Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}
        </Typography>
      </View>
      <View style={styles.cardActions}>
        <Pressable
          style={styles.editButton}
          onPress={onEdit}
        >
          <Typography variant="body">EDIT</Typography>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color={theme.colors.text.primary} />
          ) : (
            <Typography variant="body">DELETE</Typography>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.md,
  },
  cardContent: {
    marginBottom: theme.spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  productName: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusBadges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  statusBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  hiddenBadge: {
    backgroundColor: theme.colors.text.secondary,
  },
  statusBadgeText: {
    color: theme.colors.background.primary,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  productDescription: {
    marginBottom: theme.spacing.xs,
  },
  productPrice: {
    marginBottom: theme.spacing.xs,
  },
  cardActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  editButton: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
});
