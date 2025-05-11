
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/events/EventsScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import PeopleScreen from '../screens/people/PeopleScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen'; // Assuming ChatScreen is converted

import { useTheme } from '../contexts/ThemeContext';
import { Platform, View, StyleSheet } from 'react-native';
import { GradientButtonNative } from '../components/shared/GradientButtonNative'; // For the central button

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  CreateEventTab: undefined; // This will be the placeholder for the central button
  People: undefined;
  Profile: undefined;
  // Chat: undefined; // Add if ChatScreen is part of tabs
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainAppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'];

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'People') {
            iconName = 'users';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'alert-circle'; // Default
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        headerShown: false, // Headers will be handled by individual screens or custom components
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 10,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen
        name="CreateEventTab"
        component={CreateEventScreen} // This screen will be navigated to, but tab itself is custom
        options={({ navigation }) => ({
          tabBarButton: () => (
            <View style={styles.centralTabButtonContainer}>
              <GradientButtonNative
                onPress={() => navigation.navigate('CreateEventModal')} // Navigate to a modal stack for create event
                style={styles.centralTabButton}
                icon={<Feather name="plus" size={24} color={theme.colors.primaryForeground} />}
              />
            </View>
          ),
          tabBarLabel: 'Create', // This label won't be visible due to custom button
        })}
      />
      <Tab.Screen name="People" component={PeopleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
    </Tab.Navigator>
  );
};

// Stack for CreateEvent modal
const CreateEventStack = createStackNavigator();
export type CreateEventStackParamList = {
 CreateEventForm: undefined;
};
const CreateEventModalNavigator = () => (
  <CreateEventStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <CreateEventStack.Screen name="CreateEventForm" component={CreateEventScreen} />
  </CreateEventStack.Navigator>
);


// Combine MainTabs and Modals
const AppStack = createStackNavigator();

const FinalMainAppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="MainTabs" component={MainAppNavigator} />
      <AppStack.Screen name="CreateEventModal" component={CreateEventModalNavigator} options={{ presentation: 'modal'}} />
      {/* Add other modal screens here, e.g., EventDetail */}
    </AppStack.Navigator>
  )
}


const styles = StyleSheet.create({
  centralTabButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // Negative margin to pull it down a bit if desired, or use absolute positioning.
    // This approach keeps it in flow mostly.
    top: -15, // Pulls the button up
  },
  centralTabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FinalMainAppNavigator;
