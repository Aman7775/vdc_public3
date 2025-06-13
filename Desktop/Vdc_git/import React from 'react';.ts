import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: 'neuro', label: 'Neurologist', emoji: '🧠' },
  { id: 'cardio', label: 'Cardiologist', emoji: '💓' },
  { id: 'gp', label: 'General Practitioner', emoji: '⚕️' },
  // ...add all 20+ categories
];

export default function DoctorCategories({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Specialist</Text>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DoctorList', { categoryId: item.id })}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFF0', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#007C91', marginBottom: 16 },
  card: {
    flex: 1,
    backgroundColor: '#98FF98',
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    padding: 24,
  },
  emoji: { fontSize: 32 },
  label: { marginTop: 8, fontWeight: '600', color: '#36454F' },
});