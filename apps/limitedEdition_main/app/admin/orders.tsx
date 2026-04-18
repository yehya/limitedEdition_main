import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
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
  paymentMethod?: 'cod' | 'instapay';
  createdAt: any;
}

export default function AdminOrders() {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
  const STATUSES = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Derived: filtered and paginated orders
  const filteredOrders =
    statusFilter === 'all'
      ? allOrders
      : allOrders.filter((o) => o.status === statusFilter);
  const total = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const orders = filteredOrders.slice(page * pageSize, (page + 1) * pageSize);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.replace('/admin');
      return;
    }
  }, [user, mounted]);

  useEffect(() => {
    if (mounted && user) {
      fetchOrders();
    }
  }, [user, mounted]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const getOrdersFn = httpsCallable(functions, 'getOrdersFnV2');
      const result = await getOrdersFn({ limit: 500, offset: 0 });
      const data = result.data as { success: boolean; data: Order[] };
      if (data.success) {
        setAllOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(0);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      let date: Date;
      // Handle serialized Firebase timestamp from Cloud Functions
      if (timestamp._seconds !== undefined) {
        date = new Date(timestamp._seconds * 1000);
      }
      // Handle Firebase Timestamp with toDate method
      else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } 
      // Handle Firebase Timestamp with seconds/nanoseconds (without underscore)
      else if (timestamp.seconds !== undefined) {
        date = new Date(timestamp.seconds * 1000);
      }
      // Handle string timestamps (ISO strings)
      else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      }
      // Handle regular Date objects
      else if (timestamp instanceof Date) {
        date = timestamp;
      }
      // Handle numeric timestamps (milliseconds)
      else if (typeof timestamp === 'number') {
        date = new Date(timestamp);
      }
      else {
        return '';
      }
      
      if (isNaN(date.getTime())) {
        return '';
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error, timestamp);
      return '';
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const previousOrders = allOrders;
    // Optimistic update
    setAllOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setUpdatingOrderId(orderId);
    try {
      const updateOrderStatusFn = httpsCallable(functions, 'updateOrderStatusFnV2');
      await updateOrderStatusFn({ orderId, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
      // Revert on failure
      setAllOrders(previousOrders);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const deleteOrder = async (orderId: string) => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const previousOrders = allOrders;
            // Optimistic update - remove order immediately
            setAllOrders((prev) => prev.filter((o) => o.id !== orderId));
            setDeletingOrderId(orderId);
            try {
              const deleteOrderFn = httpsCallable(functions, 'deleteOrderFnV2');
              await deleteOrderFn({ orderId });
            } catch (error) {
              console.error('Error deleting order:', error);
              // Revert on failure
              setAllOrders(previousOrders);
            } finally {
              setDeletingOrderId(null);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Typography variant="caption" color="secondary">← BACK</Typography>
        </Pressable>

        <Typography variant="h2" style={styles.title}>ORDERS</Typography>

        {/* Status Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {STATUSES.map((status) => (
            <Pressable
              key={status}
              style={[
                styles.filterChip,
                statusFilter === status && styles.filterChipActive,
              ]}
              onPress={() => handleFilterChange(status)}
            >
              <Typography
                variant="caption"
                style={{ color: statusFilter === status ? '#000000' : theme.colors.text.secondary }}
              >
                {status.toUpperCase()}
              </Typography>
            </Pressable>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typography variant="h3" style={styles.emptyTitle}>NO ORDERS</Typography>
            <Typography variant="caption" color="secondary">Orders will appear here</Typography>
          </View>
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
                  <View style={styles.paymentBadge}>
                    <Typography variant="small" style={styles.paymentBadgeText}>
                      {order.paymentMethod === 'instapay' ? 'INSTAPAY' : 'COD'}
                    </Typography>
                  </View>
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
                <View style={styles.statusHeader}>
                  <Typography variant="caption" color="secondary">STATUS</Typography>
                  <View style={styles.headerActions}>
                    {updatingOrderId === order.id && (
                      <ActivityIndicator size="small" color={theme.colors.accent} style={{ marginRight: theme.spacing.sm }} />
                    )}
                    <Pressable
                      onPress={() => deleteOrder(order.id)}
                      disabled={deletingOrderId === order.id}
                      style={styles.deleteButton}
                    >
                      {deletingOrderId === order.id ? (
                        <ActivityIndicator size="small" color={theme.colors.semantic.error} />
                      ) : (
                        <Typography variant="caption" style={styles.deleteButtonText}>DELETE</Typography>
                      )}
                    </Pressable>
                  </View>
                </View>
                <View style={[styles.statusButtons, updatingOrderId === order.id && styles.statusButtonsUpdating]}>
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <Pressable
                      key={status}
                      style={[
                        styles.statusButton,
                        order.status === status && styles.statusButtonActive,
                      ]}
                      onPress={() => updateStatus(order.id, status)}
                      disabled={updatingOrderId === order.id}
                    >
                      <Typography
                        variant="caption"
                        style={{ color: order.status === status ? '#000000' : theme.colors.text.secondary }}
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

        {/* Pagination */}
        {!loading && total > 0 && (
          <View style={styles.pagination}>
            <Pressable
              style={[styles.pageButton, page === 0 && styles.pageButtonDisabled]}
              onPress={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <Typography variant="caption" color="secondary">← PREV</Typography>
            </Pressable>
            <View style={styles.paginationInfo}>
              <Typography variant="caption" color="secondary">
                PAGE {page + 1} / {totalPages} · {total} TOTAL
              </Typography>
              <View style={styles.pageSizeSelector}>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <Pressable
                    key={size}
                    style={[
                      styles.pageSizeOption,
                      pageSize === size && styles.pageSizeOptionActive,
                    ]}
                    onPress={() => handlePageSizeChange(size)}
                  >
                    <Typography
                      variant="caption"
                      style={{ color: pageSize === size ? '#000000' : theme.colors.text.secondary }}
                    >
                      {size}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </View>
            <Pressable
              style={[styles.pageButton, page >= totalPages - 1 && styles.pageButtonDisabled]}
              onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              <Typography variant="caption" color="secondary">NEXT →</Typography>
            </Pressable>
          </View>
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.text.secondary,
    borderRadius: theme.borderRadius.sm,
  },
  deleteButtonText: {
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  statusButtonsUpdating: {
    opacity: 0.6,
  },
  filterRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface.border,
  },
  pageButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  pageButtonDisabled: {
    opacity: 0.3,
  },
  paginationInfo: {
    alignItems: 'center',
  },
  pageSizeSelector: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  pageSizeOption: {
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  pageSizeOptionActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  paymentBadge: {
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  paymentBadgeText: {
    color: theme.colors.background.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
