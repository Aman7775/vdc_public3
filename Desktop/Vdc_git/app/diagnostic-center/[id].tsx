import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Clock, Phone, Star, ChevronRight } from 'lucide-react-native';

export default function DiagnosticCenterDetail() {
  const { colors } = useTheme();
  const center = {
    name: "MediScan Diagnostic Center",
    address: "123 Healthcare Avenue, Medical District, Lucknow",
    timings: "Mon-Sat: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM",
    tests: ["Blood Tests", "X-Ray", "MRI", "CT Scan", "Ultrasound", "ECG"],
    features: ["Home Collection", "Online Reports", "Ambulance Service", "Wheelchair Access"],
    rating: 4.5,
    reviews: 128,
    phone: "+91 98765 43210"
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{center.name}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Rating Section */}
        <View style={[styles.ratingCard, { backgroundColor: colors.surface }]}>
          <View style={styles.ratingRow}>
            <Star size={24} color={colors.warning} fill={colors.warning} />
            <Text style={[styles.ratingText, { color: colors.text }]}>{center.rating}</Text>
            <Text style={[styles.reviewsText, { color: colors.textSecondary }]}>({center.reviews} reviews)</Text>
          </View>
        </View>

        {/* Address Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Location</Text>
          </View>
          <Text style={[styles.address, { color: colors.textSecondary }]}>{center.address}</Text>
        </View>

        {/* Operating Hours Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Operating Hours</Text>
          </View>
          <Text style={[styles.timings, { color: colors.textSecondary }]}>{center.timings}</Text>
        </View>

        {/* Contact Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Phone size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact</Text>
          </View>
          <Text style={[styles.phone, { color: colors.textSecondary }]}>{center.phone}</Text>
        </View>

        {/* Services Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Services Offered</Text>
          <View style={styles.servicesGrid}>
            {center.tests.map((test, index) => (
              <View key={index} style={[styles.serviceChip, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.serviceText, { color: colors.primary }]}>{test}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <View style={styles.featuresList}>
            {center.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Book Test Button */}
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/book-test')}
        >
          <Text style={styles.bookButtonText}>Book a Test</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  ratingCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reviewsText: {
    fontSize: 16,
    marginLeft: 4,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  address: {
    fontSize: 16,
    lineHeight: 24,
  },
  timings: {
    fontSize: 16,
    lineHeight: 24,
  },
  phone: {
    fontSize: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
  },
  bookButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});