import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { SectionHeader } from '@/components/SectionHeader';
import { TestTube, Stethoscope, Wallet, Calendar, Star } from 'lucide-react-native';
import { diagnosticCenters } from '../data/diagnosticCenters';

interface DiagnosticCenter {
    id: number;
    name: string;
    rating: number;
    address: string;
    description: string;
    timings: string;
    features: string[];
    tests: string[];
}

export default function ExploreScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Search Bar */}
            <TextInput
                style={[styles.searchBar, { borderColor: colors.primary, color: colors.text }]}
                placeholder="Search doctors, tests, centers..."
                placeholderTextColor={colors.textSecondary}
            />

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.accent }]}
                    onPress={() => router.push('/doctors')}
                >
                    <Text style={styles.buttonText}>Find Doctors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.accent }]}
                    onPress={() => router.push('/diagnostic-centers')}
                >
                    <Text style={styles.buttonText}>Diagnostic Centers</Text>
                </TouchableOpacity>
            </View>

            {/* Support Our Community Section */}
            <View style={styles.section}>
                <SectionHeader title="Support Our Community" />
                {/* Add your charitable banners component here */}
            </View>

            {/* Quick Actions Section */}
            <View style={styles.section}>
                <SectionHeader title="Quick Actions" />
                <View style={styles.quickActionsGrid}>
                    <TouchableOpacity
                        style={[styles.quickActionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => router.push('/diagnostic-centers')}
                    >
                        <TestTube size={24} color={colors.primary} />
                        <Text style={[styles.quickActionText, { color: colors.text }]}>Book Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.quickActionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => router.push('/doctors')}
                    >
                        <Stethoscope size={24} color={colors.primary} />
                        <Text style={[styles.quickActionText, { color: colors.text }]}>Find Doctor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.quickActionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => router.push('/wallet')}
                    >
                        <Wallet size={24} color={colors.primary} />
                        <Text style={[styles.quickActionText, { color: colors.text }]}>My Wallet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.quickActionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => router.push('/appointments')}
                    >
                        <Calendar size={24} color={colors.primary} />
                        <Text style={[styles.quickActionText, { color: colors.text }]}>Appointments</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Diagnostic Centers Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Diagnostic Centers</Text>
                    <TouchableOpacity onPress={() => router.push('/diagnostic-centers')}>
                        <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.diagnosticCentersList}>
                    {diagnosticCenters.slice(0, 3).map((center) => (
                        <TouchableOpacity
                            key={center.id}
                            style={[styles.diagnosticCenterCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => router.push(`/diagnostic-center/${center.id}`)}
                        >
                            <View style={[styles.centerImage, { backgroundColor: colors.primary + '20' }]}>
                                <Text style={[styles.centerInitial, { color: colors.primary }]}>
                                    {center.name.charAt(0)}
                                </Text>
                            </View>
                            <View style={styles.centerInfo}>
                                <Text style={[styles.centerName, { color: colors.text }]}>{center.name}</Text>
                                <Text style={[styles.centerAddress, { color: colors.textSecondary }]}>{center.address}</Text>
                                <View style={styles.centerRating}>
                                    <Star size={14} color={colors.warning} fill={colors.warning} />
                                    <Text style={[styles.ratingText, { color: colors.text }]}>{center.rating}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        borderWidth: 1,
    },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    section: {
        marginBottom: 24,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 4,
    },
    quickActionCard: {
        width: '47%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    quickActionText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
    },
    diagnosticCentersList: {
        gap: 12,
    },
    diagnosticCenterCard: {
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
    },
    centerImage: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerInitial: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    centerInfo: {
        flex: 1,
        padding: 12,
    },
    centerName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    centerAddress: {
        fontSize: 14,
        marginBottom: 8,
    },
    centerRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: '600',
    },
});