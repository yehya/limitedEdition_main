import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
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

  useEffect(() => {
    if (!user) {
      router.replace('/admin');
      return;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    sizes: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const getProductsAdminFn = httpsCallable(functions, 'getProductsAdminFn');
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

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.description || !formData.price || !formData.image || !formData.sizes) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        sizes: formData.sizes.split(',').map(s => s.trim()),
      };

      if (editingProduct) {
        const updateProductFn = httpsCallable(functions, 'updateProductFn');
        await updateProductFn({ productId: editingProduct.id, productData });
      } else {
        const createProductFn = httpsCallable(functions, 'createProductFn');
        await createProductFn({ product: productData });
      }

      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', image: '', sizes: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      sizes: product.sizes.join(', '),
    });
    setShowModal(true);
  };

  const handleDelete = async (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const deleteProductFn = httpsCallable(functions, 'deleteProductFn');
              await deleteProductFn({ productId });
              fetchProducts();
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          },
        },
      ]
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', image: '', sizes: '' });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Typography variant="body">← Back</Typography>
        </Pressable>

        <View style={styles.header}>
          <Typography variant="h2">Products</Typography>
          <Pressable
            style={styles.addButton}
            onPress={() => setShowModal(true)}
          >
            <Typography variant="body" style={styles.addButtonText}>+ Add</Typography>
          </Pressable>
        </View>

        {loading ? (
          <Typography variant="body">Loading products...</Typography>
        ) : products.length === 0 ? (
          <Typography variant="body" color="secondary">No products found</Typography>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Typography variant="body" style={styles.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color="secondary" style={styles.productDescription}>
                    {product.description}
                  </Typography>
                  <Typography variant="h3" color="accent" style={styles.productPrice}>
                    EGP {product.price}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Sizes: {product.sizes.join(', ')}
                  </Typography>
                </View>
              </View>
              <View style={styles.cardActions}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleEdit(product)}
                >
                  <Typography variant="body">Edit</Typography>
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(product.id)}
                >
                  <Typography variant="body">Delete</Typography>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Typography variant="h3" style={styles.modalTitle}>
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </Typography>

            <View style={styles.formField}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                Name
              </Typography>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Product name"
                placeholderTextColor={theme.colors.text.tertiary}
              />
            </View>

            <View style={styles.formField}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                Description
              </Typography>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Product description"
                placeholderTextColor={theme.colors.text.tertiary}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formField}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                Price
              </Typography>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
                placeholder="Price"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formField}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                Image URL
              </Typography>
              <TextInput
                style={styles.input}
                value={formData.image}
                onChangeText={(text) => setFormData({ ...formData, image: text })}
                placeholder="https://..."
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Typography variant="caption" color="secondary" style={styles.label}>
                Sizes (comma separated)
              </Typography>
              <TextInput
                style={styles.input}
                value={formData.sizes}
                onChangeText={(text) => setFormData({ ...formData, sizes: text })}
                placeholder="S, M, L, XL"
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Typography variant="body">Cancel</Typography>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSubmit}>
                <Typography variant="body" style={styles.saveButtonText}>
                  {editingProduct ? 'Update' : 'Add'}
                </Typography>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  addButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  addButtonText: {
    color: '#000000',
    fontWeight: '600',
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    marginBottom: theme.spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  productName: {
    marginBottom: theme.spacing.xs,
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
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    marginBottom: theme.spacing.xl,
  },
  formField: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    color: theme.colors.text.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.none,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000000',
    fontWeight: '600',
  },
});
