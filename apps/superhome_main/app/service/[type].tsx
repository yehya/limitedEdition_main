import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { serviceStyles } from '../screens/service.screen.styles';
import { Home, Wrench, Clock, CheckCircle } from 'lucide-react-native';

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const { language, isLoading } = useRTL();

  const serviceData = {
    cleaning: {
      title: 'Home Cleaning',
      subtitle: 'Professional cleaning services',
      visitFee: null,
      priceRange: '250-400 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Apartments and homes cleaned by verified professionals.',
      trustMessage: 'Pricing based on number of rooms and size.',
      icon: Home,
      features: [
        'Deep cleaning of all rooms',
        'Kitchen and bathroom sanitation',
        'Floor cleaning and polishing',
        'Window cleaning included'
      ]
    },
    plumbing: {
      title: 'Plumbing',
      subtitle: 'Expert plumbing repairs',
      visitFee: '200 EGP',
      priceRange: '200–450 EGP',
      arrivalTime: 'Within 2 hours',
      description: 'Professional plumbers for leaks, clogs, and basic repairs.',
      trustMessage: 'Final price confirmed before work begins.',
      icon: Wrench,
      features: [
        'Leak detection and repair',
        'Drain unclogging services',
        'Pipe installation and repair',
        'Emergency plumbing available'
      ]
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

        {/* Service Header */}
        <View style={serviceStyles.serviceHeader}>
          <View style={serviceStyles.serviceIconContainer}>
            <service.icon size={48} color={theme.colors.primary[500]} />
          </View>
          <View style={serviceStyles.serviceTitleContainer}>
            <Text variant="heading" style={serviceStyles.serviceTitle}>
              {service.title}
            </Text>
            <Text variant="body" style={serviceStyles.serviceSubtitle}>
              {service.subtitle}
            </Text>
          </View>
        </View>

        {/* Service Info */}
        <View style={serviceStyles.content}>
          {/* Pricing Card */}
          <View style={serviceStyles.pricingCard}>
            {service.visitFee && (
              <View style={serviceStyles.visitFeeSection}>
                <View style={serviceStyles.visitFeeLeft}>
                  <Text variant="caption" style={serviceStyles.visitFeeLabel}>
                    Visit fee
                  </Text>
                  <Text variant="body" weight="medium" style={serviceStyles.visitFeeValue}>
                    {service.visitFee}
                  </Text>
                </View>
                <View style={serviceStyles.visitFeeIcon}>
                  <Clock size={20} color={theme.colors.primary[500]} />
                </View>
              </View>
            )}
            
            <View style={serviceStyles.priceRangeSection}>
              <View style={serviceStyles.priceLeft}>
                <Text variant="caption" style={serviceStyles.priceLabel}>
                  {service.visitFee ? 'Most jobs cost' : 'Price'}
                </Text>
                <Text variant="body" weight="bold" style={serviceStyles.price}>
                  {service.priceRange}
                </Text>
              </View>
              <View style={serviceStyles.priceIcon}>
                <CheckCircle size={24} color={theme.colors.primary[500]} />
              </View>
            </View>
          </View>

          {/* Description */}
          <Text variant="body" style={serviceStyles.description}>
            {service.description}
          </Text>
          
          {/* Features */}
          <View style={serviceStyles.featuresContainer}>
            <Text variant="body" weight="medium" style={serviceStyles.featuresTitle}>
              What's included:
            </Text>
            {service.features.map((feature, index) => (
              <View key={index} style={serviceStyles.featureItem}>
                <CheckCircle size={16} color={theme.colors.primary[500]} style={serviceStyles.featureIcon} />
                <Text variant="caption" style={serviceStyles.featureText}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Trust Message */}
          <View style={serviceStyles.trustMessageContainer}>
            <CheckCircle size={20} color={theme.colors.primary[500]} style={serviceStyles.trustIcon} />
            <Text variant="caption" style={serviceStyles.trustMessage}>
              {service.trustMessage}
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
