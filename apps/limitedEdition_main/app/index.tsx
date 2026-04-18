import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../theme';
import { Typography } from '../components/Typography';
import { ProductCard } from '../components/ProductCard';
import { app } from '../config/firebase';

const functions = getFunctions(app, 'us-central1');

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

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const getProductsFn = httpsCallable(functions, 'getProductsFnV2');
      const result = await getProductsFn({ limit: 50, offset: 0 });
      const data = result.data as { success: boolean; data: Product[] };
      if (data.success) {
        const visibleProducts = data.data.filter(p => !p.hidden);
        setProducts(visibleProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.background.secondary, theme.colors.background.primary]}
      style={styles.container}
    >
      <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
          </View>
        ) : products.length === 0 ? (
          <View style={styles.center}>
            <Typography variant="h3" style={styles.emptyTitle}>NO PRODUCTS</Typography>
            <Typography variant="caption" color="secondary">Check back soon</Typography>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.gridItem}>
                <ProductCard
                  product={item}
                  onPress={() => router.push(`/product/${item.id}`)}
                />
              </View>
            )}
            ListHeaderComponent={
              <View style={styles.logoContainer}>
                <Image
                  source={require('./assets/limited_edition_logo_cropped.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            }
            contentContainerStyle={styles.scrollContent}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  contentWrapper: {
    flex: 1,
  },
  contentWrapperDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xl,
  },
  logo: {
    width: 200,
    height: 80,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyTitle: {
    marginBottom: theme.spacing.sm,
    letterSpacing: 2,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
});
