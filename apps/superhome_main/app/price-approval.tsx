import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { priceApprovalStyles } from './screens/price-approval.screen.styles';
import { CheckCircle } from 'lucide-react-native';

export default function PriceApprovalScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();

  const jobDetails = {
    finalPrice: '320 EGP',
    tasks: [
      { name: 'Leak repair', price: '150 EGP' },
      { name: 'Pipe tightening', price: '120 EGP' },
      { name: 'Inspection fee', price: '50 EGP' },
    ],
    professional: 'Ahmed Hassan',
  };

  const handleApprove = () => {
    // Navigate back to job tracking with working status
    // In a real app, this would update the job status in the backend
    router.push('/job-completed');
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <View style={priceApprovalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={priceApprovalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={priceApprovalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={priceApprovalStyles.content}>
          {/* Header */}
          <View style={priceApprovalStyles.header}>
            <CheckCircle size={64} color={theme.colors.primary[500]} />
            <Text variant="heading" style={priceApprovalStyles.title}>
              Inspection Complete
            </Text>
            <Text variant="body" style={priceApprovalStyles.subtitle}>
              {jobDetails.professional} has inspected the problem
            </Text>
          </View>

          {/* Final Price */}
          <View style={priceApprovalStyles.priceCard}>
            <Text variant="caption" style={priceApprovalStyles.priceLabel}>
              Final job price
            </Text>
            <Text variant="heading" style={priceApprovalStyles.priceValue}>
              {jobDetails.finalPrice}
            </Text>
          </View>

          {/* Task Breakdown */}
          <View style={priceApprovalStyles.tasksContainer}>
            <Text variant="body" weight="medium" style={priceApprovalStyles.tasksTitle}>
              Repair details
            </Text>
            {jobDetails.tasks.map((task, index) => (
              <View key={index} style={priceApprovalStyles.taskItem}>
                <Text variant="body" style={priceApprovalStyles.taskName}>
                  {task.name}
                </Text>
                <Text variant="body" style={priceApprovalStyles.taskPrice}>
                  {task.price}
                </Text>
              </View>
            ))}
          </View>

          {/* Trust Message */}
          <View style={priceApprovalStyles.trustContainer}>
            <Text variant="caption" style={priceApprovalStyles.trustText}>
              ✔ Work will begin only after you approve this price
            </Text>
            <Text variant="caption" style={priceApprovalStyles.trustText}>
              ✔ Platform guarantee on all work
            </Text>
          </View>

          {/* Support */}
          <Text variant="caption" style={priceApprovalStyles.supportText}>
            Questions? Call us at 19123
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={priceApprovalStyles.bottomSection}>
        <Pressable 
          style={priceApprovalStyles.cancelButton}
          onPress={handleCancel}
        >
          <Text variant="body" weight="medium" style={priceApprovalStyles.cancelButtonText}>
            Cancel
          </Text>
        </Pressable>
        <Pressable 
          style={priceApprovalStyles.approveButton}
          onPress={handleApprove}
        >
          <Text variant="body" weight="medium" style={priceApprovalStyles.approveButtonText}>
            Approve & Start Work
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
