import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const TIME_SLOTS = [
  { id: '1', label: 'Now', sublabel: 'Within 1 hour', emoji: '⚡' },
  { id: '2', label: 'Today', sublabel: '4:00 PM - 6:00 PM', emoji: '☀️' },
  { id: '3', label: 'Tomorrow', sublabel: '10:00 AM - 12:00 PM', emoji: '📅' },
];

export default function TimeSlots() {
  const router = useRouter();

  const selectSlot = (slot: typeof TIME_SLOTS[0]) => {
    router.push('/confirm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>When works for you?</Text>
        <Text style={styles.subtitle}>Pick a time and we'll handle the rest</Text>

        <View style={styles.slots}>
          {TIME_SLOTS.map(slot => (
            <Pressable
              key={slot.id}
              style={({ pressed }) => [styles.slot, pressed && styles.slotPressed]}
              onPress={() => selectSlot(slot)}
            >
              <Text style={styles.emoji}>{slot.emoji}</Text>
              <View style={styles.slotText}>
                <Text style={styles.slotLabel}>{slot.label}</Text>
                <Text style={styles.slotSublabel}>{slot.sublabel}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
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
    marginBottom: 40,
  },
  slots: {
    gap: 16,
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
  },
  slotPressed: {
    backgroundColor: '#e8e8e8',
    transform: [{ scale: 0.98 }],
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  slotText: {
    flex: 1,
  },
  slotLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  slotSublabel: {
    fontSize: 14,
    color: '#666',
  },
});
