
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../contexts/ThemeContext';
import { GradientButtonNative } from '../components/shared/GradientButtonNative';
import { EventCardNative, Event } from '../components/events/EventCardNative'; // Native EventCard
import { MainTabParamList } from '../navigation/MainAppNavigator';
import HeaderNative from '../components/layout/HeaderNative';

const featuredEvents: Event[] = [
  { id: '1', title: 'Neon Nights Fest', date: '2024-08-15', location: 'Downtown Plaza', category: 'Music', imageUrl: 'https://picsum.photos/seed/neonfest/600/400', description: 'Experience the ultimate music festival with glowing lights and electrifying beats.' },
  { id: '2', title: 'Tech Meetup Wave', date: '2024-08-20', location: 'Innovation Hub', category: 'Tech', imageUrl: 'https://picsum.photos/seed/techmeetup/600/400', description: 'Connect with tech enthusiasts and innovators in your city.' },
  { id: '3', title: 'Wellness Weekend', date: '2024-08-25', location: 'Serene Park', category: 'Wellness', imageUrl: 'https://picsum.photos/seed/wellness/600/400', description: 'Recharge your mind and body with our wellness retreat activities.' },
];

type HomeScreenNavigationProp = StackNavigationProp<MainTabParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      paddingBottom: 20, // For content below the fold
    },
    headerContainer: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 40, // Adjust for status bar
      paddingBottom: 24,
      // backgroundColor: theme.colors.card, // Optional: for distinct header area
    },
    appName: {
      fontSize: 36,
      fontFamily: 'Inter-Bold',
      color: theme.colors.primary, // Simplified, gradient text is complex in RN
      marginBottom: 8,
    },
    tagline: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      textAlign: 'center',
      marginBottom: 24,
      maxWidth: 300,
    },
    taglineHighlight: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      width: '100%',
      paddingHorizontal: 16,
    },
    buttonStyle: {
      flex: 1,
      paddingVertical: 16,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    outlineButtonText: {
      color: theme.colors.primary,
    },
    section: {
      paddingHorizontal: 16,
      marginVertical: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: theme.colors.secondary, // Example: glowing-text-secondary
      marginBottom: 16,
    },
    eventGrid: {
      // For a true grid, you might use FlatList with numColumns or map View items.
      // This is a simple vertical list for now.
    },
    whySection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius,
      padding: 24,
      marginHorizontal:16,
      marginVertical: 24,
    },
    whyItem: {
      alignItems: 'center',
      marginBottom: 24,
    },
    whyIcon: {
      marginBottom: 12,
    },
    whyItemTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.foreground,
      marginBottom: 4,
    },
    whyItemDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      textAlign: 'center',
    },
  });


  return (
    <View style={styles.container}>
      <HeaderNative title="VibeWave" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          {/* VibeWave Logo/Text */}
          {/* <Text style={styles.appName}>VibeWave</Text> */}
          <Text style={styles.tagline}>
            Discover events, connect with people, and ride the <Text style={styles.taglineHighlight}>vibe</Text>.
          </Text>
          <View style={styles.buttonContainer}>
            <GradientButtonNative
              title="Explore Events"
              onPress={() => navigation.navigate('Events')}
              style={styles.buttonStyle}
            />
             <TouchableOpacity
              style={[styles.buttonStyle, styles.outlineButton, { borderRadius: theme.radius }]}
              onPress={() => navigation.navigate('Auth', { screen: 'Signup' } as any)} // Navigate to Auth stack, then Signup
            >
              <Text style={[styles.outlineButtonText, {fontFamily: 'Inter-SemiBold', fontSize: 16}]}>Join the Wave</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Happening?</Text>
          <View style={styles.eventGrid}>
            {featuredEvents.map(event => (
              <EventCardNative key={event.id} event={event} navigation={navigation as any} />
            ))}
          </View>
        </View>

        <View style={styles.whySection}>
          <Text style={[styles.sectionTitle, {color: theme.colors.accent}]}>Why VibeWave?</Text>
          <View style={styles.whyItem}>
            <Feather name="music" size={40} color={theme.colors.primary} style={styles.whyIcon} />
            <Text style={styles.whyItemTitle}>Discover Events</Text>
            <Text style={styles.whyItemDescription}>From music festivals to local meetups, find your next adventure.</Text>
          </View>
          <View style={styles.whyItem}>
            <Feather name="users" size={40} color={theme.colors.secondary} style={styles.whyIcon} />
            <Text style={styles.whyItemTitle}>Connect with People</Text>
            <Text style={styles.whyItemDescription}>Meet like-minded individuals and expand your circle.</Text>
          </View>
          <View style={styles.whyItem}>
            <Feather name="gift" size={40} color={theme.colors.accent} style={styles.whyIcon} />
            <Text style={styles.whyItemTitle}>Create Your Vibe</Text>
            <Text style={styles.whyItemDescription}>Host your own events and share your passions.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
