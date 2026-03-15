import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { serviceStyles } from '../screens/service.screen.styles';

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const { language, isLoading } = useRTL();

  const serviceData = {
    cleaning: {
      title: 'Home Cleaning',
      subtitle: 'Professional cleaning services',
      priceRange: '150-300 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Apartments and homes cleaned by verified professionals.',
    },
    plumbing: {
      title: 'Plumbing',
      subtitle: 'Expert plumbing repairs',
      priceRange: '200-400 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Professional plumbers available for leaks, clogs, and basic repairs.',
    }
  };

  const service = serviceData[type as keyof typeof serviceData] || serviceData.cleaning;

  const handleContinue = () => {
    router.push('/address');
  };

  if (isLoading) {
    return (
      <View style={serviceStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={serviceStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={serviceStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={serviceStyles.header}>
          <BackButton onPress={() => router.back()} />
        </View>

        {/* Service Info */}
        <View style={serviceStyles.content}>
          <Text variant="heading" style={serviceStyles.title}>
            {service.title}
          </Text>
          
          <View style={serviceStyles.priceContainer}>
            <Text variant="body" style={serviceStyles.price}>
              {service.priceRange}
            </Text>
            <Text variant="caption" style={serviceStyles.arrivalTime}>
              Arrival within 2 hours
            </Text>
          </View>

          <Text variant="body" style={serviceStyles.description}>
            {service.description}
          </Text>
        </View>

        {/* Bottom CTA */}
        <View style={serviceStyles.bottomSection}>
          <Pressable 
            style={serviceStyles.continueButton}
            onPress={handleContinue}
          >
            <Text variant="body" weight="medium" style={serviceStyles.continueButtonText}>
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
