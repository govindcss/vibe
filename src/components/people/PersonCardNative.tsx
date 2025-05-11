
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Assuming Feather icons
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative'; // Using the native gradient button

export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  imageUrl: string;
  distance?: string;
  commonEvents?: number;
}

interface PersonCardProps {
  person: Person;
  onVibe?: (id: string) => void;
  onSkip?: (id: string) => void;
}

export const PersonCardNative: React.FC<PersonCardProps> = ({ person, onVibe, onSkip }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      width: '100%', // Take full width of its container
      maxWidth: 360,
      elevation: 4, // Android shadow
      shadowColor: theme.colors.primary, // iOS shadow (subtle glow)
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    imageContainer: {
      aspectRatio: 3 / 4, // Standard portrait card ratio
      width: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    gradientOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '40%', // Adjust gradient height
      justifyContent: 'flex-end',
      padding: 16,
    },
    nameAgeText: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: theme.colors.primaryForeground,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    distanceText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      padding: 16,
    },
    bioText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      marginBottom: 12,
      lineHeight: 20,
      minHeight: 60, // For approx 3 lines
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 8,
    },
    badge: {
      backgroundColor: theme.colors.secondary + '33', // secondary with opacity
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: theme.radius / 1.5,
    },
    badgeText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.secondary,
    },
    commonEventsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commonEventsText: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: theme.colors.accent,
      marginLeft: 4,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 16, // Add padding to the bottom
      paddingTop: 8,
    },
    actionButton: {
      borderWidth: 2,
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: person.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          data-ai-hint="person portrait lifestyle"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.nameAgeText}>{person.name}, {person.age}</Text>
          {person.distance && <Text style={styles.distanceText}>{person.distance}</Text>}
        </LinearGradient>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.bioText} numberOfLines={3}>{person.bio}</Text>
        <View style={styles.interestsContainer}>
          {person.interests.slice(0, 3).map(interest => (
            <View key={interest} style={styles.badge}>
              <Text style={styles.badgeText}>{interest}</Text>
            </View>
          ))}
        </View>
         {person.commonEvents && person.commonEvents > 0 && (
           <View style={styles.commonEventsContainer}>
            <Feather name="zap" size={14} color={theme.colors.accent} />
            <Text style={styles.commonEventsText}>{person.commonEvents} event(s) in common</Text>
           </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: theme.colors.destructive + '80' }]}
          onPress={() => onSkip?.(person.id)}
          aria-label="Skip"
        >
          <Feather name="x" size={30} color={theme.colors.destructive} />
        </TouchableOpacity>
        
        <GradientButtonNative
          onPress={() => onVibe?.(person.id)}
          style={{ width: 70, height: 70, borderRadius: 35, paddingVertical:0, paddingHorizontal:0 }} // Make it circular
          icon={<Feather name="heart" size={30} color={theme.colors.primaryForeground} />}
        />
      </View>
    </View>
  );
};
