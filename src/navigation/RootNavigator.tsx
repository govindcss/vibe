
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainAppNavigator from './MainAppNavigator';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext provides user and isLoading
import LoadingScreen from '../screens/LoadingScreen'; // A simple loading screen

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  Loading: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={MainAppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
