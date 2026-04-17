import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import theme from '../theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import XButton from '../components/XButton';
import QuantityControl from '../components/QuantityControl';
import RemoveButton from '../components/RemoveButton';
import { useCart } from '../contexts/CartContext';

export default function CartScreen() {
  const { cart, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const total = getCartTotal();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Typography variant="h2" style={styles.emptyText}>
            YOUR CART IS EMPTY
          </Typography>
          <Button
            title="CONTINUE SHOPPING"
            onPress={() => router.back()}
            style={styles.emptyButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <XButton onPress={() => router.back()} />
          <Typography variant="h2">YOUR CART</Typography>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          {cart.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemMain}>
                <View style={styles.itemInfo}>
                  <Typography variant="body">{item.name}</Typography>
                  <Typography variant="caption" color="secondary">
                    Size: {item.selectedSize}
                  </Typography>
                </View>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                />
              </View>
              <View style={styles.itemFooter}>
                <Typography variant="h3" color="accent">EGP {item.price * item.quantity}</Typography>
                <RemoveButton onPress={() => removeFromCart(item.id, item.selectedSize)} />
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <Typography variant="body" color="secondary">TOTAL</Typography>
          <Typography variant="h2" color="accent">EGP {total}</Typography>
        </View>

        {/* Checkout Button */}
        <View style={styles.buttonContainer}>
          <Button title="PROCEED TO CHECKOUT" onPress={handleCheckout} />
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
  header: {
    marginBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  emptyButton: {
    width: '100%',
  },
  itemsContainer: {
    marginBottom: theme.spacing.xxl,
  },
  item: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  itemMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xxl,
  },
});
