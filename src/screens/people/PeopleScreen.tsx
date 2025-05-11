
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, Platform, Switch, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { PersonCardNative, Person } from '../../components/people/PersonCardNative';
import { PeopleMapViewNative } from '../../components/people/PeopleMapViewNative';
import { AppStackParamList } from '../../navigation/MainAppNavigator';
import { useToast } from '../../contexts/ToastContext';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';

// Extended dummyPeople data with new fields
const dummyPeople: Person[] = [
  { id: 'p1', name: 'Jessie', age: 24, bio: 'Loves hiking, live music, and trying new cafes. Looking for adventure buddies!', interests: ['Music', 'Hiking', 'Coffee', 'Travel'], imageUrl: 'https://picsum.photos/seed/jessie_swipe/400/533', bannerUrl: 'https://picsum.photos/seed/jessie_banner/1200/400', distance: '1 mile away', commonEvents: 2, gender: 'Female', pronouns: 'she/her', location: { latitude: 34.0522, longitude: -118.2437 }, mutualFriendsCount: 5, sharedGroupChatsCount: 1, sharedUpcomingEventIds: ['1', '4'], vibeTags: ['🎵 Live Music Fan', '🏞️ Adventurer'], isVerified: true, secondaryImageUrls: ['https://picsum.photos/seed/jessie_alt1/400/533', 'https://picsum.photos/seed/jessie_alt2/400/533'] },
  { id: 'p2', name: 'Mike', age: 28, bio: 'Tech enthusiast, gamer, and foodie. Always down for a good board game night.', interests: ['Gaming', 'Tech', 'Food', 'Sci-Fi'], imageUrl: 'https://picsum.photos/seed/mike_swipe/400/533', bannerUrl: 'https://picsum.photos/seed/mike_banner/1200/400', distance: '3 miles away', gender: 'Male', pronouns: 'he/him', location: { latitude: 34.0550, longitude: -118.2500 }, mutualFriendsCount: 2, sharedGroupChatsCount: 0, commonEvents: 0, sharedUpcomingEventIds: ['2'], vibeTags: ['🎮 Gamer', '💻 Tech Head'], isVerified: false },
  { id: 'p3', name: 'Sarah', age: 22, bio: 'Art student, loves painting, photography, and exploring museums.', interests: ['Art', 'Photography', 'Museums', 'Indie Films'], imageUrl: 'https://picsum.photos/seed/sarah_swipe/400/533', bannerUrl: 'https://picsum.photos/seed/sarah_banner/1200/400', distance: '0.5 miles away', commonEvents: 1, gender: 'Female', pronouns: 'she/they', location: { latitude: 34.0500, longitude: -118.2400 }, mutualFriendsCount: 8, sharedGroupChatsCount: 2, sharedUpcomingEventIds: ['5'], vibeTags: ['🎨 Artist', '🏳️‍🌈 LGBTQ+ Friendly'], isVerified: true },
  { id: 'p4', name: 'David', age: 30, bio: 'Fitness coach and travel blogger. Exploring new cultures and cuisines.', interests: ['Fitness', 'Travel', 'Food', 'Adventure'], imageUrl: 'https://picsum.photos/seed/david_swipe/400/533', bannerUrl: 'https://picsum.photos/seed/david_banner/1200/400', distance: '2 miles away', gender: 'Male', pronouns: 'he/him', location: { latitude: 34.0600, longitude: -118.2600 }, mutualFriendsCount: 3, sharedGroupChatsCount: 1, commonEvents: 1, vibeTags: ['💪 Fitness Pro', '✈️ Globetrotter'], isVerified: false },
  { id: 'p5', name: 'Chloe', age: 26, bio: 'Musician and songwriter. Loves cats and vintage clothing.', interests: ['Music', 'Cats', 'Vintage', 'Concerts'], imageUrl: 'https://picsum.photos/seed/chloe_swipe/400/533', bannerUrl: 'https://picsum.photos/seed/chloe_banner/1200/400', distance: '5 miles away', commonEvents: 3, gender: 'Female', pronouns: 'any/all', location: { latitude: 34.0450, longitude: -118.2300 }, mutualFriendsCount: 12, sharedGroupChatsCount: 3, sharedUpcomingEventIds: ['1', '3'], vibeTags: ['🎤 Singer', '✨ Dreamer'], isVerified: true },
];
export { dummyPeople };

type PeopleScreenNavigationProp = StackNavigationProp<AppStackParamList, 'MainTabs'>;
type ViewMode = 'swipe' | 'grid' | 'map';

interface Props {
  navigation: PeopleScreenNavigationProp;
}

const PeopleScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  
  const [allPeople, setAllPeople] = useState<Person[]>(dummyPeople); // Master list
  const [swipedUserIds, setSwipedUserIds] = useState<Set<string>>(new Set()); // Track swiped users to prevent duplicates in current session
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('swipe');
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [distanceFilter, setDistanceFilter] = useState('20'); // Default distance
  const [genderFilter, setGenderFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');
  const [ageRangeFilter, setAgeRangeFilter] = useState({ min: '18', max: '99' });
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showUserOnMap, setShowUserOnMap] = useState(true);
  const [isMyProfileHidden, setIsMyProfileHidden] = useState(false);

  const lastSwipedId = React.useRef<string | null>(null);

  const filteredPeople = useMemo(() => {
    return allPeople.filter(person => {
      if (swipedUserIds.has(person.id) && viewMode === 'swipe') return false; // Hide already swiped in swipe mode

      const matchesDistance = distanceFilter ? (parseFloat(person.distance || "999") <= parseFloat(distanceFilter)) : true;
      const matchesGender = genderFilter ? person.gender?.toLowerCase() === genderFilter.toLowerCase() : true;
      const matchesInterest = interestFilter ? person.interests.some(interest => interest.toLowerCase().includes(interestFilter.toLowerCase())) : true;
      const matchesAge = person.age >= parseInt(ageRangeFilter.min) && person.age <= parseInt(ageRangeFilter.max);
      const matchesVerified = showVerifiedOnly ? person.isVerified === true : true;
      return matchesDistance && matchesGender && matchesInterest && matchesAge && matchesVerified;
    });
  }, [allPeople, distanceFilter, genderFilter, interestFilter, ageRangeFilter, showVerifiedOnly, swipedUserIds, viewMode]);


  const showNextPerson = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // Find next available index in filteredPeople
      let nextPersonIndex = -1;
      for (let i = 0; i < filteredPeople.length; i++) {
          if (i > prevIndex && !swipedUserIds.has(filteredPeople[i].id)) {
              nextPersonIndex = i;
              break;
          }
      }
      // If no one found after current, try from beginning (excluding already swiped)
      if (nextPersonIndex === -1) {
          for (let i = 0; i < prevIndex; i++) {
              if (!swipedUserIds.has(filteredPeople[i].id)) {
                  nextPersonIndex = i;
                  break;
              }
          }
      }
      
      if (nextPersonIndex !== -1) return nextPersonIndex;

      // If truly no one left after considering swiped IDs
      const remainingUnswiped = filteredPeople.filter(p => !swipedUserIds.has(p.id));
      if (remainingUnswiped.length === 0) {
        showToast({ message: "No new people nearby matching your filters.", type: "info"});
        return 0; // Or handle "out of profiles" state
      }
      // Default to the first unswiped person if logic above fails to find one
      const firstUnswipedIndex = filteredPeople.findIndex(p => !swipedUserIds.has(p.id));
      return firstUnswipedIndex !== -1 ? firstUnswipedIndex : 0;
    });
  }, [filteredPeople, swipedUserIds, showToast]);


  const handleSwipeAction = (id: string, action: 'vibe' | 'skip' | 'save') => {
    const person = filteredPeople.find(p => p.id === id);
    if (!person) return;

    lastSwipedId.current = id; // For rewind
    setSwipedUserIds(prev => new Set(prev).add(id));

    if (action === 'vibe') {
      showToast({ title: "Vibed! ✨", message: `You sent a vibe to ${person.name}!`, type: "success" });
      // Simulate a match half the time for demo
      if (Math.random() > 0.5) {
        setTimeout(() => {
            showToast({ title: "IT'S A VIBE! 💖", message: `You and ${person.name} have matched! Start chatting?`, type: "success", duration: 5000 });
            // Here you could open a chat modal or navigate
        }, 1000);
      }
    } else if (action === 'skip') {
      showToast({ title: "Skipped", message: `You skipped ${person.name}.`, type: "info" });
    } else if (action === 'save') {
      showToast({ title: "Saved!", message: `${person.name}'s profile saved for later.`, type: "success" });
    }
    
    // Ensure currentIndex is updated properly for the *next* person in the filtered list
    // The current person for swipe view logic will handle displaying the correct next card.
    // We just need to trigger a re-evaluation.
    setCurrentIndex(currentIndex); // This will re-trigger currentPersonForSwipe memo
    // A more robust way might be to find the index of the *next unswiped* person
    // This is handled by currentPersonForSwipe logic below
  };
  
  const currentPersonForSwipe = useMemo(() => {
    const unswipedPeople = filteredPeople.filter(p => !swipedUserIds.has(p.id));
    if (unswipedPeople.length === 0) return null;
    // Ensure currentIndex is valid for unswipedPeople array
    const CIdx = Math.min(currentIndex, unswipedPeople.length - 1);
    return unswipedPeople[CIdx >= 0 ? CIdx : 0];
  }, [filteredPeople, currentIndex, swipedUserIds]);


  const refreshPeople = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setAllPeople([...dummyPeople].sort(() => Math.random() - 0.5)); 
    setSwipedUserIds(new Set()); // Reset swiped users on refresh
    setCurrentIndex(0);
    setIsLoading(false);
    showToast({ message: "Profiles refreshed!", type: "info"});
  };

  const handleRewind = () => {
    if (lastSwipedId.current) {
        const personToRewind = allPeople.find(p => p.id === lastSwipedId.current);
        showToast({ message: `Rewound last swipe. Viewing ${personToRewind?.name || 'profile'} again. (Premium Feature Demo)`, type: "info" });
        setSwipedUserIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(lastSwipedId.current!);
            return newSet;
        });
        // Try to set currentIndex to the rewound profile if it's in filteredPeople
        const indexInFiltered = filteredPeople.findIndex(p => p.id === lastSwipedId.current);
        if (indexInFiltered !== -1) {
            setCurrentIndex(indexInFiltered);
        }
        lastSwipedId.current = null; // Allow only one rewind
    } else {
        showToast({ message: "No swipe to rewind.", type: "warning"});
    }
  };

  const handleBoost = () => {
    showToast({ message: "Profile boosted for 30 mins! (Premium Feature Demo)", type: "success" });
  };

  const navigateToUserProfile = (personId: string) => {
    navigation.navigate('OtherUserProfile', { personId });
  };

  const applyFilters = () => {
    setCurrentIndex(0); // Reset index when filters change
    setSwipedUserIds(new Set()); // Optionally reset swipes or keep them based on desired UX
    showToast({message: "Filters applied", type: "info"})
  };

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
      <TouchableOpacity onPress={refreshPeople} style={styles.headerButton} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color={theme.colors.primary} /> : <Feather name="refresh-cw" size={22} color={theme.colors.primary} />}
      </TouchableOpacity>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    filtersScrollView: { maxHeight: Platform.OS === 'ios' ? 280 : 300 }, // Increased height
    filtersContainer: {
      paddingVertical: 12, paddingHorizontal:16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    filterRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    filterInput: {
      flex: 1, backgroundColor: theme.colors.input, borderRadius: theme.radius,
      paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 10 : 8,
      color: theme.colors.foreground, fontSize: 14, fontFamily: 'Inter-Regular',
    },
    filterLabel: { fontSize: 13, fontFamily: 'Inter-Medium', color: theme.colors.mutedForeground, marginBottom: 4, marginLeft: 2 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
    switchLabel: { fontSize: 14, fontFamily: 'Inter-Regular', color: theme.colors.foreground },
    applyButton: { marginTop: 4 },
    contentContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: viewMode === 'grid' ? 8 : (viewMode === 'swipe' ? 8 : 0) },
    swipeCardOuterContainer: { flex:1, justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 10 },
    swipeCardWrapper: { width: '100%', maxWidth: 380, flexShrink:1, marginBottom: 10}, // For PersonCardNative
    swipeActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        maxWidth: 400,
    },
    smallActionButton: { // For Rewind, Boost
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        width: 48, height: 48, borderRadius: 24,
        justifyContent: 'center', alignItems: 'center',
        elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width:0, height:1}, shadowRadius:2,
    },
    gridContainer: { flex: 1, width: '100%' },
    gridItem: { flex: 1/2, margin: 4, maxWidth: '48%' }, 
    noPeopleContainer: { alignItems: 'center', justifyContent: 'center', padding: 20, flex: 1 },
    noPeopleText: { fontSize: 18, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', marginBottom: 16, textAlign: 'center' },
    noPeopleSubText: { fontSize: 14, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', textAlign: 'center', marginBottom: 20 },
    headerActionsContainer: { flexDirection: 'row', alignItems: 'center' },
    headerButton: { paddingHorizontal: 8 },
    mapViewContainer: { flex: 1, overflow: 'hidden' }, // Ensure map view takes full flex space
    mapViewToggleContainer: {
      position: 'absolute', bottom: 20, left: 20, right: 20,
      backgroundColor: theme.colors.card + 'E6', padding: 12, borderRadius: theme.radius,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderWidth: 1, borderColor: theme.colors.border,
    },
    mapViewToggleText: { color: theme.colors.foreground, fontFamily: 'Inter-SemiBold', fontSize: 14 },
  });

  return (
    <View style={styles.container}>
      <HeaderNative title="Discover People" actions={renderHeaderActions()} />
      
      <ScrollView 
        stickyHeaderIndices={viewMode !== 'map' ? [0] : undefined} // Sticky filters only if not map
        style={{flex:1}} 
        contentContainerStyle={{flexGrow:1}}
        nestedScrollEnabled={true} // Important for ScrollView inside ScrollView (if any)
      >
        {viewMode !== 'map' && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
                <View style={{flex:1}}>
                    <Text style={styles.filterLabel}>Distance (km)</Text>
                    <TextInput style={styles.filterInput} placeholder="e.g., 10" value={distanceFilter} onChangeText={setDistanceFilter} keyboardType="numeric" placeholderTextColor={theme.colors.mutedForeground} />
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.filterLabel}>Gender</Text>
                    <TextInput style={styles.filterInput} placeholder="e.g., Female" value={genderFilter} onChangeText={setGenderFilter} placeholderTextColor={theme.colors.mutedForeground} />
                </View>
            </View>
            <View style={styles.filterRow}>
                <View style={{flex:1}}>
                    <Text style={styles.filterLabel}>Min Age</Text>
                    <TextInput style={styles.filterInput} placeholder="e.g., 18" value={ageRangeFilter.min} onChangeText={text => setAgeRangeFilter(f => ({...f, min: text}))} keyboardType="numeric" placeholderTextColor={theme.colors.mutedForeground} />
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.filterLabel}>Max Age</Text>
                    <TextInput style={styles.filterInput} placeholder="e.g., 35" value={ageRangeFilter.max} onChangeText={text => setAgeRangeFilter(f => ({...f, max: text}))} keyboardType="numeric" placeholderTextColor={theme.colors.mutedForeground} />
                </View>
            </View>
             <View style={{marginBottom: 10}}>
                <Text style={styles.filterLabel}>Interest</Text>
                <TextInput style={styles.filterInput} placeholder="e.g., Music, Hiking" value={interestFilter} onChangeText={setInterestFilter} placeholderTextColor={theme.colors.mutedForeground}/>
            </View>
            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Show Verified Users Only</Text>
                <Switch trackColor={{ false: theme.colors.muted, true: theme.colors.primary }} thumbColor={theme.colors.primaryForeground} onValueChange={setShowVerifiedOnly} value={showVerifiedOnly} />
            </View>
             <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Hide My Profile from Discovery</Text>
                <Switch trackColor={{ false: theme.colors.muted, true: theme.colors.primary }} thumbColor={theme.colors.primaryForeground} onValueChange={setIsMyProfileHidden} value={isMyProfileHidden} />
            </View>
            <GradientButtonNative title="Apply Filters" onPress={applyFilters} style={styles.applyButton} icon={<Feather name="filter" size={16} color={theme.colors.primaryForeground} />} />
          </View>
        )}
        
        {viewMode === 'swipe' && (
          <View style={styles.contentContainer}>
            {isLoading && <ActivityIndicator size="large" color={theme.colors.primary} />}
            {!isLoading && currentPersonForSwipe ? (
              <View style={styles.swipeCardOuterContainer}>
                <View style={styles.swipeCardWrapper}>
                    <PersonCardNative
                    person={currentPersonForSwipe}
                    onVibe={(id) => handleSwipeAction(id, 'vibe')}
                    onSkip={(id) => handleSwipeAction(id, 'skip')}
                    onSaveForLater={(id) => handleSwipeAction(id, 'save')}
                    onPress={navigateToUserProfile}
                    />
                </View>
                <View style={styles.swipeActionsContainer}>
                    <TouchableOpacity style={styles.smallActionButton} onPress={handleRewind}>
                        <Feather name="rotate-ccw" size={22} color={theme.colors.chart4} />
                    </TouchableOpacity>
                    {/* Main skip/vibe/save buttons are now inside PersonCardNative footer for swipe view */}
                     <TouchableOpacity style={styles.smallActionButton} onPress={handleBoost}>
                        <Feather name="zap" size={22} color={theme.colors.accent} />
                    </TouchableOpacity>
                </View>
              </View>
            ) : (
              !isLoading && <View style={styles.noPeopleContainer}>
                <Feather name="users" size={48} color={theme.colors.mutedForeground} />
                <Text style={styles.noPeopleText}>No new people found.</Text>
                <Text style={styles.noPeopleSubText}>Try adjusting your filters or check back later!</Text>
                <GradientButtonNative title="Refresh Profiles" onPress={refreshPeople} icon={<Feather name="refresh-cw" size={16} color={theme.colors.primaryForeground}/>} />
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
                  <PersonCardNative person={item} containerStyle={{marginBottom: 8}} onPress={navigateToUserProfile} />
                </View>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
              style={styles.gridContainer}
              contentContainerStyle={{paddingBottom: 8}}
            />
          ) : (
            <View style={styles.noPeopleContainer}>
              <Feather name="grid" size={48} color={theme.colors.mutedForeground} />
              <Text style={styles.noPeopleText}>No people found.</Text>
              <Text style={styles.noPeopleSubText}>Adjust filters or try a different view.</Text>
            </View>
          )}
          </View>
        )}

        {viewMode === 'map' && (
          // Map view needs a fixed height or to be the only flex child to render correctly
          <View style={styles.mapViewContainer}> 
            <PeopleMapViewNative 
                people={filteredPeople.filter(p => p.location)} 
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

// Note: Full tinder-like card swipe animations (physics-based dragging, rotation, etc.)
// would typically be implemented using a library like 'react-native-deck-swiper'
// or with advanced 'react-native-gesture-handler' and 'react-native-reanimated' usage.
// The current implementation focuses on the UI structure and button-based interactions.

// Backend logic for matching, recommendations, and preventing duplicate profiles in the long term
// would be handled server-side. This implementation simulates some of this client-side for demo.
