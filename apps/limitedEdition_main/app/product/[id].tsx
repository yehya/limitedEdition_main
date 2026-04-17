import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, useWindowDimensions, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import XButton from '../../components/XButton';
import SizeOption from '../../components/SizeOption';
import { useCart } from '../../contexts/CartContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const getProductFn = httpsCallable(functions, 'getProductFnV2');
      const result = await getProductFn({ productId: id });
      const data = result.data as { success: boolean; data: any };
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Typography variant="body">Loading...</Typography>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Typography variant="body">Product not found</Typography>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAddingToCart(true);
    addToCart(product, selectedSize);
    setTimeout(() => {
      setAddingToCart(false);
      Alert.alert('Success', 'Item added to cart');
      router.push('/cart');
    }, 300);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.inner, isDesktop && styles.innerDesktop]}>
          <XButton onPress={() => router.back()} />

          <View style={[styles.layout, isDesktop && styles.layoutDesktop]}>
            <View style={[styles.imageContainer, isDesktop && styles.imageContainerDesktop]}>
              <Image source={product.image} style={styles.image} resizeMode="contain" />
            </View>

            <View style={[styles.infoContainer, isDesktop && styles.infoContainerDesktop]}>
            <Typography variant="h2" style={styles.name}>
              {product.name}
            </Typography>
            <Typography variant="h3" color="accent" style={styles.price}>
              EGP {product.price}
            </Typography>
            <Typography variant="body" color="secondary" style={styles.description}>
              {product.description}
            </Typography>

            <View style={styles.sizeSection}>
              <Typography variant="body" style={styles.sizeLabel}>
                SIZE
              </Typography>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <SizeOption
                    key={size}
                    size={size}
                    isSelected={selectedSize === size}
                    onPress={() => setSelectedSize(size)}
                  />
                ))}
              </View>
            </View>

            <Button
              title="ADD TO CART"
              onPress={handleAddToCart}
              disabled={!selectedSize || addingToCart}
            />
            {addingToCart && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator color={theme.colors.background.primary} />
              </View>
            )}
          </View>
          </View>
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
  inner: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  innerDesktop: {
    maxWidth: 1200,
  },
  layout: {
    width: '100%',
  },
  layoutDesktop: {
    flexDirection: 'row',
    gap: theme.spacing.xxl,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  imageContainerDesktop: {
    flex: 1,
    marginBottom: 0,
  },
  infoContainerDesktop: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  name: {
    marginBottom: theme.spacing.sm,
  },
  price: {
    marginBottom: theme.spacing.lg,
  },
  description: {
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  sizeSection: {
    marginBottom: theme.spacing.xl,
  },
  sizeLabel: {
    marginBottom: theme.spacing.md,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: theme.borderRadius.md,
  },
});
