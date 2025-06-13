import React, { createContext, useContext, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Create auth context
type User = {
  email: string;
  fullName?: string;
  mobileNumber?: string;
} | null;
type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

export default function RootLayout() {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          {!user ? (
            <>
              <Stack.Screen name="login" options={{ animation: 'fade' }} />
              <Stack.Screen name="signup" options={{ animation: 'fade' }} />
            </>
          ) : (
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          )}
        </Stack>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}