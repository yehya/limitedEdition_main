import React, { useState, useEffect } from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { jobTrackingStyles } from './screens/job-tracking.screen.styles';
import { MapPin, Phone, MessageCircle, CheckCircle } from 'lucide-react-native';

export default function JobTrackingScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [currentStatus, setCurrentStatus] = useState('on-the-way');
  const [eta, setEta] = useState(12);

  const statuses = [
    { id: 'assigned', label: 'Assigned', completed: true },
    { id: 'on-the-way', label: 'On the way', completed: true },
    { id: 'arrived', label: 'Arrived', completed: false },
    { id: 'working', label: 'Working', completed: false },
  ];

  const professional = {
    name: 'Ahmed Hassan',
    phone: '+20 123 456 7890',
    verified: true,
    jobsCompleted: 327,
  };

  useEffect(() => {
    // Simulate ETA countdown
    const etaTimer = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
    }, 60000);

    // Simulate status progression for demo
    const statusTimer = setTimeout(() => {
      setCurrentStatus('arrived');
      setTimeout(() => {
        // Navigate to price approval after arrival
        router.push('/price-approval');
      }, 3000);
    }, 8000); // After 8 seconds, simulate arrival

    return () => {
      clearInterval(etaTimer);
      clearTimeout(statusTimer);
    };
  }, [router]);

  const handleCall = () => {
    console.log('Call professional');
  };

  const handleMessage = () => {
    console.log('Message professional');
  };

  if (isLoading) {
    return (
      <View style={jobTrackingStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={jobTrackingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={jobTrackingStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={jobTrackingStyles.content}>
          {/* Status Header */}
          <View style={jobTrackingStyles.statusHeader}>
            <Text variant="heading" style={jobTrackingStyles.statusTitle}>
              Professional on the way
            </Text>
            <Text variant="body" style={jobTrackingStyles.etaText}>
              Arriving in {eta} minutes
            </Text>
          </View>

          {/* Map Placeholder */}
          <View style={jobTrackingStyles.mapContainer}>
            <MapPin size={48} color={theme.colors.primary[500]} />
            <Text variant="caption" style={jobTrackingStyles.mapText}>
              Live tracking map
            </Text>
          </View>

          {/* Professional Info */}
          <View style={jobTrackingStyles.professionalCard}>
            <View style={jobTrackingStyles.professionalHeader}>
              <View style={jobTrackingStyles.professionalInfo}>
                <Text variant="body" weight="medium" style={jobTrackingStyles.professionalName}>
                  {professional.name}
                </Text>
                {professional.verified && (
                  <Text variant="caption" style={jobTrackingStyles.verifiedBadge}>
                    ✔ Verified Professional
                  </Text>
                )}
                <Text variant="caption" style={jobTrackingStyles.professionalStats}>
                  {professional.jobsCompleted} jobs completed
                </Text>
              </View>
            </View>

            <View style={jobTrackingStyles.actionButtons}>
              <Pressable style={jobTrackingStyles.actionButton} onPress={handleCall}>
                <Phone size={20} color={theme.colors.primary[500]} />
                <Text variant="caption" style={jobTrackingStyles.actionButtonText}>
                  Call
                </Text>
              </Pressable>
              <Pressable style={jobTrackingStyles.actionButton} onPress={handleMessage}>
                <MessageCircle size={20} color={theme.colors.primary[500]} />
                <Text variant="caption" style={jobTrackingStyles.actionButtonText}>
                  Message
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Status Tracker */}
          <View style={jobTrackingStyles.statusTracker}>
            <Text variant="body" weight="medium" style={jobTrackingStyles.trackerTitle}>
              Job Status
            </Text>
            {statuses.map((status, index) => (
              <View key={status.id} style={jobTrackingStyles.statusItem}>
                <View style={[
                  jobTrackingStyles.statusDot,
                  status.completed && jobTrackingStyles.statusDotCompleted,
                  currentStatus === status.id && jobTrackingStyles.statusDotActive
                ]}>
                  {status.completed && (
                    <CheckCircle size={16} color={theme.colors.text.inverse} />
                  )}
                </View>
                <Text variant="body" style={[
                  jobTrackingStyles.statusLabel,
                  status.completed && jobTrackingStyles.statusLabelCompleted,
                  currentStatus === status.id && jobTrackingStyles.statusLabelActive
                ]}>
                  {status.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Support */}
          <Text variant="caption" style={jobTrackingStyles.supportText}>
            Need help? Call us at 19123
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
