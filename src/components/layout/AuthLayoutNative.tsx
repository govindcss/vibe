
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native'; // For navigation

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);


  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.muted, theme.colors.background]}
      style={styles.gradientContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => navigation.dispatch(CommonActions.navigate('Home'))} style={styles.logoContainer}>
            <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.24 16.24C15.07 17.41 13.59 18 12 18C10.41 18 8.93 17.41 7.76 16.24C6.59 15.07 6 13.59 6 12C6 10.41 6.59 8.93 7.76 7.76C8.93 6.59 10.41 6 12 6C13.59 6 15.07 6.59 16.24 7.76C18.59 10.11 18.59 13.89 16.24 16.24Z" fill={theme.colors.primary} />
              <Path d="M12 8C11.76 8 11.52 8.04 11.29 8.11C10.31 8.37 9.56 9.03 9.18 9.92C8.87 10.66 9.16 11.5 9.79 11.97C10.42 12.44 11.29 12.34 11.82 11.77L12.99 12.94C12.57 13.65 11.71 14.08 10.83 14.08C9.67 14.08 8.65 13.39 8.19 12.35C7.62 11.09 8.05 9.62 9.11 8.82C9.91 8.21 10.91 7.99 11.82 8.03L12 8Z" fill={theme.colors.background} />
            </Svg>
            <Text style={[styles.appName, { color: theme.colors.primary }]}>VibeWave</Text>
            {/* Gradient text is hard in RN without specific libraries, using primary color for now */}
          </TouchableOpacity>

          <View style={styles.mainContent}>
            {children}
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.mutedForeground }]}>
              &copy; {currentYear} VibeWave. All rights reserved.
            </Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => console.log('Navigate to Terms')}>
                <Text style={[styles.footerLink, { color: theme.colors.primary }]}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={[styles.footerSeparator, { color: theme.colors.mutedForeground }]}> | </Text>
              <TouchableOpacity onPress={() => console.log('Navigate to Privacy')}>
                <Text style={[styles.footerLink, { color: theme.colors.primary }]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
    flexDirection: 'row',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold', // Assuming Inter-Bold is loaded
    marginLeft: 8,
  },
  mainContent: {
    width: '100%',
    maxWidth: 400, // Max width for form content
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    marginTop: 4,
  },
  footerLink: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'underline',
  },
  footerSeparator: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  }
});

export default AuthLayout;
