import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { SuccessIcon } from '../components/shared/SuccessIcon';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { confirmationStyles } from './confirmation.screen.styles';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();

  const bookingDetails = {
    id: `SH-${Date.now().toString().slice(-6)}`,
    professional: {
      name: 'Ahmed Hassan',
      verified: true,
      jobsCompleted: 327,
      eta: '35 minutes',
      status: 'Assigned'
    },
    service: 'Home Cleaning',
    time: 'Today, 6:00 PM',
    price: '150-300 EGP'
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
      
      <ScrollView 
        contentContainerStyle={confirmationStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={confirmationStyles.content}>
          <SuccessIcon />
          
          <Text variant="heading" style={confirmationStyles.title}>
            Booking Confirmed
          </Text>
          
          <Text variant="caption" style={confirmationStyles.bookingRef}>
            Booking #{bookingDetails.id}
          </Text>
          
          {/* Assigned Professional */}
          <View style={confirmationStyles.professionalContainer}>
            <Text variant="body" weight="medium" style={confirmationStyles.sectionTitle}>
              Assigned Professional
            </Text>
            
            <View style={confirmationStyles.professionalCard}>
              <View style={confirmationStyles.professionalInfo}>
                <View style={confirmationStyles.professionalHeader}>
                  <Text variant="body" weight="medium" style={confirmationStyles.professionalName}>
                    {bookingDetails.professional.name}
                  </Text>
                  {bookingDetails.professional.verified && (
                    <Text variant="caption" style={confirmationStyles.verifiedBadge}>
                      ✔ Verified Professional
                    </Text>
                  )}
                </View>
                
                <Text variant="caption" style={confirmationStyles.professionalStats}>
                  {bookingDetails.professional.jobsCompleted} jobs completed
                </Text>
                
                <View style={confirmationStyles.etaContainer}>
                  <Text variant="caption" style={confirmationStyles.etaLabel}>
                    Arriving in {bookingDetails.professional.eta}
                  </Text>
                  <Text variant="caption" style={confirmationStyles.statusText}>
                    Status: {bookingDetails.professional.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Service Details */}
          <View style={confirmationStyles.detailsContainer}>
            <View style={confirmationStyles.detailRow}>
              <Text variant="body" style={confirmationStyles.detailLabel}>Service:</Text>
              <Text variant="body" style={confirmationStyles.detailValue}>{bookingDetails.service}</Text>
            </View>
            
            <View style={confirmationStyles.detailRow}>
              <Text variant="body" style={confirmationStyles.detailLabel}>When:</Text>
              <Text variant="body" style={confirmationStyles.detailValue}>{bookingDetails.time}</Text>
            </View>
            
            <View style={confirmationStyles.detailRow}>
              <Text variant="body" style={confirmationStyles.detailLabel}>Price:</Text>
              <Text variant="body" style={confirmationStyles.detailValue}>{bookingDetails.price}</Text>
            </View>
          </View>
          
          {/* Trust Message */}
          <View style={confirmationStyles.trustContainer}>
            <Text variant="caption" style={confirmationStyles.trustText}>
              ✔ Platform guarantee on all work
            </Text>
            <Text variant="caption" style={confirmationStyles.trustText}>
              If the job is not done properly, we will fix it or refund part of the payment
            </Text>
          </View>
          
          <Text variant="caption" style={confirmationStyles.supportText}>
            Need help? Call us at 19123
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={confirmationStyles.bottomSection}>
        <Pressable 
          style={confirmationStyles.doneButton}
          onPress={handleDone}
        >
          <Text variant="body" weight="medium" style={confirmationStyles.doneButtonText}>
            Track Job
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
