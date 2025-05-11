
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Assuming Feather icons
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative'; // Using the native gradient button
import type { Event } from '../../data/events'; // For shared events lookup
import { dummyEventsData } from '../../data/events'; // For shared events lookup (simplification for demo)
import { useToast } from '../../contexts/ToastContext';

export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  imageUrl: string; // Avatar URL
  secondaryImageUrls?: string[]; // Optional secondary images
  bannerUrl?: string; // Banner image URL for profile page
  distance?: string;
  commonEvents?: number; // Count of mutual/common events (already present)
  sharedUpcomingEventIds?: string[]; // IDs of events the person is attending
  vibeTags?: string[]; // e.g., ["🔥 Raver", "🎵 Techno"]
  isVerified?: boolean;
  gender?: string;
  pronouns?: string; // Already exists
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
  onSaveForLater?: (id: string) => void; // New action
  containerStyle?: object;
}

export const PersonCardNative: React.FC<PersonCardProps> = ({ person, onVibe, onSkip, onPress, onSaveForLater, containerStyle }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const handleCardPress = () => {
    if (onPress) {
      onPress(person.id);
    }
  };

  const getSharedEventTitles = () => {
    if (!person.sharedUpcomingEventIds || person.sharedUpcomingEventIds.length === 0) {
      return [];
    }
    return person.sharedUpcomingEventIds
      .map(eventId => dummyEventsData.find(event => event.id === eventId)?.title)
      .filter(Boolean) as string[];
  };

  const sharedEventTitles = getSharedEventTitles();

  const handleMoreOptions = () => {
    Alert.alert(
      "Options",
      `What would you like to do with ${person.name}'s profile?`,
      [
        { text: "Report User", onPress: () => showToast({ type: 'warning', title: 'Reported', message: `${person.name} has been reported.`}) },
        { text: "Block User", onPress: () => showToast({ type: 'warning', title: 'Blocked', message: `${person.name} has been blocked.`}) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius * 1.5, // More rounded for swipe card feel
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      width: '100%', 
      elevation: 4, 
      shadowColor: theme.colors.primary, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    imageContainer: {
      aspectRatio: 3 / 4, // Common aspect ratio for profile cards
      width: '100%',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    verifiedBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme.colors.secondary,
      borderRadius: 12,
      padding: 5,
    },
    moreOptionsButton: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 15,
      padding: 5,
    },
    gradientOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '50%', 
      justifyContent: 'flex-end',
      padding: 16, 
    },
    nameAgeText: {
      fontSize: 24, 
      fontFamily: 'Inter-Bold',
      color: theme.colors.primaryForeground,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    pronounsText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.primaryForeground,
      opacity: 0.8,
      fontStyle: 'italic',
    },
    distanceText: {
      fontSize: 13, 
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
      marginBottom: 10,
      lineHeight: 20,
      minHeight: 40, 
    },
    tagsContainer: { // For interests and vibe tags
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8, 
      marginBottom: 8,
    },
    interestBadge: {
      backgroundColor: theme.colors.secondary + '33', 
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: theme.radius / 1.5,
    },
    interestBadgeText: {
      fontSize: 11, 
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.secondary,
    },
    vibeTagBadge: {
      backgroundColor: theme.colors.accent + '33',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: theme.radius / 1.5,
    },
    vibeTagText: {
        fontSize: 11,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.accent,
    },
    sharedEventsContainer: {
        marginTop: 8,
    },
    sharedEventsTitle: {
        fontSize: 13,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.primary,
        marginBottom: 4,
    },
    sharedEventText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.mutedForeground,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly', // Space Evenly for 3+ buttons
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingBottom: 16,
      paddingTop: 8,
      borderTopWidth: 1,
      borderColor: theme.colors.border + '80'
    },
    actionButton: { // Base style for icon buttons
      borderWidth: 1.5, 
      width: 56, 
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    skipButton: {
      borderColor: theme.colors.destructive + 'CC',
    },
    vibeButtonWrapper: { // To handle GradientButtonNative style prop
        // No specific style, GradientButtonNative takes care of it
    },
    saveButton: {
        borderColor: theme.colors.secondary + 'CC',
    },
    // Placeholder: Note about secondary images
    secondaryImagesNote: {
        fontSize: 10,
        fontFamily: 'Inter-Regular',
        color: theme.colors.mutedForeground,
        textAlign: 'center',
        paddingBottom: 4,
    }
  });

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={onPress ? 0.8 : 1} style={containerStyle}>
        <View style={styles.card}>
        <View style={styles.imageContainer}>
            <Image
            source={{ uri: person.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            data-ai-hint="person portrait lifestyle"
            />
            {person.isVerified && (
                <View style={styles.verifiedBadge}>
                    <Feather name="check" size={12} color={theme.colors.primaryForeground} />
                </View>
            )}
             <TouchableOpacity style={styles.moreOptionsButton} onPress={handleMoreOptions}>
                <Feather name="more-vertical" size={20} color={theme.colors.primaryForeground} />
            </TouchableOpacity>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
                style={styles.gradientOverlay}
            >
                <Text style={styles.nameAgeText}>{person.name}{person.age ? `, ${person.age}` : ''}</Text>
                {person.pronouns && <Text style={styles.pronounsText}>{person.pronouns}</Text>}
                {person.distance && <Text style={styles.distanceText}>{person.distance}</Text>}
            </LinearGradient>
        </View>
        
        <View style={styles.content}>
            <Text style={styles.bioText} numberOfLines={2}>{person.bio}</Text>
            
            {person.interests && person.interests.length > 0 && (
                <View style={styles.tagsContainer}>
                {person.interests.slice(0, 3).map(interest => ( 
                    <View key={interest} style={styles.interestBadge}>
                    <Text style={styles.interestBadgeText}>{interest}</Text>
                    </View>
                ))}
                </View>
            )}

            {person.vibeTags && person.vibeTags.length > 0 && (
                <View style={styles.tagsContainer}>
                {person.vibeTags.slice(0, 3).map(tag => (
                    <View key={tag} style={styles.vibeTagBadge}>
                    <Text style={styles.vibeTagText}>{tag}</Text>
                    </View>
                ))}
                </View>
            )}
            
            {sharedEventTitles.length > 0 && (
                <View style={styles.sharedEventsContainer}>
                    <Text style={styles.sharedEventsTitle}>Attending:</Text>
                    {sharedEventTitles.slice(0,2).map(title => (
                        <Text key={title} style={styles.sharedEventText} numberOfLines={1}>🎉 {title}</Text>
                    ))}
                </View>
            )}
             {person.secondaryImageUrls && person.secondaryImageUrls.length > 0 && (
                 <Text style={styles.secondaryImagesNote}>(+{person.secondaryImageUrls.length} more photos)</Text>
             )}
        </View>

        {/* Footer with action buttons, visible in swipe view context */}
        {onVibe && onSkip && onSaveForLater && (
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.skipButton]}
                    onPress={() => onSkip(person.id)}
                    aria-label="Skip"
                >
                    <Feather name="x" size={28} color={theme.colors.destructive} />
                </TouchableOpacity>
                
                <View style={styles.vibeButtonWrapper}>
                    <GradientButtonNative
                        onPress={() => onVibe(person.id)}
                        style={[styles.actionButton, {width: 70, height: 70, borderRadius: 35, borderWidth: 0}]} // Larger main button
                        icon={<Feather name="heart" size={32} color={theme.colors.primaryForeground} />}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={() => onSaveForLater(person.id)}
                    aria-label="Save for Later"
                >
                    <Feather name="bookmark" size={24} color={theme.colors.secondary} />
                </TouchableOpacity>
            </View>
        )}
        </View>
    </TouchableOpacity>
  );
};

