import { Stack } from 'expo-router';
import { CartProvider } from '../contexts/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="confirmation" />
      </Stack>
    </CartProvider>
  );
}
