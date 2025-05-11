
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import type { Person } from './PersonCardNative'; // Use type import

interface PeopleMapViewNativeProps {
  people: Person[];
  showUserLocation: boolean; // To simulate user's own location visibility
}

export const PeopleMapViewNative: React.FC<PeopleMapViewNativeProps> = ({ people, showUserLocation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.muted, // Placeholder background
    },
    placeholderText: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.mutedForeground,
      textAlign: 'center',
      marginBottom: 16,
    },
    icon: {
      marginBottom: 12,
    },
    infoText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      marginTop: 8,
    }
  });

  // In a real implementation, you would use react-native-maps here
  // and plot markers for each person in the `people` array if they have location data.
  // You'd also handle clustering if needed.

  return (
    <View style={styles.container}>
      <Feather name="map" size={60} color={theme.colors.primary} style={styles.icon} />
      <Text style={styles.placeholderText}>Live Map View (Placeholder)</Text>
      <ActivityIndicator color={theme.colors.primary} />
      <Text style={styles.infoText}>
        {people.length} people nearby would be shown here.
      </Text>
      <Text style={styles.infoText}>
        Your location is currently {showUserLocation ? 'visible' : 'hidden'}.
      </Text>
    </View>
  );
};
