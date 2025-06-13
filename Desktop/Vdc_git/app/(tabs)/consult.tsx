import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Search,
  Filter,
  Video,
  Calendar,
  Clock,
  Star,
  Heart,
  Eye,
  Baby,
  Stethoscope,
  Brain,
  Bone,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';

export default function ConsultTab() {
  const { setThemeMode } = useTheme();

  // Force light mode
  useEffect(() => {
    setThemeMode('light');
  }, []);

  const specializations = [
    { id: 1, name: 'General Physician', icon: Stethoscope, color: '#10B981', doctors: 156 },
    { id: 2, name: 'Dermatologist', icon: Heart, color: '#F59E0B', doctors: 89 },
    { id: 3, name: 'Gynecologist', icon: Baby, color: '#EC4899', doctors: 67 },
    { id: 4, name: 'Eye Specialist', icon: Eye, color: '#8B5CF6', doctors: 43 },
    { id: 5, name: 'Neurologist', icon: Brain, color: '#EF4444', doctors: 32 },
    { id: 6, name: 'Orthopedist', icon: Bone, color: '#06B6D4', doctors: 78 },
  ];

  const featuredDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 256,
      fee: '₹800',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 3:00 PM',
      languages: ['English', 'Hindi']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      experience: '8 years',
      rating: 4.8,
      reviews: 189,
      fee: '₹600',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 10:00 AM',
      languages: ['English']
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 342,
      fee: '₹700',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 5:30 PM',
      languages: ['English', 'Hindi', 'Tamil']
    }
  ];

  const consultationTypes = [
    { id: 1, type: 'Video Consultation', icon: Video, description: 'Consult from home' },
    { id: 2, type: 'In-Clinic Visit', icon: Calendar, description: 'Visit doctor\'s clinic' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Consult Doctors</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, specializations..."
              placeholderTextColor="#64748B"
            />
          </View>
        </View>

        {/* Consultation Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How would you like to consult?</Text>
          <View style={styles.consultationTypes}>
            {consultationTypes.map((type) => (
              <TouchableOpacity key={type.id} style={styles.consultationCard}>
                <View style={styles.consultationIcon}>
                  <type.icon size={24} color="#3B82F6" />
                </View>
                <Text style={styles.consultationType}>{type.type}</Text>
                <Text style={styles.consultationDescription}>{type.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Specializations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Specialization</Text>
          <View style={styles.specializationsGrid}>
            {specializations.map((spec) => (
              <TouchableOpacity
                key={spec.id}
                style={styles.specializationCard}
                onPress={() => router.push(`/specializations/${spec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}` as any)}
              >
                <View style={[styles.specializationIcon, { backgroundColor: `${spec.color}20` }]}>
                  <spec.icon size={20} color={spec.color} />
                </View>
                <Text style={styles.specializationName}>{spec.name}</Text>
                <Text style={styles.doctorCount}>{spec.doctors} doctors</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Doctors</Text>
            <TouchableOpacity onPress={() => router.push('/doctors')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredDoctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
              <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <View style={styles.doctorHeader}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View style={styles.rating}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                  </View>
                </View>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
                <View style={styles.doctorMeta}>
                  <View style={styles.availability}>
                    <Clock size={12} color="#10B981" />
                    <Text style={styles.availabilityText}>{doctor.nextAvailable}</Text>
                  </View>
                  <Text style={styles.consultationFee}>{doctor.fee}</Text>
                </View>
                <View style={styles.languages}>
                  {doctor.languages.map((lang, index) => (
                    <Text key={index} style={styles.languageTag}>{lang}</Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.consultButton}>
                <Text style={styles.consultButtonText}>Consult</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Consultation */}
        <View style={styles.section}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyIcon}>
              <Zap size={24} color="#EF4444" />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Need Urgent Consultation?</Text>
              <Text style={styles.emergencyDescription}>
                Connect with available doctors within 15 minutes
              </Text>
            </View>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Consult Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    color: '#F8FAFC',
    fontFamily: 'Inter-Bold',
  },
  filterButton: {
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#F8FAFC',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter-Medium',
  },
  consultationTypes: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  consultationCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  consultationIcon: {
    backgroundColor: '#3B82F620',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  consultationType: {
    fontSize: 14,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  consultationDescription: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  specializationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  specializationCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  specializationIcon: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  specializationName: {
    fontSize: 12,
    color: '#F8FAFC',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 4,
  },
  doctorCount: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  doctorCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#334155',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginLeft: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  doctorExperience: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 11,
    color: '#10B981',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  consultationFee: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
  },
  languages: {
    flexDirection: 'row',
    gap: 4,
  },
  languageTag: {
    fontSize: 10,
    color: '#64748B',
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Inter-Regular',
  },
  consultButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  consultButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  emergencyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emergencyIcon: {
    backgroundColor: '#EF444420',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});