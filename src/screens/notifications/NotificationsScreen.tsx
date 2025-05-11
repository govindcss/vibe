
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { formatDistanceToNow } from 'date-fns';

import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { AppStackParamList } from '../../navigation/MainAppNavigator';
import { dummyNotificationsData, NotificationItemData } from '../../data/notifications';
import { useToast } from '../../contexts/ToastContext';

type NotificationsScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Notifications'>;

interface Props {
  navigation: NotificationsScreenNavigationProp;
}

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItemData[]>(dummyNotificationsData);

  const handleNotificationPress = (item: NotificationItemData) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === item.id ? { ...n, read: true } : n)
    );

    // Navigate or show toast based on type
    switch (item.type) {
      case 'event_invite':
      case 'event_update':
      case 'rsvp_confirm':
        if (item.relatedId) {
          navigation.navigate('EventDetail', { eventId: item.relatedId });
        } else {
          showToast({ message: `Viewing details for: ${item.title}`, type: 'info' });
        }
        break;
      case 'new_message':
      case 'group_invite':
        if (item.relatedId) {
          navigation.navigate('MainTabs', { screen: 'Chat', params: { chatId: item.relatedId } } as any); // TODO: Type properly
        } else {
          showToast({ message: `Opening chat: ${item.title}`, type: 'info' });
        }
        break;
      case 'friend_request':
         if (item.relatedId) {
          navigation.navigate('OtherUserProfile', { personId: item.relatedId });
        } else {
          showToast({ message: `Viewing profile for: ${item.title}`, type: 'info' });
        }
        break;
      default:
        showToast({ message: `Notification: ${item.title}`, type: 'info' });
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({ message: 'All notifications marked as read.', type: 'success' });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast({ message: 'All notifications cleared.', type: 'info' });
  };

  const renderNotificationItem = ({ item }: { item: NotificationItemData }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: item.read ? theme.colors.card : theme.colors.muted },
        { borderColor: theme.colors.border },
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.iconContainer}>
        <Feather name={item.iconName} size={24} color={item.iconColor || theme.colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>{item.title}</Text>
        <Text style={[styles.message, { color: theme.colors.mutedForeground }]} numberOfLines={2}>{item.message}</Text>
        <Text style={[styles.timestamp, { color: theme.colors.mutedForeground + '99' }]}>
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </Text>
      </View>
      {!item.read && <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerActions: {
      flexDirection: 'row',
    },
    headerButton: {
      paddingHorizontal: 10,
    },
    notificationItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 16,
      padding: 8,
      borderRadius: 24, // Make it circular
      backgroundColor: theme.colors.input, // Subtle background for icon
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    message: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      lineHeight: 18,
    },
    timestamp: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      marginTop: 6,
    },
    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyStateText: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
      color: theme.colors.mutedForeground,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <HeaderNative
        title="Notifications"
        showBackButton={navigation.canGoBack()}
        actions={
          notifications.length > 0 ? (
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={markAllAsRead} style={styles.headerButton}>
                <Feather name="check-square" size={22} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={clearAllNotifications} style={styles.headerButton}>
                <Feather name="trash-2" size={22} color={theme.colors.destructive} />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Feather name="bell-off" size={60} color={theme.colors.mutedForeground} />
          <Text style={styles.emptyStateText}>You have no notifications right now. Stay tuned!</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationsScreen;
