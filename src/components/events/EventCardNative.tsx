
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative';
import { format } from 'date-fns'; // For date formatting
import type { Event } from '../../data/events'; // Import Event type from centralized location
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AppStackParamList } from '../../navigation/MainAppNavigator'; // For navigation prop typing


interface EventCardProps {
  event: Event;
  navigation: StackNavigationProp<AppStackParamList>; 
}

export const EventCardNative: React.FC<EventCardProps> = ({ event, navigation }) => {
  const { theme } = useTheme();
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (event.date) {
      try {
        setFormattedDate(format(new Date(event.date), 'PPP')); // e.g., Jun 20, 2024
      } catch (error) {
        console.error("Error formatting date:", error);
        setFormattedDate("Invalid date");
      }
    }
  }, [event.date]);
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
      overflow: 'hidden', // Ensures image corners are clipped if card is rounded
      // Shadow for dark theme (optional, can be subtle)
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 1,
    },
    imageContainer: {
      aspectRatio: 16 / 9,
      width: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      padding: 12,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: theme.colors.foreground,
      marginBottom: 8,
    },
    infoContainer: {
      marginBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 8,
    },
    infoText: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      flexShrink: 1, // Allows text to wrap or truncate
    },
    badge: {
      backgroundColor: theme.colors.secondary + '33', // secondary with some opacity
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius / 2,
      alignSelf: 'flex-start', // So it doesn't take full width
    },
    badgeText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.secondary,
    },
    description: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      marginTop: 8,
      lineHeight: 20,
    },
    footer: {
      paddingHorizontal: 12,
      paddingBottom: 12,
      paddingTop: 0,
    },
  });

  const handlePress = () => {
    navigation.navigate('EventDetail', { eventId: event.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl || `https://picsum.photos/seed/${event.id}/400/225` }}
          style={styles.image}
          resizeMode="cover"
          data-ai-hint="event concert party"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        <View style={styles.infoContainer}>
          <Feather name="calendar" size={14} color={theme.colors.secondary} style={styles.icon} />
          <Text style={styles.infoText}>{formattedDate || 'Loading date...'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Feather name="map-pin" size={14} color={theme.colors.secondary} style={styles.icon} />
          <Text style={styles.infoText} numberOfLines={1}>{event.location}</Text>
        </View>
        <View style={[styles.infoContainer, { marginTop: 4 }]}>
           <Feather name="tag" size={14} color={theme.colors.secondary} style={styles.icon} />
           <View style={styles.badge}>
            <Text style={styles.badgeText}>{event.category}</Text>
           </View>
        </View>
        {event.description && (
          <Text style={styles.description} numberOfLines={2}>{event.description}</Text>
        )}
      </View>
      <View style={styles.footer}>
        <GradientButtonNative title="View Details" onPress={handlePress} />
      </View>
    </TouchableOpacity>
  );
};
