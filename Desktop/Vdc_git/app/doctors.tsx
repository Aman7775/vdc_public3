import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Star, Clock, Video, MapPin, CircleCheck as CheckCircle, Award } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function DoctorsScreen() {
  const { colors } = useTheme();
  
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 256,
      consultationFee: 800,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 3:00 PM',
      languages: ['English', 'Hindi'],
      verified: true,
      qualifications: ['MBBS', 'MD Cardiology'],
      hospital: 'Apollo Hospital',
      location: 'Bandra, Mumbai',
      consultationTypes: ['Video', 'In-Clinic'],
      awards: ['Best Cardiologist 2023']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      experience: '8 years',
      rating: 4.8,
      reviews: 189,
      consultationFee: 600,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 10:00 AM',
      languages: ['English'],
      verified: true,
      qualifications: ['MBBS', 'MD Dermatology'],
      hospital: 'Fortis Hospital',
      location: 'Andheri, Mumbai',
      consultationTypes: ['Video', 'In-Clinic', 'Home Visit'],
      awards: []
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 342,
      consultationFee: 700,
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 5:30 PM',
      languages: ['English', 'Hindi', 'Tamil'],
      verified: true,
      qualifications: ['MBBS', 'MS Gynecology'],
      hospital: 'Lilavati Hospital',
      location: 'Bandra, Mumbai',
      consultationTypes: ['Video', 'In-Clinic'],
      awards: ['Excellence in Women\'s Health']
    },
    {
      id: 4,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Orthopedist',
      experience: '10 years',
      rating: 4.7,
      reviews: 178,
      consultationFee: 650,
      image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 2:00 PM',
      languages: ['English', 'Hindi'],
      verified: true,
      qualifications: ['MBBS', 'MS Orthopedics'],
      hospital: 'Hinduja Hospital',
      location: 'Mahim, Mumbai',
      consultationTypes: ['Video', 'In-Clinic'],
      awards: []
    },
    {
      id: 5,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      experience: '9 years',
      rating: 4.8,
      reviews: 223,
      consultationFee: 550,
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 4:00 PM',
      languages: ['English', 'Hindi'],
      verified: true,
      qualifications: ['MBBS', 'MD Pediatrics'],
      hospital: 'Kokilaben Hospital',
      location: 'Andheri, Mumbai',
      consultationTypes: ['Video', 'In-Clinic', 'Home Visit'],
      awards: ['Child Care Excellence Award']
    }
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Find Doctors</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{doctors.length} doctors available</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {doctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id} 
            style={styles.doctorCard}
            onPress={() => router.push(`/doctor/${doctor.id}`)}
          >
            <View style={styles.doctorImageContainer}>
              <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
              {doctor.verified && (
                <View style={styles.verifiedBadge}>
                  <CheckCircle size={12} color={colors.success} />
                </View>
              )}
            </View>

            <View style={styles.doctorInfo}>
              <View style={styles.doctorHeader}>
                <View style={styles.doctorTitleRow}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  {doctor.awards.length > 0 && (
                    <Award size={14} color={colors.warning} />
                  )}
                </View>
                <View style={styles.rating}>
                  <Star size={12} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                  <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                </View>
              </View>

              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
              
              <View style={styles.doctorLocation}>
                <MapPin size={12} color={colors.textSecondary} />
                <Text style={styles.locationText}>{doctor.hospital}, {doctor.location}</Text>
              </View>

              <View style={styles.doctorMeta}>
                <View style={styles.availability}>
                  <Clock size={12} color={colors.success} />
                  <Text style={styles.availabilityText}>{doctor.nextAvailable}</Text>
                </View>
                <Text style={styles.consultationFee}>₹{doctor.consultationFee}</Text>
              </View>

              <View style={styles.consultationTypes}>
                {doctor.consultationTypes.map((type, index) => (
                  <View key={index} style={styles.consultationTypeTag}>
                    {type === 'Video' && <Video size={10} color={colors.primary} />}
                    <Text style={styles.consultationTypeText}>{type}</Text>
                  </View>
                ))}
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
    },
    filterButton: {
      backgroundColor: colors.surface,
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
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
    resultsContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    resultsText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    scrollView: {
      flex: 1,
    },
    doctorCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
    },
    doctorImageContainer: {
      position: 'relative',
      marginRight: 16,
    },
    doctorImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 2,
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
    doctorTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    doctorName: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginRight: 6,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 12,
      color: colors.warning,
      fontFamily: 'Inter-Medium',
      marginLeft: 4,
    },
    reviewsText: {
      fontSize: 10,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 2,
    },
    doctorSpecialty: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      marginBottom: 2,
    },
    doctorExperience: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 6,
    },
    doctorLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
      flex: 1,
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
      color: colors.success,
      fontFamily: 'Inter-Medium',
      marginLeft: 4,
    },
    consultationFee: {
      fontSize: 14,
      color: colors.success,
      fontFamily: 'Inter-SemiBold',
    },
    consultationTypes: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 8,
    },
    consultationTypeTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${colors.primary}20`,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    consultationTypeText: {
      fontSize: 10,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      marginLeft: 2,
    },
    languages: {
      flexDirection: 'row',
      gap: 4,
    },
    languageTag: {
      fontSize: 10,
      color: colors.textSecondary,
      backgroundColor: colors.card,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: 'Inter-Regular',
    },
    consultButton: {
      backgroundColor: colors.primary,
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
  });
}