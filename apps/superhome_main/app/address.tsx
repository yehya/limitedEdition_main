import React, { useState, useEffect } from 'react';
import { View, Pressable, StatusBar, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { ScreenLayout } from './components/shared/ScreenLayout';
import { ScreenHeader } from './components/shared/ScreenHeader';
import { ScreenContent } from './components/shared/ScreenContent';
import { ScreenTitle } from './components/shared/ScreenTitle';
import { BottomButton } from './components/shared/BottomButton';
import { ProgressBar } from './components/shared/ProgressBar';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { addressStyles } from './screens/address.screen.styles';
import { MapPin, Navigation, Home } from 'lucide-react-native';

export default function AddressScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Location permission is required to find the nearest professionals. You can manually enter your address instead.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        setIsLoadingLocation(false);
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude
      });
      
      // Reverse geocoding to get address (simplified)
      const mockAddress = "Current Location • Cairo, Egypt";
      setAddress(mockAddress);
      
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get your location. Please try again or enter address manually.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleContinue = () => {
    if (location || address.trim()) {
      router.push('/time');
    }
  };

  if (isLoading) {
    return (
      <View style={addressStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={addressStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={addressStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={addressStyles.header}>
          <ScreenHeader onBack={() => router.back()} />
        </View>
      
      <View style={addressStyles.progressContainer}>
        <ProgressBar current={2} total={6} />
        <Text variant="caption" style={addressStyles.progressText}>
          Step 2 of 6
        </Text>
      </View>
      
      <ScreenContent>

        {/* Content */}
        <View style={addressStyles.content}>
          <Text variant="heading" style={addressStyles.title}>
            Where should we come?
          </Text>
          
          <Text variant="body" style={addressStyles.subtitle}>
            Pick your location or enter address details
          </Text>

          {/* Location Options */}
          <View style={addressStyles.locationOptions}>
            <Pressable 
              style={addressStyles.locationOption}
              onPress={getCurrentLocation}
              disabled={isLoadingLocation}
            >
              <View style={addressStyles.locationIcon}>
                <Navigation size={24} color={theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={addressStyles.locationTitle}>
                  Use Current Location
                </Text>
                <Text variant="caption" style={addressStyles.locationSubtitle}>
                  {isLoadingLocation ? 'Getting location...' : 'Find my current location'}
                </Text>
              </View>
            </Pressable>

            <Pressable style={addressStyles.locationOption}>
              <View style={addressStyles.locationIcon}>
                <MapPin size={24} color={theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={addressStyles.locationTitle}>
                  Choose on Map
                </Text>
                <Text variant="caption" style={addressStyles.locationSubtitle}>
                  Select location on map
                </Text>
              </View>
            </Pressable>

            <Pressable style={addressStyles.locationOption}>
              <View style={addressStyles.locationIcon}>
                <Home size={24} color={theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={addressStyles.locationTitle}>
                  Enter Address
                </Text>
                <Text variant="caption" style={addressStyles.locationSubtitle}>
                  Type address manually
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Selected Location Display */}
          {(location || address) && (
            <View style={addressStyles.selectedLocationContainer}>
              <Text variant="caption" style={addressStyles.selectedLabel}>
                Selected Location:
              </Text>
              <Text variant="body" style={addressStyles.selectedAddress}>
                {address || 'Location selected'}
              </Text>
            </View>
          )}

          {/* Address Instructions */}
          <View style={addressStyles.instructionsContainer}>
            <Text variant="caption" style={addressStyles.instructionsTitle}>
              Address Instructions (Optional)
            </Text>
            <View style={addressStyles.instructionsInput}>
              <Text variant="caption" style={addressStyles.instructionsPlaceholder}>
                Building name, floor, apartment number, or special instructions...
              </Text>
            </View>
          </View>
        </View>
      </ScreenContent>

      {/* Bottom CTA */}
      <View style={addressStyles.bottomSection}>
        <Pressable 
          style={[
            addressStyles.continueButton,
            (!location && !address.trim()) && addressStyles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!location && !address.trim()}
        >
          <Text variant="body" weight="medium" style={addressStyles.continueButtonText}>
            Continue
          </Text>
        </Pressable>
      </View>
    </ScrollView>
    </View>
  );
}
