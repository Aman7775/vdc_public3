import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Settings, Wallet, FileText, Clock, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit, Star, Award } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '../_layout';
import { HealthScoreMeter } from '@/components/HealthScoreMeter';

export default function ProfileTab() {
  const { colors } = useTheme();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    router.replace('/login');
  };

  const profileStats = [
    { label: 'Tests Completed', value: '12', color: colors.success },
    { label: 'Consultations', value: '8', color: colors.primary },
    { label: 'Saved Amount', value: '₹2.4K', color: colors.warning },
  ];

  const menuItems = [
    {
      id: 1,
      title: 'My Wallet',
      subtitle: 'Balance: ₹2,450',
      icon: Wallet,
      color: colors.success,
      action: () => router.push('/wallet')
    },
    {
      id: 2,
      title: 'Test Reports',
      subtitle: '12 reports available',
      icon: FileText,
      color: colors.primary,
      action: () => { }
    },
    {
      id: 3,
      title: 'Appointment History',
      subtitle: 'View past consultations',
      icon: Clock,
      color: colors.info,
      action: () => { }
    },
    {
      id: 4,
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      icon: Bell,
      color: colors.warning,
      action: () => { }
    },
    {
      id: 5,
      title: 'Privacy & Security',
      subtitle: 'Manage your data',
      icon: Shield,
      color: colors.error,
      action: () => { }
    },
    {
      id: 6,
      title: 'Help & Support',
      subtitle: 'Get assistance',
      icon: HelpCircle,
      color: colors.info,
      action: () => { }
    },
  ];

  const quickActions = [
    { id: 1, title: 'Edit Profile', icon: Edit, color: colors.primary },
    { id: 2, title: 'Settings', icon: Settings, color: colors.textSecondary },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionButton}>
                <action.icon size={20} color={action.color} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://i.ibb.co/fGDn8z0/profile.jpg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.fullName || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              {user?.mobileNumber && (
                <Text style={styles.profilePhone}>+91 {user.mobileNumber}</Text>
              )}
              <View style={styles.membershipBadge}>
                <Award size={12} color={colors.warning} />
                <Text style={styles.membershipText}>Premium Member</Text>
              </View>
            </View>
          </View>

          {/* Profile Stats */}
          <View style={styles.profileStats}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.action}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Push Notifications</Text>
              <Text style={styles.preferenceSubtitle}>Receive updates and reminders</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: `${colors.primary}60` }}
              thumbColor={colors.primary}
            />
          </View>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Email Notifications</Text>
              <Text style={styles.preferenceSubtitle}>Get reports via email</Text>
            </View>
            <Switch
              value={false}
              trackColor={{ false: colors.border, true: `${colors.primary}60` }}
              thumbColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.appName}>HealthCare Pro</Text>
            <Text style={styles.appVersion}>Version 2.1.0</Text>
            <Text style={styles.appDescription}>
              Your trusted health companion for medical consultations and lab tests.
            </Text>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    title: {
      fontSize: 24,
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    quickActions: {
      flexDirection: 'row',
      gap: 8,
    },
    quickActionButton: {
      backgroundColor: colors.surface,
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileHeader: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 2,
    },
    profilePhone: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 8,
    },
    membershipBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${colors.warning}20`,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    membershipText: {
      fontSize: 11,
      color: colors.warning,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 4,
    },
    profileStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
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
    healthScoreCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    healthScoreInfo: {
      marginTop: 20,
      alignItems: 'center',
    },
    healthScoreTitle: {
      fontSize: 18,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 8,
    },
    healthScoreDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 16,
    },
    healthSuggestions: {
      alignSelf: 'stretch',
    },
    suggestionTitle: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 8,
    },
    suggestionText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    themeSection: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    themeLabel: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
    },
    menuItem: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginHorizontal: 20,
      marginBottom: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuIcon: {
      padding: 8,
      borderRadius: 8,
      marginRight: 16,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 2,
    },
    menuSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    preferenceItem: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginHorizontal: 20,
      marginBottom: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    preferenceContent: {
      flex: 1,
    },
    preferenceTitle: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 2,
    },
    preferenceSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    appName: {
      fontSize: 18,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    appVersion: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 8,
    },
    appDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      lineHeight: 20,
    },
    logoutButton: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      marginHorizontal: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: `${colors.error}40`,
    },
    logoutText: {
      fontSize: 16,
      color: colors.error,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
  });
}