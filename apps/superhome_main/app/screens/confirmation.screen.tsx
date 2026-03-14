import React from 'react';
import { View, Pressable, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { SuccessIcon } from '../components/shared/SuccessIcon';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { confirmationStyles } from './confirmation.screen.styles';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { request, time, urgency } = useLocalSearchParams<{ 
    request: string; 
    time: string; 
    urgency: string;
  }>();
  const { language, isLoading } = useRTL();

  const bookingDetails = {
    id: `SH-${Date.now().toString().slice(-6)}`,
    professional: 'SuperHome Professional',
  };

  const handleDone = () => {
    router.replace('/home');
  };

  if (isLoading) {
    return (
      <View style={confirmationStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={confirmationStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Main Content */}
      <View style={confirmationStyles.content}>
        <SuccessIcon />
        
        <Text variant="heading" style={confirmationStyles.title}>
          Booking Confirmed
        </Text>
        
        <Text variant="caption" style={confirmationStyles.bookingRef}>
          Booking #SH{Date.now().toString().slice(-6)}
        </Text>
        
        <View style={confirmationStyles.detailsContainer}>
          <View style={confirmationStyles.detailRow}>
            <Text variant="body" style={confirmationStyles.detailLabel}>Service:</Text>
            <Text variant="body" style={confirmationStyles.detailValue}>Plumbing Repair</Text>
          </View>
          
          <View style={confirmationStyles.detailRow}>
            <Text variant="body" style={confirmationStyles.detailLabel}>When:</Text>
            <Text variant="body" style={confirmationStyles.detailValue}>{time}</Text>
          </View>
          
          <View style={confirmationStyles.detailRow}>
            <Text variant="body" style={confirmationStyles.detailLabel}>Duration:</Text>
            <Text variant="body" style={confirmationStyles.detailValue}>1-2 hours</Text>
          </View>
          
          <View style={confirmationStyles.detailRow}>
            <Text variant="body" style={confirmationStyles.detailLabel}>Rate:</Text>
            <Text variant="body" style={confirmationStyles.detailValue}>EGP 950/hour</Text>
          </View>
        </View>
        
        <View style={confirmationStyles.calloutContainer}>
          <Text variant="body" style={confirmationStyles.calloutText}>
            You'll receive a confirmation call within 15 minutes
          </Text>
        </View>
        
        <Text variant="caption" style={confirmationStyles.supportText}>
          Need help? Call us at 19123
        </Text>
      </View>

      {/* Bottom CTA */}
      <View style={confirmationStyles.bottomSection}>
        <Pressable 
          style={confirmationStyles.doneButton}
          onPress={handleDone}
        >
          <Text variant="body" weight="medium" style={confirmationStyles.doneButtonText}>
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
