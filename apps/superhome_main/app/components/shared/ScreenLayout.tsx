import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

interface ScreenLayoutProps {
  children: React.ReactNode;
  showScrollView?: boolean;
}

export const ScreenLayout = ({ children, showScrollView = true }: ScreenLayoutProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.background} />
      {showScrollView ? (
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
