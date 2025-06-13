import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface LabTestDetailModalProps {
    visible: boolean;
    onClose: () => void;
    test: { name: string } | null;
    center: { name: string; tests: string[] } | null;
}

export function LabTestDetailModal({ visible, onClose, test, center }: LabTestDetailModalProps) {
    const { colors } = useTheme();

    if (!test || !center) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* Optionally add logo/icon here */}
                        <Text style={styles.centerName}>{center.name}</Text>
                        <TouchableOpacity onPress={onClose}><Text style={styles.close}>✕</Text></TouchableOpacity>
                    </View>
                    {/* Test Name */}
                    <Text style={styles.testName}>{test.name}</Text>
                    {/* Other Tests */}
                    <Text style={styles.sectionTitle}>Other Available Tests</Text>
                    <ScrollView horizontal style={styles.otherTestsRow} showsHorizontalScrollIndicator={false}>
                        {center.tests.filter((t: string) => t !== test.name).map((t: string, idx: number) => (
                            <View key={idx} style={styles.otherTestCard}>
                                <Text style={styles.otherTestName}>{t}</Text>
                                {/* Add price if available */}
                            </View>
                        ))}
                    </ScrollView>
                    {/* Sticky Book Now Button */}
                    <TouchableOpacity style={styles.bookNowButton} onPress={() => {/* booking logic */ }}>
                        <Text style={styles.bookNowText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
    sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 400 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    centerName: { fontSize: 18, fontWeight: 'bold' },
    close: { fontSize: 22, padding: 8 },
    testName: { fontSize: 20, fontWeight: '600', marginVertical: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '500', marginTop: 16, marginBottom: 8 },
    otherTestsRow: { flexDirection: 'row', marginBottom: 16 },
    otherTestCard: { backgroundColor: '#f0f0f0', borderRadius: 12, padding: 12, marginRight: 8 },
    otherTestName: { fontSize: 14 },
    bookNowButton: { position: 'absolute', left: 24, right: 24, bottom: 24, backgroundColor: '#4CAF50', borderRadius: 12, padding: 16, alignItems: 'center' },
    bookNowText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 