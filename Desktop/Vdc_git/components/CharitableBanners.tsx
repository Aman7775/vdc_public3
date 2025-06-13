// components/CharitableBanners.tsx
// This component displays a horizontal scrollable list of charitable banners with automatic animation.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Heart, Users, Stethoscope, Microscope } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

interface Person {
  id: number;
  name: string;
  image: string;
  needType: 'test' | 'consultation';
  amount: number;
}

const people: Person[] = [
  {
    id: 1,
    name: 'Amit Kumar',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    needType: 'test',
    amount: 600
  },
  {
    id: 2,
    name: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    needType: 'consultation',
    amount: 400
  },
  {
    id: 3,
    name: 'Ravi Singh',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    needType: 'test',
    amount: 350
  }
];

export function CharitableBanners() {
  const { colors } = useTheme();

  const handlePayNow = (person: Person) => {
    router.push({
      pathname: '/pay-for-others',
      params: { personId: person.id }
    });
  };

  return (
    <View style={styles.container}>
      {/* Main Banner: Support Our Community */}
      <TouchableOpacity
        style={styles.mainBannerWrapper}
        onPress={() => router.push('/pay-for-others')}
      >
        <LinearGradient
          colors={['#FFF9E6', '#FFF5D6']}
          style={styles.mainBanner}
        >
          <View style={styles.mainBannerContent}>
            <View style={styles.mainBannerIconContainer}>
              <Users size={28} color="#E6A23C" />
            </View>
            <View style={styles.mainBannerTextContainer}>
              <Text style={styles.mainBannerTitle}>Support Our Community</Text>
              <Text style={styles.mainBannerDescription}>
                Help others access essential medical services
              </Text>
            </View>
            <View style={styles.mainBannerAction}>
              <Text style={styles.mainBannerActionText}>Help Now</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Profile Banners Container */}
      <View style={styles.profileBannersContainer}>
        {people.map(person => (
          <TouchableOpacity
            key={person.id}
            style={styles.profileBanner}
            onPress={() => handlePayNow(person)}
          >
            <View style={styles.profileBannerContent}>
              <Image source={{ uri: person.image }} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{person.name}</Text>
                <View style={[
                  styles.needTypeTag,
                  { backgroundColor: person.needType === 'test' ? '#E8F5E9' : '#E3F2FD' }
                ]}>
                  {person.needType === 'test' ? (
                    <Microscope size={16} color="#2E7D32" />
                  ) : (
                    <Stethoscope size={16} color="#1976D2" />
                  )}
                  <Text style={[
                    styles.needTypeText,
                    { color: person.needType === 'test' ? '#2E7D32' : '#1976D2' }
                  ]}>
                    {person.needType === 'test' ? 'Needs a Test' : 'Needs a Consultation'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={() => handlePayNow(person)}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45A049']}
                    style={styles.payButtonGradient}
                  >
                    <Text style={styles.payButtonText}>Pay ₹{person.amount}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainBannerWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainBanner: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  mainBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  mainBannerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mainBannerTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  mainBannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  mainBannerDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  mainBannerAction: {
    backgroundColor: '#E6A23C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  mainBannerActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  profileBannersContainer: {
    gap: 12,
  },
  profileBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileBannerContent: {
    flexDirection: 'row',
    padding: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  needTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  needTypeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  payButton: {
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
  },
  payButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
