import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { ScreenLayout } from './components/shared/ScreenLayout';
import { ScreenHeader } from './components/shared/ScreenHeader';
import { ScreenContent } from './components/shared/ScreenContent';
import { ScreenTitle } from './components/shared/ScreenTitle';
import { BottomButton } from './components/shared/BottomButton';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { timeStyles } from './screens/time.screen.styles';
import { CheckCircle } from 'lucide-react-native';

export default function TimeScreen() {
  const router = useRouter();
  const { isLoading } = useRTL();
  const [selectedTime, setSelectedTime] = useState('');

  const timeOptions = [
    { id: 'asap', label: 'ASAP', subtitle: 'First available professional' },
    { id: 'tomorrow_afternoon', label: 'Tomorrow Afternoon', subtitle: '12:00 PM - 4:00 PM' },
    { id: 'tomorrow_evening', label: 'Tomorrow Evening', subtitle: '6:00 PM - 10:00 PM' },
    { id: 'emergency', label: 'Emergency', subtitle: 'Arrival within 60 minutes' },
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
    return <ScreenLayout showScrollView={false} />;
  }

  return (
    <ScreenLayout>
      <ScreenHeader onBack={() => router.back()} />
      
      <ScreenContent>
        <ScreenTitle 
          title="When do you need it?"
          subtitle="Choose your preferred time"
        />

        <View style={timeStyles.timeOptionsContainer}>
          {timeOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                timeStyles.timeOption,
                option.id === 'emergency' && timeStyles.emergencyOption,
                selectedTime === option.id && (option.id === 'emergency' ? timeStyles.emergencyOptionSelected : timeStyles.timeOptionSelected)
              ]}
              onPress={() => handleTimeSelect(option.id)}
            >
              <View style={timeStyles.timeOptionContent}>
                <View style={timeStyles.timeOptionText}>
                  <Text variant="body" weight="medium" style={[
                    timeStyles.timeOptionLabel,
                    option.id === 'emergency' && timeStyles.emergencyLabel,
                    selectedTime === option.id && option.id === 'emergency' && timeStyles.emergencyLabelSelected,
                    selectedTime === option.id && option.id !== 'emergency' && timeStyles.timeOptionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  <Text variant="caption" style={[
                    timeStyles.timeOptionSubtitle,
                    option.id === 'emergency' && timeStyles.emergencySubtitle,
                    selectedTime === option.id && option.id === 'emergency' && timeStyles.emergencySubtitleSelected,
                    selectedTime === option.id && option.id !== 'emergency' && timeStyles.timeOptionSubtitleSelected
                  ]}>
                    {option.subtitle}
                  </Text>
                </View>
              </View>
              {option.id === 'emergency' && selectedTime === option.id ? (
                <View style={timeStyles.emergencyCheckmark}>
                  <CheckCircle size={20} color={theme.colors.semantic.error} fill={theme.colors.text.inverse} strokeWidth={3} />
                </View>
              ) : option.id !== 'emergency' && selectedTime === option.id ? (
                <View style={timeStyles.regularCheckmark}>
                  <CheckCircle size={20} color={theme.colors.primary[500]} fill={theme.colors.text.inverse} strokeWidth={3} />
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScreenContent>

      <BottomButton 
        text="Continue"
        onPress={handleContinue}
        disabled={!selectedTime}
      />
    </ScreenLayout>
  );
}
