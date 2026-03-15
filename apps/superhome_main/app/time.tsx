import React, { useState } from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from './components/shared/BackButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { timeStyles } from './screens/time.screen.styles';

export default function TimeScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [selectedTime, setSelectedTime] = useState('');

  const timeOptions = [
    { id: 'asap', label: 'ASAP', subtitle: 'First available professional' },
    { id: 'today', label: 'Today Evening', subtitle: '6:00 PM - 10:00 PM' },
    { id: 'tomorrow', label: 'Tomorrow', subtitle: 'Choose time slot' },
  ];

  const handleTimeSelect = (timeId: string) => {
    setSelectedTime(timeId);
  };

  const handleContinue = () => {
    if (selectedTime) {
      router.push('/payment');
    }
  };

  if (isLoading) {
    return (
      <View style={timeStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={timeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={timeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={timeStyles.header}>
          <BackButton onPress={() => router.back()} />
        </View>

        {/* Content */}
        <View style={timeStyles.content}>
          <Text variant="heading" style={timeStyles.title}>
            When do you need it?
          </Text>
          
          <Text variant="body" style={timeStyles.subtitle}>
            Choose your preferred time
          </Text>

          {/* Time Options */}
          <View style={timeStyles.timeOptionsContainer}>
            {timeOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  timeStyles.timeOption,
                  selectedTime === option.id && timeStyles.timeOptionSelected
                ]}
                onPress={() => handleTimeSelect(option.id)}
              >
                <View style={timeStyles.timeOptionContent}>
                  <Text variant="body" weight="medium" style={[
                    timeStyles.timeOptionLabel,
                    selectedTime === option.id && timeStyles.timeOptionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  <Text variant="caption" style={[
                    timeStyles.timeOptionSubtitle,
                    selectedTime === option.id && timeStyles.timeOptionSubtitleSelected
                  ]}>
                    {option.subtitle}
                  </Text>
                </View>
                <View style={[
                  timeStyles.radioButton,
                  selectedTime === option.id && timeStyles.radioButtonSelected
                ]} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={timeStyles.bottomSection}>
          <Pressable 
            style={[
              timeStyles.continueButton,
              !selectedTime && timeStyles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!selectedTime}
          >
            <Text variant="body" weight="medium" style={timeStyles.continueButtonText}>
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
