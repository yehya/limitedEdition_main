import React from 'react';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BrandHeader } from '../components/home/BrandHeader';
import { TrustBadge } from '../components/home/TrustBadge';
import { Footer } from '../components/home/Footer';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { homeStyles } from './home.screen.styles';
import { Info, ChevronRight, Home, Wrench } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();

  const handleServiceSelect = (serviceType: string) => {
    router.push({
      pathname: '/service',
      params: { type: serviceType }
    });
  };

  const services = [
    {
      id: 'cleaning',
      title: 'Clean My Home',
      subtitle: 'Professional cleaning services',
      priceRange: '250 EGP',
      icon: Home,
      color: theme.colors.primary[500],
    },
    {
      id: 'plumbing',
      title: 'Fix My Plumbing',
      subtitle: 'Expert plumbing repairs',
      priceRange: '300 EGP',
      icon: Wrench,
      color: theme.colors.secondary[500],
    },
  ];

  if (isLoading) {
    return (
      <View style={homeStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader />

        <View style={homeStyles.content}>
          <View style={homeStyles.whyButtonContainer}>
            <Pressable 
              style={homeStyles.whyButton}
              onPress={() => router.push('/why-superhome')}
            >
              <Info size={20} color={theme.colors.primary[500]} />
              <Text style={homeStyles.whyButtonText}>Why SuperHome?</Text>
              <ChevronRight size={16} color={theme.colors.primary[500]} />
            </Pressable>
          </View>

          {/* Service Buttons */}
          <View style={homeStyles.servicesContainer}>
            {services.map((service) => (
              <Pressable
                key={service.id}
                style={homeStyles.serviceButton}
                onPress={() => handleServiceSelect(service.id)}
              >
                <View style={[homeStyles.serviceIcon, { backgroundColor: service.color }]}>
                  <service.icon size={32} color={theme.colors.text.inverse} />
                </View>
                <View style={homeStyles.serviceContent}>
                  <Text variant="body" weight="medium" style={homeStyles.serviceTitle}>
                    {service.title}
                  </Text>
                  <Text variant="caption" style={homeStyles.serviceSubtitle}>
                    {service.subtitle}
                  </Text>
                  <Text variant="caption" style={homeStyles.servicePrice}>
                    {service.priceRange}
                  </Text>
                </View>
                <ChevronRight size={20} color={theme.colors.text.tertiary} />
              </Pressable>
            ))}
          </View>

          <View style={homeStyles.trustContainer}>
            <TrustBadge icon="check-circle" text="Verified & Trained" />
            <TrustBadge icon="award" text="Premium Service" />
          </View>
        </View>
        
        <Footer />
      </ScrollView>
    </View>
  );
}
