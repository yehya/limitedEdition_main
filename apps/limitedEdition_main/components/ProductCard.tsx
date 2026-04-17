import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import { Product } from '../mockData';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={[styles.image, product.soldOut && styles.imageSoldOut]}
          resizeMode="contain"
          cache="force-cache"
        />
        {product.soldOut && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutText}>SOLD OUT</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>EGP {product.price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.card,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.none,
    overflow: 'hidden',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize.caption,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.fontSize.caption,
    fontWeight: '400',
    color: theme.colors.text.secondary,
  },
  imageSoldOut: {
    opacity: 0.6,
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  soldOutText: {
    color: '#FFE066',
    fontSize: theme.typography.fontSize.h3,
    fontWeight: '700',
    letterSpacing: 4,
    transform: [{ rotate: '-15deg' }],
    textAlign: 'center',
    opacity: 0.8,
  },
});
