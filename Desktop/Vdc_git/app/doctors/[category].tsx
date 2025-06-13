import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, MapPin, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const doctors = [
  {
    id: 1,
    name: 'Dr. Anand Singh',
    specialty: 'Pediatrician',
    experience: '15 years',
    hospital: 'Medanta Hospital, Gomti Nagar, Lucknow',
    rating: 4.8,
    reviews: 310,
    location: 'Gomti Nagar',
    available: 'Today 4:00 PM',
    fee: '₹750',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 2,
    name: 'Dr. Preeti Verma',
    specialty: 'Dermatologist',
    experience: '10 years',
    hospital: 'Indira Nagar Skin Clinic, Indira Nagar, Lucknow',
    rating: 4.7,
    reviews: 185,
    location: 'Indira Nagar',
    available: 'Today 3:30 PM',
    fee: '₹650',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 3,
    name: 'Dr. Rajeev Kumar',
    specialty: 'Orthopedic Surgeon',
    experience: '18 years',
    hospital: 'Charak Hospital, Faizabad Road, Lucknow',
    rating: 4.9,
    reviews: 295,
    location: 'Faizabad Road',
    available: 'Today 4:30 PM',
    fee: '₹900',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  {
    id: 4,
    name: 'Dr. Aisha Khan',
    specialty: 'Gynecologist & Obstetrician',
    experience: '14 years',
    hospital: 'Vivekanand Hospital, Aliganj, Lucknow',
    rating: 4.8,
    reviews: 260,
    location: 'Aliganj',
    available: 'Today 3:00 PM',
    fee: '₹850',
    image: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
  {
    id: 5,
    name: 'Dr. Amit Sharma',
    specialty: 'General Physician',
    experience: '16 years',
    hospital: 'City Hospital, Hazratganj, Lucknow',
    rating: 4.7,
    reviews: 230,
    location: 'Hazratganj',
    available: 'Today 3:30 PM',
    fee: '₹600',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: 6,
    name: 'Dr. Neha Agarwal',
    specialty: 'Ophthalmologist',
    experience: '11 years',
    hospital: 'Eye Care Centre, Gomti Nagar, Lucknow',
    rating: 4.9,
    reviews: 210,
    location: 'Gomti Nagar',
    available: 'Today 4:00 PM',
    fee: '₹700',
    image: 'https://randomuser.me/api/portraits/women/16.jpg',
  },
  {
    id: 7,
    name: 'Dr. Vikas Singh',
    specialty: 'Neurologist',
    experience: '13 years',
    hospital: 'Fortis Hospital, Vibhuti Khand, Lucknow',
    rating: 4.8,
    reviews: 245,
    location: 'Vibhuti Khand',
    available: 'Today 3:00 PM',
    fee: '₹950',
    image: 'https://randomuser.me/api/portraits/men/17.jpg',
  },
  {
    id: 8,
    name: 'Dr. Suman Devi',
    specialty: 'ENT Specialist',
    experience: '17 years',
    hospital: 'Sai ENT Clinic, Alambagh, Lucknow',
    rating: 4.7,
    reviews: 200,
    location: 'Alambagh',
    available: 'Today 4:00 PM',
    fee: '₹650',
    image: 'https://randomuser.me/api/portraits/women/18.jpg',
  },
  {
    id: 9,
    name: 'Dr. Manish Gupta',
    specialty: 'Gastroenterologist',
    experience: '12 years',
    hospital: 'Medicity Hospital, Gomti Nagar, Lucknow',
    rating: 4.9,
    reviews: 220,
    location: 'Gomti Nagar',
    available: 'Today 3:30 PM',
    fee: '₹900',
    image: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    id: 10,
    name: 'Dr. Shruti Mishra',
    specialty: 'Dentist',
    experience: '9 years',
    hospital: 'Smile Dental Clinic, Hazratganj, Lucknow',
    rating: 4.8,
    reviews: 190,
    location: 'Hazratganj',
    available: 'Today 4:00 PM',
    fee: '₹400',
    image: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  {
    id: 11,
    name: 'Dr. Pooja Sharma',
    specialty: 'Psychiatrist',
    experience: '10 years',
    hospital: 'Manas Clinic, Butler Colony, Lucknow',
    rating: 4.7,
    reviews: 175,
    location: 'Butler Colony',
    available: 'Today 3:00 PM',
    fee: '₹1000',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: 12,
    name: 'Dr. Gaurav Rastogi',
    specialty: 'Urologist',
    experience: '15 years',
    hospital: 'Balrampur Hospital, Kaiserbagh, Lucknow',
    rating: 4.8,
    reviews: 215,
    location: 'Kaiserbagh',
    available: 'Today 4:00 PM',
    fee: '₹900',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 13,
    name: 'Dr. Anjali Singh',
    specialty: 'Endocrinologist',
    experience: '11 years',
    hospital: 'Apollo Clinic, Gomti Nagar, Lucknow',
    rating: 4.9,
    reviews: 180,
    location: 'Gomti Nagar',
    available: 'Today 3:00 PM',
    fee: '₹850',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    id: 14,
    name: 'Dr. Vivek Dhawan',
    specialty: 'Pulmonologist',
    experience: '14 years',
    hospital: 'Sahara Hospital, Faizabad Road, Lucknow',
    rating: 4.8,
    reviews: 205,
    location: 'Faizabad Road',
    available: 'Today 4:00 PM',
    fee: '₹800',
    image: 'https://randomuser.me/api/portraits/men/24.jpg',
  },
  {
    id: 15,
    name: 'Dr. Divya Saxena',
    specialty: 'Dietitian / Nutritionist',
    experience: '8 years',
    hospital: 'NutriHealth Clinic, Indira Nagar, Lucknow',
    rating: 4.7,
    reviews: 160,
    location: 'Indira Nagar',
    available: 'Today 3:30 PM',
    fee: '₹500',
    image: 'https://randomuser.me/api/portraits/women/25.jpg',
  },
  {
    id: 16,
    name: 'Dr. Rohan Kapoor',
    specialty: 'Cardiologist',
    experience: '12 years',
    hospital: 'Medanta Hospital, Gomti Nagar, Lucknow',
    rating: 4.9,
    reviews: 270,
    location: 'Gomti Nagar',
    available: 'Today 3:00 PM',
    fee: '₹850',
    image: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
  {
    id: 17,
    name: 'Dr. Sanjeev Dubey',
    specialty: 'General Surgeon',
    experience: '18 years',
    hospital: "Era's Lucknow Medical College & Hospital, Sarfarazganj, Lucknow",
    rating: 4.7,
    reviews: 230,
    location: 'Sarfarazganj',
    available: 'Today 4:00 PM',
    fee: '₹700',
    image: 'https://randomuser.me/api/portraits/men/27.jpg',
  },
  {
    id: 18,
    name: 'Dr. Madhuri Verma',
    specialty: 'Physiotherapist',
    experience: '10 years',
    hospital: 'PhysioCare Clinic, Mahanagar, Lucknow',
    rating: 4.9,
    reviews: 150,
    location: 'Mahanagar',
    available: 'Tomorrow 10:00 AM',
    fee: '₹550',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 19,
    name: 'Dr. Prakash Tiwari',
    specialty: 'Nephrologist',
    experience: '13 years',
    hospital: "King George's Medical University, Chowk, Lucknow",
    rating: 4.8,
    reviews: 195,
    location: 'Chowk',
    available: 'Today 3:30 PM',
    fee: '₹900',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    id: 20,
    name: 'Dr. Swati Khanna',
    specialty: 'Rheumatologist',
    experience: '9 years',
    hospital: 'Sanjeevani Hospital, Gomti Nagar, Lucknow',
    rating: 4.7,
    reviews: 165,
    location: 'Gomti Nagar',
    available: 'Today 4:00 PM',
    fee: '₹800',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
  },
];

export default function DoctorList() {
  const { category } = useLocalSearchParams();
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary, marginBottom: 16 }}>
        {category?.toString().replace(/-/g, ' ')} Doctors in Lucknow
      </Text>
      {doctors.map(doc => (
        <TouchableOpacity
          key={doc.id}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => router.push(`/doctor/${doc.id}`)}
        >
          <Image source={{ uri: doc.image }} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.name, { color: colors.text }]}>{doc.name}</Text>
            <Text style={styles.specialty}>{doc.specialty} • {doc.experience}</Text>
            <View style={styles.row}>
              <Star size={14} color={colors.warning} fill={colors.warning} />
              <Text style={styles.rating}>{doc.rating}</Text>
              <Text style={styles.reviews}>({doc.reviews} reviews)</Text>
            </View>
            <Text style={styles.hospital}>{doc.hospital}</Text>
            <View style={styles.row}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={styles.location}>{doc.location}</Text>
              <Clock size={14} color={colors.textSecondary} style={{ marginLeft: 8 }} />
              <Text style={styles.available}>{doc.available}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.fee}>{doc.fee}</Text>
              <TouchableOpacity style={[styles.consultBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.consultText}>Consult Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 8 },
  name: { fontSize: 16, fontWeight: 'bold' },
  specialty: { fontSize: 13, color: '#007C91', marginBottom: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  rating: { marginLeft: 4, fontWeight: '600', color: '#FFB300' },
  reviews: { marginLeft: 4, color: '#888', fontSize: 12 },
  hospital: { color: '#007C91', fontSize: 13, marginTop: 2 },
  location: { marginLeft: 4, color: '#36454F', fontSize: 12 },
  available: { marginLeft: 4, color: '#007C91', fontSize: 12 },
  fee: { fontWeight: 'bold', color: '#007C91', fontSize: 15, marginRight: 12 },
  consultBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, marginLeft: 'auto' },
  consultText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});