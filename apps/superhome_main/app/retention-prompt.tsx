import React, { useState } from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { retentionPromptStyles } from './screens/retention-prompt.screen.styles';
import { Calendar, Star } from 'lucide-react-native';

export default function RetentionPromptScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);

  const serviceType = 'cleaning';

  const cleaningOptions = [
    { id: 'weekly', label: 'Weekly', price: '200-350 EGP', subtitle: 'Every week' },
    { id: 'biweekly', label: 'Bi-weekly', price: '220-370 EGP', subtitle: 'Every 2 weeks' },
    { id: 'monthly', label: 'Monthly', price: '240-390 EGP', subtitle: 'Once a month' },
  ];

  const handleBookRegular = () => {
    if (selectedFrequency) {
      router.push('/home');
    }
  };

  const handleNotNow = () => {
    router.push('/home');
  };

  if (isLoading) {
    return (
      <View style={retentionPromptStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={retentionPromptStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={retentionPromptStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={retentionPromptStyles.content}>
          {/* Header */}
          <View style={retentionPromptStyles.header}>
            <View style={retentionPromptStyles.iconContainer}>
              <Calendar size={48} color={theme.colors.primary[500]} />
            </View>
            <Text variant="heading" style={retentionPromptStyles.title}>
              Book Regular Cleaning?
            </Text>
            <Text variant="body" style={retentionPromptStyles.subtitle}>
              Save time and money with recurring service
            </Text>
          </View>

          {/* Frequency Options */}
          <View style={retentionPromptStyles.optionsContainer}>
            {cleaningOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  retentionPromptStyles.optionCard,
                  selectedFrequency === option.id && retentionPromptStyles.optionCardSelected
                ]}
                onPress={() => setSelectedFrequency(option.id)}
              >
                <View style={retentionPromptStyles.optionHeader}>
                  <Text variant="body" weight="medium" style={[
                    retentionPromptStyles.optionLabel,
                    selectedFrequency === option.id && retentionPromptStyles.optionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  <Text variant="body" style={[
                    retentionPromptStyles.optionPrice,
                    selectedFrequency === option.id && retentionPromptStyles.optionPriceSelected
                  ]}>
                    {option.price}
                  </Text>
                </View>
                <Text variant="caption" style={[
                  retentionPromptStyles.optionSubtitle,
                  selectedFrequency === option.id && retentionPromptStyles.optionSubtitleSelected
                ]}>
                  {option.subtitle}
                </Text>
                <View style={[
                  retentionPromptStyles.radioButton,
                  selectedFrequency === option.id && retentionPromptStyles.radioButtonSelected
                ]} />
              </Pressable>
            ))}
          </View>

          {/* Benefits */}
          <View style={retentionPromptStyles.benefitsContainer}>
            <Text variant="body" weight="medium" style={retentionPromptStyles.benefitsTitle}>
              Why book regular cleaning?
            </Text>
            <View style={retentionPromptStyles.benefitItem}>
              <Text variant="caption" style={retentionPromptStyles.benefitText}>
                ✔ Save up to 20 EGP per session
              </Text>
            </View>
            <View style={retentionPromptStyles.benefitItem}>
              <Text variant="caption" style={retentionPromptStyles.benefitText}>
                ✔ Same professional every time
              </Text>
            </View>
            <View style={retentionPromptStyles.benefitItem}>
              <Text variant="caption" style={retentionPromptStyles.benefitText}>
                ✔ Cancel anytime, no commitment
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={retentionPromptStyles.bottomSection}>
        <Pressable 
          style={retentionPromptStyles.notNowButton}
          onPress={handleNotNow}
        >
          <Text variant="body" style={retentionPromptStyles.notNowButtonText}>
            Not Now
          </Text>
        </Pressable>
        <Pressable 
          style={[
            retentionPromptStyles.bookButton,
            !selectedFrequency && retentionPromptStyles.bookButtonDisabled
          ]}
          onPress={handleBookRegular}
          disabled={!selectedFrequency}
        >
          <Text variant="body" weight="medium" style={retentionPromptStyles.bookButtonText}>
            Book Regular Cleaning
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
