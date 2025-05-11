
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context'; // Handles notches

interface HeaderNativeProps {
  title: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  onBackPress?: () => void;
}

const HeaderNative: React.FC<HeaderNativeProps> = ({ title, showBackButton = false, actions, onBackPress }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background, // Match screen background
      // Add a subtle border/shadow if needed
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56, // Standard header height
      paddingHorizontal: 12,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1, // Allow title to take available space
    },
    backButton: {
      padding: 8, // Increase touchable area
      marginRight: 8,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: theme.colors.primary, // Glowing text is hard, using primary color
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });


  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton} accessibilityLabel="Go back">
              <Feather name="arrow-left" size={24} color={theme.colors.foreground} />
            </TouchableOpacity>
          )}
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        {actions && <View style={styles.actionsContainer}>{actions}</View>}
      </View>
    </SafeAreaView>
  );
};

export default HeaderNative;
