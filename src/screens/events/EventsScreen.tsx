
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import { EventCardNative, Event } from '../../components/events/EventCardNative';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { MainTabParamList } from '../../navigation/MainAppNavigator'; // Adjust if needed

// Dummy data for events
const dummyEvents: Event[] = [
  { id: '1', title: 'Summer Music Fest', date: '2024-07-20', location: 'Central Park', category: 'Music', imageUrl: 'https://picsum.photos/seed/summerfest/600/338' },
  { id: '2', title: 'Tech Innovators Summit', date: '2024-08-05', location: 'Convention Center', category: 'Tech', imageUrl: 'https://picsum.photos/seed/techsummit/600/338' },
  { id: '3', title: 'Art & Design Expo', date: '2024-08-15', location: 'City Art Gallery', category: 'Art', imageUrl: 'https://picsum.photos/seed/artexpo/600/338' },
  // Add more as needed
];

// For Picker/Select, you'd use a library like @react-native-picker/picker or a custom modal
// For simplicity, this will be a basic text input for category for now.

type EventsScreenNavigationProp = StackNavigationProp<MainTabParamList, 'Events'>;

interface Props {
  navigation: EventsScreenNavigationProp;
}

const EventsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  // Date picker would use @react-native-community/datetimepicker

  const filteredEvents = dummyEvents.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? event.category.toLowerCase() === categoryFilter.toLowerCase() : true;
    return matchesQuery && matchesCategory;
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    filtersContainer: {
      padding: 16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.input,
      borderRadius: theme.radius,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    searchInput: {
      flex: 1,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      color: theme.colors.foreground,
      fontSize: 16,
      marginLeft: 8,
      fontFamily: 'Inter-Regular',
    },
    filterRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    filterInput: { // For category and date (simplified)
      flex: 1,
      backgroundColor: theme.colors.input,
      borderRadius: theme.radius,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      color: theme.colors.foreground,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: theme.radius,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    applyButtonText: {
      color: theme.colors.primaryForeground,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    listContentContainer: {
      padding: 16,
    },
    noEventsText: {
      textAlign: 'center',
      fontSize: 18,
      color: theme.colors.mutedForeground,
      marginTop: 40,
      fontFamily: 'Inter-Regular',
    },
  });


  return (
    <View style={styles.container}>
      <HeaderNative
        title="Discover Events"
        actions={
          <GradientButtonNative
            onPress={() => navigation.navigate('CreateEventModal' as any)}
            icon={<Feather name="plus-circle" size={18} color={theme.colors.primaryForeground} />}
            title="Create"
            style={{paddingHorizontal: 12, paddingVertical: 8}}
            textStyle={{fontSize: 14}}
          />
        }
      />
      <View style={styles.filtersContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color={theme.colors.mutedForeground} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor={theme.colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.filterRow}>
            <TextInput // Simplified category filter
                style={styles.filterInput}
                placeholder="Category (e.g., Music)"
                placeholderTextColor={theme.colors.mutedForeground}
                value={categoryFilter}
                onChangeText={setCategoryFilter}
            />
            {/* Date input would require a date picker component */}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={() => console.log("Apply filters")}>
            <Feather name="filter" size={18} color={theme.colors.primaryForeground} />
            <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => <EventCardNative event={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <Text style={styles.noEventsText}>No events found. Try adjusting your filters!</Text>
      )}
    </View>
  );
};

export default EventsScreen;
