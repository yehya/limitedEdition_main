import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';
import theme from '../../theme';
import { Typography } from '../../components/Typography';
import { useAuth } from '../../contexts/AuthContext';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'us-central1');

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

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace('/admin');
      return;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const getOrdersFn = httpsCallable(functions, 'getOrdersFn');
      const result = await getOrdersFn({ limit: 50, offset: 0 });
      const data = result.data as { success: boolean; data: Order[] };
      if (data.success) {
        setOrders(data.data);
      }
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
      const updateOrderStatusFn = httpsCallable(functions, 'updateOrderStatusFn');
      await updateOrderStatusFn({ orderId, status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Typography variant="body">← Back</Typography>
        </Pressable>

        <Typography variant="h2" style={styles.title}>ORDERS</Typography>

        {loading ? (
          <Typography variant="body">Loading...</Typography>
        ) : orders.length === 0 ? (
          <Typography variant="body" color="secondary">No orders</Typography>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Typography variant="body" style={styles.customerName}>
                    {order.customerInfo.name}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {formatDate(order.createdAt)}
                  </Typography>
                </View>
                <View style={styles.cardHeaderRight}>
                  <Typography variant="h3" color="accent">
                    EGP {order.total}
                  </Typography>
                </View>
              </View>

              <View style={styles.section}>
                <Typography variant="caption" color="secondary">CUSTOMER</Typography>
                <Typography variant="body">{order.customerInfo.phone}</Typography>
                <Typography variant="body">{order.customerInfo.address}</Typography>
                <Typography variant="body">{order.customerInfo.city}, {order.customerInfo.governorate}</Typography>
              </View>

              <View style={styles.section}>
                <Typography variant="caption" color="secondary">ITEMS</Typography>
                {order.items.map((item, index) => (
                  <Typography key={index} variant="body">
                    {item.name} ({item.selectedSize}) x {item.quantity} - EGP {item.price * item.quantity}
                  </Typography>
                ))}
              </View>

              <View style={styles.statusSection}>
                <Typography variant="caption" color="secondary">STATUS</Typography>
                <View style={styles.statusButtons}>
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <Pressable
                      key={status}
                      style={[
                        styles.statusButton,
                        order.status === status && styles.statusButtonActive,
                      ]}
                      onPress={() => updateOrderStatus(order.id, status)}
                    >
                      <Typography
                        variant="caption"
                        color={order.status === status ? 'primary' : 'secondary'}
                      >
                        {status.toUpperCase()}
                      </Typography>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
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
  title: {
    marginBottom: theme.spacing.xxxl,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
  },
  customerName: {
    marginBottom: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  statusSection: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface.border,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  statusButton: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  statusButtonActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
});
