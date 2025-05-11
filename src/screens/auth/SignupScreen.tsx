
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { SignupFormNative } from '../../components/auth/SignupFormNative';
import { CardNative } from '../../components/ui/CardNative';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useToast } from '../../contexts/ToastContext'; // Native toast

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: any) => {
    setIsLoading(true);
    console.log("Signup data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Actual signup logic here
    showToast({
        title: "Account Created!",
        message: "Welcome to VibeWave! Please check your email to verify your account.",
        type: "success",
    });
    // navigation.replace('ProfileSetup'); // Or navigate to login or MainApp
    setIsLoading(false);
  };

  return (
    <CardNative style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Join the Vibe!</Text>
        <Text style={[styles.description, { color: theme.colors.mutedForeground }]}>
          Create your VibeWave account and start exploring.
        </Text>
      </View>
      <View style={styles.content}>
        <SignupFormNative onSubmit={handleSignup} isLoading={isLoading} />
      </View>
       {isLoading && <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />}
    </CardNative>
  );
};

const styles = StyleSheet.create({
   card: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
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

export default SignupScreen;
