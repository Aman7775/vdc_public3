import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
// import RazorpayCheckout from 'react-native-razorpay'; // Uncomment if using Razorpay SDK

const usersNeedingHelp = [
	{
		id: 1,
		name: 'Amit Kumar',
		mobile: '+91 98765 12345',
		request: 'CBC Test',
		note: 'Cannot afford test due to medical emergency',
		amount: 600,
	},
	{
		id: 2,
		name: 'Priya Sharma',
		mobile: '+91 91234 56789',
		request: 'Doctor Consultation',
		note: 'Lost job, needs urgent consultation',
		amount: 400,
	},
	// ...add more users as needed
];

export default function PayForOthers() {
	const [paidId, setPaidId] = useState<number | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);

	const handlePay = (user: typeof usersNeedingHelp[0]) => {
		// Razorpay payment logic here
		// Example:
		// RazorpayCheckout.open({
		//   name: user.name,
		//   description: user.request,
		//   amount: user.amount * 100, // in paise
		//   prefill: { contact: '', email: '' },
		//   theme: { color: '#FF6F61' },
		// }).then(() => {
		//   setPaidId(user.id);
		//   setShowSuccess(true);
		// });

		// For demo, just show success
		setPaidId(user.id);
		setShowSuccess(true);
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#FFF4E6', padding: 18 }}>
			<Text style={styles.title}>Support Someone’s Healthcare</Text>
			<ScrollView showsVerticalScrollIndicator={false}>
				{usersNeedingHelp.map(user => (
					<View key={user.id} style={styles.card}>
						<Text style={styles.name}>{user.name}</Text>
						<Text style={styles.mobile}>{user.mobile}</Text>
						<Text style={styles.request}>🧪 {user.request}</Text>
						<Text style={styles.note}>📝 {user.note}</Text>
						<TouchableOpacity
							style={styles.payBtn}
							onPress={() => handlePay(user)}
							disabled={paidId === user.id && showSuccess}
						>
							<Text style={styles.payBtnText}>
								{paidId === user.id && showSuccess ? 'Paid' : `Pay Now ₹${user.amount}`}
							</Text>
						</TouchableOpacity>
					</View>
				))}
				{showSuccess && (
					<View style={styles.successBox}>
						<Text style={styles.successText}>🎉 Payment Successful!</Text>
						<TouchableOpacity style={styles.shareBtn}>
							<Text style={styles.shareBtnText}>Share Receipt</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareBtn}>
							<Text style={styles.shareBtnText}>View History</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 20, fontWeight: 'bold', color: '#36454F', marginBottom: 18 },
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		marginBottom: 18,
		shadowColor: '#FF6F61',
		shadowOpacity: 0.06,
		shadowRadius: 6,
		elevation: 1,
	},
	name: { fontSize: 16, fontWeight: 'bold', color: '#36454F' },
	mobile: { color: '#36454F', fontSize: 13, marginBottom: 2 },
	request: { color: '#FF6F61', fontWeight: 'bold', marginTop: 4 },
	note: { color: '#36454F', fontSize: 13, marginTop: 2, marginBottom: 10 },
	payBtn: {
		backgroundColor: '#FF6F61',
		borderRadius: 8,
		paddingVertical: 10,
		alignItems: 'center',
		marginTop: 8,
	},
	payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
	successBox: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 18,
		alignItems: 'center',
		marginTop: 18,
		borderWidth: 1,
		borderColor: '#FF6F61',
	},
	successText: { color: '#FF6F61', fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
	shareBtn: {
		backgroundColor: '#FF6F61',
		borderRadius: 6,
		paddingVertical: 8,
		paddingHorizontal: 18,
		marginTop: 8,
	},
	shareBtnText: { color: '#fff', fontWeight: 'bold' },
});