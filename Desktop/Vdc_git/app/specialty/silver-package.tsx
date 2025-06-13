import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const tests = [
    'CBC (Complete Blood Count)',
    'Lipid Profile',
    'Liver Function Test',
    'Kidney Function Test',
    'Thyroid Profile',
    'Blood Sugar',
    'Urine Routine',
    'Vitamin D',
    'Calcium',
    'Iron Studies',
];

const centers = [
    'Medanta Diagnostics',
    'SRL Diagnostics',
    'Dr. Lal PathLabs',
];

export default function SilverPackage() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Silver Health Package</Text>
                <Text style={styles.desc}>Fundamental Health Parameters for annual screening.</Text>
                <Text style={styles.sectionTitle}>Included Tests</Text>
                {tests.map((test, idx) => (
                    <Text key={idx} style={styles.testItem}>{test}</Text>
                ))}
                <Text style={styles.sectionTitle}>Available At</Text>
                {centers.map((center, idx) => (
                    <Text key={idx} style={styles.centerItem}>{center}</Text>
                ))}
                <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/appointments')}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        color: '#1976D2',
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    desc: {
        fontSize: 15,
        color: '#374151',
        marginBottom: 18,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 17,
        color: '#1976D2',
        fontWeight: 'bold',
        marginTop: 18,
        marginBottom: 8,
    },
    testItem: {
        fontSize: 15,
        color: '#222',
        marginBottom: 4,
        marginLeft: 8,
    },
    centerItem: {
        fontSize: 15,
        color: '#374151',
        marginBottom: 4,
        marginLeft: 8,
    },
    bookButton: {
        backgroundColor: '#1976D2',
        borderRadius: 12,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 