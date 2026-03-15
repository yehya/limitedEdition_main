import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: any;
}

export const Skeleton = ({ width = '100%', height = 20, style }: SkeletonProps) => {
  return (
    <View 
      style={[
        styles.skeleton, 
        { width, height },
        style
      ]} 
    />
  );
};

export const ServiceCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardSkeleton}>
        <Skeleton width={60} height={60} style={styles.iconSkeleton} />
        <View style={styles.textContainer}>
          <Skeleton width={120} height={20} style={styles.titleSkeleton} />
          <Skeleton width={100} height={16} style={styles.subtitleSkeleton} />
          <Skeleton width={80} height={16} style={styles.priceSkeleton} />
        </View>
      </View>
    </View>
  );
};

export const ButtonSkeleton = () => {
  return (
    <Skeleton height={56} style={styles.buttonSkeleton} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.neutral[200],
    borderRadius: theme.borderRadius.sm,
    opacity: 0.7,
  },
  cardContainer: {
    marginBottom: theme.spacing.md,
  },
  cardSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  iconSkeleton: {
    marginRight: theme.spacing.lg,
  },
  textContainer: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  titleSkeleton: {
    marginBottom: theme.spacing.xs / 2,
  },
  subtitleSkeleton: {
    marginBottom: theme.spacing.xs / 2,
  },
  priceSkeleton: {
    alignSelf: 'flex-start',
  },
  buttonSkeleton: {
    borderRadius: theme.borderRadius.xl,
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing['2xl'],
  },
});
