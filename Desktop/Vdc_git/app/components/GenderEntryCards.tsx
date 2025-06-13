import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

interface DiagnosticCenter {
    id: number;
    name: string;
    tests: string[];
}

interface GenderEntryCardsProps {
    diagnosticCenters: DiagnosticCenter[];
    onBookTest: (test: { name: string }, center: DiagnosticCenter) => void;
}

const GENDER_IMAGES = {
    women: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png', // Placeholder
    men: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026511_1280.png', // Placeholder
    adult: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_1280.png', // Placeholder
    senior: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png', // Placeholder
};

const TESTS = {
    women: {
        adult: [
            'Hormone Panel (Estrogen, Progesterone)',
            'PCOD/PCOS Profile',
            'Iron & Vitamin Levels',
            'Breast Cancer Screening (Mammography)',
            'Thyroid Function',
            'Reproductive Health Panels',
        ],
        senior: [
            'Bone Density (DEXA Scan)',
            'Post-Menopausal Risk Tests',
            'Cardiac Risk Markers',
            'Diabetes & Cholesterol Panel',
            'Osteoporosis Screening',
        ],
    },
    men: {
        adult: [
            'Testosterone Profile',
            'Fitness/Vitality Panels',
            'Liver Function',
            'Kidney Function',
            'CBC, Lipids',
        ],
        senior: [
            'Prostate Cancer Screening (PSA)',
            'Cardiac Risk Panels',
            'Diabetes, Thyroid, Vitamin D',
            'Bone Health',
            'General Wellness Profile',
        ],
    },
};

const GenderEntryCards: React.FC<GenderEntryCardsProps> = ({ diagnosticCenters, onBookTest }) => {
    const [gender, setGender] = useState<'women' | 'men' | null>(null);
    const [ageGroup, setAgeGroup] = useState<'adult' | 'senior' | null>(null);

    // Helper to find a center for a test
    const getCenterForTest = (testName: string) => {
        return diagnosticCenters.find(center => center.tests.some(t => testName.includes(t))) || diagnosticCenters[0];
    };

    // Responsive card width
    const cardWidth = Math.min(180, Dimensions.get('window').width / 2 - 32);

    // Reset flow
    const reset = () => {
        setGender(null);
        setAgeGroup(null);
    };

    // Main UI
    return (
        <View style={{ marginBottom: 32 }}>
            {!gender ? (
                <View>
                    <Text style={styles.sectionTitle}>Tests by Gender</Text>
                    <View style={styles.genderRow}>
                        <TouchableOpacity
                            style={styles.genderCard}
                            onPress={() => setGender('women')}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: GENDER_IMAGES.women }} style={styles.genderImage} />
                            <Text style={styles.genderLabel}>For Women</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.genderCard}
                            onPress={() => setGender('men')}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: GENDER_IMAGES.men }} style={styles.genderImage} />
                            <Text style={styles.genderLabel}>For Men</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : !ageGroup ? (
                <View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={reset} style={styles.backBtn}><Text style={styles.backText}>{'←'}</Text></TouchableOpacity>
                        <Text style={styles.sectionTitle}>{gender === 'women' ? 'For Women' : 'For Men'}</Text>
                    </View>
                    <View style={styles.genderRow}>
                        <TouchableOpacity
                            style={styles.genderCard}
                            onPress={() => setAgeGroup('adult')}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: GENDER_IMAGES.adult }} style={styles.genderImage} />
                            <Text style={styles.genderLabel}>Adult {gender === 'women' ? 'Women' : 'Men'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.genderCard}
                            onPress={() => setAgeGroup('senior')}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: GENDER_IMAGES.senior }} style={styles.genderImage} />
                            <Text style={styles.genderLabel}>Senior {gender === 'women' ? 'Women' : 'Men'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => setAgeGroup(null)} style={styles.backBtn}><Text style={styles.backText}>{'←'}</Text></TouchableOpacity>
                        <Text style={styles.sectionTitle}>{ageGroup === 'adult' ? 'Adult' : 'Senior'} {gender === 'women' ? 'Women' : 'Men'} Tests</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                        {TESTS[gender][ageGroup].map((testName, idx) => {
                            const center = getCenterForTest(testName);
                            return (
                                <View key={idx} style={[styles.testCard, { width: cardWidth }]}>
                                    <Text style={styles.testName}>{testName}</Text>
                                    <Text style={styles.centerName}>{center.name}</Text>
                                    <TouchableOpacity
                                        style={styles.bookButton}
                                        onPress={() => onBookTest({ name: testName }, center)}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.bookButtonText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        color: '#F8FAFC',
        fontFamily: 'Inter-SemiBold',
        marginBottom: 16,
        marginLeft: 20,
    },
    genderRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
        gap: 16,
    },
    genderCard: {
        backgroundColor: '#1E293B',
        borderRadius: 32,
        padding: 16,
        alignItems: 'center',
        width: 140,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#334155',
    },
    genderImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 10,
        backgroundColor: '#CBD5E1',
    },
    genderLabel: {
        fontSize: 15,
        color: '#F8FAFC',
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginLeft: 8,
    },
    backBtn: {
        marginRight: 8,
        padding: 4,
        borderRadius: 8,
        backgroundColor: '#1E293B',
    },
    backText: {
        color: '#F8FAFC',
        fontSize: 18,
    },
    testCard: {
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
        padding: 18,
        marginRight: 16,
        marginBottom: 8,
        minWidth: 160,
        maxWidth: 220,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
    },
    testName: {
        fontSize: 15,
        color: '#0F172A',
        fontFamily: 'Inter-SemiBold',
        marginBottom: 8,
    },
    centerName: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 12,
        fontFamily: 'Inter-Regular',
    },
    bookButton: {
        backgroundColor: '#2563EB',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        minWidth: 100,
        width: '100%',
        shadowColor: '#2563EB',
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },
});

export { GenderEntryCards }; 