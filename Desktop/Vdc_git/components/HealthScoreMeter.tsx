// components/HealthScoreMeter.tsx
// This component displays a health score within a circular meter.
// The meter's progress and color dynamically change based on the score.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Adjust path as needed
import Svg, { Circle } from 'react-native-svg'; // For drawing SVG circles

interface HealthScoreMeterProps {
  score: number; // The health score (0-100)
  size?: number; // The size of the meter (width and height)
}

/**
 * HealthScoreMeter Component
 * Renders a circular progress meter displaying a health score.
 * @param score - The numeric health score (0-100).
 * @param size - The desired width and height of the meter (default: 120).
 */
export function HealthScoreMeter({ score, size = 120 }: HealthScoreMeterProps) {
  const { colors } = useTheme(); // Access theme colors

  const strokeWidth = 8; // Thickness of the progress circle
  const radius = (size - strokeWidth) / 2; // Radius of the circle, accounting for stroke width
  const circumference = 2 * Math.PI * radius; // Full circumference of the circle
  const strokeDasharray = circumference; // Makes the stroke a continuous line
  // Calculate how much of the circle should be filled based on the score
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine the color of the score based on its value
  const getScoreColor = (currentScore: number) => {
    if (currentScore >= 80) return colors.success; // Excellent
    if (currentScore >= 60) return colors.warning; // Good
    return colors.error; // Poor/Average
  };

  // Determine the text label for the score based on its value
  const getScoreLabel = (currentScore: number) => {
    if (currentScore >= 80) return 'Excellent';
    if (currentScore >= 60) return 'Good';
    if (currentScore >= 40) return 'Average';
    return 'Poor';
  };

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle: always full and in border color */}
        <Circle
          cx={size / 2} // Center X coordinate
          cy={size / 2} // Center Y coordinate
          r={radius} // Radius of the circle
          stroke={colors.border} // Background stroke color
          strokeWidth={strokeWidth} // Stroke thickness
          fill="transparent" // Make the inside transparent
        />
        {/* Progress circle: fills based on score, color changes with score */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor} // Dynamic stroke color based on score
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray} // Full circumference for a continuous line
          strokeDashoffset={strokeDashoffset} // Controls how much of the circle is filled
          strokeLinecap="round" // Round caps for the progress line
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start from the top
        />
      </Svg>
      {/* Content displayed inside the circle (score and label) */}
      <View style={styles.content}>
        <Text style={[styles.score, { color: colors.text }]}>{score}</Text>
        <Text style={[styles.label, { color: scoreColor }]}>{scoreLabel}</Text>
      </View>
    </View>
  );
}

// StyleSheet for the HealthScoreMeter component
const styles = StyleSheet.create({
  container: {
    position: 'relative', // Allows absolute positioning of SVG
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute', // Overlay SVG on top of content
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 28,
    fontFamily: 'Inter-Bold', // Ensure this font is loaded
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold', // Ensure this font is loaded
  },
});
