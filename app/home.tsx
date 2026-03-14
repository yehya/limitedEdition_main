import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  const environment = process.env.EXPO_PUBLIC_FIREBASE_ENV || 'unknown';
  const isProduction = environment === 'production';
  
  return (
    <View style={styles.container}>
      <View style={[styles.environmentBadge, { backgroundColor: isProduction ? '#dc3545' : '#007bff' }]}>
        <Text style={styles.environmentText}>{environment.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Welcome to Expo + Firebase App Hosting</Text>
      <Text style={styles.subtitle}>
        This works on Web, iOS, and Android with one codebase
      </Text>
      <Text style={styles.environmentInfo}>
        Current Environment: <Text style={{ fontWeight: 'bold' }}>{environment}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  environmentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  environmentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  environmentInfo: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
