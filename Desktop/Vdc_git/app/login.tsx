import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './_layout';

export default function LoginScreen() {
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useAuth();

    const validateForm = () => {
        if (!emailOrMobile.trim()) {
            setError('Please enter your email or mobile number');
            return false;
        }
        if (!password) {
            setError('Please enter your password');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Create user object with all required fields
            const userData = {
                email: emailOrMobile.trim(),
                fullName: 'Demo User', // This would come from your backend in a real app
                mobileNumber: emailOrMobile.length === 10 ? emailOrMobile.trim() : undefined
            };

            // Set user in auth context
            setUser(userData);

            // Navigate to main app
            router.replace('/(tabs)');
        } catch (e) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email or Mobile Number"
                    value={emailOrMobile}
                    onChangeText={setEmailOrMobile}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/signup')}>
                        <Text style={styles.footerLink}>Sign Up</Text>
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