
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Linking, Platform, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { AppStackParamList } from '../../navigation/MainAppNavigator';
import { dummyEventsData, Event, EventParticipant, EventScheduleItem } from '../../data/events';
import { useToast } from '../../contexts/ToastContext';

type EventDetailScreenRouteProp = RouteProp<AppStackParamList, 'EventDetail'>;
type EventDetailScreenNavigationProp = StackNavigationProp<AppStackParamList, 'EventDetail'>;

interface Props {
  route: EventDetailScreenRouteProp;
  navigation: EventDetailScreenNavigationProp;
}

const screenWidth = Dimensions.get('window').width;

const EventDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { eventId } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const foundEvent = dummyEventsData.find(e => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
      try {
        const dateObj = new Date(foundEvent.date);
        setFormattedDate(format(dateObj, 'EEEE, MMMM d, yyyy'));
        setFormattedTime(format(dateObj, 'p')); // e.g., 8:00 PM
      } catch (error) {
        console.error("Error formatting event date/time:", error);
        setFormattedDate("Invalid date");
        setFormattedTime("Invalid time");
      }
    } else {
      // Handle event not found, maybe navigate back or show error
      showToast({ type: 'error', message: 'Event not found.' });
      navigation.goBack();
    }
  }, [eventId, navigation, showToast]);

  const handleOpenMaps = () => {
    if (event?.location) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = (event.latitude && event.longitude) ? `${event.latitude},${event.longitude}` : null;
      const label = encodeURIComponent(event.location);
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      
      if (url) {
        Linking.openURL(url).catch(err => showToast({ type: 'error', message: 'Could not open maps.' }));
      }
    }
  };

  const renderParticipant = ({ item }: { item: EventParticipant }) => (
    <Image source={{ uri: item.avatarUrl }} style={styles.participantAvatar} data-ai-hint="person avatar" />
  );

  const renderScheduleItem = ({ item }: { item: EventScheduleItem }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.scheduleTime}>{item.time}</Text>
      <View style={styles.scheduleActivityContainer}>
        <Text style={styles.scheduleActivity}>{item.activity}</Text>
        {item.description && <Text style={styles.scheduleActivityDesc}>{item.description}</Text>}
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollViewContent: { paddingBottom: 30 },
    coverImage: { width: '100%', height: screenWidth * 0.6, backgroundColor: theme.colors.muted },
    contentContainer: { padding: 16 },
    title: { fontSize: 28, fontFamily: 'Inter-Bold', color: theme.colors.foreground, marginBottom: 8 },
    dateTimeContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 16 },
    dateTimeItem: { flexDirection: 'row', alignItems: 'center', },
    dateTimeText: { fontSize: 15, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, marginLeft: 6 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontFamily: 'Inter-Bold', color: theme.colors.foreground, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
    sectionTitleText: { marginLeft: 8 },
    descriptionText: { fontSize: 15, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground, lineHeight: 22 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tagBadge: { backgroundColor: theme.colors.accent + '33', paddingHorizontal: 10, paddingVertical: 5, borderRadius: theme.radius / 1.5 },
    tagText: { color: theme.colors.accent, fontFamily: 'Inter-SemiBold', fontSize: 13 },
    hostContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth:1, borderBottomWidth: 1, borderColor: theme.colors.border },
    hostAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    hostName: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: theme.colors.foreground },
    participantsList: { paddingBottom: 10 },
    participantAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 8, borderWidth: 1, borderColor: theme.colors.border },
    noParticipantsText: { fontSize: 14, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground },
    buttonRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
    flexButton: { flex: 1 },
    locationLink: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, backgroundColor: theme.colors.card, borderRadius: theme.radius, paddingHorizontal: 16, borderWidth: 1, borderColor: theme.colors.border },
    locationText: { fontSize: 15, fontFamily: 'Inter-SemiBold', color: theme.colors.primary, marginLeft: 8, flexShrink: 1 },
    scheduleItem: { flexDirection: 'row', marginBottom: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.border+'80' },
    scheduleTime: { fontSize: 15, fontFamily: 'Inter-Bold', color: theme.colors.primary, width: 70 },
    scheduleActivityContainer: {flex:1},
    scheduleActivity: { fontSize: 15, fontFamily: 'Inter-SemiBold', color: theme.colors.foreground, marginBottom: 2 },
    scheduleActivityDesc: { fontSize: 13, fontFamily: 'Inter-Regular', color: theme.colors.mutedForeground },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  });

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <HeaderNative title="Loading..." showBackButton={navigation.canGoBack()} />
        {/* Optionally, add an ActivityIndicator here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderNative title={event.title} showBackButton={navigation.canGoBack()} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: event.imageUrl || `https://picsum.photos/seed/${event.id}/1200/800` }} style={styles.coverImage} data-ai-hint="event cover photo" />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <Feather name="calendar" size={16} color={theme.colors.secondary} />
              <Text style={styles.dateTimeText}>{formattedDate}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <Feather name="clock" size={16} color={theme.colors.secondary} />
              <Text style={styles.dateTimeText}>{formattedTime}</Text>
            </View>
          </View>

          <GradientButtonNative title="RSVP / Join Event" onPress={() => showToast({message: "RSVP'd to " + event.title, type: "success"})} style={{marginBottom: 20}} icon={<Feather name="check-circle" size={18} color={theme.colors.primaryForeground} />} />

          {event.fullDescription && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}><Feather name="file-text" size={18} color={theme.colors.primary} /><Text style={styles.sectionTitleText}>About this Event</Text></View>
              <Text style={styles.descriptionText}>{event.fullDescription}</Text>
            </View>
          )}

          {event.tags && event.tags.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}><Feather name="tag" size={18} color={theme.colors.primary} /><Text style={styles.sectionTitleText}>Tags</Text></View>
              <View style={styles.tagsContainer}>
                {event.tags.map(tag => (
                  <View key={tag} style={styles.tagBadge}><Text style={styles.tagText}>{tag}</Text></View>
                ))}
              </View>
            </View>
          )}

          {event.hostName && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}><Feather name="user" size={18} color={theme.colors.primary} /><Text style={styles.sectionTitleText}>Hosted By</Text></View>
              <View style={styles.hostContainer}>
                {event.hostAvatarUrl && <Image source={{ uri: event.hostAvatarUrl }} style={styles.hostAvatar} data-ai-hint="host avatar"/>}
                <Text style={styles.hostName}>{event.hostName}</Text>
              </View>
            </View>
          )}
          
          <View style={styles.section}>
            <TouchableOpacity onPress={handleOpenMaps} style={styles.locationLink}>
                <Feather name="map-pin" size={20} color={theme.colors.primary} />
                <Text style={styles.locationText} numberOfLines={1}>{event.location}</Text>
            </TouchableOpacity>
          </View>


          {event.participants && event.participants.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}><Feather name="users" size={18} color={theme.colors.primary} /><Text style={styles.sectionTitleText}>Who's Going ({event.participants.length})</Text></View>
              <FlatList
                horizontal
                data={event.participants}
                renderItem={renderParticipant}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.participantsList}
              />
              <GradientButtonNative title="Vibe with People Going" onPress={() => showToast({ message: 'Feature coming soon!', type: 'info'})} style={{marginTop: 8}} icon={<Feather name="heart" size={16} color={theme.colors.primaryForeground}/>} />
            </View>
          )}

          {event.scheduleItems && event.scheduleItems.length > 0 && (
            <View style={styles.section}>
               <View style={styles.sectionTitle}><Feather name="list" size={18} color={theme.colors.primary} /><Text style={styles.sectionTitleText}>Event Schedule</Text></View>
              {event.scheduleItems.map(item => renderScheduleItem({ item }))}
            </View>
          )}
          
          {event.groupChatId && (
             <View style={styles.section}>
                <GradientButtonNative 
                    title="Join Group Chat" 
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Chat' } as any)} // Navigate to chat tab (actual chat joining logic needed)
                    icon={<Feather name="message-square" size={18} color={theme.colors.primaryForeground} />} 
                />
             </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;
