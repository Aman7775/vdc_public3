import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Search,
  Filter,
  TestTube,
  Stethoscope,
  Heart,
  Baby,
  Eye,
  Brain,
  Bone,
  Activity,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  Wallet,
  Calendar,
  Sun,
  Moon
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SectionHeader } from '@/components/SectionHeader';
import { CharitableBanners } from '@/components/CharitableBanners';
import { diagnosticCenters } from '../data/diagnosticCenters';
import { LabTestDetailModal } from '@/components/LabTestDetailModal';

// Dummy doctor categories
const doctorsCategories = [
  { id: 1, name: 'Cardiologist' },
  { id: 2, name: 'Dermatologist' },
  { id: 3, name: 'Neurologist' },
  { id: 4, name: 'Pediatrician' },
  { id: 5, name: 'Orthopedic' },
  { id: 6, name: 'ENT' },
  { id: 7, name: 'Dentist' },
  { id: 8, name: 'Oncologist' },
];

export default function Home() {
  const { colors, themeMode, setThemeMode } = useTheme();

  const quickActions = [
    { id: 1, title: 'Book Test', icon: TestTube, color: colors.primary, route: '/lab-tests' },
    { id: 2, title: 'Find Doctor', icon: Stethoscope, color: colors.success, route: '/doctors' },
    { id: 3, title: 'My Wallet', icon: Wallet, color: colors.warning, route: '/wallet' },
    { id: 4, title: 'Appointments', icon: Calendar, color: colors.info, route: '/appointments' },
  ];

  const featuredTests = [
    {
      id: 1,
      name: 'Complete Blood Count',
      description: 'Comprehensive blood analysis',
      price: '₹299',
      originalPrice: '₹450',
      discount: '33% OFF',
      parameters: 8,
      reportTime: '4-6 hours',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Lipid Profile',
      description: 'Cholesterol & heart health',
      price: '₹349',
      originalPrice: '₹500',
      discount: '30% OFF',
      parameters: 5,
      reportTime: '6-8 hours',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Thyroid Profile',
      description: 'Complete thyroid function',
      price: '₹449',
      originalPrice: '₹650',
      discount: '31% OFF',
      parameters: 5,
      reportTime: '12-24 hours',
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const specializations = [
    { id: 1, name: 'General Physician', icon: Stethoscope, color: colors.primary, doctors: 156 },
    { id: 2, name: 'Dermatologist', icon: Heart, color: colors.error, doctors: 89 },
    { id: 3, name: 'Gynecologist', icon: Baby, color: colors.accent, doctors: 67 },
    { id: 4, name: 'Eye Specialist', icon: Eye, color: colors.info, doctors: 43 },
    { id: 5, name: 'Cardiologist', icon: Heart, color: colors.error, doctors: 78 },
    { id: 6, name: 'Neurologist', icon: Brain, color: colors.primary, doctors: 32 },
    { id: 7, name: 'Orthopedist', icon: Bone, color: colors.success, doctors: 54 },
    { id: 8, name: 'Gastroenterologist', icon: Activity, color: colors.warning, doctors: 41 },
  ];

  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 256,
      fee: '₹800',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 3:00 PM'
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
      nextAvailable: 'Tomorrow 10:00 AM'
    }
  ];

  const styles = createStyles(colors);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);

  // Helper to find a center that offers the test
  const findCenterForTest = (testName: string) => {
    return diagnosticCenters.find(center => center.tests.some((t: string) => t.includes(testName)));
  };

  // Toggle between light and dark mode
  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity onPress={handleThemeToggle} style={styles.themeIconButton}>
            {themeMode === 'dark' ? (
              <Sun size={22} color={colors.text} />
            ) : (
              <Moon size={22} color={colors.text} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, tests, hospitals..."
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {/* Add Find Doctors & Diagnostic Centers Buttons */}
          <View style={styles.exploreButtonsRow}>
            <TouchableOpacity
              style={[styles.exploreButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/doctor-categories')}
            >
              <Text style={styles.exploreButtonText}>Find Doctors</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.exploreButton, { backgroundColor: colors.accent }]}
              onPress={() => router.push('/diagnostic-centers')}
            >
              <Text style={styles.exploreButtonText}>Diagnostic Centers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Blood Tests Section */}
        <View style={styles.section}>
          <SectionHeader title="Featured Blood Tests" navigateTo="/lab-tests" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredTests.map((test) => (
              <TouchableOpacity
                key={test.id}
                style={styles.testCard}
                onPress={() => {
                  setSelectedTest(test);
                  const center = findCenterForTest(test.name);
                  setSelectedCenter(center);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri: test.image }} style={styles.testImage} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{test.discount}</Text>
                </View>
                <View style={styles.testContent}>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDescription}>{test.description}</Text>
                  <View style={styles.testMeta}>
                    <View style={styles.testMetaItem}>
                      <TestTube size={12} color={colors.textSecondary} />
                      <Text style={styles.testMetaText}>{test.parameters} parameters</Text>
                    </View>
                    <View style={styles.testMetaItem}>
                      <Clock size={12} color={colors.textSecondary} />
                      <Text style={styles.testMetaText}>{test.reportTime}</Text>
                    </View>
                  </View>
                  <View style={styles.testPricing}>
                    <Text style={styles.testPrice}>{test.price}</Text>
                    <Text style={styles.testOriginalPrice}>{test.originalPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Specializations Section */}
        <View style={styles.section}>
          <SectionHeader title="Popular Specializations" navigateTo="/specializations" />
          <View style={styles.specializationsGrid}>
            {specializations.map((spec) => (
              <TouchableOpacity
                key={spec.id}
                style={styles.specializationCard}
                onPress={() => router.push(`/specialty/${spec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
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

        {/* Charitable Banners Section */}
        <CharitableBanners />

        {/* Diagnostic Centers Section */}
        <View style={styles.section}>
          <SectionHeader title="Diagnostic Centers" navigateTo="/diagnostic-centers" />
          {diagnosticCenters.map((center) => (
            <TouchableOpacity
              key={center.id}
              style={styles.centerCard}
              onPress={() => router.push(`/diagnostic-center/${center.id}`)}
            >
              <View style={styles.centerInfo}>
                <Text style={styles.centerName}>{center.name}</Text>
                <View style={styles.centerLocation}>
                  <MapPin size={12} color={colors.textSecondary} />
                  <Text style={styles.centerAddress}>{center.address}</Text>
                </View>
                <View style={styles.centerMeta}>
                  <View style={styles.centerRating}>
                    <Star size={12} color={colors.warning} fill={colors.warning} />
                    <Text style={styles.ratingText}>{center.rating}</Text>
                  </View>
                  <Text style={styles.testsCount}>{center.tests.length} tests</Text>
                </View>
                <View style={styles.centerActions}>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookTestButton}>
                    <Text style={styles.bookTestText}>Book Test</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Quick Actions Row (below Diagnostic Centers) */}
        <View style={styles.quickActionsRowNew}>
          <TouchableOpacity style={styles.quickActionCardNew} onPress={() => router.push('/lab-tests')}>
            <TestTube size={28} color={colors.primary} />
            <Text style={styles.quickActionTextNew}>Book Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCardNew} onPress={() => router.push('/help')}>
            <Heart size={28} color={colors.error} />
            <Text style={styles.quickActionTextNew}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCardNew} onPress={() => router.push('/doctors')}>
            <Stethoscope size={28} color={colors.success} />
            <Text style={styles.quickActionTextNew}>Find Doctor</Text>
          </TouchableOpacity>
        </View>

        {/* Top Rated Doctors Section */}
        <View style={styles.section}>
          <SectionHeader title="Top Rated Doctors" navigateTo="/doctors" />
          {topDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.doctorCard}
              onPress={() => router.push(`/doctor/${doctor.id}`)}
            >
              <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <View style={styles.doctorHeader}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View style={styles.doctorRating}>
                    <Star size={12} color={colors.warning} fill={colors.warning} />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                  </View>
                </View>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
                <View style={styles.doctorMeta}>
                  <View style={styles.availability}>
                    <Clock size={12} color={colors.success} />
                    <Text style={styles.availabilityText}>{doctor.nextAvailable}</Text>
                  </View>
                  <Text style={styles.consultationFee}>{doctor.fee}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.consultButton}>
                <Text style={styles.consultButtonText}>Consult</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
      <LabTestDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        test={selectedTest}
        center={selectedCenter}
      />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerContent: {
      flex: 1,
    },
    greeting: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    userName: {
      fontSize: 20,
      color: colors.text,
      fontFamily: 'Inter-Bold',
      marginTop: 2,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      position: 'relative',
    },
    notificationDot: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 24,
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
    filterButton: {
      marginLeft: 12,
    },
    // Added styles for Explore buttons
    exploreButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      gap: 12,
    },
    exploreButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 2,
    },
    exploreButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 12,
    },
    quickActionCard: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      padding: 12,
      borderRadius: 12,
      marginBottom: 8,
    },
    quickActionTitle: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
    },
    horizontalScroll: {
      paddingLeft: 20,
    },
    testCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginRight: 16,
      width: 280,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    testImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    discountBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: colors.error,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    discountText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    testContent: {
      padding: 16,
    },
    testName: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    testDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 12,
    },
    testMeta: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 12,
    },
    testMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    testMetaText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
    },
    testPricing: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    testPrice: {
      fontSize: 18,
      color: colors.success,
      fontFamily: 'Inter-Bold',
      marginRight: 8,
    },
    testOriginalPrice: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textDecorationLine: 'line-through',
    },
    bookButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    bookButtonText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    specializationsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      gap: 12,
    },
    specializationCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      width: '22%',
      borderWidth: 1,
      borderColor: colors.border,
    },
    specializationIcon: {
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
    specializationName: {
      fontSize: 11,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
      marginBottom: 4,
    },
    doctorCount: {
      fontSize: 9,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    centerCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 12,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    centerImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
    centerInfo: {
      flex: 1,
      padding: 16,
    },
    centerName: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 6,
    },
    centerLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    centerAddress: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
      flex: 1,
    },
    centerMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    centerRating: {
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
    testsCount: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    centerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    viewDetailsButton: {
      flex: 1,
      backgroundColor: colors.card,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    viewDetailsText: {
      fontSize: 11,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    bookTestButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    bookTestText: {
      fontSize: 11,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    doctorCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 12,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
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
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      flex: 1,
    },
    doctorRating: {
      flexDirection: 'row',
      alignItems: 'center',
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
      marginBottom: 8,
    },
    doctorMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    diagnosticBtn: {
      backgroundColor: '#FFF4E6',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF6F61',
    },
    diagnosticBtnText: { color: '#36454F', fontWeight: 'bold', fontSize: 16 },
    quickActionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
    quickActionBtn: { backgroundColor: '#FF6F61', borderRadius: 8, padding: 12, minWidth: 120, alignItems: 'center' },
    quickActionText: { color: '#fff', fontWeight: 'bold' },
    // centerCard: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, marginHorizontal: 16 },
    centerArea: { color: '#36454F', fontSize: 13, marginBottom: 4 },
    // viewDetailsButton: { backgroundColor: '#FF6F61', borderRadius: 6, padding: 8, marginTop: 6, alignSelf: 'flex-start' },
    // sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#36454F', marginLeft: 16, marginTop: 16, marginBottom: 4 },
    categoryChip: { backgroundColor: '#FF6F61', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 },
    categoryText: { color: '#fff', fontWeight: 'bold' },
    topRatedPlaceholder: { backgroundColor: '#fff', borderRadius: 10, padding: 24, marginHorizontal: 16, alignItems: 'center', marginBottom: 12 },
    themeIconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      marginLeft: 12,
    },
    themeIcon: {
      width: 20,
      height: 20,
    },
    quickActionsRowNew: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 12,
    },
    quickActionCardNew: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
    },
    quickActionTextNew: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      marginLeft: 8,
    },
  });
}