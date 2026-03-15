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
import { MapPin, Navigation, Home, Phone } from 'lucide-react-native';

export default function AddressScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'current' | 'map' | 'manual' | null>(null);

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
    setSelectedMethod('current');
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

  const handleChooseMap = () => {
    setSelectedMethod('map');
    // For demo, simulate map selection
    const mockAddress = "Selected location • Cairo, Egypt";
    setAddress(mockAddress);
    setLocation({ latitude: 30.0444, longitude: 31.2357 });
  };

  const handleEnterAddress = () => {
    setSelectedMethod('manual');
    setShowAddressInput(true);
  };

  const handleContinue = () => {
    // For demo, allow proceeding with just location selection
    if (location || address.trim() || selectedMethod) {
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
              style={[
                addressStyles.locationOption,
                selectedMethod === 'current' && addressStyles.locationOptionSelected
              ]} 
              onPress={getCurrentLocation}
              disabled={isLoadingLocation}
            >
              <View style={addressStyles.locationIcon}>
                <Navigation size={24} color={selectedMethod === 'current' ? theme.colors.primary[500] : theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={[
                  addressStyles.locationTitle,
                  selectedMethod === 'current' && addressStyles.locationTitleSelected
                ]}>
                  Use Current Location
                </Text>
                <Text variant="caption" style={addressStyles.locationSubtitle}>
                  {isLoadingLocation ? 'Getting location...' : 'Find my current location'}
                </Text>
              </View>
            </Pressable>

            <Pressable 
              style={[
                addressStyles.locationOption,
                selectedMethod === 'map' && addressStyles.locationOptionSelected
              ]} 
              onPress={handleChooseMap}
            >
              <View style={addressStyles.locationIcon}>
                <MapPin size={24} color={selectedMethod === 'map' ? theme.colors.primary[500] : theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={[
                  addressStyles.locationTitle,
                  selectedMethod === 'map' && addressStyles.locationTitleSelected
                ]}>
                  Choose on Map
                </Text>
                <Text variant="caption" style={addressStyles.locationSubtitle}>
                  Select location on map
                </Text>
              </View>
            </Pressable>

            <Pressable 
              style={[
                addressStyles.locationOption,
                selectedMethod === 'manual' && addressStyles.locationOptionSelected
              ]} 
              onPress={handleEnterAddress}
            >
              <View style={addressStyles.locationIcon}>
                <Home size={24} color={selectedMethod === 'manual' ? theme.colors.primary[500] : theme.colors.primary[500]} />
              </View>
              <View style={addressStyles.locationContent}>
                <Text variant="body" weight="medium" style={[
                  addressStyles.locationTitle,
                  selectedMethod === 'manual' && addressStyles.locationTitleSelected
                ]}>
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

          {/* Address Input - Show when manual entry selected */}
          {showAddressInput && (
            <View style={addressStyles.addressInputContainer}>
              <Text variant="caption" style={addressStyles.inputTitle}>
                Address
              </Text>
              <View style={addressStyles.addressInput}>
                <Text variant="caption" style={addressStyles.addressPlaceholder}>
                  Enter your complete address (street, building, area, etc.)
                </Text>
              </View>
            </View>
          )}

          {/* Phone Number */}
          <View style={addressStyles.phoneContainer}>
            <Text variant="caption" style={addressStyles.phoneTitle}>
              Phone Number
            </Text>
            <View style={addressStyles.phoneInput}>
              <View style={addressStyles.phoneInputContent}>
                <Phone size={20} color={theme.colors.primary[500]} style={addressStyles.phoneIcon} />
                <Text variant="caption" style={addressStyles.phonePlaceholder}>
                  Enter your phone number for service updates
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScreenContent>

      {/* Bottom CTA */}
      <View style={addressStyles.bottomSection}>
        <Pressable 
          style={[
            addressStyles.continueButton,
            (!location && !address.trim() && !selectedMethod) && addressStyles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!location && !address.trim() && !selectedMethod}
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
