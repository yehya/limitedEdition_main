import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BrandHeader } from '../components/home/BrandHeader';
import { TrustBadge } from '../components/home/TrustBadge';
import { Footer } from '../components/home/Footer';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { homeStyles } from './home.screen.styles';

export default function HomeScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Demo auto-typing effect
  useEffect(() => {
    const timer = setTimeout(() => {
      startAutoTyping();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const startAutoTyping = () => {
    setIsTyping(true);
    const demoText = "My kitchen sink is leaking and I need it fixed today";
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= demoText.length) {
        setUserInput(demoText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      router.push({
        pathname: '/processing',
        params: { request: userInput }
      });
    }
  };

  if (isLoading) {
    return (
      <View style={homeStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={homeStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={homeStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader />

        <View style={homeStyles.content}>
          <View style={homeStyles.inputContainer}>
            <TextInput
              style={homeStyles.textInput}
              placeholder="Describe what needs fixing... (e.g., 'My kitchen sink is leaking')"
              placeholderTextColor={theme.colors.text.tertiary}
              value={userInput}
              onChangeText={setUserInput}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              editable={!isTyping}
            />
          </View>

          <View style={homeStyles.trustContainer}>
            <TrustBadge icon="✓" text="Verified & Trained" />
            <TrustBadge icon="⭐" text="Premium Service" />
          </View>
        </View>

        <View style={homeStyles.bottomSection}>
          <Pressable 
            style={[
              homeStyles.submitButton,
              (!userInput.trim() || isTyping) && homeStyles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!userInput.trim() || isTyping}
          >
            <Text variant="body" weight="medium" style={homeStyles.submitButtonText}>
              Get Started
            </Text>
          </Pressable>
          
          <Footer />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
