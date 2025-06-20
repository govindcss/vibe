
import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';


import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/events/EventsScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import PeopleScreen from '../screens/people/PeopleScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import OtherUserProfileScreen from '../screens/profile/OtherUserProfileScreen'; // Import OtherUserProfileScreen
import NotificationsScreen from '../screens/notifications/NotificationsScreen'; // Import NotificationsScreen


import { useTheme } from '../contexts/ThemeContext';
import { Platform, View, StyleSheet } from 'react-native';
import { GradientButtonNative } from '../components/shared/GradientButtonNative';

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  CreateEventTab: undefined; 
  People: undefined;
  Profile: undefined;
  Chat: { userId?: string, chatId?: string } | undefined; // Added optional chatId
};

export type CreateEventStackParamList = {
 CreateEventForm: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  CreateEventModal: NavigatorScreenParams<CreateEventStackParamList>;
  EventDetail: { eventId: string };
  OtherUserProfile: { personId: string }; 
  Notifications: undefined; // Added Notifications screen
};


const Tab = createBottomTabNavigator<MainTabParamList>();
const CreateEventStackNav = createStackNavigator<CreateEventStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();


const MainAppTabNavigator: React.FC = () => {
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
          } else if (route.name === 'Chat') {
            iconName = 'message-square';
          }
           else {
            iconName = 'alert-circle'; 
          }
          
          if (route.name === 'CreateEventTab') return null; 

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
        headerShown: false, 
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
        component={CreateEventScreen} 
        options={({ navigation }: { navigation: BottomTabNavigationProp<MainTabParamList>}) => ({
          tabBarButton: () => (
            <View style={styles.centralTabButtonContainer}>
              <GradientButtonNative
                onPress={() => (navigation.getParent() as StackNavigationProp<AppStackParamList>).navigate('CreateEventModal', { screen: 'CreateEventForm' })}
                style={styles.centralTabButton}
                icon={<Feather name="plus" size={24} color={theme.colors.primaryForeground} />}
              />
            </View>
          ),
          tabBarLabel: 'Create', 
        })}
      />
      <Tab.Screen name="People" component={PeopleScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const CreateEventModalNavigator = () => (
  <CreateEventStackNav.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <CreateEventStackNav.Screen name="CreateEventForm" component={CreateEventScreen} />
  </CreateEventStackNav.Navigator>
);


const FinalMainAppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="MainTabs" component={MainAppTabNavigator} />
      <AppStack.Screen name="CreateEventModal" component={CreateEventModalNavigator} options={{ presentation: 'modal'}} />
      <AppStack.Screen name="EventDetail" component={EventDetailScreen} />
      <AppStack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} /> 
    </AppStack.Navigator>
  )
}


const styles = StyleSheet.create({
  centralTabButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -15, 
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
