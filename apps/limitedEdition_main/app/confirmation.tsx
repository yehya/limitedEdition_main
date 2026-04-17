import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import theme from '../theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';

export default function ConfirmationScreen() {
  const handleContinue = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Message */}
        <Typography variant="h2" style={styles.title}>
          ORDER CONFIRMED
        </Typography>

        {/* Order Number */}
        <Typography variant="body" color="secondary" style={styles.orderNumber}>
          Order #LE-2024-001
        </Typography>

        {/* Thank You Message */}
        <Typography variant="body" color="secondary" style={styles.message}>
          Thank you for your purchase. You will receive a confirmation message shortly.
        </Typography>

        {/* Details */}
        <View style={styles.details}>
          <Typography variant="caption" color="tertiary">
            Payment Method: Cash on Delivery
          </Typography>
          <Typography variant="caption" color="tertiary">
            Estimated Delivery: 1-2 weeks
          </Typography>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button title="CONTINUE SHOPPING" onPress={handleContinue} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  orderNumber: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  message: {
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
    lineHeight: 24,
  },
  details: {
    marginBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});
