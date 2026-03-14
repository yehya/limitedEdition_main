import React, { useState } from 'react';
import { View, Pressable, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { pricingStyles } from './pricing.screen.styles';

export default function PricingScreen() {
  const router = useRouter();
  const { request } = useLocalSearchParams<{ request: string }>();
  const { language, isLoading } = useRTL();
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');

  const pricingPlans = {
    standard: { name: 'Standard', price: 85 },
    premium: { name: 'Premium', price: 125 },
  };

  const handlePlanSelect = (plan: 'standard' | 'premium') => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    router.push({
      pathname: '/availability',
      params: { 
        request,
        plan: selectedPlan,
        price: pricingPlans[selectedPlan].price.toString()
      }
    });
  };

  if (isLoading) {
    return (
      <View style={pricingStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={pricingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Header */}
      <View style={pricingStyles.header}>
        <Pressable onPress={() => router.back()}>
          <Text variant="body" style={pricingStyles.backButton}>← Back</Text>
        </Pressable>
      </View>

      {/* Main Content */}
      <View style={pricingStyles.content}>
        {/* Pricing Plans */}
        <View style={pricingStyles.plansContainer}>
          <Pressable
            style={[
              pricingStyles.planCard,
              selectedPlan === 'standard' && pricingStyles.planCardSelected,
            ]}
            onPress={() => handlePlanSelect('standard')}
          >
            <Text variant="body" weight="medium" style={pricingStyles.planName}>
              Standard
            </Text>
            <Text variant="title" style={pricingStyles.price}>
              ${pricingPlans.standard.price}
            </Text>
            {selectedPlan === 'standard' && (
              <Text style={pricingStyles.selectedText}>✓</Text>
            )}
          </Pressable>

          <Pressable
            style={[
              pricingStyles.planCard,
              selectedPlan === 'premium' && pricingStyles.planCardSelected,
            ]}
            onPress={() => handlePlanSelect('premium')}
          >
            <Text variant="body" weight="medium" style={pricingStyles.planName}>
              Premium
            </Text>
            <Text variant="title" style={pricingStyles.price}>
              ${pricingPlans.premium.price}
            </Text>
            {selectedPlan === 'premium' && (
              <Text style={pricingStyles.selectedText}>✓</Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={pricingStyles.bottomSection}>
        <Text variant="body" style={pricingStyles.selectedInfo}>
          {pricingPlans[selectedPlan].name} • ${pricingPlans[selectedPlan].price}/hour
        </Text>
        
        <Pressable 
          style={pricingStyles.continueButton}
          onPress={handleContinue}
        >
          <Text variant="body" weight="medium" style={pricingStyles.continueButtonText}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
