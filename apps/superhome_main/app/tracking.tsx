import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const STEPS = [
  { label: 'Request received', done: true },
  { label: 'Provider matched', done: true },
  { label: 'On the way', done: false, active: true },
  { label: 'Service in progress', done: false },
  { label: 'Completed', done: false },
];

export default function Tracking() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ahmad is on the way</Text>
        <Text style={styles.subtitle}>Arriving in ~25 minutes</Text>

        <View style={styles.providerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>Ahmad M.</Text>
            <Text style={styles.providerDetail}>⭐ 4.9 · Plumber · 3 years</Text>
          </View>
        </View>

        <View style={styles.timeline}>
          {STEPS.map((step, i) => (
            <View key={i} style={styles.step}>
              <View style={styles.stepIndicator}>
                <View style={[
                  styles.dot,
                  step.done && styles.dotDone,
                  step.active && styles.dotActive,
                ]} />
                {i < STEPS.length - 1 && (
                  <View style={[styles.line, step.done && styles.lineDone]} />
                )}
              </View>
              <Text style={[
                styles.stepLabel,
                step.done && styles.stepLabelDone,
                step.active && styles.stepLabelActive,
              ]}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.replace('/chat')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  providerDetail: {
    fontSize: 14,
    color: '#666',
  },
  timeline: {
    paddingLeft: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 48,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ddd',
  },
  dotDone: {
    backgroundColor: '#22c55e',
  },
  dotActive: {
    backgroundColor: '#111',
  },
  line: {
    width: 2,
    height: 34,
    backgroundColor: '#ddd',
  },
  lineDone: {
    backgroundColor: '#22c55e',
  },
  stepLabel: {
    fontSize: 16,
    color: '#bbb',
    paddingTop: -2,
  },
  stepLabelDone: {
    color: '#22c55e',
  },
  stepLabelActive: {
    color: '#111',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 24,
    marginBottom: 40,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
