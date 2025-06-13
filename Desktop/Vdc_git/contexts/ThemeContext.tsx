// contexts/ThemeContext.tsx
// This file defines a React Context for managing the application's theme colors and mode.
// It includes support for light, dark, and system-preferred color schemes.

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';

// Define the possible theme modes
export type ThemeMode = 'light' | 'dark' | 'system';

// Define the shape of your theme colors
export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  notification: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

// Define the shape of the theme context value
interface Theme {
  colors: Colors;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

// Default light theme colors
const lightColors: Colors = {
  primary: '#4CAF50', // Green
  secondary: '#FFC107', // Amber
  accent: '#00BCD4', // Cyan
  background: '#F0F2F5', // Light grey background
  surface: '#FFFFFF', // White for cards/surfaces
  card: '#FFFFFF',
  text: '#212121', // Dark grey for primary text
  textSecondary: '#757575', // Medium grey for secondary text
  border: '#E0E0E0', // Light grey for borders
  notification: '#F44336', // Red for notifications
  error: '#F44336', // Red for errors
  success: '#4CAF50', // Green for success
  warning: '#FFC107', // Amber for warnings
  info: '#2196F3', // Blue for info
};

// Dark theme colors
const darkColors: Colors = {
  primary: '#81C784', // Lighter Green
  secondary: '#FFD54F', // Lighter Amber
  accent: '#4DD0E1', // Lighter Cyan
  background: '#121212', // Dark background
  surface: '#1E1E1E', // Darker surfaces
  card: '#1E1E1E',
  text: '#E0E0E0', // Light grey for primary text
  textSecondary: '#BDBDBD', // Lighter grey for secondary text
  border: '#424242', // Dark grey for borders
  notification: '#EF9A9A', // Lighter Red
  error: '#EF9A9A', // Lighter Red
  success: '#81C784', // Lighter Green
  warning: '#FFD54F', // Lighter Amber
  info: '#64B5F6', // Lighter Blue
};

// Create the Theme Context with an initial undefined value, which will be set by the Provider
const ThemeContext = createContext<Theme | undefined>(undefined);

/**
 * ThemeProvider Component
 * This component wraps your application or a part of it, providing theme data
 * to all its children components. It manages the current theme mode and colors.
 * @param children - React nodes to be rendered within the theme context.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Hook to get system's current color scheme ('light' | 'dark' | null)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light'); // Set default to 'light'
  const [currentColors, setCurrentColors] = useState<Colors>(lightColors); // Start with light colors

  // Effect to update colors whenever themeMode or systemColorScheme changes
  useEffect(() => {
    if (themeMode === 'system') {
      // If system mode is selected, use system's preference, defaulting to light if unknown
      setCurrentColors(systemColorScheme === 'dark' ? darkColors : lightColors);
    } else if (themeMode === 'light') {
      setCurrentColors(lightColors);
    } else { // themeMode is 'dark'
      setCurrentColors(darkColors);
    }
  }, [themeMode, systemColorScheme]); // Dependencies for the effect

  // The value provided to the context consumers
  const value = {
    colors: currentColors,
    themeMode,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * A custom hook to easily access the theme context (colors, themeMode, and setThemeMode function).
 * Throws an error if used outside of a ThemeProvider.
 * @returns The current theme object.
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
