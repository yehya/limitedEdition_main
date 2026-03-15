import React, { useState } from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from './components/shared/BackButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { paymentStyles } from './screens/payment.screen.styles';

export default function PaymentScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentOptions = [
    { id: 'card', label: 'Card', subtitle: 'Credit or debit card' },
    { id: 'cash', label: 'Cash', subtitle: 'Pay when service is completed' },
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleConfirm = () => {
    if (selectedPayment) {
      router.push('/confirmation');
    }
  };

  if (isLoading) {
    return (
      <View style={paymentStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={paymentStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={paymentStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={paymentStyles.header}>
          <BackButton onPress={() => router.back()} />
        </View>

        {/* Content */}
        <View style={paymentStyles.content}>
          <Text variant="heading" style={paymentStyles.title}>
            Payment method
          </Text>
          
          <Text variant="body" style={paymentStyles.subtitle}>
            Choose how you'd like to pay
          </Text>

          {/* Payment Options */}
          <View style={paymentStyles.paymentOptionsContainer}>
            {paymentOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  paymentStyles.paymentOption,
                  selectedPayment === option.id && paymentStyles.paymentOptionSelected
                ]}
                onPress={() => handlePaymentSelect(option.id)}
              >
                <View style={paymentStyles.paymentOptionContent}>
                  <Text variant="body" weight="medium" style={[
                    paymentStyles.paymentOptionLabel,
                    selectedPayment === option.id && paymentStyles.paymentOptionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  <Text variant="caption" style={[
                    paymentStyles.paymentOptionSubtitle,
                    selectedPayment === option.id && paymentStyles.paymentOptionSubtitleSelected
                  ]}>
                    {option.subtitle}
                  </Text>
                </View>
                <View style={[
                  paymentStyles.radioButton,
                  selectedPayment === option.id && paymentStyles.radioButtonSelected
                ]} />
              </Pressable>
            ))}
          </View>

          {/* Trust Message */}
          <View style={paymentStyles.trustContainer}>
            <Text variant="caption" style={paymentStyles.trustText}>
              ✔ Platform guarantee on all payments
            </Text>
            <Text variant="caption" style={paymentStyles.trustText}>
              ✔ Secure payment processing
            </Text>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={paymentStyles.bottomSection}>
          <Pressable 
            style={[
              paymentStyles.confirmButton,
              !selectedPayment && paymentStyles.confirmButtonDisabled
            ]}
            onPress={handleConfirm}
            disabled={!selectedPayment}
          >
            <Text variant="body" weight="medium" style={paymentStyles.confirmButtonText}>
              Confirm Booking
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
