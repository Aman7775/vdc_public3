// components/SectionHeader.tsx
// This component provides a consistent header for various sections in the app,
// with an optional "See All" button for navigation or a custom action.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native'; // Icon for "See All"
import { router } from 'expo-router'; // Used for navigation
import { useTheme } from '../contexts/ThemeContext'; // Adjust path as needed

// Define props for the SectionHeader component
interface SectionHeaderProps {
  title: string;
  navigateTo?: string; // Optional route to navigate to when "See All" is pressed
  onPress?: () => void; // Optional custom function to execute when "See All" is pressed
}

/**
 * SectionHeader Component
 * Displays a title and an optional "See All" button that navigates to a specified route
 * or triggers a custom function.
 * @param title - The main title for the section.
 * @param navigateTo - The route string for navigation.
 * @param onPress - A custom function to be called on button press.
 */
export function SectionHeader({ title, navigateTo, onPress }: SectionHeaderProps) {
  const { colors } = useTheme(); // Access theme colors
  const styles = createStyles(colors); // Create styles with dynamic colors

  // Handle the press event, prioritizing onPress prop over navigateTo
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {(navigateTo || onPress) && ( // Only render "See All" if either prop is provided
        <TouchableOpacity style={styles.seeAllButton} onPress={handlePress}>
          <Text style={styles.seeAllText}>See All</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

/**
 * createStyles function
 * Defines the StyleSheet for the SectionHeader component.
 * @param colors - An object containing theme colors.
 */
function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      color: colors.text,
      fontFamily: 'Inter-SemiBold', // Ensure this font is loaded
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // Space between text and icon
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium', // Ensure this font is loaded
    },
  });
}
