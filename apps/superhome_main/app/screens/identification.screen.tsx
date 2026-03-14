import React from 'react';
import { View, Pressable, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { Info } from 'lucide-react-native';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { identificationStyles } from './identification.screen.styles';

export default function IdentificationScreen() {
  const router = useRouter();
  const { request } = useLocalSearchParams<{ request: string }>();
  const { language, isLoading } = useRTL();

  const handleContinue = () => {
    router.push('/availability');
  };

  const handleNo = () => {
    router.push('/home');
  };

  if (isLoading) {
    return (
      <View style={identificationStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={identificationStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Header */}
      <View style={identificationStyles.header}>
        <BackButton onPress={() => router.back()} />
      </View>

      {/* Main Content */}
      <View style={identificationStyles.content}>
        <View style={identificationStyles.iconContainer}>
          <Info size={40} color={theme.colors.primary[500]} strokeWidth={2} />
        </View>
        
        <Text variant="heading" style={identificationStyles.title}>
          Is this what you need?
        </Text>
        
        <View style={identificationStyles.detailsCard}>
          <Text variant="body" style={identificationStyles.serviceType}>
            Plumbing Repair
          </Text>
          
          <Text variant="body" style={identificationStyles.subtitle}>
            EGP 950/hour
          </Text>
        </View>

        {/* Trust Signals */}
        <View style={identificationStyles.trustSignalsContainer}>
          <View style={identificationStyles.trustSignal}>
            <Text style={identificationStyles.trustIcon}>✓</Text>
            <View style={identificationStyles.trustTextContainer}>
              <Text variant="caption" style={identificationStyles.trustText}>
                All{' '}
                <Text variant="caption" style={identificationStyles.trustTextBold}>professionals</Text>
                {' '}trained by{' '}
              </Text>
              <View style={identificationStyles.brandContainer}>
                <Text variant="caption" style={identificationStyles.brandBold}>Super</Text>
                <Text variant="caption" style={identificationStyles.brandThin}>Home</Text>
              </View>
            </View>
          </View>
          <View style={identificationStyles.trustSignal}>
            <Text style={identificationStyles.trustIcon}>⭐</Text>
            <Text variant="caption" style={identificationStyles.trustText}>
              <Text variant="caption" style={identificationStyles.trustTextBold}>Premium</Text>{' '}service guarantee
            </Text>
          </View>
          <View style={identificationStyles.trustSignal}>
            <Text style={identificationStyles.trustIcon}>💰</Text>
            <Text variant="caption" style={identificationStyles.trustText}>
              <Text variant="caption" style={identificationStyles.trustTextBold}>100%</Text>{' '}money back guarantee
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={identificationStyles.bottomSection}>
        <View style={identificationStyles.buttonRow}>
          <Pressable 
            style={identificationStyles.continueButton}
            onPress={handleContinue}
          >
            <Text variant="body" weight="medium" style={identificationStyles.continueButtonText}>
              Yes, Continue
            </Text>
          </Pressable>
          <Pressable 
            style={identificationStyles.noButton}
            onPress={handleNo}
          >
            <Text variant="body" weight="medium" style={identificationStyles.noButtonText}>
              No
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
