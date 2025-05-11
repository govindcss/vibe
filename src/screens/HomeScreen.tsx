
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../contexts/ThemeContext';
import { GradientButtonNative } from '../components/shared/GradientButtonNative';
import { EventCardNative } from '../components/events/EventCardNative'; // Native EventCard
import { AppStackParamList } from '../navigation/MainAppNavigator';
import HeaderNative from '../components/layout/HeaderNative';
import { dummyEventsData, Event } from '../data/events'; // Import centralized data

const featuredEvents: Event[] = dummyEventsData.slice(0, 3); // Use first 3 from dummy data

const promotedItems = [
  { id: 'promo1', title: 'VibeWave Launch Party!', imageUrl: 'https://picsum.photos/seed/launchparty/700/350', dataAiHint: "party event", description: 'Join us for the official launch!' },
  { id: 'promo2', title: 'Featured Artist: DJ Neon', imageUrl: 'https://picsum.photos/seed/djneon/700/350', dataAiHint: "dj concert", description: 'Catch DJ Neon live this weekend.' },
  { id: 'promo3', title: 'Early Bird: Summer Fest', imageUrl: 'https://picsum.photos/seed/summerfestpromo/700/350', dataAiHint: "festival summer", description: 'Get your tickets now!' },
];

const screenWidth = Dimensions.get('window').width;

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'MainTabs'>;

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
    heroSection: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 20, 
      paddingBottom: 24,
    },
    appName: { // Kept if needed, but HeaderNative handles title
      fontSize: 36,
      fontFamily: 'Inter-Bold',
      color: theme.colors.primary,
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
    heroButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      width: '100%',
      paddingHorizontal: 16,
    },
    heroButtonStyle: {
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
      fontSize: 22,
      fontFamily: 'Inter-Bold',
      color: theme.colors.foreground, // Changed from secondary for better contrast
      marginBottom: 16,
    },
    eventGrid: {
      // Vertical list for now
    },
    bannerSection: {
      marginVertical: 24,
    },
    carouselContainer: {
      paddingHorizontal: 16,
      gap: 16,
    },
    bannerItem: {
      width: screenWidth * 0.8, // 80% of screen width
      height: screenWidth * 0.8 * (9/16), // Maintain 16:9 aspect ratio
      borderRadius: theme.radius,
      overflow: 'hidden',
      backgroundColor: theme.colors.card,
       elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    bannerTextContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 10,
    },
    bannerTitle: {
      color: theme.colors.primaryForeground,
      fontSize: 16,
      fontFamily: 'Inter-Bold',
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
        <View style={styles.heroSection}>
          <Text style={styles.tagline}>
            Discover events, connect with people, and ride the <Text style={styles.taglineHighlight}>vibe</Text>.
          </Text>
          <View style={styles.heroButtonContainer}>
            <GradientButtonNative
              title="Explore Events"
              onPress={() => navigation.navigate('MainTabs', { screen: 'Events' })}
              style={styles.heroButtonStyle}
              icon={<Feather name="search" size={16} color={theme.colors.primaryForeground} />}
            />
             <TouchableOpacity
              style={[styles.heroButtonStyle, styles.outlineButton, { borderRadius: theme.radius, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
              onPress={() => navigation.navigate('Auth', { screen: 'Signup' } as any)} // Navigate to Auth stack, then Signup
            >
              <Feather name="user-plus" size={16} color={theme.colors.primary} style={{marginRight: 8}}/>
              <Text style={[styles.outlineButtonText, {fontFamily: 'Inter-SemiBold', fontSize: 16}]}>Join Wave</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Carousel Section */}
        <View style={styles.bannerSection}>
          <Text style={[styles.sectionTitle, {paddingHorizontal: 16}]}>Don't Miss Out!</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
            {promotedItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.bannerItem} onPress={() => console.log('Banner pressed:', item.id)}>
                <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} data-ai-hint={item.dataAiHint}/>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle} numberOfLines={1}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Happening Nearby?</Text>
          <View style={styles.eventGrid}>
            {featuredEvents.map(event => (
              <EventCardNative key={event.id} event={event} navigation={navigation} />
            ))}
          </View>
           <GradientButtonNative
              title="See All Events"
              onPress={() => navigation.navigate('MainTabs', { screen: 'Events' })}
              style={{marginTop: 20}}
              icon={<Feather name="arrow-right-circle" size={18} color={theme.colors.primaryForeground} />}
            />
        </View>

        <View style={styles.whySection}>
          <Text style={[styles.sectionTitle, {color: theme.colors.accent, textAlign: 'center'}]}>Why VibeWave?</Text>
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
