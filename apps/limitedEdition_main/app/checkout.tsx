import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import theme from '../theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import XButton from '../components/XButton';
import FormInput from '../components/FormInput';
import { useCart } from '../contexts/CartContext';

export default function CheckoutScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { clearCart, getCartTotal, cart } = useCart();

  // Load form data from AsyncStorage on mount
  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('checkout_name');
      const savedPhone = await AsyncStorage.getItem('checkout_phone');
      const savedAddress = await AsyncStorage.getItem('checkout_address');
      const savedCity = await AsyncStorage.getItem('checkout_city');
      const savedGovernorate = await AsyncStorage.getItem('checkout_governorate');

      if (savedName) setName(savedName);
      if (savedPhone) setPhone(savedPhone);
      if (savedAddress) setAddress(savedAddress);
      if (savedCity) setCity(savedCity);
      if (savedGovernorate) setGovernorate(savedGovernorate);
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  // Save form data to AsyncStorage asynchronously (non-blocking)
  const saveFormData = async () => {
    try {
      await AsyncStorage.setItem('checkout_name', name);
      await AsyncStorage.setItem('checkout_phone', phone);
      await AsyncStorage.setItem('checkout_address', address);
      await AsyncStorage.setItem('checkout_city', city);
      await AsyncStorage.setItem('checkout_governorate', governorate);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Debounce save function to avoid saving on every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFormData();
    }, 500); // Save after 500ms of inactivity

    return () => clearTimeout(timeoutId);
  }, [name, phone, address, city, governorate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{11}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 11 digits';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!governorate.trim()) {
      newErrors.governorate = 'Governorate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    // Clear saved form data after successful order
    try {
      await AsyncStorage.multiRemove([
        'checkout_name',
        'checkout_phone',
        'checkout_address',
        'checkout_city',
        'checkout_governorate',
      ]);
    } catch (error) {
      console.error('Error clearing form data:', error);
    }

    clearCart();
    router.push('/confirmation');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <XButton onPress={() => router.back()} />
          <Typography variant="h2">CHECKOUT</Typography>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Typography variant="body" style={styles.sectionLabel}>
            ORDER SUMMARY
          </Typography>

          {cart.map((item, index) => (
            <View key={index} style={styles.summaryItem}>
              <View style={styles.summaryItemInfo}>
                <Typography variant="body">{item.name}</Typography>
                <Typography variant="caption" color="secondary">
                  Size: {item.selectedSize} | Qty: {item.quantity}
                </Typography>
              </View>
              <Typography variant="body">EGP {item.price * item.quantity}</Typography>
            </View>
          ))}

          <View style={styles.summaryTotal}>
            <Typography variant="body" color="secondary">TOTAL</Typography>
            <Typography variant="h2" color="accent">EGP {getCartTotal()}</Typography>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Typography variant="body" style={styles.sectionLabel}>
            CUSTOMER INFORMATION
          </Typography>

          <FormInput
            label="FULL NAME"
            value={name}
            onChangeText={(text) => { setName(text); setErrors({ ...errors, name: '' }); }}
            placeholder="Enter your name"
            error={errors.name}
          />

          <FormInput
            label="PHONE NUMBER"
            value={phone}
            onChangeText={(text) => { setPhone(text); setErrors({ ...errors, phone: '' }); }}
            placeholder="Enter your phone number"
            error={errors.phone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <Typography variant="body" style={styles.sectionLabel}>
            SHIPPING ADDRESS
          </Typography>

          <FormInput
            label="STREET ADDRESS"
            value={address}
            onChangeText={(text) => { setAddress(text); setErrors({ ...errors, address: '' }); }}
            placeholder="Enter your street address"
            error={errors.address}
          />

          <FormInput
            label="CITY"
            value={city}
            onChangeText={(text) => { setCity(text); setErrors({ ...errors, city: '' }); }}
            placeholder="Enter your city"
            error={errors.city}
          />

          <FormInput
            label="GOVERNORATE"
            value={governorate}
            onChangeText={(text) => { setGovernorate(text); setErrors({ ...errors, governorate: '' }); }}
            placeholder="Enter your governorate"
            error={errors.governorate}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Typography variant="body" style={styles.sectionLabel}>
            PAYMENT METHOD
          </Typography>

          <View style={styles.paymentMethod}>
            <Typography variant="body">CASH ON DELIVERY</Typography>
            <Typography variant="caption" color="secondary">
              Pay when you receive your order
            </Typography>
          </View>
        </View>

        {/* Place Order Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="PLACE ORDER"
            onPress={handlePlaceOrder}
          />
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
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    marginBottom: theme.spacing.md,
  },
  paymentMethod: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface.border,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xxl,
  },
});
