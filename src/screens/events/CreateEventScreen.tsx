
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { EventFormNative } from '../../components/events/EventFormNative'; // Native EventForm
import { AppStackParamList, CreateEventStackParamList } from '../../navigation/MainAppNavigator'; 
import { useToast } from '../../contexts/ToastContext';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../../navigation/MainAppNavigator';


// Props for CreateEventScreen when used in a modal stack nested in a tab navigator
type CreateEventScreenNavigationProp = CompositeScreenProps<
  StackNavigationProp<CreateEventStackParamList, 'CreateEventForm'>, // Primary navigation type for this screen
  BottomTabScreenProps<MainTabParamList> // If it can also access tab navigator context
>;


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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showToast({
      title: "Event Created!",
      message: `Your event "${data.title}" has been successfully created.`,
      type: "success",
    });
    setIsLoading(false);
    
    // Navigate back or to the events list
    // Assuming this screen is part of the 'CreateEventModal' stack defined in AppStack.Navigator
    const parentNavigator = navigation.getParent();
    if (parentNavigator && parentNavigator.canGoBack()) {
        parentNavigator.goBack(); // Closes the modal stack
    } else if (navigation.canGoBack()) {
        navigation.goBack(); // Fallback if not in a modal stack or structure is different
    } else {
      // Fallback if no goBack is possible (e.g., if it was the initial route in its stack)
      // Try to navigate to Events tab via MainTabs
      const mainTabsNavigator = navigation.getParent()?.getParent(); // Grandparent might be AppStack
       if(mainTabsNavigator && typeof (mainTabsNavigator as any).navigate === 'function') {
         (mainTabsNavigator as StackNavigationProp<AppStackParamList>).navigate('MainTabs', { screen: 'Events' });
       }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
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
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} 
    >
        <View style={styles.container}>
        <HeaderNative title="Create New Event" showBackButton={navigation.canGoBack()} onBackPress={() => navigation.goBack()}/>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <EventFormNative onSubmit={handleCreateEvent} isLoading={isLoading} />
        </ScrollView>
        {isLoading && (
            <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        )}
        </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;
