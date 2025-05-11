
import type { Feather } from '@expo/vector-icons';

export interface NotificationItemData {
  id: string;
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconColor?: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  relatedId?: string; // e.g. eventId, chatId, userId
  type: 'event_invite' | 'new_message' | 'group_invite' | 'rsvp_confirm' | 'friend_request' | 'event_update' | 'system' | 'generic';
}

export const dummyNotificationsData: NotificationItemData[] = [
  {
    id: '1',
    iconName: 'calendar',
    iconColor: '#E6399B', // primary
    title: 'Event RSVP Confirmation',
    message: 'You have successfully RSVP\'d to Neon Nights Fest.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    relatedId: '1', // Event ID
    type: 'rsvp_confirm',
  },
  {
    id: '2',
    iconName: 'message-square',
    iconColor: '#3B82F6', // secondary
    title: 'New Message from Alice',
    message: 'Hey, are you going to the tech meetup tomorrow? Let me know!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    relatedId: 'chat3', // Chat ID
    type: 'new_message',
  },
  {
    id: '3',
    iconName: 'users',
    iconColor: '#7C3AED', // accent
    title: 'Group Invite: VibeWave Launch Team',
    message: 'You\'ve been invited to join the "VibeWave Launch Team" group chat.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    relatedId: 'group_launch', // Group Chat ID
    type: 'group_invite',
  },
  {
    id: '4',
    iconName: 'user-plus',
    iconColor: '#F97316', // chart4 (Orange)
    title: 'New Connection Request',
    message: 'Mike D. wants to connect with you.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    relatedId: 'p2', // User ID
    type: 'friend_request',
  },
  {
    id: '5',
    iconName: 'bell',
    iconColor: '#22C55E', // chart5 (Green)
    title: 'Event Update: Local Food Fair',
    message: 'The Local Food Fair location has been updated. Check details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    relatedId: '4', // Event ID
    type: 'event_update',
  },
  {
    id: '6',
    iconName: 'award',
    iconColor: '#7C3AED', // accent
    title: 'You unlocked a new badge!',
    message: 'Congrats on attending 5 events! You earned the "Event Hopper" badge.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: false,
    type: 'system',
  },
   {
    id: '7',
    iconName: 'zap',
    iconColor: '#E6399B', // primary
    title: 'Someone VIBED with you!',
    message: 'Jessie sent you a Vibe! Check out their profile.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    relatedId: 'p1', // User ID of Jessie
    type: 'generic',
  },
  {
    id: '8',
    iconName: 'info',
    iconColor: '#3B82F6', // secondary
    title: 'Welcome to VibeWave!',
    message: 'Explore events, connect with people, and enjoy the vibe!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    type: 'system',
  },
];
