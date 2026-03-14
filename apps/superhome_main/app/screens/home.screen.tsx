import { View, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { useTranslation } from '@/locales/useTranslation';
import { theme } from '@/theme/index';
import { homeStyles } from './home.screen.styles';

export default function Home() {
  const router = useRouter();
  const { language, isRTL, isLoading, setLanguage } = useRTL();
  const { t } = useTranslation();

  // Show loading state while language preference is being loaded
  if (isLoading) {
    return (
      <View style={homeStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
        <View style={homeStyles.content}>
          <Text variant="body" language="en">Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <View style={homeStyles.header}>
        <View style={homeStyles.logoContainer}>
          <View style={homeStyles.logo}>
            <Text variant="title" style={homeStyles.logoText} language={language}>S</Text>
          </View>
          <Text variant="title" style={homeStyles.brandName} language={language}>SuperHome</Text>
        </View>
        
        <Pressable 
          style={homeStyles.languageButton}
          onPress={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        >
          <Text variant="caption" weight="medium" style={homeStyles.languageText} language={language}>
            {language === 'en' ? t('home.switchToArabic') : t('home.switchToEnglish')}
          </Text>
        </Pressable>
      </View>

      <View style={homeStyles.content}>
        <View style={homeStyles.heroSection}>
          <Text variant="heading" style={homeStyles.heroTitle} language={language}>
            {t('home.title')}
          </Text>
          <Text variant="heading" style={homeStyles.heroTitle} language={language}>
            {t('home.subtitle')}
          </Text>
          <Text variant="subtitle" style={homeStyles.heroSubtitle} language={language}>
            {t('home.tagline')}
          </Text>
        </View>

        <View style={homeStyles.features}>
          <View style={homeStyles.featureItem}>
            <View style={[homeStyles.featureIcon, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={homeStyles.featureIconText} language={language}>✨</Text>
            </View>
            <Text variant="body" weight="semibold" style={homeStyles.featureTitle} language={language}>
              {t('home.aiPowered')}
            </Text>
            <Text variant="caption" style={homeStyles.featureDescription} language={language}>
              {t('home.aiDescription')}
            </Text>
          </View>

          <View style={homeStyles.featureItem}>
            <View style={[homeStyles.featureIcon, { backgroundColor: theme.colors.secondary[500] }]}>
              <Text style={homeStyles.featureIconText} language={language}>⚡</Text>
            </View>
            <Text variant="body" weight="semibold" style={homeStyles.featureTitle} language={language}>
              {t('home.instantBooking')}
            </Text>
            <Text variant="caption" style={homeStyles.featureDescription} language={language}>
              {t('home.instantDescription')}
            </Text>
          </View>

          <View style={homeStyles.featureItem}>
            <View style={[homeStyles.featureIcon, { backgroundColor: theme.colors.accent.amber }]}>
              <Text style={homeStyles.featureIconText} language={language}>🛡️</Text>
            </View>
            <Text variant="body" weight="semibold" style={homeStyles.featureTitle} language={language}>
              {t('home.trustedPros')}
            </Text>
            <Text variant="caption" style={homeStyles.featureDescription} language={language}>
              {t('home.trustedDescription')}
            </Text>
          </View>
        </View>

        <View style={homeStyles.ctaSection}>
          <Pressable 
            style={homeStyles.demoButton}
            onPress={() => router.push('/demo')}
          >
            <Text variant="body" weight="medium" style={homeStyles.demoButtonText} language={language}>
              🚀 Try AI Demo
            </Text>
          </Pressable>
          <Text variant="caption" style={homeStyles.ctaSubtitle} language={language}>
            See how SuperHome AI handles your home service requests instantly
          </Text>
        </View>
      </View>
    </View>
  );
}
