import React from 'react';
import { View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import theme from '../theme';
import { Typography } from '../components/Typography';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../mockData';

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/limited_edition_logo_cropped.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Products Grid */}
        <FlatList
          data={mockProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ProductCard
                product={item}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            </View>
          )}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xl,
  },
  logo: {
    width: 200,
    height: 80,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
});
