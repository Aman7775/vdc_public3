import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay'; // Uncomment if using Razorpay SDK
import { useState } from 'react';
import { useRouter } from 'expo-router';

const router = useRouter();

const patients = [
  { id: 1, name: 'Amit Kumar', need: 'CBC Test', amount: 600 },
  { id: 2, name: 'Priya Sharma', need: 'Doctor Consultation', amount: 400 },
  { id: 3, name: 'Ravi Singh', need: 'X-ray', amount: 350 },
];

export default function SupportCommunity() {
  const [success, setSuccess] = useState<{ name: string; id: string } | null>(null);

  const handlePay = (patient: typeof patients[0]) => {
    // Uncomment and configure for real Razorpay integration
    // RazorpayCheckout.open({
    //   name: patient.name,
    //   description: patient.need,
    //   amount: patient.amount * 100,
    //   theme: { color: '#FF6F61' },
    // }).then(data => {
    //   setSuccess({ name: patient.name, id: data.razorpay_payment_id });
    // });

    // Demo: Simulate payment success
    setTimeout(() => {
      setSuccess({ name: patient.name, id: 'TXN' + Math.floor(Math.random() * 1000000) });
    }, 1000);
  };

  if (success) {
    return (
      <View style={styles.centered}>
        <Text style={styles.thankYou}>Thank you for supporting!</Text>
        <Text style={styles.successText}>Transaction ID: {success.id}</Text>
        <Text style={styles.successText}>Patient: {success.name}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF4E6', padding: 18 }}>
      <Text style={styles.title}>Patients in Need</Text>
      {patients.map(patient => (
        <View key={patient.id} style={styles.card}>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.need}>{patient.need}</Text>
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => handlePay(patient)}
          >
            <Text style={styles.payBtnText}>Pay ₹{patient.amount}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFF4E6',
            borderRadius: 12,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#FF6F61',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
            justifyContent: 'center',
          }}
          onPress={() => router.push('/support-community')}
        >
          <Text style={{ color: '#36454F', fontWeight: 'bold', fontSize: 16 }}>
            👉 Pay For Others
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', color: '#36454F', marginBottom: 18 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'flex-start',
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#36454F', marginBottom: 4 },
  need: { color: '#36454F', fontSize: 14, marginBottom: 10 },
  payBtn: {
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF4E6' },
  thankYou: { fontSize: 22, fontWeight: 'bold', color: '#FF6F61', marginBottom: 12 },
  successText: { color: '#36454F', fontSize: 16, marginBottom: 6 },
});