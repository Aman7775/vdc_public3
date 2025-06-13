import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Stethoscope, Heart, Baby, Eye, Brain, Bone, Activity, Users } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SpecializationsScreen() {
  const { colors } = useTheme();
  
  const allSpecializations = [
    { id: 1, name: 'General Physician', icon: Stethoscope, color: colors.primary, doctors: 156, description: 'Primary care doctors for general health concerns' },
    { id: 2, name: 'Dermatologist', icon: Heart, color: colors.error, doctors: 89, description: 'Skin, hair, and nail specialists' },
    { id: 3, name: 'Gynecologist', icon: Baby, color: colors.accent, doctors: 67, description: 'Women\'s reproductive health specialists' },
    { id: 4, name: 'Eye Specialist', icon: Eye, color: colors.info, doctors: 43, description: 'Vision and eye care specialists' },
    { id: 5, name: 'Cardiologist', icon: Heart, color: colors.error, doctors: 78, description: 'Heart and cardiovascular specialists' },
    { id: 6, name: 'Neurologist', icon: Brain, color: colors.primary, doctors: 32, description: 'Brain and nervous system specialists' },
    { id: 7, name: 'Orthopedist', icon: Bone, color: colors.success, doctors: 54, description: 'Bone and joint specialists' },
    { id: 8, name: 'Gastroenterologist', icon: Activity, color: colors.warning, doctors: 41, description: 'Digestive system specialists' },
    { id: 9, name: 'Pediatrician', icon: Baby, color: colors.accent, doctors: 92, description: 'Children\'s health specialists' },
    { id: 10, name: 'Psychiatrist', icon: Brain, color: colors.info, doctors: 28, description: 'Mental health specialists' },
    { id: 11, name: 'ENT Specialist', icon: Users, color: colors.success, doctors: 35, description: 'Ear, nose, and throat specialists' },
    { id: 12, name: 'Oncologist', icon: Heart, color: colors.error, doctors: 19, description: 'Cancer treatment specialists' },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>All Specializations</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search specializations..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.specializationsGrid}>
          {allSpecializations.map((spec) => (
            <TouchableOpacity 
              key={spec.id} 
              style={styles.specializationCard}
              onPress={() => router.push(`/specialty/${spec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
            >
              <View style={[styles.specializationIcon, { backgroundColor: `${spec.color}20` }]}>
                <spec.icon size={24} color={spec.color} />
              </View>
              <Text style={styles.specializationName}>{spec.name}</Text>
              <Text style={styles.specializationDescription}>{spec.description}</Text>
              <Text style={styles.doctorCount}>{spec.doctors} doctors available</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      flex: 1,
      fontSize: 20,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    searchBar: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
    },
    scrollView: {
      flex: 1,
    },
    specializationsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      gap: 16,
    },
    specializationCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      width: '47%',
      borderWidth: 1,
      borderColor: colors.border,
    },
    specializationIcon: {
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    specializationName: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
      marginBottom: 8,
    },
    specializationDescription: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      marginBottom: 8,
      lineHeight: 14,
    },
    doctorCount: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
    },
  });
}