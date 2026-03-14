import { useState } from 'react';
import { View, StyleSheet, Pressable, StatusBar } from 'react-native';
import { Text } from '@/components/Text';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const isRTL = language === 'ar';

  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  return (
    <View style={[styles.container, isRTL && styles.rtl]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text variant="title" style={styles.logoText} language={language}>S</Text>
          </View>
          <Text variant="title" style={styles.brandName} language={language}>SuperHome</Text>
        </View>
        
        <Pressable 
          style={styles.languageButton}
          onPress={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
        >
          <Text variant="caption" weight="medium" style={styles.languageText} language={language}>
            {language === 'en' ? 'العربية' : 'English'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text variant="heading" style={styles.heroTitle} language={language}>
            {language === 'en' ? 'Your home,' : 'منزلك،'}
          </Text>
          <Text variant="heading" style={styles.heroTitle} language={language}>
            {language === 'en' ? 'effortlessly.' : 'بسهولة.'}
          </Text>
          <Text variant="subtitle" style={styles.heroSubtitle} language={language}>
            {language === 'en' ? 'Your home, effortlessly.' : 'منزلك، بسهولة.'}
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#3b82f6' }]}>
              <Text style={styles.featureIconText} language={language}>✨</Text>
            </View>
            <Text variant="body" weight="semibold" style={styles.featureTitle} language={language}>
              {language === 'en' ? 'AI-Powered' : 'مدعوم بالذكاء الاصطناعي'}
            </Text>
            <Text variant="caption" style={styles.featureDescription} language={language}>
              {language === 'en' 
                ? 'Smart matching with the best service providers'
                : 'تطبيق ذكي لأفضل مقدمي الخدمات'
              }
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#10b981' }]}>
              <Text style={styles.featureIconText} language={language}>⚡</Text>
            </View>
            <Text variant="body" weight="semibold" style={styles.featureTitle} language={language}>
              {language === 'en' ? 'Instant Booking' : 'حجز فوري'}
            </Text>
            <Text variant="caption" style={styles.featureDescription} language={language}>
              {language === 'en' 
                ? 'No waiting, no hassle. Just tell us what you need'
                : 'بدون انتظار، بدون تعقيد. فقط أخبرنا بما تحتاج'
              }
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#f59e0b' }]}>
              <Text style={styles.featureIconText} language={language}>🛡️</Text>
            </View>
            <Text variant="body" weight="semibold" style={styles.featureTitle} language={language}>
              {language === 'en' ? 'Trusted Pros' : 'محترفون موثوقون'}
            </Text>
            <Text variant="caption" style={styles.featureDescription} language={language}>
              {language === 'en' 
                ? 'Verified professionals with real reviews'
                : 'محترفون موثقون بتقييمات حقيقية'
              }
            </Text>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text variant="body" weight="medium" style={styles.ctaSubtitle} language={language}>
            {language === 'en' 
              ? 'Coming soon • AI-powered home services'
              : 'قريباً • خدمات منزلية مدعومة بالذكاء الاصطناعي'
            }
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  rtl: {
    direction: 'rtl',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#ffffff',
  },
  brandName: {
    color: '#1e293b',
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  languageText: {
    color: '#64748b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 48,
  },
  heroTitle: {
    color: '#1e293b',
  },
  heroSubtitle: {
    color: '#64748b',
    marginTop: 12,
  },
  features: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTitle: {
    color: '#1e293b',
    marginBottom: 4,
    flex: 1,
  },
  featureDescription: {
    color: '#64748b',
    flex: 1,
  },
  ctaSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  ctaSubtitle: {
    color: '#64748b',
    textAlign: 'center',
  },
});
