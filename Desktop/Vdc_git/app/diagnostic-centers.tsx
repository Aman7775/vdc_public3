import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import { diagnosticCenters } from './data/diagnosticCenters';
import { useRouter } from 'expo-router';
import { LabTestDetailModal } from '@/components/LabTestDetailModal';

export default function DiagnosticCentersScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = createStyles(colors);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<{ name: string } | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);

  // Helper to extract area from address
  const getArea = (address: string) => {
    // Example: "Hazratganj, Lucknow, Uttar Pradesh 226001" => "Hazratganj"
    return address.split(',')[0];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Diagnostic Centers</Text>
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
            placeholder="Search centers near you..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{diagnosticCenters.length} centers found near you</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {diagnosticCenters.map((center) => (
          <View key={center.id} style={styles.centerCard}>
            <View style={styles.centerHeader}>
              <Text style={styles.centerName}>{center.name}</Text>
              <View style={styles.centerRating}>
                <Star size={12} color={colors.warning} fill={colors.warning} />
                <Text style={styles.ratingText}>{center.rating}</Text>
              </View>
            </View>
            <Text style={styles.centerArea}>{getArea(center.address)}</Text>
            {/* Render each test as a touchable */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {center.tests.map((test: string, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  style={{ backgroundColor: colors.primary + '20', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, marginBottom: 8, minHeight: 44 }}
                  onPress={() => {
                    setSelectedTest({ name: test });
                    setSelectedCenter(center);
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ color: colors.primary, fontWeight: '600' }}>{test}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={() => router.push(`/diagnostic-center/${center.id}`)}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    centerCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    centerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    centerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    centerName: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginRight: 8,
    },
    centerArea: {
      fontSize: 13,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 8,
    },
    verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${colors.success}20`,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    verifiedText: {
      fontSize: 10,
      color: colors.success,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 2,
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
    centerLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
      flex: 1,
    },
    distanceText: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
    },
    centerDetails: {
      marginBottom: 12,
    },
    centerMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    metaText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
    },
    priceRange: {
      fontSize: 12,
      color: colors.success,
      fontFamily: 'Inter-SemiBold',
    },
    testsCount: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    centerFeatures: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 16,
    },
    featureTag: {
      backgroundColor: colors.card,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    featureText: {
      fontSize: 10,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    centerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    viewDetailsButton: {
      flex: 1,
      backgroundColor: colors.card,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    viewDetailsText: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    bookTestButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    bookTestText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    // Removed duplicate 'title' style to fix object literal property conflict
    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 18,
      shadowColor: '#FF6F61',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#36454F',
      marginBottom: 2
    },
    address: {
      color: '#36454F',
      fontSize: 13,
      marginBottom: 2
    },
    desc: {
      color: '#36454F',
      fontSize: 13,
      marginBottom: 4
    },
    timings: {
      color: '#FF6F61',
      fontSize: 13,
      marginBottom: 2
    },
    features: {
      color: '#36454F',
      fontSize: 12,
      marginBottom: 2
    },
    tests: {
      color: '#36454F',
      fontSize: 12,
      marginTop: 2
    },
  });
}