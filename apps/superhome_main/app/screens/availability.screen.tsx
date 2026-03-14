import React, { useState } from 'react';
import { View, Pressable, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { TimeSlot } from '../components/availability/TimeSlot';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { availabilityStyles } from './availability.screen.styles';

export default function AvailabilityScreen() {
  const router = useRouter();
  const { request } = useLocalSearchParams<{ request: string }>();
  const { language, isLoading } = useRTL();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get tomorrow's date dynamically
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const timeSlots = [
    { 
      id: '1', 
      time: 'Right Now', 
      subtitle: 'On-demand service',
      estimate: '30-60 min arrival',
      date: 'Today',
      available: true 
    },
    { 
      id: '2', 
      time: 'Tomorrow Afternoon', 
      subtitle: '2:00 PM - 6:00 PM',
      estimate: '1-2 hour job',
      date: tomorrowDate,
      available: true 
    },
    { 
      id: '3', 
      time: 'Tomorrow Evening', 
      subtitle: '6:00 PM - 10:00 PM',
      estimate: '1-2 hour job',
      date: tomorrowDate,
      available: true 
    },
  ];

  const handleTimeSelect = (timeId: string) => {
    setSelectedTime(timeId);
  };

  const handleReserve = () => {
    if (!selectedTime) return;
    
    setIsProcessing(true);
    
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTime);
    const urgency = selectedSlot?.time.includes('Tomorrow') ? 'Tomorrow' : 'Today';
    
    // Navigate to processing screen first
    router.push({
      pathname: '/processing',
      params: {
        request,
        time: selectedSlot?.time,
        urgency,
        nextScreen: 'confirmation'
      }
    });
  };

  if (isLoading) {
    return (
      <View style={availabilityStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={availabilityStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Header */}
      <View style={availabilityStyles.header}>
        <BackButton onPress={() => router.back()} />
      </View>

      {/* Main Content */}
      <View style={availabilityStyles.content}>
        <Text variant="caption" style={availabilityStyles.serviceReminder}>
          Plumbing Repair • 1-2 hours • EGP 950/hour
        </Text>
        
        <Text variant="heading" style={availabilityStyles.heading}>
          What time?
        </Text>
        
        {/* Time Slots */}
        <View style={availabilityStyles.timeSlotsContainer}>
          {timeSlots.map((slot) => (
            <TimeSlot
              key={slot.id}
              time={slot.time}
              subtitle={slot.subtitle}
              estimate={slot.estimate}
              date={slot.date}
              available={slot.available}
              selected={selectedTime === slot.id}
              onPress={() => handleTimeSelect(slot.id)}
            />
          ))}
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={availabilityStyles.bottomSection}>
        <Pressable 
          style={[
            availabilityStyles.reserveButton,
            !selectedTime && availabilityStyles.reserveButtonDisabled
          ]}
          onPress={handleReserve}
          disabled={!selectedTime}
        >
          <Text variant="body" weight="medium" style={availabilityStyles.reserveButtonText}>
            Confirm Booking
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
