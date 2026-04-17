import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../../theme';
import ProductForm from '../../../components/admin/ProductForm';
import { app } from '../../../config/firebase';

const functions = getFunctions(app, 'us-central1');

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
}

export default function EditProduct() {
  const { productId } = useLocalSearchParams();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    sizes: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const getProductFn = httpsCallable(functions, 'getProductFnV2');
      const result = await getProductFn({ productId });
      const data = result.data as { success: boolean; data: Product };
      if (data.success) {
        setEditingProduct(data.data);
        setFormData({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price.toString(),
          image: data.data.image,
          sizes: Array.isArray(data.data.sizes) ? data.data.sizes.join(',') : data.data.sizes,
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        sizes: formData.sizes.split(',').map(s => s.trim()),
      };

      if (editingProduct) {
        const updateProductFn = httpsCallable(functions, 'updateProductFnV2');
        await updateProductFn({ productId: editingProduct.id, productData });
        Alert.alert('Success', 'Product updated successfully');
      } else {
        const createProductFn = httpsCallable(functions, 'createProductFnV2');
        await createProductFn({ product: productData });
        Alert.alert('Success', 'Product created successfully');
      }

      router.push('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {fetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.colors.accent} />
          </View>
        ) : (
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
            submitButtonText={editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
            loading={loading}
          />
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
