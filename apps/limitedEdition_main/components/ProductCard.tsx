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
        <Image source={product.image} style={styles.image} resizeMode="contain" />
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
});
