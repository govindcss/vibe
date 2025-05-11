
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { EventCardNative } from '../../components/events/EventCardNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { AppStackParamList } from '../../navigation/MainAppNavigator';
import { Event } from '../../data/events'; // Import centralized Event type
import { useToast } from '../../contexts/ToastContext';

// Dummy user data
const userProfile = {
  name: 'Alex Wave Rider',
  username: '@alexwave',
  pronouns: 'they/them', // Added pronouns
  bio: 'Digital nomad exploring the world one vibe at a time. Music lover, tech enthusiast, and aspiring photographer. Let\'s connect!',
  location: 'Global',
  interests: ['Live Music', 'Tech Meetups', 'Photography', 'Travel', 'Food Festivals'],
  avatarUrl: 'https://picsum.photos/seed/alexprofile/200/200',
  bannerUrl: 'https://picsum.photos/seed/alexbanner/1200/400',
  joinedEvents: 12,
  hostedEvents: 3,
  vibesReceived: 157,
};

const dummyJoinedEvents: Event[] = [
  { id: 'event_j1', title: 'Indie Beats Night', date: '2024-06-15', location: 'The Local Venue', category: 'Music', imageUrl: 'https://picsum.photos/seed/joined1/300/169' },
  { id: 'event_j2', title: 'Startup Grind', date: '2024-06-20', location: 'CoWork Central', category: 'Tech', imageUrl: 'https://picsum.photos/seed/joined2/300/169' },
];

const dummyHostedEvents: Event[] = [
  { id: 'event_h1', title: 'Sunset Photo Walk', date: '2024-07-05', location: 'City Waterfront', category: 'Photography', imageUrl: 'https://picsum.photos/seed/hosted1/300/169' },
];

type ProfileScreenNavigationProp = StackNavigationProp<AppStackParamList, 'MainTabs'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isLocationShared, setIsLocationShared] = useState(true); // New state for location sharing

  const handleDeleteAccount = () => {
    Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => showToast({ message: "Account deletion process initiated (demo).", type: "warning" }) }
        ]
    );
  };


  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    bannerContainer: { height: Platform.OS === 'ios' ? 200 : 180, width: '100%', position: 'relative' },
    bannerImage: { width: '100%', height: '100%' },
    bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
    avatarContainer: {
      position: 'absolute',
      bottom: -40, // Half of avatar size to make it overlap
      left: 16,
      borderWidth: 4,
      borderColor: theme.colors.background,
      borderRadius: 54, // Avatar size / 2 + border width
      backgroundColor: theme.colors.background, // To hide banner behind avatar border
    },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    editProfileButtonContainer: { position: 'absolute', top: 16, right: 16 },
    editProfileButton: { paddingHorizontal:10, paddingVertical: 6, backgroundColor: theme.colors.background + 'B3', borderWidth: 1, borderColor: theme.colors.primary },
    editProfileButtonText: { color: theme.colors.primary, fontFamily: 'Inter-SemiBold', fontSize: 12 },
    userInfoContainer: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 24 },
    name: { fontSize: 26, fontFamily: 'Inter-Bold', color: theme.colors.foreground },
    username: { fontSize: 16, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginBottom: 2 },
    pronouns: { fontSize: 14, fontFamily: 'Inter-Regular', color: theme.colors.secondary, marginBottom: 8, fontStyle: 'italic' },
    locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    locationText: { fontSize: 14, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginLeft: 4 },
    bio: { fontSize: 15, fontFamily: 'Inter-Regular', color: theme.colors.foreground, lineHeight: 22, marginBottom: 16 },
    interestsLabel: { fontSize: 14, fontFamily: 'Inter-SemiBold', color: theme.colors.mutedForeground, textTransform: 'uppercase', marginBottom: 8 },
    interestsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    interestBadge: { backgroundColor: theme.colors.accent + '33', paddingHorizontal: 12, paddingVertical: 6, borderRadius: theme.radius / 1.5 },
    interestBadgeText: { color: theme.colors.accent, fontFamily: 'Inter-SemiBold', fontSize: 13 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24, borderTopWidth:1, borderBottomWidth:1, borderColor: theme.colors.border, paddingVertical: 16 },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 22, fontFamily: 'Inter-Bold', color: theme.colors.primary },
    statLabel: { fontSize: 12, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginTop: 2 },
    sectionContainer: { paddingHorizontal: 16, marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, // Reduced margin
    sectionTitle: { fontSize: 20, fontFamily: 'Inter-Bold', color: theme.colors.foreground, marginLeft: 8 },
    noEventsText: { color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', fontSize: 15 },
    createText: { color: theme.colors.primary, textDecorationLine: 'underline'},
    
    // Styles for existing action buttons and new "Settings & More"
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14, // Consistent padding
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border + '80',
    },
    settingItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Allow text content to take available space
    },
    settingIcon: {
        marginRight: 12,
    },
    settingText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.foreground,
    },
    settingDescription: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.mutedForeground,
        marginTop: 2,
    },
    actionButton: { // Used for Moderation, Logout, Delete
      borderWidth: 1, borderColor: theme.colors.muted, borderRadius: theme.radius,
      paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 12,
    },
    actionButtonText: { color: theme.colors.foreground, fontFamily: 'Inter-SemiBold', fontSize: 16, marginLeft: 8 },
    
    logoutButton: { backgroundColor: theme.colors.card, borderColor: theme.colors.destructive }, 
    logoutButtonText: { color: theme.colors.destructive },

    deleteAccountButton: { backgroundColor: theme.colors.destructive, borderColor: theme.colors.destructive },
    deleteAccountButtonText: { color: theme.colors.destructiveForeground },
  });

  return (
    <View style={styles.container}>
      <HeaderNative
        title="My Profile"
        actions={
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ padding: 8 }}>
            <Feather name="bell" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Image source={{ uri: userProfile.bannerUrl }} style={styles.bannerImage} resizeMode="cover" data-ai-hint="abstract colorful" />
          <View style={styles.bannerOverlay} />
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} data-ai-hint="person smiling"/>
          </View>
          <View style={styles.editProfileButtonContainer}>
            <GradientButtonNative 
                title="Edit Profile" 
                onPress={() => showToast({message: "Edit Profile screen coming soon!"})} 
                icon={<Feather name="edit-2" size={14} color={theme.colors.primary} />}
                style={styles.editProfileButton}
                textStyle={styles.editProfileButtonText}
            />
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.username}>{userProfile.username}</Text>
          <Text style={styles.pronouns}>{userProfile.pronouns}</Text>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={14} color={theme.colors.secondary} />
            <Text style={styles.locationText}>{userProfile.location}</Text>
          </View>
          <Text style={styles.bio}>{userProfile.bio}</Text>

          <Text style={styles.interestsLabel}>Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map(interest => (
              <View key={interest} style={styles.interestBadge}>
                <Text style={styles.interestBadgeText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}><Text style={[styles.statValue, {color: theme.colors.primary}]}>{userProfile.joinedEvents}</Text><Text style={styles.statLabel}>Events Joined</Text></View>
          <View style={styles.statItem}><Text style={[styles.statValue, {color: theme.colors.secondary}]}>{userProfile.hostedEvents}</Text><Text style={styles.statLabel}>Events Hosted</Text></View>
          <View style={styles.statItem}><Text style={[styles.statValue, {color: theme.colors.accent}]}>{userProfile.vibesReceived}</Text><Text style={styles.statLabel}>Vibes Received</Text></View>
        </View>
        
        {/* Combined Settings Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}><Feather name="sliders" size={22} color={theme.colors.primary} /><Text style={styles.sectionTitle}>Settings & Preferences</Text></View>
          
          {/* Profile Visibility */}
          <View style={styles.settingItem}>
            <View style={styles.settingItemContent}>
                <Feather name="eye" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <View>
                    <Text style={styles.settingText}>Public Profile Visibility</Text>
                    <Text style={styles.settingDescription}>Allow anyone to find and view your profile.</Text>
                </View>
            </View>
            <Switch
                trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                thumbColor={isProfilePublic ? theme.colors.primaryForeground : theme.colors.mutedForeground}
                ios_backgroundColor={theme.colors.muted}
                onValueChange={setIsProfilePublic}
                value={isProfilePublic}
            />
          </View>

          {/* Location Sharing */}
          <View style={styles.settingItem}>
            <View style={styles.settingItemContent}>
                <Feather name="map-pin" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <View>
                    <Text style={styles.settingText}>Location Sharing</Text>
                    <Text style={styles.settingDescription}>Enable for nearby events and people.</Text>
                </View>
            </View>
            <Switch
                trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                thumbColor={isLocationShared ? theme.colors.primaryForeground : theme.colors.mutedForeground}
                ios_backgroundColor={theme.colors.muted}
                onValueChange={setIsLocationShared}
                value={isLocationShared}
            />
          </View>
          
          {/* All Notifications (Panel) */}
           <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Notifications')}>
            <View style={styles.settingItemContent}>
                <Feather name="bell" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <Text style={styles.settingText}>All Notifications</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
          </TouchableOpacity>

          {/* Notification Preferences */}
          <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "Detailed Notification Preferences coming soon!"})}>
            <View style={styles.settingItemContent}>
                <Feather name="sliders" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <Text style={styles.settingText}>Notification Preferences</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
          </TouchableOpacity>
          
          {/* Blocked/Reported Users */}
          <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "Manage Blocked/Reported Users coming soon!"})}>
            <View style={styles.settingItemContent}>
                <Feather name="user-x" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <Text style={styles.settingText}>Blocked & Reported Users</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
          </TouchableOpacity>
          
          {/* Profile Sharing QR */}
          <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "QR Code sharing coming soon!"})}>
            <View style={styles.settingItemContent}>
                <Feather name="share-2" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                <Text style={styles.settingText}>Share Profile via QR Code</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
          </TouchableOpacity>
        </View>


        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}><Feather name="calendar" size={22} color={theme.colors.secondary} /><Text style={styles.sectionTitle}>Joined Events</Text></View>
          {dummyJoinedEvents.length > 0 ? dummyJoinedEvents.map(event => (
            <EventCardNative key={event.id} event={event} navigation={navigation} />
          )) : <Text style={styles.noEventsText}>You haven't joined any events yet.</Text>}
        </View>

        <View style={styles.sectionContainer}>
           <View style={styles.sectionHeader}><Feather name="star" size={22} color={theme.colors.accent} /><Text style={styles.sectionTitle}>Hosted Events</Text></View>
          {dummyHostedEvents.length > 0 ? dummyHostedEvents.map(event => (
            <EventCardNative key={event.id} event={event} navigation={navigation} />
          )) : <Text style={styles.noEventsText}>You haven't hosted any events yet. <Text style={styles.createText} onPress={() => navigation.navigate('CreateEventModal', { screen: 'CreateEventForm' } )}>Create one now!</Text></Text>}
        </View>

        {/* Legal & Support Section */}
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}><Feather name="help-circle" size={22} color={theme.colors.primary} /><Text style={styles.sectionTitle}>Support & Legal</Text></View>
            <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "Community Guidelines coming soon!"})}>
                <View style={styles.settingItemContent}>
                    <Feather name="book-open" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                    <Text style={styles.settingText}>Community Guidelines</Text>
                </View>
                <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "Terms of Use coming soon!"})}>
                <View style={styles.settingItemContent}>
                    <Feather name="file-text" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                    <Text style={styles.settingText}>Terms of Use</Text>
                </View>
                <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
             <TouchableOpacity style={styles.settingItem} onPress={() => showToast({message: "Privacy Policy coming soon!"})}>
                <View style={styles.settingItemContent}>
                    <Feather name="shield" size={18} color={theme.colors.foreground} style={styles.settingIcon} />
                    <Text style={styles.settingText}>Privacy Policy</Text>
                </View>
                <Feather name="chevron-right" size={22} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 16, paddingBottom: 30, paddingTop: 16}}>
          <TouchableOpacity style={styles.actionButton} onPress={() => showToast({message: "Moderation & Safety tools coming soon!"})}>
            <Feather name="shield-alert" size={18} color={theme.colors.foreground} />
            <Text style={styles.actionButtonText}>Safety Center</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={() => showToast({message: "Logging out...", type:"info"})}>
            <Feather name="log-out" size={18} color={theme.colors.destructive} />
            <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.deleteAccountButton]} onPress={handleDeleteAccount}>
            <Feather name="trash-2" size={18} color={theme.colors.destructiveForeground} />
            <Text style={[styles.actionButtonText, styles.deleteAccountButtonText]}>Delete Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
