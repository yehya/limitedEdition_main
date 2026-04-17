'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    governorate: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    selectedSize: string;
    quantity: number;
  }>;
  total: number;
  status: string;
  createdAt: any;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.toDate()).toLocaleString();
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Orders</h1>
          <Link href="/">
            <button className="bg-gray-900 border border-gray-800 px-6 py-2 rounded-lg hover:border-yellow-500 transition-colors">
              Back to Dashboard
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No orders found</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {order.customerInfo.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <span className="text-yellow-500 font-semibold">
                      EGP {order.total}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">Phone:</span> {order.customerInfo.phone}</p>
                  <p><span className="text-gray-500">Address:</span> {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.governorate}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold mb-2 text-gray-400">Items:</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between">
                        <span>{item.name} (Size: {item.selectedSize}) x {item.quantity}</span>
                        <span>EGP {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
