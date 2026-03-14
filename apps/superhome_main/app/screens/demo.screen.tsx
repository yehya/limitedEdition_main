import React, { useState, useEffect } from 'react';
import { View, Text as RNText, Pressable, StatusBar, Animated, Dimensions, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { useTranslation } from '@/locales/useTranslation';
import { theme } from '@/theme/index';
import { demoStyles } from './demo.screen.styles';

const { width } = Dimensions.get('window');

interface DemoStep {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp?: string;
  delay: number;
}

const DEMO_FLOW: DemoStep[] = [
  {
    id: '1',
    type: 'user',
    content: "My kitchen sink is leaking and I need it fixed today",
    delay: 1000,
  },
  {
    id: '2',
    type: 'system',
    content: "Analyzing your request...",
    delay: 2000,
  },
  {
    id: '3',
    type: 'ai',
    content: "I understand you have a kitchen sink leak that needs urgent attention. I'm finding the best available plumbers in your area right now.",
    delay: 1500,
  },
  {
    id: '4',
    type: 'ai',
    content: "Found 3 highly-rated plumbers available today:\n\n🔧 Ahmed's Plumbing - 4.9⭐ (2km away)\n   Available: 2:00 PM - $85/hour\n\n🔧 QuickFix Services - 4.8⭐ (3.5km away)\n   Available: 3:30 PM - $75/hour\n\n🔧 Pro Plumbing Co. - 5.0⭐ (5km away)\n   Available: 4:00 PM - $95/hour",
    delay: 2500,
  },
  {
    id: '5',
    type: 'ai',
    content: "Based on urgency and ratings, I recommend Ahmed's Plumbing. They have excellent reviews for emergency repairs and can be there in 30 minutes.\n\nShall I book the 2:00 PM slot for you?",
    delay: 2000,
  },
  {
    id: '6',
    type: 'system',
    content: "✅ Booking confirmed with Ahmed's Plumbing\n📍 Address: 123 Main Street, Apt 4B\n⏰ Time: Today, 2:00 PM\n💰 Cost: $85/hour + parts\n\nYou'll receive a confirmation call in 5 minutes.",
    delay: 3000,
  },
];

export default function DemoScreen() {
  const { language, isRTL, isLoading } = useRTL();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<DemoStep[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Start the demo flow
    const timer = setTimeout(() => {
      executeDemoStep(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const executeDemoStep = async (stepIndex: number) => {
    if (stepIndex >= DEMO_FLOW.length) return;

    const step = DEMO_FLOW[stepIndex];
    
    // Show typing indicator for AI messages
    if (step.type === 'ai') {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);
    }

    // Add the message with animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setMessages(prev => [...prev, { ...step, timestamp: new Date().toLocaleTimeString() }]);
    setCurrentStep(stepIndex + 1);

    // Reset animations for next message
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Execute next step
    if (stepIndex < DEMO_FLOW.length - 1) {
      const timer = setTimeout(() => {
        executeDemoStep(stepIndex + 1);
      }, DEMO_FLOW[stepIndex + 1].delay);
      return () => clearTimeout(timer);
    }
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setMessages([]);
    setIsTyping(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    const timer = setTimeout(() => {
      executeDemoStep(0);
    }, 500);
    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return (
      <View style={demoStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
        <View style={demoStyles.content}>
          <Text variant="body" language="en">Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={demoStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <View style={demoStyles.header}>
        <View style={demoStyles.logoContainer}>
          <View style={demoStyles.logo}>
            <Text variant="title" style={demoStyles.logoText} language={language}>S</Text>
          </View>
          <Text variant="title" style={demoStyles.brandName} language={language}>SuperHome</Text>
        </View>
        
        <Pressable style={demoStyles.languageButton} onPress={() => {}}>
          <Text variant="caption" weight="medium" style={demoStyles.languageText} language={language}>
            {language === 'en' ? 'العربية' : 'English'}
          </Text>
        </Pressable>
      </View>

      <View style={demoStyles.content}>
        <View style={demoStyles.demoHeader}>
          <Text variant="heading" style={demoStyles.demoTitle} language={language}>
            AI-Powered Home Services
          </Text>
          <Text variant="body" style={demoStyles.demoSubtitle} language={language}>
            Watch how SuperHome handles your home service requests instantly
          </Text>
        </View>

        <View style={demoStyles.chatContainer}>
          <View style={demoStyles.messagesContainer}>
            {messages.map((message, index) => (
              <Animated.View
                key={message.id}
                style={[
                  demoStyles.messageWrapper,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                    alignItems: message.type === 'user' ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                <View
                  style={[
                    demoStyles.messageBubble,
                    message.type === 'user' 
                      ? demoStyles.userMessage 
                      : message.type === 'ai'
                      ? demoStyles.aiMessage 
                      : demoStyles.systemMessage,
                  ]}
                >
                  <Text
                    variant="body"
                    style={StyleSheet.flatten([
                      demoStyles.messageText,
                      message.type === 'user' 
                        ? demoStyles.userMessageText 
                        : message.type === 'system'
                        ? demoStyles.systemMessageText
                        : demoStyles.aiMessageText,
                    ])}
                    language={language}
                  >
                    {message.content}
                  </Text>
                </View>
                {message.timestamp && (
                  <Text variant="caption" style={demoStyles.timestamp} language={language}>
                    {message.timestamp}
                  </Text>
                )}
              </Animated.View>
            ))}

            {isTyping && (
              <View style={[demoStyles.messageWrapper, { alignItems: 'flex-start' }]}>
                <View style={demoStyles.typingIndicator}>
                  <View style={demoStyles.typingDot} />
                  <View style={[demoStyles.typingDot, demoStyles.typingDot2]} />
                  <View style={[demoStyles.typingDot, demoStyles.typingDot3]} />
                </View>
              </View>
            )}
          </View>
        </View>

        {currentStep >= DEMO_FLOW.length && (
          <Animated.View style={demoStyles.restartContainer}>
            <Pressable style={demoStyles.restartButton} onPress={restartDemo}>
              <Text variant="body" weight="medium" style={demoStyles.restartButtonText} language={language}>
                Restart Demo
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
