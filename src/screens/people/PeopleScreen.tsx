
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { PersonCardNative, Person } from '../../components/people/PersonCardNative';
import { MainTabParamList } from '../../navigation/MainAppNavigator';
import { useToast } from '../../contexts/ToastContext';

const dummyPeople: Person[] = [
  { id: 'p1', name: 'Jessie', age: 24, bio: 'Loves hiking, live music, and trying new cafes. Looking for adventure buddies!', interests: ['Music', 'Hiking', 'Coffee', 'Travel'], imageUrl: 'https://picsum.photos/seed/jessie/400/533', distance: '1 mile away', commonEvents: 2 },
  { id: 'p2', name: 'Mike', age: 28, bio: 'Tech enthusiast, gamer, and foodie. Always down for a good board game night.', interests: ['Gaming', 'Tech', 'Food', 'Sci-Fi'], imageUrl: 'https://picsum.photos/seed/mike/400/533', distance: '3 miles away' },
  { id: 'p3', name: 'Sarah', age: 22, bio: 'Art student, loves painting, photography, and exploring museums.', interests: ['Art', 'Photography', 'Museums', 'Indie Films'], imageUrl: 'https://picsum.photos/seed/sarah/400/533', distance: '0.5 miles away', commonEvents: 1 },
];

type PeopleScreenNavigationProp = StackNavigationProp<MainTabParamList, 'People'>;

interface Props {
  navigation: PeopleScreenNavigationProp;
}

const PeopleScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [people, setPeople] = useState<Person[]>(dummyPeople);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVibe = (id: string) => {
    const person = people.find(p => p.id === id);
    showToast({ title: "Vibed! ✨", message: `You sent a vibe to ${person?.name || 'them'}!`, type: "success" });
    showNextPerson();
  };

  const handleSkip = (id: string) => {
    const person = people.find(p => p.id === id);
    showToast({ title: "Skipped", message: `You skipped ${person?.name || 'them'}.`, type: "info" });
    showNextPerson();
  };

  const showNextPerson = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= people.length) {
        // Optionally loop or show "no more people"
        return 0; // Loop for demo
      }
      return nextIndex;
    });
  };
  
  const refreshPeople = () => {
    // Simulate fetching new people
    setPeople([...dummyPeople].sort(() => Math.random() - 0.5)); // Shuffle for demo
    setCurrentIndex(0);
    showToast({ message: "Profiles refreshed!", type: "info"});
  }

  const currentPerson = people[currentIndex];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    personCardContainer: {
      width: '100%',
      maxWidth: 360, // Max width for the card
      alignItems: 'center', // Center the card if its width is less than container
    },
    noPeopleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    noPeopleText: {
      fontSize: 18,
      color: theme.colors.mutedForeground,
      fontFamily: 'Inter-Regular',
      marginBottom: 16,
      textAlign: 'center',
    },
    swipeHint: {
        textAlign: 'center',
        fontSize: 12,
        color: theme.colors.mutedForeground,
        marginTop: 16,
        fontFamily: 'Inter-Regular',
    },
    statsText: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
        fontFamily: 'Inter-Regular',
        marginTop: 8,
    }
  });

  return (
    <View style={styles.container}>
      <HeaderNative
        title="Discover People"
        actions={
          <>
            <TouchableOpacity onPress={() => console.log('Filters pressed')} style={{ padding: 8 }}>
              <Feather name="filter" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={refreshPeople} style={{ padding: 8, marginLeft: 8 }}>
              <Feather name="refresh-cw" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        }
      />
      <View style={styles.contentContainer}>
        {currentPerson ? (
          <View style={styles.personCardContainer}>
            <PersonCardNative
              person={currentPerson}
              onVibe={() => handleVibe(currentPerson.id)}
              onSkip={() => handleSkip(currentPerson.id)}
            />
            <Text style={styles.swipeHint}>
              Swipe left to skip, right to vibe (conceptual)
            </Text>
             {people.length > 0 && (
                <Text style={styles.statsText}>
                    Showing profile {currentIndex + 1} of {people.length}
                </Text>
            )}
          </View>
        ) : (
          <View style={styles.noPeopleContainer}>
            <Text style={styles.noPeopleText}>No more people to show right now.</Text>
            <TouchableOpacity 
                onPress={refreshPeople} 
                style={{borderColor: theme.colors.primary, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20, borderRadius: theme.radius}}
            >
              <Text style={{color: theme.colors.primary, fontFamily: 'Inter-SemiBold'}}>Refresh Profiles</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default PeopleScreen;
