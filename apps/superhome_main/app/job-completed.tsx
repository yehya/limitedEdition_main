import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { jobCompletedStyles } from './screens/job-completed.screen.styles';
import { CheckCircle } from 'lucide-react-native';

export default function JobCompletedScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();

  const jobSummary = {
    service: 'Plumbing Repair',
    professional: 'Ahmed Hassan',
    amountCharged: '320 EGP',
    paymentMethod: 'Cash',
    completedAt: 'Today, 3:45 PM',
  };

  const handleReview = () => {
    router.push('/review');
  };

  if (isLoading) {
    return (
      <View style={jobCompletedStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={jobCompletedStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={jobCompletedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={jobCompletedStyles.content}>
          {/* Success Icon */}
          <View style={jobCompletedStyles.header}>
            <View style={jobCompletedStyles.successIcon}>
              <CheckCircle size={64} color={theme.colors.text.inverse} />
            </View>
            <Text variant="heading" style={jobCompletedStyles.title}>
              Job Completed
            </Text>
            <Text variant="body" style={jobCompletedStyles.subtitle}>
              Thank you for using SuperHome
            </Text>
          </View>

          {/* Job Summary */}
          <View style={jobCompletedStyles.summaryCard}>
            <Text variant="body" weight="medium" style={jobCompletedStyles.summaryTitle}>
              Job Summary
            </Text>
            
            <View style={jobCompletedStyles.summaryItem}>
              <Text variant="body" style={jobCompletedStyles.summaryLabel}>
                Service:
              </Text>
              <Text variant="body" style={jobCompletedStyles.summaryValue}>
                {jobSummary.service}
              </Text>
            </View>

            <View style={jobCompletedStyles.summaryItem}>
              <Text variant="body" style={jobCompletedStyles.summaryLabel}>
                Professional:
              </Text>
              <Text variant="body" style={jobCompletedStyles.summaryValue}>
                {jobSummary.professional}
              </Text>
            </View>

            <View style={jobCompletedStyles.summaryItem}>
              <Text variant="body" style={jobCompletedStyles.summaryLabel}>
                Completed:
              </Text>
              <Text variant="body" style={jobCompletedStyles.summaryValue}>
                {jobSummary.completedAt}
              </Text>
            </View>
          </View>

          {/* Payment Summary */}
          <View style={jobCompletedStyles.paymentCard}>
            <Text variant="body" weight="medium" style={jobCompletedStyles.paymentTitle}>
              Payment Summary
            </Text>
            
            <View style={jobCompletedStyles.paymentItem}>
              <Text variant="body" style={jobCompletedStyles.paymentLabel}>
                Amount charged:
              </Text>
              <Text variant="heading" style={jobCompletedStyles.paymentAmount}>
                {jobSummary.amountCharged}
              </Text>
            </View>

            <View style={jobCompletedStyles.paymentMethod}>
              <Text variant="caption" style={jobCompletedStyles.paymentMethodLabel}>
                Payment method used:
              </Text>
              <Text variant="body" style={jobCompletedStyles.paymentMethodValue}>
                {jobSummary.paymentMethod}
              </Text>
            </View>
          </View>

          {/* Trust Message */}
          <View style={jobCompletedStyles.trustContainer}>
            <Text variant="caption" style={jobCompletedStyles.trustText}>
              ✔ Receipt details saved to your phone
            </Text>
            <Text variant="caption" style={jobCompletedStyles.trustText}>
              ✔ Quality guarantee on all completed work
            </Text>
          </View>

          {/* Support */}
          <Text variant="caption" style={jobCompletedStyles.supportText}>
            Questions? Call us at 19123
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={jobCompletedStyles.bottomSection}>
        <Pressable 
          style={jobCompletedStyles.reviewButton}
          onPress={handleReview}
        >
          <Text variant="body" weight="medium" style={jobCompletedStyles.reviewButtonText}>
            Rate Your Experience
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
