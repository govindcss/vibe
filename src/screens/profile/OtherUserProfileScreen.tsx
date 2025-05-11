
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { AppStackParamList } from '../../navigation/MainAppNavigator';
import type { Person } from '../../components/people/PersonCardNative';
import { dummyPeople } from '../people/PeopleScreen'; // Import dummyPeople
import { useToast } from '../../contexts/ToastContext';

type OtherUserProfileScreenRouteProp = RouteProp<AppStackParamList, 'OtherUserProfile'>;
type OtherUserProfileScreenNavigationProp = StackNavigationProp<AppStackParamList, 'OtherUserProfile'>;

interface Props {
  route: OtherUserProfileScreenRouteProp;
  navigation: OtherUserProfileScreenNavigationProp;
}

const OtherUserProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { personId } = route.params;
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const foundPerson = dummyPeople.find(p => p.id === personId);
    if (foundPerson) {
      setPerson(foundPerson);
    } else {
      showToast({ type: 'error', message: 'User profile not found.' });
      navigation.goBack();
    }
  }, [personId, navigation, showToast]);

  const handleVibe = () => {
    if (!person) return;
    showToast({ title: "Vibe Sent!", message: `You sent a vibe to ${person.name}.`, type: "success" });
    // Add logic for tracking vibes if needed
  };

  const handleMessage = () => {
    if (!person) return;
    showToast({ title: "Message (Coming Soon!)", message: `You will soon be able to message ${person.name}.`, type: "info" });
    // navigation.navigate('MainTabs', { screen: 'Chat', params: { userId: person.id } }); // Future: navigate to chat
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    bannerContainer: { height: Platform.OS === 'ios' ? 200 : 180, width: '100%', position: 'relative' },
    bannerImage: { width: '100%', height: '100%' },
    bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
    avatarContainer: {
      position: 'absolute',
      bottom: -40,
      left: 16,
      borderWidth: 4,
      borderColor: theme.colors.background,
      borderRadius: 54,
      backgroundColor: theme.colors.background,
    },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    userInfoContainer: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 24 },
    name: { fontSize: 26, fontFamily: 'Inter-Bold', color: theme.colors.foreground },
    agePronouns: { fontSize: 16, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginBottom: 2 },
    locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    locationText: { fontSize: 14, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginLeft: 4 },
    bio: { fontSize: 15, fontFamily: 'Inter-Regular', color: theme.colors.foreground, lineHeight: 22, marginBottom: 16 },
    interestsLabel: { fontSize: 14, fontFamily: 'Inter-SemiBold', color: theme.colors.mutedForeground, textTransform: 'uppercase', marginBottom: 8 },
    interestsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    interestBadge: { backgroundColor: theme.colors.accent + '33', paddingHorizontal: 12, paddingVertical: 6, borderRadius: theme.radius / 1.5 },
    interestBadgeText: { color: theme.colors.accent, fontFamily: 'Inter-SemiBold', fontSize: 13 },
    
    connectionsSection: { marginBottom: 24, borderTopWidth:1, borderBottomWidth:1, borderColor: theme.colors.border, paddingVertical: 16 },
    connectionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    connectionText: { fontSize: 15, fontFamily: 'Inter-Regular', color: theme.colors.foreground, marginLeft: 10 },
    
    actionsContainer: { paddingHorizontal: 16, paddingVertical: 20, flexDirection: 'row', gap: 12 },
    actionButton: { flex: 1 },

    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  });

  if (!person) {
    return (
      <View style={styles.loadingContainer}>
        <HeaderNative title="Loading Profile..." showBackButton={navigation.canGoBack()} />
        {/* Optionally, add an ActivityIndicator here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderNative title={person.name} showBackButton={navigation.canGoBack()} />
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: person.bannerUrl || `https://picsum.photos/seed/${person.id}_banner/1200/400` }} 
            style={styles.bannerImage} 
            resizeMode="cover" 
            data-ai-hint="abstract landscape"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.avatarContainer}>
            <Image source={{ uri: person.imageUrl }} style={styles.avatar} data-ai-hint="person portrait"/>
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.agePronouns}>
            {person.age} {person.pronouns && `· ${person.pronouns}`}
          </Text>
          {person.distance && (
            <View style={styles.locationContainer}>
                <Feather name="map-pin" size={14} color={theme.colors.secondary} />
                <Text style={styles.locationText}>{person.distance} away</Text>
            </View>
          )}
          <Text style={styles.bio}>{person.bio}</Text>

          <Text style={styles.interestsLabel}>Interests</Text>
          <View style={styles.interestsContainer}>
            {person.interests.map(interest => (
              <View key={interest} style={styles.interestBadge}>
                <Text style={styles.interestBadgeText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.connectionsSection}>
            <View style={{paddingHorizontal: 16}}>
                {(person.commonEvents ?? 0) > 0 && (
                <View style={styles.connectionItem}>
                    <Feather name="calendar" size={18} color={theme.colors.primary} />
                    <Text style={styles.connectionText}>{person.commonEvents} event{person.commonEvents === 1 ? '' : 's'} in common</Text>
                </View>
                )}
                {(person.mutualFriendsCount ?? 0) > 0 && (
                <View style={styles.connectionItem}>
                    <Feather name="users" size={18} color={theme.colors.secondary} />
                    <Text style={styles.connectionText}>{person.mutualFriendsCount} mutual friend{person.mutualFriendsCount === 1 ? '' : 's'}</Text>
                </View>
                )}
                {(person.sharedGroupChatsCount ?? 0) > 0 && (
                <View style={styles.connectionItem}>
                    <Feather name="message-square" size={18} color={theme.colors.accent} />
                    <Text style={styles.connectionText}>{person.sharedGroupChatsCount} shared group chat{person.sharedGroupChatsCount === 1 ? '' : 's'}</Text>
                </View>
                )}
                {!(person.commonEvents || person.mutualFriendsCount || person.sharedGroupChatsCount) && (
                     <Text style={[styles.connectionText, {textAlign:'center', color: theme.colors.mutedForeground}]}>No mutual connections yet.</Text>
                )}
            </View>
        </View>

        <View style={styles.actionsContainer}>
          <GradientButtonNative
            title="Send Vibe"
            onPress={handleVibe}
            icon={<Feather name="heart" size={18} color={theme.colors.primaryForeground} />}
            style={styles.actionButton}
          />
          <GradientButtonNative
            title="Message"
            onPress={handleMessage}
            icon={<Feather name="send" size={18} color={theme.colors.primaryForeground} />}
            style={[styles.actionButton, {backgroundColor: theme.colors.secondary}]} // Example of different color
            colors={[theme.colors.secondary, theme.colors.accent]} // Custom gradient for message button
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OtherUserProfileScreen;
