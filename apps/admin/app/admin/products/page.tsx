'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
      const q = query(collection(db, 'products'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        sizes: formData.sizes.split(',').map(s => s.trim()),
      };

      if (editingProduct) {
        await setDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        const newDocRef = doc(collection(db, 'products'));
        await setDoc(newDocRef, productData);
      }

      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', image: '', sizes: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
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
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', image: '', sizes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Products</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add Product
            </button>
            <Link href="/">
              <button className="bg-gray-900 border border-gray-800 px-6 py-2 rounded-lg hover:border-yellow-500 transition-colors">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-yellow-500 font-semibold mb-2">EGP {product.price}</p>
                  <p className="text-gray-500 text-sm mb-4">Sizes: {product.sizes.join(', ')}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-gray-800 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-900 py-2 rounded hover:bg-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-800 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    {editingProduct ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
