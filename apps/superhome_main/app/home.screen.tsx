import { View, Pressable, StatusBar } from 'react-native';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { useTranslation } from '@/locales/useTranslation';
import { theme } from '@/theme/index';
import { homeStyles } from './home.screen.styles';

export default function Home() {
  const { language, isRTL, setLanguage } = useRTL();
  const { t } = useTranslation();

  return (
    <View style={[homeStyles.container, isRTL && homeStyles.rtl]}>
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
          <Text variant="body" weight="medium" style={homeStyles.ctaSubtitle} language={language}>
            {t('home.comingSoon')}
          </Text>
        </View>
      </View>
    </View>
  );
}
