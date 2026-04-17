import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import theme from '../../../theme';
import ProductForm from '../../../components/admin/ProductForm';
import { app } from '../../../config/firebase';
import { storage } from '../../../config/firebase';

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

export default function EditProduct() {
  const { productId } = useLocalSearchParams();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    sizes: '',
    soldOut: false,
    hidden: false,
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
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
      setFileToUpload(null);
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
          soldOut: (data.data as any).soldOut || false,
          hidden: (data.data as any).hidden || false,
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

      let imageUrl = formData.image;

      // Upload new photo if there's a file
      if (fileToUpload) {
        const filename = `products/${Date.now()}.${fileToUpload.name.split('.').pop()}`;
        const storageRef = ref(storage, filename);
        const metadata = {
          cacheControl: 'public, max-age=31536000', // Cache for 1 year
        };
        await uploadBytes(storageRef, fileToUpload, metadata);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: imageUrl,
        sizes: formData.sizes.split(',').map(s => s.trim()),
        soldOut: formData.soldOut,
        hidden: formData.hidden,
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
    } catch (error: any) {
      console.error('Error saving product:', error);
      let errorMessage = 'Failed to save product';
      
      // Check for specific Firebase/Cloud Function errors
      if (error.code === 'functions/permission-denied') {
        errorMessage = 'You do not have permission to create or edit products';
      } else if (error.code === 'functions/invalid-argument') {
        errorMessage = 'Invalid product data. Please check all fields and try again.';
      } else if (error.code === 'functions/resource-exhausted') {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (error.code === 'functions/internal') {
        errorMessage = 'Server error occurred. Please try again.';
      } else if (error.code === 'storage/unauthorized') {
        errorMessage = 'You do not have permission to upload images';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
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
            onFileChange={setFileToUpload}
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
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
});
