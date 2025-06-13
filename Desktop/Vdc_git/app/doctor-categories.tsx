import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { Brain, Heart, User, Baby, Eye, Bone, Activity, Stethoscope } from 'lucide-react-native';

const categories = [
  { key: 'neurologist', label: 'Neurologist', icon: Brain },
  { key: 'oncologist', label: 'Oncologist', icon: Activity },
  { key: 'cardiologist', label: 'Cardiologist', icon: Heart },
  { key: 'endocrinologist', label: 'Endocrinologist', icon: User },
  { key: 'gynecologist', label: 'Gynecologist', icon: Baby },
  { key: 'psychiatrist', label: 'Psychiatrist', icon: User },
  { key: 'general-practitioner', label: 'General Practitioner', icon: Stethoscope },
  { key: 'orthopaedist', label: 'Orthopaedist', icon: Bone },
  { key: 'pediatricians', label: 'Pediatricians', icon: Baby },
  { key: 'dermatologist', label: 'Dermatologist', icon: User },
  { key: 'gastroenterologist', label: 'Gastroenterologist', icon: Activity },
  { key: 'ophthalmologist', label: 'Ophthalmologist', icon: Eye },
  { key: 'anesthesiologist', label: 'Anesthesiologist', icon: User },
  { key: 'radiologist', label: 'Radiologist', icon: User },
  { key: 'cardiothoracic-surgeon', label: 'Cardiothoracic Surgeon', icon: Heart },
  { key: 'internist', label: 'Internist', icon: User },
  { key: 'pulmonologist', label: 'Pulmonologist', icon: User },
  { key: 'allergist', label: 'Allergist', icon: User },
  { key: 'dentist', label: 'Dentist', icon: User },
  { key: 'emergency-medicine', label: 'Emergency Medicine', icon: User },
  { key: 'nephrologist', label: 'Nephrologist', icon: User },
  { key: 'paediatrician', label: 'Paediatrician', icon: Baby },
  { key: 'urologist', label: 'Urologist', icon: User },
  { key: 'geneticist', label: 'Geneticist', icon: User },
];

export default function DoctorCategories() {
  const { colors } = useTheme();

  // Split categories into two rows
  const firstRow = categories.slice(0, Math.ceil(categories.length / 2));
  const secondRow = categories.slice(Math.ceil(categories.length / 2));

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Find a Specialist</Text>

      {/* First row of categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
        contentContainerStyle={styles.rowContent}
      >
        {firstRow.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(`/doctors/${cat.key}` as any)}
          >
            <cat.icon size={28} color={colors.primary} />
            <Text style={[styles.label, { color: colors.text }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Second row of categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
        contentContainerStyle={styles.rowContent}
      >
        {secondRow.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(`/doctors/${cat.key}` as any)}
          >
            <cat.icon size={28} color={colors.primary} />
            <Text style={[styles.label, { color: colors.text }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    marginBottom: 12,
  },
  rowContent: {
    paddingRight: 20,
  },
  card: {
    width: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  label: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});