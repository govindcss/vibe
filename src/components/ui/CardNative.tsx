
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface CardNativeProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardNative: React.FC<CardNativeProps> = ({ children, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: theme.radius,
      },
      style
    ]}>
      {children}
    </View>
  );
};

// These can be separate components if more complex styling or behavior is needed.
export const CardHeaderNative: React.FC<{ children: React.ReactNode, style?: ViewStyle }> = ({ children, style }) => {
  const { theme } = useTheme();
  return <View style={[styles.header, { borderBottomColor: theme.colors.border }, style]}>{children}</View>;
};

export const CardContentNative: React.FC<{ children: React.ReactNode, style?: ViewStyle }> = ({ children, style }) => (
  <View style={[styles.content, style]}>{children}</View>
);

export const CardFooterNative: React.FC<{ children: React.ReactNode, style?: ViewStyle }> = ({ children, style }) => {
   const { theme } = useTheme();
  return <View style={[styles.footer, { borderTopColor: theme.colors.border }, style]}>{children}</View>;
};


const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    // Shadow for Android (elevation) and iOS (shadow*)
    elevation: 3,
    shadowColor: '#000000', // Use a dark shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Softer shadow
    shadowRadius: 4,
  },
  header: {
    padding: 16, // Default padding
    borderBottomWidth: 1,
  },
  content: {
    padding: 16, // Default padding
  },
  footer: {
    padding: 16, // Default padding
    borderTopWidth: 1,
  }
});
