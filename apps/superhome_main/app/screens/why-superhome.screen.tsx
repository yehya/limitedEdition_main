import React from 'react';
import { View, ScrollView, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BackButton } from '../components/shared/BackButton';
import { CheckCircle, Award, Clock, Shield, Users, Star, Phone, MapPin } from 'lucide-react-native';
import { theme } from '@/theme/index';
import { whySuperHomeStyles } from './why-superhome.screen.styles';

export default function WhySuperHomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: Star,
      title: '100% Satisfaction Guarantee',
      description: 'We take all complaints seriously with immediate action, including contractor termination if needed',
      expanded: true,
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Emergency services available around the clock when you need us most',
    },
    {
      icon: Shield,
      title: 'Government ID Verified',
      description: 'All technicians have government ID collected and verified for your safety',
    },
    {
      icon: CheckCircle,
      title: 'Background Checks',
      description: 'Every technician passes comprehensive background verification',
    },
    {
      icon: Users,
      title: 'Expert Training',
      description: 'We train all professionals ourselves with our rigorous program',
    },
    {
      icon: Award,
      title: 'Strict Selection',
      description: 'Only the best professionals make it through our selection process',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '4.9★', label: 'Average Rating' },
    { number: '24/7', label: 'Support Available' },
    { number: '2hr', label: 'Avg Response Time' },
  ];

  return (
    <View style={whySuperHomeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      {/* Header */}
      <View style={whySuperHomeStyles.header}>
        <BackButton onPress={() => router.back()} />
      </View>

      <ScrollView 
        contentContainerStyle={whySuperHomeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={whySuperHomeStyles.heroSection}>
          <View style={whySuperHomeStyles.titleContainer}>
              <Text variant="heading" style={whySuperHomeStyles.title}>
                Why Choose{' '}
                <Text style={whySuperHomeStyles.brandBold}>Super</Text>
                <Text style={whySuperHomeStyles.brandThin}>Home</Text>?
              </Text>
            </View>
          <Text variant="body" style={whySuperHomeStyles.subtitle}>
            Premium Service for Premium Clients
          </Text>
        </View>

        {/* Stats Section */}
        <View style={whySuperHomeStyles.statsSection}>
          <View style={whySuperHomeStyles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={whySuperHomeStyles.statItem}>
                <Text style={whySuperHomeStyles.statNumber}>{stat.number}</Text>
                <Text style={whySuperHomeStyles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={whySuperHomeStyles.featuresSection}>
          <Text variant="heading" style={whySuperHomeStyles.sectionTitle}>
            What Makes Us Different
          </Text>
          
          {features.map((feature, index) => (
            <View key={index} style={[
              whySuperHomeStyles.featureCard,
              feature.expanded && whySuperHomeStyles.featureCardExpanded
            ]}>
              <View style={whySuperHomeStyles.featureIcon}>
                <feature.icon size={24} color={theme.colors.primary[500]} />
              </View>
              <View style={whySuperHomeStyles.featureContent}>
                <Text variant="body" weight="medium" style={whySuperHomeStyles.featureTitle}>
                  {feature.title}
                </Text>
                <Text variant="caption" style={[
                  whySuperHomeStyles.featureDescription,
                  feature.expanded && whySuperHomeStyles.featureDescriptionExpanded
                ]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={whySuperHomeStyles.contactSection}>
          <Text variant="heading" style={whySuperHomeStyles.sectionTitle}>
            Get in Touch
          </Text>
          <View style={whySuperHomeStyles.contactCards}>
            <View style={whySuperHomeStyles.contactCard}>
              <View style={whySuperHomeStyles.contactIconContainer}>
                <Phone size={24} color={theme.colors.text.inverse} />
              </View>
              <View style={whySuperHomeStyles.contactContent}>
                <Text variant="body" weight="medium" style={whySuperHomeStyles.contactTitle}>
                  24/7 Support
                </Text>
                <Text variant="caption" style={whySuperHomeStyles.contactSubtitle}>
                  Call anytime for assistance
                </Text>
                <Text variant="body" style={whySuperHomeStyles.contactNumber}>
                  19123
                </Text>
              </View>
            </View>
            <View style={whySuperHomeStyles.contactCard}>
              <View style={whySuperHomeStyles.contactIconContainer}>
                <MapPin size={24} color={theme.colors.text.inverse} />
              </View>
              <View style={whySuperHomeStyles.contactContent}>
                <Text variant="body" weight="medium" style={whySuperHomeStyles.contactTitle}>
                  Service Area
                </Text>
                <Text variant="caption" style={whySuperHomeStyles.contactSubtitle}>
                  Available across Cairo
                </Text>
                <Text variant="body" style={whySuperHomeStyles.contactNumber}>
                  All Districts
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={whySuperHomeStyles.ctaSection}>
          <View style={whySuperHomeStyles.ctaCard}>
            <Text variant="body" style={whySuperHomeStyles.ctaQuestion}>
              Ready to experience premium service?
            </Text>
            <View style={whySuperHomeStyles.ctaBrandContainer}>
              <Text style={whySuperHomeStyles.ctaBrandBold}>Super</Text>
              <Text style={whySuperHomeStyles.ctaBrandThin}>Home</Text>
            </View>
            <Pressable 
              style={whySuperHomeStyles.ctaButton}
              onPress={() => router.push('/home')}
            >
              <Text style={whySuperHomeStyles.ctaButtonText}>Get Started</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
