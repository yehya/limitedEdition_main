import React, { useState } from 'react';
import { View, Pressable, StatusBar, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { theme } from '@/theme/index';
import { reviewStyles } from './screens/review.screen.styles';
import { ThumbsUp, ThumbsDown } from 'lucide-react-native';

export default function ReviewScreen() {
  const router = useRouter();
  const { language, isLoading } = useRTL();
  const [rating, setRating] = useState<'good' | 'bad' | null>(null);
  const [comment, setComment] = useState('');

  const professional = {
    name: 'Ahmed Hassan',
    service: 'Plumbing Repair',
  };

  const handleSubmit = () => {
    router.push('/retention-prompt');
  };

  const handleSkip = () => {
    router.push('/retention-prompt');
  };

  if (isLoading) {
    return (
      <View style={reviewStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      </View>
    );
  }

  return (
    <View style={reviewStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      
      <ScrollView 
        contentContainerStyle={reviewStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={reviewStyles.content}>
          {/* Header */}
          <View style={reviewStyles.header}>
            <Text variant="heading" style={reviewStyles.title}>
              How was your experience?
            </Text>
            <Text variant="body" style={reviewStyles.subtitle}>
              Help us improve by rating {professional.name}
            </Text>
          </View>

          {/* Rating Question */}
          <View style={reviewStyles.ratingContainer}>
            <Text variant="body" weight="medium" style={reviewStyles.question}>
              Was the job done well?
            </Text>
            
            <View style={reviewStyles.ratingButtons}>
              <Pressable 
                style={[
                  reviewStyles.ratingButton,
                  rating === 'good' && reviewStyles.ratingButtonGoodActive
                ]}
                onPress={() => setRating('good')}
              >
                <ThumbsUp 
                  size={32} 
                  color={rating === 'good' ? theme.colors.text.inverse : theme.colors.semantic.success} 
                />
                <Text variant="body" style={[
                  reviewStyles.ratingButtonText,
                  rating === 'good' && reviewStyles.ratingButtonTextActive
                ]}>
                  Yes
                </Text>
              </Pressable>

              <Pressable 
                style={[
                  reviewStyles.ratingButton,
                  rating === 'bad' && reviewStyles.ratingButtonBadActive
                ]}
                onPress={() => setRating('bad')}
              >
                <ThumbsDown 
                  size={32} 
                  color={rating === 'bad' ? theme.colors.text.inverse : theme.colors.semantic.error} 
                />
                <Text variant="body" style={[
                  reviewStyles.ratingButtonText,
                  rating === 'bad' && reviewStyles.ratingButtonTextActive
                ]}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Optional Comment */}
          <View style={reviewStyles.commentContainer}>
            <Text variant="body" weight="medium" style={reviewStyles.commentLabel}>
              Additional comments (optional)
            </Text>
            <TextInput
              style={reviewStyles.commentInput}
              placeholder="Tell us more about your experience..."
              placeholderTextColor={theme.colors.text.tertiary}
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
              textAlignVertical="top"
            />
          </View>

          {/* Trust Message */}
          <View style={reviewStyles.trustContainer}>
            <Text variant="caption" style={reviewStyles.trustText}>
              Your feedback helps us maintain quality standards
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={reviewStyles.bottomSection}>
        <Pressable 
          style={reviewStyles.skipButton}
          onPress={handleSkip}
        >
          <Text variant="body" style={reviewStyles.skipButtonText}>
            Skip
          </Text>
        </Pressable>
        <Pressable 
          style={[
            reviewStyles.submitButton,
            !rating && reviewStyles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!rating}
        >
          <Text variant="body" weight="medium" style={reviewStyles.submitButtonText}>
            Submit Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
