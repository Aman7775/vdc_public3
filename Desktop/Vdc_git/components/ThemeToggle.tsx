// components/ThemeToggle.tsx
// This component provides buttons to switch between different theme modes:
// Light, Dark, and System. It uses the ThemeContext to manage the theme state.

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Sun, Moon, Monitor } from 'lucide-react-native'; // Icons for theme modes
import { useTheme, ThemeMode } from '../contexts/ThemeContext'; // Adjust path as needed

/**
 * ThemeToggle Component
 * Renders a set of buttons to allow the user to select the app's theme mode.
 */
export function ThemeToggle() {
  const { themeMode, setThemeMode, colors } = useTheme(); // Access theme mode and colors from context

  // Array of theme options with their corresponding icons and labels
  const themes: { mode: ThemeMode; icon: React.ComponentType<any>; label: string }[] = [
    { mode: 'light', icon: Sun, label: 'Light' },
    { mode: 'dark', icon: Moon, label: 'Dark' },
    { mode: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {themes.map(({ mode, icon: Icon, label }) => (
        <TouchableOpacity
          key={mode}
          style={[
            styles.option,
            themeMode === mode && { backgroundColor: colors.primary }, // Highlight active theme
          ]}
          onPress={() => setThemeMode(mode)} // Change theme mode on press
        >
          <Icon
            size={16}
            color={themeMode === mode ? '#FFFFFF' : colors.textSecondary} // Icon color based on active state
          />
          <Text
            style={[
              styles.optionText,
              {
                color: themeMode === mode ? '#FFFFFF' : colors.textSecondary, // Text color based on active state
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// StyleSheet for the ThemeToggle component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
  },
  option: {
    flex: 1, // Distribute space evenly among options
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6, // Space between icon and text
  },
  optionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium', // Ensure this font is loaded
  },
});
