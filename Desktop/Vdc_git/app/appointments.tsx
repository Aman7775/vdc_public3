import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Video, MapPin, Phone, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function AppointmentsScreen() {
  const { colors } = useTheme();
  
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '3:00 PM',
      type: 'Video Consultation',
      status: 'confirmed',
      fee: '₹800'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In-Clinic Visit',
      status: 'scheduled',
      fee: '₹600'
    },
    {
      id: 3,
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Gynecologist',
      date: 'Dec 15',
      time: '2:30 PM',
      type: 'Video Consultation',
      status: 'completed',
      fee: '₹700'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'scheduled': return colors.warning;
      case 'completed': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Consultation': return Video;
      case 'In-Clinic Visit': return MapPin;
      case 'Audio Consultation': return Phone;
      default: return User;
    }
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Appointments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {appointments.map((appointment) => {
          const TypeIcon = getTypeIcon(appointment.type);
          const statusColor = getStatusColor(appointment.status);
          
          return (
            <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                  <Text style={styles.specialty}>{appointment.specialty}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {appointment.status}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <TypeIcon size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.type}</Text>
                </View>
              </View>

              <View style={styles.appointmentFooter}>
                <Text style={styles.fee}>{appointment.fee}</Text>
                <View style={styles.actions}>
                  {appointment.status === 'confirmed' && (
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

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
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontFamily: 'Inter-Bold',
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 20,
    },
    appointmentCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    appointmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 2,
    },
    specialty: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    statusText: {
      fontSize: 11,
      fontFamily: 'Inter-SemiBold',
      textTransform: 'capitalize',
    },
    appointmentDetails: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginLeft: 4,
    },
    appointmentFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fee: {
      fontSize: 16,
      color: colors.success,
      fontFamily: 'Inter-SemiBold',
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
    },
    joinButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    joinButtonText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    detailsButton: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    detailsButtonText: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
  });
}