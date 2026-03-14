import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { processingStyles } from './processing.screen.styles';

export default function ProcessingScreen() {
  const router = useRouter();
  const { request } = useLocalSearchParams<{ request: string }>();
  const { language, isLoading } = useRTL();
  const [currentStep, setCurrentStep] = useState(0);

  const processingSteps = [
    'Analyzing your request...',
    'Finding the best professionals...',
    'Checking availability...',
  ];

  useEffect(() => {
    // Start processing steps
    startProcessing();
  }, []);

  const startProcessing = () => {
    processingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, 1500 * (index + 1));
    });

    // Navigate to next screen after all steps
    setTimeout(() => {
      router.push('/identification');
    }, 1500 * processingSteps.length + 1000);
  };

  if (isLoading) {
    return (
      <View style={processingStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={processingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Header */}
      <View style={processingStyles.header}>
        <BackButton onPress={() => router.back()} />
      </View>

      {/* Main Content */}
      <View style={processingStyles.content}>
        <View style={processingStyles.processingContainer}>
          <View style={processingStyles.loadingContainer}>
            <View style={processingStyles.loadingDot} />
            <View style={processingStyles.loadingDot} />
            <View style={processingStyles.loadingDot} />
          </View>
          <Text variant="body" weight="medium" style={processingStyles.processingText}>
            {processingSteps[currentStep]}
          </Text>
        </View>
      </View>
    </View>
  );
}
