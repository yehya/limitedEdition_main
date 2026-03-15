import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { Clock } from 'lucide-react-native';
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
      visitFee: null,
      priceRange: '250 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Apartments and homes cleaned by verified professionals.',
      trustMessage: 'Fixed pricing for all apartment sizes.',
    },
    plumbing: {
      title: 'Plumbing',
      subtitle: 'Expert plumbing repairs',
      visitFee: '200 EGP',
      priceRange: '200–450 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Professional plumbers for leaks, clogs, and basic repairs.',
      trustMessage: 'Final price confirmed before work begins.',
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
            {service.visitFee && (
              <View style={serviceStyles.visitFeeSection}>
                <Text variant="caption" style={serviceStyles.visitFeeLabel}>
                  Visit fee
                </Text>
                <Text variant="body" style={serviceStyles.visitFeeValue}>
                  {service.visitFee}
                </Text>
              </View>
            )}
            
            <View style={serviceStyles.priceRangeSection}>
              <Text variant="caption" style={serviceStyles.priceLabel}>
                {service.visitFee ? 'Most jobs cost' : 'Price'}
              </Text>
              <Text variant="body" style={serviceStyles.price}>
                {service.priceRange}
              </Text>
            </View>
            
            <View style={serviceStyles.arrivalSection}>
              <View style={serviceStyles.arrivalLeft}>
                <Text variant="caption" style={serviceStyles.arrivalLabel}>
                  Arrival
                </Text>
                <Text variant="caption" style={serviceStyles.arrivalTime}>
                  Within 2 hours
                </Text>
              </View>
              <Clock size={20} color={theme.colors.primary[500]} />
            </View>
          </View>

          <Text variant="body" style={serviceStyles.description}>
            {service.description}
          </Text>
          
          <View style={serviceStyles.trustMessageContainer}>
            <Text variant="caption" style={serviceStyles.trustMessage}>
              ✔ {service.trustMessage}
            </Text>
          </View>
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
