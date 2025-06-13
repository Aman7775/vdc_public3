import React from 'react';
import { Tabs } from 'expo-router';
import { Search, TestTube, MessageCircle, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabsLayout() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 12,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Explorer',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lab-tests"
          options={{
            title: 'Lab Tests',
            tabBarIcon: ({ size, color }) => (
              <TestTube size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="consult"
          options={{
            title: 'Consult',
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFF4E6',
          borderRadius: 12,
          padding: 18,
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#FF6F61',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
        onPress={() => router.push('/support-community')}
      >
        <View>
          <Text style={{ color: '#36454F', fontWeight: 'bold', fontSize: 16 }}>
            Support Our Community
          </Text>
          <Text style={{ color: '#36454F', fontSize: 13, marginTop: 2 }}>
            Request or offer help for medical needs
          </Text>
        </View>
        <View style={{
          backgroundColor: '#FF6F61',
          borderRadius: 20,
          padding: 8,
          marginLeft: 12,
        }}>
          <Text style={{ color: '#FFF4E6', fontWeight: 'bold' }}>Help</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}