import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import { Plus } from 'lucide-react-native';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import ProductCard from '../../components/admin/ProductCard';
import { useAuth } from '../../contexts/AuthContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
}

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user && mounted) {
      router.replace('/admin');
      return;
    }
  }, [user, mounted]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const getProductsAdminFn = httpsCallable(functions, 'getProductsAdminFnV2');
      const result = await getProductsAdminFn({ limit: 50, offset: 0 });
      const data = result.data as { success: boolean; data: Product[] };
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/edit?productId=${product.id}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      setDeletingProductId(productId);
      const deleteProductFn = httpsCallable(functions, 'deleteProductFnV2');
      await deleteProductFn({ productId });
      Alert.alert('Success', 'Product deleted successfully');
      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Typography variant="caption" color="secondary">← BACK</Typography>
        </Pressable>

        <View style={styles.header}>
          <Typography variant="h2">PRODUCTS</Typography>
          <Pressable style={styles.addButton} onPress={() => router.push('/admin/products/edit')}>
            <Plus size={24} color={theme.colors.background.primary} />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
          </View>
        ) : products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typography variant="h3" style={styles.emptyTitle}>NO PRODUCTS</Typography>
            <Typography variant="caption" color="secondary">Tap + to add one</Typography>
          </View>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
              isDeleting={deletingProductId === product.id}
            />
          ))
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  addButton: {
    backgroundColor: theme.colors.accent,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emptyTitle: {
    marginBottom: theme.spacing.sm,
    letterSpacing: 2,
  },
});
