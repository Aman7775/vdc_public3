import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './_layout';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useAuth();

    const validateForm = () => {
        if (!fullName.trim()) {
            setError('Please enter your full name');
            return false;
        }
        if (!mobileNumber.trim()) {
            setError('Please enter your mobile number');
            return false;
        }
        if (mobileNumber.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Create user object with all required fields
            const userData = {
                email: email || mobileNumber,
                fullName: fullName.trim(), // Ensure we store the trimmed name
                mobileNumber: mobileNumber.trim()
            };

            // Set user in auth context
            setUser(userData);

            // Navigate to main app
            router.replace('/(tabs)');
        } catch (e) {
            setError('Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email Address (Optional)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password (min. 8 characters)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign Up'}</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    footerLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
}); 