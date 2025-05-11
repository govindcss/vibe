
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, Platform, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { PersonCardNative, Person } from '../../components/people/PersonCardNative';
import { PeopleMapViewNative } from '../../components/people/PeopleMapViewNative';
import { MainTabParamList } from '../../navigation/MainAppNavigator';
import { useToast } from '../../contexts/ToastContext';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';

const dummyPeople: Person[] = [
  { id: 'p1', name: 'Jessie', age: 24, bio: 'Loves hiking, live music, and trying new cafes. Looking for adventure buddies!', interests: ['Music', 'Hiking', 'Coffee', 'Travel'], imageUrl: 'https://picsum.photos/seed/jessie/400/533', distance: '1 mile away', commonEvents: 2, gender: 'Female', location: { latitude: 34.0522, longitude: -118.2437 } },
  { id: 'p2', name: 'Mike', age: 28, bio: 'Tech enthusiast, gamer, and foodie. Always down for a good board game night.', interests: ['Gaming', 'Tech', 'Food', 'Sci-Fi'], imageUrl: 'https://picsum.photos/seed/mike/400/533', distance: '3 miles away', gender: 'Male', location: { latitude: 34.0550, longitude: -118.2500 } },
  { id: 'p3', name: 'Sarah', age: 22, bio: 'Art student, loves painting, photography, and exploring museums.', interests: ['Art', 'Photography', 'Museums', 'Indie Films'], imageUrl: 'https://picsum.photos/seed/sarah/400/533', distance: '0.5 miles away', commonEvents: 1, gender: 'Female', location: { latitude: 34.0500, longitude: -118.2400 } },
  { id: 'p4', name: 'David', age: 30, bio: 'Fitness coach and travel blogger. Exploring new cultures and cuisines.', interests: ['Fitness', 'Travel', 'Food', 'Adventure'], imageUrl: 'https://picsum.photos/seed/david/400/533', distance: '2 miles away', gender: 'Male', location: { latitude: 34.0600, longitude: -118.2600 } },
  { id: 'p5', name: 'Chloe', age: 26, bio: 'Musician and songwriter. Loves cats and vintage clothing.', interests: ['Music', 'Cats', 'Vintage', 'Concerts'], imageUrl: 'https://picsum.photos/seed/chloe/400/533', distance: '5 miles away', commonEvents: 3, gender: 'Female', location: { latitude: 34.0450, longitude: -118.2300 } },
];

type PeopleScreenNavigationProp = StackNavigationProp<MainTabParamList, 'People'>;
type ViewMode = 'swipe' | 'grid' | 'map';

interface Props {
  navigation: PeopleScreenNavigationProp;
}

const PeopleScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  
  const [peopleList, setPeopleList] = useState<Person[]>(dummyPeople);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('swipe');

  // Filters
  const [distanceFilter, setDistanceFilter] = useState(''); // e.g., "5" (miles)
  const [genderFilter, setGenderFilter] = useState(''); // "Male", "Female", ""
  const [interestFilter, setInterestFilter] = useState('');
  const [showUserOnMap, setShowUserOnMap] = useState(true);

  const handleVibe = (id: string) => {
    const person = peopleList.find(p => p.id === id);
    showToast({ title: "Vibed! ✨", message: `You sent a vibe to ${person?.name || 'them'}!`, type: "success" });
    showNextPerson();
  };

  const handleSkip = (id: string) => {
    const person = peopleList.find(p => p.id === id);
    showToast({ title: "Skipped", message: `You skipped ${person?.name || 'them'}.`, type: "info" });
    showNextPerson();
  };

  const showNextPerson = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= filteredPeople.length) {
        showToast({ message: "No more profiles matching filters.", type: "info"});
        return 0; 
      }
      return nextIndex;
    });
  };
  
  const refreshPeople = () => {
    // Simulate fetching new people, apply filters
    setPeopleList([...dummyPeople].sort(() => Math.random() - 0.5)); 
    setCurrentIndex(0);
    showToast({ message: "Profiles refreshed!", type: "info"});
  }

  const filteredPeople = useMemo(() => {
    return peopleList.filter(person => {
      const matchesDistance = distanceFilter ? (parseFloat(person.distance || "999") <= parseFloat(distanceFilter)) : true;
      const matchesGender = genderFilter ? person.gender?.toLowerCase() === genderFilter.toLowerCase() : true;
      const matchesInterest = interestFilter ? person.interests.some(interest => interest.toLowerCase().includes(interestFilter.toLowerCase())) : true;
      // Add attending event filter logic if data supports it
      return matchesDistance && matchesGender && matchesInterest;
    });
  }, [peopleList, distanceFilter, genderFilter, interestFilter]);

  const currentPersonForSwipe = filteredPeople[currentIndex];

  const renderHeaderActions = () => (
    <View style={styles.headerActionsContainer}>
      <TouchableOpacity onPress={() => setViewMode('swipe')} style={styles.headerButton}>
        <Feather name="copy" size={22} color={viewMode === 'swipe' ? theme.colors.primary : theme.colors.mutedForeground} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMode('grid')} style={styles.headerButton}>
        <Feather name="grid" size={22} color={viewMode === 'grid' ? theme.colors.primary : theme.colors.mutedForeground} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMode('map')} style={styles.headerButton}>
        <Feather name="map" size={22} color={viewMode === 'map' ? theme.colors.primary : theme.colors.mutedForeground} />
      </TouchableOpacity>
      <TouchableOpacity onPress={refreshPeople} style={styles.headerButton}>
        <Feather name="refresh-cw" size={22} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    filtersScrollView: { maxHeight: Platform.OS === 'ios' ? 180 : 200 }, // Max height for filter section
    filtersContainer: {
      padding: 12,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    filterRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    filterInput: {
      flex: 1,
      backgroundColor: theme.colors.input,
      borderRadius: theme.radius,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 10 : 8,
      color: theme.colors.foreground,
      fontSize: 14,
      fontFamily: 'Inter-Regular',
    },
    applyButton: { marginTop: 0 },
    contentContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: viewMode === 'grid' ? 8 : 16, },
    swipeCardContainer: { width: '100%', maxWidth: 360, alignItems: 'center' },
    gridContainer: { flex: 1, width: '100%' },
    gridItem: { flex: 1/2, margin: 4, maxWidth: '48%' }, // For 2 columns
    noPeopleContainer: { alignItems: 'center', justifyContent: 'center', padding: 20, flex: 1 },
    noPeopleText: { fontSize: 18, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', marginBottom: 16, textAlign: 'center' },
    swipeHint: { textAlign: 'center', fontSize: 12, color: theme.colors.mutedForeground, marginTop: 16, fontFamily: 'Inter-Regular' },
    statsText: { fontSize: 12, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', marginTop: 8 },
    headerActionsContainer: { flexDirection: 'row', alignItems: 'center' },
    headerButton: { paddingHorizontal: 8 },
    mapViewToggleContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.card + 'E6', // semi-transparent
      padding: 12,
      borderRadius: theme.radius,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    mapViewToggleText: {
      color: theme.colors.foreground,
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <HeaderNative title="Discover People" actions={renderHeaderActions()} />
      
      <ScrollView stickyHeaderIndices={[0]} style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
                <TextInput style={styles.filterInput} placeholder="Max Distance (e.g., 10)" value={distanceFilter} onChangeText={setDistanceFilter} keyboardType="numeric" placeholderTextColor={theme.colors.mutedForeground} />
                <TextInput style={styles.filterInput} placeholder="Gender (Male/Female)" value={genderFilter} onChangeText={setGenderFilter} placeholderTextColor={theme.colors.mutedForeground} />
            </View>
            <View style={styles.filterRow}>
                <TextInput style={styles.filterInput} placeholder="Interest (e.g., Music)" value={interestFilter} onChangeText={setInterestFilter} placeholderTextColor={theme.colors.mutedForeground}/>
                 <GradientButtonNative
                    title="Apply"
                    onPress={() => { /* Filtering is live via useMemo, this button can trigger re-fetch or just confirm */ setCurrentIndex(0); showToast({message: "Filters applied", type: "info"})}}
                    style={styles.applyButton}
                    textStyle={{fontSize: 14}}
                />
            </View>
        </View>
        
        {viewMode === 'swipe' && (
          <View style={styles.contentContainer}>
            {currentPersonForSwipe ? (
              <View style={styles.swipeCardContainer}>
                <PersonCardNative
                  person={currentPersonForSwipe}
                  onVibe={handleVibe}
                  onSkip={handleSkip}
                />
                <Text style={styles.swipeHint}>Interact with the buttons below the card.</Text>
                {filteredPeople.length > 0 && (
                    <Text style={styles.statsText}>
                        Showing profile {currentIndex + 1} of {filteredPeople.length}
                    </Text>
                )}
              </View>
            ) : (
              <View style={styles.noPeopleContainer}>
                <Text style={styles.noPeopleText}>No more people to show with current filters.</Text>
              </View>
            )}
          </View>
        )}

        {viewMode === 'grid' && (
          <View style={styles.contentContainer}>
          {filteredPeople.length > 0 ? (
            <FlatList
              data={filteredPeople}
              renderItem={({ item }) => (
                <View style={styles.gridItem}>
                  <PersonCardNative person={item} containerStyle={{marginBottom: 8}} />
                </View>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
              style={styles.gridContainer}
              contentContainerStyle={{paddingBottom: 8}}
            />
          ) : (
            <View style={styles.noPeopleContainer}>
              <Text style={styles.noPeopleText}>No people found matching your criteria.</Text>
            </View>
          )}
          </View>
        )}

        {viewMode === 'map' && (
          <View style={{flex: 1}}>
            <PeopleMapViewNative 
                people={filteredPeople.filter(p => p.location)} // Only pass people with location
                showUserLocation={showUserOnMap} 
            />
            <View style={styles.mapViewToggleContainer}>
                <Text style={styles.mapViewToggleText}>Share My Location on Map</Text>
                <Switch
                    trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                    thumbColor={showUserOnMap ? theme.colors.primaryForeground : theme.colors.mutedForeground}
                    ios_backgroundColor={theme.colors.muted}
                    onValueChange={setShowUserOnMap}
                    value={showUserOnMap}
                />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PeopleScreen;
