
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
// Import ForgotPasswordScreen if you create it
import { useTheme } from '../contexts/ThemeContext';
import AuthLayout from '../components/layout/AuthLayoutNative'; // Reusing the layout concept

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  // ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <AuthLayout>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' }, // AuthLayout handles background
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      </Stack.Navigator>
    </AuthLayout>
  );
};

export default AuthNavigator;
