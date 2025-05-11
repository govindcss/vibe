
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
// import DateTimePickerModal from "react-native-modal-datetime-picker"; // For a better date picker experience

import { useTheme } from '../../contexts/ThemeContext';
import { EventCardNative, Event } from '../../components/events/EventCardNative';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { MainTabParamList } from '../../navigation/MainAppNavigator'; // Adjust if needed
import { format } from 'date-fns';

// Dummy data for events
const dummyEvents: Event[] = [
  { id: '1', title: 'Summer Music Fest', date: '2024-07-20T19:00:00Z', location: 'Central Park, New York', category: 'Music', imageUrl: 'https://picsum.photos/seed/summerfest/600/338', description: "Headline acts and upcoming bands." },
  { id: '2', title: 'Tech Innovators Summit', date: '2024-08-05T09:00:00Z', location: 'Convention Center, San Francisco', category: 'Tech', imageUrl: 'https://picsum.photos/seed/techsummit/600/338', description: "Talks on AI, Blockchain, and more." },
  { id: '3', title: 'Art & Design Expo', date: '2024-08-15T11:00:00Z', location: 'City Art Gallery, London', category: 'Art', imageUrl: 'https://picsum.photos/seed/artexpo/600/338', description: "Modern art and interactive installations." },
  { id: '4', title: 'Local Food Fair', date: '2024-07-22T12:00:00Z', location: 'Town Square, Austin', category: 'Food', imageUrl: 'https://picsum.photos/seed/foodfair/600/338', description: "Taste the best local cuisines." },
  { id: '5', title: 'Indie Film Night', date: '2024-09-01T20:00:00Z', location: 'Cinema Paradiso, Chicago', category: 'Film', imageUrl: 'https://picsum.photos/seed/filmnight/600/338', description: "Showcasing independent filmmakers." },
];

type EventsScreenNavigationProp = StackNavigationProp<MainTabParamList, 'Events'>;

interface Props {
  navigation: EventsScreenNavigationProp;
}

const EventsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentSort, setCurrentSort] = useState<'relevance' | 'date' | 'popularity'>('relevance');

  const handleApplyFilters = () => {
    // The filtering logic is now in useMemo, so this function could trigger a re-fetch in a real app
    // For dummy data, list updates automatically.
    console.log("Filters applied (or would be re-fetched):", { searchQuery, categoryFilter, cityFilter, selectedDate, currentSort });
  };

  const filteredAndSortedEvents = useMemo(() => {
    let events = dummyEvents.filter(event => {
      const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter ? event.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
      const matchesCity = cityFilter ? event.location.toLowerCase().includes(cityFilter.toLowerCase()) : true;
      const matchesDate = selectedDate ? format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') : true;
      return matchesQuery && matchesCategory && matchesCity && matchesDate;
    });

    if (currentSort === 'date') {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (currentSort === 'popularity') {
      // Simulate popularity sort by shuffling for demo, or use a hidden popularity score if available
      events.sort(() => Math.random() - 0.5);
    }
    // 'relevance' sort would typically be handled by a backend search algorithm; here, it's the default order after filtering.

    return events;
  }, [searchQuery, categoryFilter, cityFilter, selectedDate, currentSort]);

  // const showDatePicker = () => setDatePickerVisibility(true);
  // const hideDatePicker = () => setDatePickerVisibility(false);
  // const handleConfirmDate = (date: Date) => {
  //   setSelectedDate(date);
  //   hideDatePicker();
  // };

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
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
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
    filterInput: {
      flex: 1,
      backgroundColor: theme.colors.input,
      borderRadius: theme.radius,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
      color: theme.colors.foreground,
      fontSize: 15,
      fontFamily: 'Inter-Regular',
      justifyContent: 'center', // For TouchableOpacity style consistency
    },
    filterInputTextPlaceholder: {
      color: theme.colors.mutedForeground,
      fontSize: 15,
      fontFamily: 'Inter-Regular',
    },
    disabledInput: {
      backgroundColor: theme.colors.muted,
      justifyContent: 'center',
    },
    disabledInputText: {
        color: theme.colors.mutedForeground + '99', // More muted
        fontSize: 15,
        fontFamily: 'Inter-Regular',
    },
    sortSection: {
      marginBottom: 12,
    },
    sortLabel: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.mutedForeground,
      marginBottom: 8,
    },
    sortButtonsContainer: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    sortButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.input,
      borderRadius: theme.radius / 1.5,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    activeSortButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    sortButtonText: {
      color: theme.colors.foreground,
      fontFamily: 'Inter-Medium',
      fontSize: 13,
    },
    activeSortButtonText: {
      color: theme.colors.primaryForeground,
    },
    applyButton: { // Now GradientButtonNative
      marginTop: 8,
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
      paddingHorizontal: 20,
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
            placeholder="Search events, keywords..."
            placeholderTextColor={theme.colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.filterRow}>
            <TextInput
                style={styles.filterInput}
                placeholder="Category (e.g., Music)"
                placeholderTextColor={theme.colors.mutedForeground}
                value={categoryFilter}
                onChangeText={setCategoryFilter}
            />
            <TextInput
                style={styles.filterInput}
                placeholder="City (e.g., New York)"
                placeholderTextColor={theme.colors.mutedForeground}
                value={cityFilter}
                onChangeText={setCityFilter}
            />
        </View>
         <View style={styles.filterRow}>
            <View style={[styles.filterInput, styles.disabledInput]}>
                <Text style={styles.disabledInputText}>Distance (soon)</Text>
            </View>
            <TouchableOpacity style={styles.filterInput} onPress={() => {/* showDatePicker() */ }}>
                <Text style={selectedDate ? {color: theme.colors.foreground, fontSize:15} : styles.filterInputTextPlaceholder}>
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : "Select Date"}
                </Text>
            </TouchableOpacity>
        </View>

        {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            date={selectedDate || new Date()}
        /> */}

        <View style={styles.sortSection}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <View style={styles.sortButtonsContainer}>
            {['relevance', 'date', 'popularity'].map((sortType) => (
                <TouchableOpacity
                    key={sortType}
                    style={[styles.sortButton, currentSort === sortType && styles.activeSortButton]}
                    onPress={() => setCurrentSort(sortType as any)}
                >
                    <Text style={[styles.sortButtonText, currentSort === sortType && styles.activeSortButtonText]}>
                        {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
        
        <GradientButtonNative
            title="Find Events"
            onPress={handleApplyFilters}
            style={styles.applyButton}
            icon={<Feather name="search" size={18} color={theme.colors.primaryForeground} />}
        />
      </View>

      {filteredAndSortedEvents.length > 0 ? (
        <FlatList
          data={filteredAndSortedEvents}
          renderItem={({ item }) => <EventCardNative event={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.noEventsText}>No events found. Try adjusting your search or filters!</Text>
        </View>
      )}
    </View>
  );
};

export default EventsScreen;
