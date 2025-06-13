import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Animated, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';
import { Search, Filter, TestTube, Clock, Star, MapPin, ScanEye, ChevronDown, ChevronUp, Hospital } from 'lucide-react-native';
import { LabTestDetailModal } from '@/components/LabTestDetailModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as RNImage } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GenderEntryCards } from '../components/GenderEntryCards';
import { diagnosticCenters } from '../data/diagnosticCenters';

export default function LabTestsTab() {
  const { colors, setThemeMode } = useTheme();
  const router = useRouter();

  // Force light mode
  useEffect(() => {
    setThemeMode('light');
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'blood' | 'scan'>('blood');
  const sliderAnim = useState(new Animated.Value(0))[0];
  const screenWidth = Dimensions.get('window').width;
  const pillWidth = Math.min(340, screenWidth - 40);
  const tabWidth = pillWidth / 2;

  // Enhanced pill slider styles
  const pillHeight = 54;
  const pillOverlap = 12;
  const pillRadius = pillHeight / 2;
  const pillShadow = Platform.OS === 'ios' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  } : {
    elevation: 8,
  };

  // Animate pill slider
  const animateSlider = (to: number) => {
    Animated.timing(sliderAnim, {
      toValue: to,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (tab: 'blood' | 'scan') => {
    setActiveTab(tab);
    animateSlider(tab === 'blood' ? 0 : 1);
  };

  const testCategories = [
    { id: 1, name: 'Complete Blood Count', tests: 15, popular: true },
    { id: 2, name: 'Diabetes Profile', tests: 8, popular: true },
    { id: 3, name: 'Lipid Profile', tests: 6, popular: false },
    { id: 4, name: 'Liver Function', tests: 12, popular: true },
    { id: 5, name: 'Kidney Function', tests: 9, popular: false },
    { id: 6, name: 'Thyroid Profile', tests: 7, popular: true },
    { id: 7, name: 'Cardiac Markers', tests: 11, popular: false },
    { id: 8, name: 'Hormone Panel', tests: 18, popular: false },
  ];

  const featuredPackages = [
    {
      id: 1,
      name: 'Annual Health Checkup',
      tests: 45,
      price: '₹2,499',
      originalPrice: '₹4,500',
      discount: '44%',
      duration: '6-8 hours',
      rating: 4.8,
      description: 'Comprehensive health screening package'
    },
    {
      id: 2,
      name: 'Master Health Checkup',
      tests: 78,
      price: '₹4,999',
      originalPrice: '₹8,500',
      discount: '41%',
      duration: '8-10 hours',
      rating: 4.9,
      description: 'Complete body health assessment'
    },
  ];

  // Mock diagnostic center for demo
  const mockCenter = {
    name: 'Medanta Diagnostics',
    tests: featuredPackages.map(pkg => pkg.name),
  };

  // Test data for each group
  const bloodTestGroups = [
    {
      header: 'Recommended Health & Wellness',
      tests: [
        { name: 'Complete Blood Count (CBC)', icon: TestTube },
        { name: 'Metabolic Panels (BMP, CMP)', icon: TestTube },
        { name: 'Lipid Panel', icon: TestTube },
        { name: 'Thyroid Function Tests', icon: TestTube },
        { name: 'Nutrient & Vitamin Levels', icon: TestTube },
      ],
    },
    {
      header: 'Disease-Specific Diagnostics & Monitoring',
      tests: [
        { name: 'Diabetes Tests', icon: TestTube },
        { name: 'Infectious Disease Tests', icon: TestTube },
        { name: 'Inflammatory Markers', icon: TestTube },
        { name: 'Cardiac Markers', icon: TestTube },
        { name: 'Organ Function Tests', icon: TestTube },
        { name: 'Cancer Markers', icon: TestTube },
        { name: 'Autoimmune Tests', icon: TestTube },
      ],
    },
    {
      header: 'Specialized & Advanced Tests',
      tests: [
        { name: 'Hormone Tests', icon: TestTube },
        { name: 'Allergy Tests', icon: TestTube },
        { name: 'Urine Tests', icon: TestTube },
      ],
    },
  ];

  const scanTestGroups = [
    {
      header: 'Imaging & Radiology',
      tests: [
        { name: 'X-ray (Plain Radiography)', icon: ScanEye },
        { name: 'CT Scan (Computed Tomography)', icon: ScanEye },
        { name: 'MRI Scan (Magnetic Resonance Imaging)', icon: ScanEye },
        { name: 'Ultrasound (Sonography)', icon: ScanEye },
        { name: 'Nuclear Medicine Scans', icon: ScanEye },
        { name: 'Mammography', icon: ScanEye },
        { name: 'DEXA Scan (Bone Densitometry)', icon: ScanEye },
        { name: 'Fluoroscopy (Real-time X-ray)', icon: ScanEye },
      ],
    },
  ];

  // Diagnostic center mock for demo
  const getCenterForTest = (testName: string) => ({ name: 'Medanta Diagnostics' });

  // Package test lists
  const silverTests = [
    'Basic CBC',
    'Lipid Profile',
    'Blood Sugar',
    'Liver Function (basic)',
    'Kidney Function (basic)',
    'Thyroid (TSH)',
    'Basic Urine Analysis',
  ];
  const goldTests = [
    ...silverTests,
    'Vitamin B12',
    'Vitamin D',
    'Iron Studies',
    'Detailed Liver/Kidney markers',
    'ESR',
    'CRP',
    'Early screenings (arthritis, infections)',
  ];
  const platinumTests = [
    ...goldTests,
    'Cardiac risk markers (Lp(a), HsCRP)',
    'Extensive vitamin/mineral panels',
    'Cancer markers (PSA, CA-125)',
    'Allergy markers',
    'Imaging (Chest X-ray, Abdominal Ultrasound)',
    'Basic physician consultation',
  ];

  const [expanded, setExpanded] = useState<'silver' | 'gold' | 'platinum' | null>(null);

  // Add fade-in animation for cards
  const fadeAnim = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  const onCardLayout = (idx: number) => {
    Animated.timing(fadeAnim[idx], {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Package navigation handler
  const handlePackagePress = (pkg: 'silver' | 'gold' | 'platinum') => {
    router.push(`/specialty/${pkg}-package`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Lab Tests</Text>
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
              placeholder="Search tests, packages..."
              placeholderTextColor="#64748B"
            />
          </View>
        </View>

        {/* Enhanced Overlapping Cylindrical Category Slider */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View style={{ width: pillWidth, height: pillHeight, position: 'relative' }}>
            <LinearGradient
              colors={[activeTab === 'blood' ? '#4F8CFF' : '#E5E7EB', activeTab === 'scan' ? '#4F8CFF' : '#E5E7EB']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{
                borderRadius: pillRadius,
                height: pillHeight,
                width: pillWidth,
                ...pillShadow,
              }}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: sliderAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, tabWidth - pillOverlap],
                  }),
                  width: tabWidth + pillOverlap,
                  height: pillHeight,
                  borderRadius: pillRadius,
                  backgroundColor: '#fff',
                  ...pillShadow,
                  zIndex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <LinearGradient
                  colors={['#F0F4FF', '#E0E7FF']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={{ flex: 1, width: '100%', height: '100%', borderRadius: pillRadius }}
                />
              </Animated.View>
              <View style={{ flexDirection: 'row', width: pillWidth, height: pillHeight, position: 'absolute', zIndex: 3 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: pillHeight,
                    borderTopLeftRadius: pillRadius,
                    borderBottomLeftRadius: pillRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: activeTab === 'blood' ? 4 : 1,
                  }}
                  onPress={() => handleTabPress('blood')}
                  activeOpacity={0.85}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: activeTab === 'blood' ? '#2563EB' : '#64748B',
                    marginBottom: 2,
                  }}>Blood Tests</Text>
                  <Text style={{
                    fontSize: 12,
                    color: activeTab === 'blood' ? '#2563EB' : '#A0AEC0',
                    fontWeight: '500',
                  }}>CBC, Packages, Panels, etc.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: pillHeight,
                    borderTopRightRadius: pillRadius,
                    borderBottomRightRadius: pillRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: activeTab === 'scan' ? 4 : 1,
                  }}
                  onPress={() => handleTabPress('scan')}
                  activeOpacity={0.85}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: activeTab === 'scan' ? '#2563EB' : '#64748B',
                    marginBottom: 2,
                  }}>X-Ray & Scans</Text>
                  <Text style={{
                    fontSize: 12,
                    color: activeTab === 'scan' ? '#2563EB' : '#A0AEC0',
                    fontWeight: '500',
                  }}>Ultrasound, MRI, CT, etc.</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Grouped Test Sections */}
        {activeTab === 'blood' ? (
          bloodTestGroups.map((group, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.header}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {group.tests.map((test, tIdx) => (
                  <TouchableOpacity
                    key={tIdx}
                    style={styles.testCard}
                    onPress={() => {
                      setSelectedTest(test);
                      setSelectedCenter(mockCenter);
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.testIconWrap}>
                      <test.icon size={28} color="#3B82F6" />
                    </View>
                    <Text style={styles.testCardText}>{test.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))
        ) : (
          scanTestGroups.map((group, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.header}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {group.tests.map((test, tIdx) => (
                  <TouchableOpacity
                    key={tIdx}
                    style={styles.testCard}
                    onPress={() => {
                      setSelectedTest(test);
                      setSelectedCenter(mockCenter);
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.testIconWrap}>
                      <test.icon size={28} color="#3B82F6" />
                    </View>
                    <Text style={styles.testCardText}>{test.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))
        )}

        {/* Gender-Based Entry Cards Section */}
        <GenderEntryCards
          diagnosticCenters={diagnosticCenters}
          onBookTest={(test: any, center: any) => {
            setSelectedTest(test);
            setSelectedCenter(center);
            setModalVisible(true);
          }}
        />

        {/* Featured Health Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Health Packages</Text>
          {featuredPackages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={styles.packageCard}
              onPress={() => {
                setSelectedTest(pkg);
                setSelectedCenter(mockCenter);
                setModalVisible(true);
              }}
            >
              <View style={styles.packageHeader}>
                <View style={styles.packageInfo}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  <Text style={styles.packageDescription}>{pkg.description}</Text>
                  <View style={styles.packageMeta}>
                    <View style={styles.packageDetail}>
                      <TestTube size={12} color="#64748B" />
                      <Text style={styles.packageDetailText}>{pkg.tests} tests</Text>
                    </View>
                    <View style={styles.packageDetail}>
                      <Clock size={12} color="#64748B" />
                      <Text style={styles.packageDetailText}>{pkg.duration}</Text>
                    </View>
                    <View style={styles.packageDetail}>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.packageDetailText}>{pkg.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{pkg.discount} OFF</Text>
                </View>
              </View>
              <View style={styles.packageFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>{pkg.price}</Text>
                  <Text style={styles.originalPrice}>{pkg.originalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Test Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Test Categories</Text>
          <View style={styles.categoriesGrid}>
            {testCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => router.push(`/test-category/${category.id}` as any)}
              >
                {category.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
                <View style={styles.categoryIcon}>
                  <TestTube size={20} color="#3B82F6" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryTests}>{category.tests} tests available</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Book Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book Your Test</Text>
          <View style={styles.quickBookCard}>
            <View style={styles.quickBookContent}>
              <Text style={styles.quickBookTitle}>Need a specific test?</Text>
              <Text style={styles.quickBookDescription}>
                Can't find what you're looking for? Let us help you find the right test.
              </Text>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Get Help</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Your Health Journey Section */}
        <Text style={[styles.sectionTitle, { marginLeft: 20 }]}>Your Health Journey</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 24 }}>
          {/* Silver Package */}
          <TouchableOpacity style={[styles.packageCard, { borderColor: '#C0C0C0', borderWidth: 2, marginBottom: 18, flex: 1, minWidth: 220, maxWidth: '100%' }]} onPress={() => handlePackagePress('silver')}>
            <View style={styles.packageHeaderRow}>
              <View style={[styles.packageTag, { backgroundColor: '#C0C0C0' }]}><Text style={styles.packageTagText}>SILVER</Text></View>
              <Text style={styles.packageTitle}>Silver Health Package</Text>
            </View>
            <Text style={styles.packageDesc}>Fundamental Health Parameters</Text>
            <Text style={styles.packageTests}>Includes 50–80 tests</Text>
          </TouchableOpacity>
          {/* Gold Package */}
          <TouchableOpacity style={[styles.packageCard, { borderColor: '#FFD700', borderWidth: 2, marginBottom: 18, flex: 1, minWidth: 220, maxWidth: '100%' }]} onPress={() => handlePackagePress('gold')}>
            <View style={styles.packageHeaderRow}>
              <View style={[styles.packageTag, { backgroundColor: '#FFD700' }]}><Text style={styles.packageTagText}>GOLD</Text></View>
              <Text style={styles.packageTitle}>Golden Health Package</Text>
            </View>
            <Text style={styles.packageDesc}>Expanded Screening with Specific Markers</Text>
            <Text style={styles.packageTests}>Includes 80–110 tests</Text>
          </TouchableOpacity>
          {/* Platinum Package */}
          <TouchableOpacity style={[styles.packageCard, { borderColor: '#5A5A5A', borderWidth: 2, marginBottom: 18, flex: 1, minWidth: 220, maxWidth: '100%' }]} onPress={() => handlePackagePress('platinum')}>
            <View style={styles.packageHeaderRow}>
              <View style={[styles.packageTag, { backgroundColor: '#5A5A5A' }]}><Text style={styles.packageTagText}>PLATINUM</Text></View>
              <Text style={styles.packageTitle}>Platinum Health Package</Text>
            </View>
            <Text style={styles.packageDesc}>Comprehensive & Advanced Assessment</Text>
            <Text style={styles.packageTests}>Includes 100–150+ tests</Text>
          </TouchableOpacity>
        </View>
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
  packageCard: {
    width: 180,
    borderRadius: 18,
    marginRight: 16,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  packageDesc: {
    fontSize: 13,
    marginBottom: 8,
  },
  packageTests: {
    fontSize: 12,
    color: '#36454F',
    fontWeight: '600',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 16,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  packageMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  packageDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageDetailText: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  discountBadge: {
    backgroundColor: '#EF444420',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    height: 24,
  },
  discountText: {
    fontSize: 10,
    color: '#EF4444',
    fontFamily: 'Inter-SemiBold',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 18,
    color: '#10B981',
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 8,
    color: '#F59E0B',
    fontFamily: 'Inter-SemiBold',
  },
  categoryIcon: {
    backgroundColor: '#3B82F620',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  categoryTests: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  quickBookCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickBookContent: {
    alignItems: 'center',
  },
  quickBookTitle: {
    fontSize: 16,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickBookDescription: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  helpButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  testCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  testIconWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  testCardText: {
    fontSize: 14,
    color: '#F8FAFC',
    fontFamily: 'Inter-SemiBold',
  },
  packageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  packageTag: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  packageTagText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    letterSpacing: 1,
  },
  mostComprehensive: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  mostComprehensiveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  testListWrap: {
    marginTop: 12,
    marginBottom: 8,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    minHeight: 44,
  },
  testName: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  centerName: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  bookNowBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 2,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bulletList: {
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  bulletItem: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  centerBookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  bookNowBtnFull: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 14,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
});