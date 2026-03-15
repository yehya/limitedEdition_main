import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { ScreenLayout } from './components/shared/ScreenLayout';
import { ScreenHeader } from './components/shared/ScreenHeader';
import { ScreenContent } from './components/shared/ScreenContent';
import { ScreenTitle } from './components/shared/ScreenTitle';
import { BottomButton } from './components/shared/BottomButton';
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
    return <ScreenLayout showScrollView={false} />;
  }

  return (
    <ScreenLayout>
      <ScreenHeader onBack={() => router.back()} />
      
      <ScreenContent>
        <ScreenTitle 
          title="Payment method"
          subtitle="Choose how you'd like to pay"
        />

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
      </ScreenContent>

      <BottomButton 
        text="Confirm Booking"
        onPress={handleConfirm}
        disabled={!selectedPayment}
      />
    </ScreenLayout>
  );
}
