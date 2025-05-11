
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';

import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext'; // Assuming this will be created
import { ToastProvider } from './src/contexts/ToastContext'; // Assuming this will be created
import CustomToast from './src/components/shared/CustomToast'; // Assuming this will be created

function AppContent() {
  const { theme } = useTheme();
  return (
    <>
      <NavigationContainer theme={{
        dark: true, // VibeWave is dark theme by default
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.card,
          text: theme.foreground,
          border: theme.border,
          notification: theme.accent,
        }
      }}>
        <RootNavigator />
      </NavigationContainer>
      <CustomToast />
      <StatusBar style="light" backgroundColor={theme.background} />
    </>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadAppResources() {
      try {
        await Font.loadAsync({
          ...Feather.font, // Load Feather icons font
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }
    loadAppResources();
  }, []);

  if (!fontLoaded) {
    return null; // Or a loading screen
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
