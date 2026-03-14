import { Stack } from 'expo-router';
import { RTLProvider } from '@/contexts/RTLContext';

export default function RootLayout() {
  return (
    <RTLProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="processing" />
        <Stack.Screen name="identification" />
        <Stack.Screen name="pricing" />
        <Stack.Screen name="availability" />
        <Stack.Screen name="confirmation" />
      </Stack>
    </RTLProvider>
  );
}
