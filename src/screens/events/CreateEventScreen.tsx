
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { EventFormNative } from '../../components/events/EventFormNative'; // Native EventForm
import { MainTabParamList } from '../../navigation/MainAppNavigator'; // Adjust if needed
import { useToast } from '../../contexts/ToastContext';

type CreateEventScreenNavigationProp = StackNavigationProp<MainTabParamList, 'CreateEventTab'>; // Or a dedicated modal stack

interface Props {
  navigation: CreateEventScreenNavigationProp;
}

const CreateEventScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = async (data: any) => {
    setIsLoading(true);
    console.log("Creating event:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showToast({
      title: "Event Created!",
      message: `Your event "${data.title}" has been successfully created.`,
      type: "success",
    });
    setIsLoading(false);
    if (navigation.canGoBack()) {
      navigation.goBack(); // If it's a modal
    } else {
      navigation.navigate('Events'); // Or navigate to events list
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      padding: 16,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    }
  });

  return (
    <View style={styles.container}>
      <HeaderNative title="Create New Event" showBackButton={navigation.canGoBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <EventFormNative onSubmit={handleCreateEvent} isLoading={isLoading} />
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </View>
  );
};

export default CreateEventScreen;
