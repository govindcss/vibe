
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
  imageUrl: string; // Avatar URL
  bannerUrl?: string; // Banner image URL for profile page
  distance?: string;
  commonEvents?: number; // Count of mutual/common events
  gender?: string;
  pronouns?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  mutualFriendsCount?: number;
  sharedGroupChatsCount?: number;
}

interface PersonCardProps {
  person: Person;
  onVibe?: (id: string) => void;
  onSkip?: (id: string) => void;
  onPress?: (id: string) => void; // For navigating to full profile from grid/list
  containerStyle?: object;
}

export const PersonCardNative: React.FC<PersonCardProps> = ({ person, onVibe, onSkip, onPress, containerStyle }) => {
  const { theme } = useTheme();

  const handleCardPress = () => {
    if (onPress) {
      onPress(person.id);
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      width: '100%', // Take full width of its container
      elevation: 4, // Android shadow
      shadowColor: theme.colors.primary, // iOS shadow (subtle glow)
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    imageContainer: {
      aspectRatio: 1, // Changed to 1 for square images, better for grid
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
      padding: 12, // Adjusted padding
    },
    nameAgeText: {
      fontSize: 20, // Adjusted size
      fontFamily: 'Inter-Bold',
      color: theme.colors.primaryForeground,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    distanceText: {
      fontSize: 12, // Adjusted size
      fontFamily: 'Inter-Regular',
      color: theme.colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      padding: 12, // Adjusted padding
    },
    bioText: {
      fontSize: 13, // Adjusted size
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      marginBottom: 10,
      lineHeight: 18,
      minHeight: 36, // For approx 2 lines
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6, // Adjusted gap
      marginBottom: 6,
    },
    badge: {
      backgroundColor: theme.colors.secondary + '33', // secondary with opacity
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius / 2,
    },
    badgeText: {
      fontSize: 10, // Adjusted size
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.secondary,
    },
    commonEventsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4, // Added margin
    },
    commonEventsText: {
      fontSize: 12, // Adjusted size
      fontFamily: 'Inter-Regular',
      color: theme.colors.accent,
      marginLeft: 4,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingBottom: 12,
      paddingTop: 6,
    },
    actionButton: {
      borderWidth: 1.5, // Adjusted border
      width: 56, // Adjusted size
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    vibeButton: { // GradientButtonNative style prop
        width: 60, // Adjusted size
        height: 60,
        borderRadius: 30,
        paddingVertical:0,
        paddingHorizontal:0
    }
  });

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={onPress ? 0.7 : 1}>
        <View style={[styles.card, containerStyle]}>
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
            <Text style={styles.bioText} numberOfLines={2}>{person.bio}</Text>
            <View style={styles.interestsContainer}>
            {person.interests.slice(0, 2).map(interest => ( // Show fewer interests for compactness
                <View key={interest} style={styles.badge}>
                <Text style={styles.badgeText}>{interest}</Text>
                </View>
            ))}
            </View>
            {person.commonEvents && person.commonEvents > 0 && (
            <View style={styles.commonEventsContainer}>
                <Feather name="zap" size={12} color={theme.colors.accent} />
                <Text style={styles.commonEventsText}>{person.commonEvents} event(s) in common</Text>
            </View>
            )}
        </View>

        {onVibe && onSkip && ( // Only show buttons if handlers are provided (for swipe view)
            <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.actionButton, { borderColor: theme.colors.destructive + '80' }]}
                onPress={() => onSkip(person.id)}
                aria-label="Skip"
            >
                <Feather name="x" size={26} color={theme.colors.destructive} />
            </TouchableOpacity>
            
            <GradientButtonNative
                onPress={() => onVibe(person.id)}
                style={styles.vibeButton}
                icon={<Feather name="heart" size={26} color={theme.colors.primaryForeground} />}
            />
            </View>
        )}
        </View>
    </TouchableOpacity>
  );
};
