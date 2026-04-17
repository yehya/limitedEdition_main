import { Stack } from 'expo-router';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="confirmation" />
          <Stack.Screen name="admin/index" />
          <Stack.Screen name="admin/orders" />
          <Stack.Screen name="admin/products" />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
