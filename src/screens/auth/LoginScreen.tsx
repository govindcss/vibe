
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { LoginFormNative } from '../../components/auth/LoginFormNative';
import { CardNative } from '../../components/ui/CardNative';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useToast } from '../../contexts/ToastContext'; // Native toast

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    console.log("Login data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Actual login logic here
    // For now, simulate success
    showToast({
        title: "Logged In!",
        message: "Welcome back to VibeWave!",
        type: "success",
    });
    // navigation.replace('MainApp'); // If using a root navigator that handles auth state
    // For now, assuming auth context handles redirection.
    setIsLoading(false);
  };

  return (
    <CardNative style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome Back!</Text>
        <Text style={[styles.description, { color: theme.colors.mutedForeground }]}>
          Log in to continue your VibeWave journey.
        </Text>
      </View>
      <View style={styles.content}>
        <LoginFormNative onSubmit={handleLogin} isLoading={isLoading} />
      </View>
      {isLoading && <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />}
    </CardNative>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    // AuthLayout handles centering, CardNative provides bg and border
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    // Glowing effect is hard in RN, use color for emphasis
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  loader: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoginScreen;
