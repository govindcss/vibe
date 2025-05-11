
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { format } from 'date-fns';
import { useToast } from '../../contexts/ToastContext';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

const currentUser: User = {
  id: 'user_self',
  name: 'Me',
  avatarUrl: 'https://picsum.photos/seed/currentUser/40/40' // Placeholder for current user avatar
};

interface Message {
  id: string;
  text: string;
  senderId: string; // ID of the user who sent the message
  senderName?: string; // Display name of the sender
  senderAvatarUrl?: string; // Avatar of the sender
  timestamp: Date;
  isRead?: boolean; // For read receipts
  replyToMessageId?: string; // ID of the message being replied to
  originalMessageTextPreview?: string; // Snippet of the original message
  isDeleted?: boolean; // If the message was deleted
  // reactions?: { [emoji: string]: string[] }; // Future: emoji: [userIds]
}

interface Chat {
  id: string;
  name: string; // Chat name (group name or other user's name)
  type: 'group' | 'private';
  lastMessage?: string; // Preview of the last message
  lastMessageTimestamp?: Date;
  unreadCount: number;
  avatarUrl: string; // Group avatar or other user's avatar
  dataAiHint: string;
  participants?: User[]; // List of participants for mentions in group chats
}

const dummyUsers: User[] = [
  currentUser,
  { id: 'userA', name: 'Alice Wonderland', avatarUrl: 'https://picsum.photos/seed/userA/40/40' },
  { id: 'userB', name: 'Bob The Builder', avatarUrl: 'https://picsum.photos/seed/userB/40/40' },
  { id: 'userC', name: 'Charlie Brown', avatarUrl: 'https://picsum.photos/seed/userC/40/40' },
];

const dummyChats: Chat[] = [
  {
    id: 'chat1',
    name: 'Neon Nights Fest Crew',
    type: 'group',
    lastMessage: 'Can\'t wait for tonight!',
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 2,
    avatarUrl: 'https://picsum.photos/seed/chat1/200/200',
    dataAiHint: "group people",
    participants: dummyUsers.filter(u => u.id !== currentUser.id), // All users except current
  },
  {
    id: 'chat2',
    name: 'Tech Meetup Folks',
    type: 'group',
    lastMessage: 'Anyone has the slides?',
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    avatarUrl: 'https://picsum.photos/seed/chat2/200/200',
    dataAiHint: "tech conference",
    participants: [dummyUsers[1], dummyUsers[2]],
  },
  {
    id: 'chat3',
    name: dummyUsers[1].name, // Alice Wonderland
    type: 'private',
    lastMessage: 'Hey, are you going to the event?',
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 1,
    avatarUrl: dummyUsers[1].avatarUrl!,
    dataAiHint: "person smiling",
    participants: [currentUser, dummyUsers[1]],
  },
];

const initialMessages: Message[] = [
    { id: 'm1', text: 'Hey everyone, super excited for Neon Nights! Who is bringing the glow sticks? ✨ @Alice Wonderland', senderId: 'userB', senderName: 'Bob The Builder', senderAvatarUrl: 'https://picsum.photos/seed/userB/40/40', timestamp: new Date(Date.now() - 1000 * 60 * 5), isRead: true },
    { id: 'm2', text: 'Me too! I can grab some. Is anyone carpooling from downtown?', senderId: currentUser.id, timestamp: new Date(Date.now() - 1000 * 60 * 3), isRead: true },
    { id: 'm3', text: 'I might have space for 2 more people. Leaving around 7 PM.', senderId: 'userA', senderName: 'Alice Wonderland', senderAvatarUrl: 'https://picsum.photos/seed/userA/40/40', timestamp: new Date(Date.now() - 1000 * 60 * 1), isRead: false },
    { id: 'm4', text: 'Awesome, count me in @Alice Wonderland!', replyToMessageId: 'm3', originalMessageTextPreview: 'I might have space for 2...', senderId: currentUser.id, timestamp: new Date(Date.now() - 1000*30)},
];


const ChatScreen: React.FC = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [activeChat, setActiveChat] = useState<Chat | null>(dummyChats[0]); // Default to first chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false); // Placeholder
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (activeChat) {
        // Simulate fetching messages for activeChat.id
        // For demo, filter initialMessages or use a map of messages per chat
        if (activeChat.id === 'chat1') {
            setMessages(initialMessages);
        } else if (activeChat.id === 'chat3') {
            setMessages([
                { id: 'pm1', text: 'Hey, are you going to the VibeWave launch event next week?', senderId: currentUser.id, timestamp: new Date(Date.now() - 1000 * 60 * 28), isRead: true},
                { id: 'pm2', text: 'I am! Super excited for it. Are you?', senderId: 'userA', senderName: 'Alice Wonderland', senderAvatarUrl: dummyUsers[1].avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 25), isRead: true}
            ]);
        } else {
            setMessages([]);
        }
        // Simulate other user typing
        if(activeChat.type === 'private') {
            const timer = setTimeout(() => setIsOtherUserTyping(true), 2000);
            const timer2 = setTimeout(() => setIsOtherUserTyping(false), 5000);
            return () => { clearTimeout(timer); clearTimeout(timer2); }
        } else {
            setIsOtherUserTyping(false);
        }
    }
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [activeChat]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: `m${Date.now()}`, // More unique ID
      text: newMessage,
      senderId: currentUser.id,
      timestamp: new Date(),
      isRead: false, // Initially unread by others
      replyToMessageId: replyingTo?.id,
      originalMessageTextPreview: replyingTo?.text.substring(0, 30) + (replyingTo && replyingTo.text.length > 30 ? '...' : ''),
    };
    setMessages(prevMessages => [...prevMessages, msg]);
    setNewMessage('');
    setReplyingTo(null); // Clear reply state
  };

  const startReply = (message: Message) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, text: 'This message was deleted.', isDeleted: true, replyToMessageId: undefined, originalMessageTextPreview: undefined } : msg
      )
    );
    showToast({ type: 'info', message: 'Message deleted.' });
  };

  const reportMessage = (messageId: string) => {
    // In a real app, this would send a report to a backend
    showToast({ type: 'success', title: 'Message Reported', message: 'Thank you for your report. We will review it shortly.' });
  };

  const handleMessageLongPress = (message: Message) => {
    if (message.isDeleted) return;

    const options: any[] = [];
    if (!message.isDeleted) {
        options.push({ text: 'Reply', onPress: () => startReply(message) });
    }
    if (message.senderId === currentUser.id && !message.isDeleted) {
      options.push({ text: 'Delete Message', onPress: () => deleteMessage(message.id), style: 'destructive' });
    }
    if (!message.isDeleted) {
        options.push({ text: 'Report Message', onPress: () => reportMessage(message.id), style: 'destructive' });
    }
    options.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('Message Options', `Selected: "${message.text.substring(0,50)}..."`, options);
  };


  const renderMessageItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === currentUser.id;
    const sender = isCurrentUser ? currentUser : dummyUsers.find(u => u.id === item.senderId);

    // Basic @mention highlighting (can be improved with regex and specific styling)
    const messageTextWithMentions = item.text.split(' ').map((word, index) => {
        if (word.startsWith('@')) {
            const mentionedUser = activeChat?.participants?.find(p => word.toLowerCase().includes(p.name.split(' ')[0].toLowerCase()));
            if (mentionedUser) {
                return <Text key={index} style={{color: theme.colors.accent, fontFamily: 'Inter-SemiBold'}}>{word} </Text>;
            }
        }
        return <Text key={index}>{word} </Text>;
    });


    return (
      <TouchableOpacity onLongPress={() => handleMessageLongPress(item)} activeOpacity={0.8}>
        <View style={[styles.messageRow, isCurrentUser ? styles.userMessageRow : styles.otherMessageRow]}>
          {!isCurrentUser && (
            <Image 
                source={{ uri: item.senderAvatarUrl || sender?.avatarUrl || 'https://picsum.photos/seed/defaultUser/40/40' }} 
                style={styles.messageAvatar} 
                data-ai-hint="person avatar"
            />
          )}
          <View style={[
              styles.messageBubble,
              isCurrentUser ? { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 }
                            : { backgroundColor: theme.colors.card, borderBottomLeftRadius: 4, borderWidth:1, borderColor: theme.colors.border},
            ]}
          >
            {!isCurrentUser && item.senderName && <Text style={[styles.messageSenderName, {color: theme.colors.accent}]}>{item.senderName}</Text>}
            
            {item.replyToMessageId && item.originalMessageTextPreview && (
              <View style={[styles.replyPreviewContainer, {backgroundColor: isCurrentUser ? theme.colors.primaryForeground + '1A' : theme.colors.muted + '80'}]}>
                <Feather name="corner-up-left" size={12} color={isCurrentUser ? theme.colors.primaryForeground+'AA' : theme.colors.mutedForeground} style={{marginRight: 4}}/>
                <Text style={[styles.replyPreviewText, {color: isCurrentUser ? theme.colors.primaryForeground+'AA' : theme.colors.mutedForeground}]} numberOfLines={1}>
                  {item.originalMessageTextPreview}
                </Text>
              </View>
            )}

            <Text style={[styles.messageText, isCurrentUser ? { color: theme.colors.primaryForeground } : { color: theme.colors.foreground }]}>
              {item.isDeleted ? <Text style={{fontStyle: 'italic'}}>{item.text}</Text> : messageTextWithMentions}
            </Text>
            
            <View style={styles.messageInfoRow}>
                <Text style={[styles.messageTimestamp, isCurrentUser ? { color: theme.colors.primaryForeground+'AA' } : { color: theme.colors.mutedForeground }]}>
                {format(item.timestamp, 'p')}
                </Text>
                {isCurrentUser && (
                    <Feather 
                        name={item.isRead ? "check-double" : "check"} 
                        size={14} 
                        color={item.isRead ? theme.colors.secondary : theme.colors.primaryForeground+'AA'} 
                        style={{marginLeft: 4}}
                    />
                )}
            </View>
             {/* Placeholder for reactions - Future enhancement */}
             {/* {!item.isDeleted && <View style={styles.reactionsPlaceholder}><Text style={{fontSize: 10, color: theme.colors.mutedForeground}}>👍 2  😂 1</Text></View>} */}
          </View>
          {isCurrentUser && ( // User avatar on the right
            <Image source={{ uri: currentUser.avatarUrl }} style={styles.messageAvatar} data-ai-hint="person avatar"/>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Simplified Chat List for demo - in a real app, this would be a separate component or screen.
  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[
        styles.chatItemContainer,
        { backgroundColor: activeChat?.id === item.id ? theme.colors.muted : theme.colors.card },
        { borderColor: theme.colors.border }
      ]}
      onPress={() => { setActiveChat(item); setReplyingTo(null); }}
    >
      <Image source={{ uri: item.avatarUrl }} style={styles.chatItemAvatar} data-ai-hint={item.dataAiHint}/>
      <View style={styles.chatItemTextContainer}>
        <Text style={[styles.chatItemName, { color: theme.colors.foreground }]} numberOfLines={1}>{item.name}</Text>
        {item.lastMessage && <Text style={[styles.chatItemLastMessage, { color: theme.colors.mutedForeground }]} numberOfLines={1}>{item.lastMessage}</Text>}
      </View>
      {item.unreadCount > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.unreadText, { color: theme.colors.primaryForeground }]}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    // Chat List (Sidebar equivalent) - This demonstrates the concept.
    // In a real mobile app, this list would likely be on a separate "Chats" tab/screen.
    // For this component, we'll make it horizontally scrollable above the chat view if needed, or just use the Header for chat selection.
    chatListHorizontalScrollView: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.card,
        maxHeight: 90, // Limit height
    },
    chatItemContainer: { 
        flexDirection: 'column', alignItems: 'center', paddingVertical: 6, paddingHorizontal:8,
        borderRadius: theme.radius, marginHorizontal: 4,
        width: 80, // Fixed width for horizontal items
    },
    chatItemAvatar: { width: 48, height: 48, borderRadius: 24, marginBottom: 4 },
    chatItemTextContainer: { alignItems: 'center', width: '100%' },
    chatItemName: { fontSize: 11, fontFamily: 'Inter-Medium', textAlign: 'center', marginBottom: 0 },
    chatItemLastMessage: { fontSize: 10, fontFamily: 'Inter-Regular', textAlign: 'center' },
    unreadBadge: {
        position: 'absolute', top: 2, right: 2,
        minWidth: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5,
    },
    unreadText: { fontSize: 10, fontFamily: 'Inter-Bold' },

    // Main Chat Area
    chatAreaContainer: { flex: 1, flexDirection: 'column' },
    typingIndicatorContainer: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 20, // Fixed height to prevent layout shifts
    },
    typingIndicatorText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.mutedForeground,
        fontStyle: 'italic',
    },
    messageList: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
    messageRow: { flexDirection: 'row', marginVertical: 6, alignItems: 'flex-end', maxWidth: '85%' },
    userMessageRow: { alignSelf: 'flex-end', },
    otherMessageRow: { alignSelf: 'flex-start' },
    messageAvatar: { width: 36, height: 36, borderRadius: 18, marginHorizontal: 6, marginBottom: 4 },
    messageBubble: {
        paddingVertical: 10, paddingHorizontal: 14, borderRadius: 18,
        elevation: 1, shadowColor: theme.colors.primary, shadowOpacity: 0.05, shadowOffset: {width:0, height:1}, shadowRadius: 2,
    },
    messageSenderName: { fontSize: 13, fontFamily: 'Inter-SemiBold', marginBottom: 3, },
    messageText: { fontSize: 15, fontFamily: 'Inter-Regular', lineHeight: 21 },
    messageInfoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 },
    messageTimestamp: { fontSize: 11, fontFamily: 'Inter-Regular' },
    
    replyPreviewContainer: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginBottom: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    replyPreviewText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      flexShrink: 1,
    },

    inputAreaContainer: { borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.card },
    replyingToContainer: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.colors.muted,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    replyingToText: { color: theme.colors.mutedForeground, fontSize: 12, fontFamily: 'Inter-Regular', flex: 1 },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10,
    },
    iconButton: { padding: 8 },
    messageInput: {
        flex: 1, backgroundColor: theme.colors.input, borderRadius: theme.radius,
        paddingHorizontal: 16, paddingVertical: Platform.OS === 'ios' ? 12 : 10,
        fontSize: 16, color: theme.colors.foreground, fontFamily: 'Inter-Regular',
        marginHorizontal: 8, maxHeight: 100, // For multiline
    },
    sendButton: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },

    noChatSelectedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    noChatSelectedText: { fontSize: 16, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', textAlign: 'center' },

    // reactionsPlaceholder: { alignSelf: 'flex-start', marginLeft: 10, marginTop: 2, borderWidth:1, borderColor: theme.colors.border, borderRadius: 10, paddingHorizontal: 4, paddingVertical: 1}
  });

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? ( replyingTo ? 90 : 60) : 0} // Adjust offset based on header and replyingTo bar
    >
      <HeaderNative 
        title={activeChat ? activeChat.name : "Messages"} 
        showBackButton={!activeChat /* or logic to show back if a chat list was main view */}
        actions={ activeChat && activeChat.type === 'group' ? (
            <TouchableOpacity style={styles.iconButton} onPress={() => showToast({message: "View group info (coming soon!)"})}>
                <Feather name="info" size={22} color={theme.colors.primary}/>
            </TouchableOpacity>
        ) : null}
      />
      
      {/* Horizontal Chat List Selector */}
      <FlatList
        horizontal
        data={dummyChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.chatListHorizontalScrollView}
        contentContainerStyle={{ paddingRight: 8 }}
      />

      {activeChat ? (
        <View style={styles.chatAreaContainer}>
            <View style={styles.typingIndicatorContainer}>
                {isOtherUserTyping && <Text style={styles.typingIndicatorText}>{activeChat.participants?.find(p => p.id !== currentUser.id)?.name || 'Someone'} is typing...</Text>}
            </View>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // Keep true for better UX
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })} // Initial scroll without animation
          />
          <View style={styles.inputAreaContainer}>
            {replyingTo && (
              <View style={styles.replyingToContainer}>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name="corner-down-left" size={14} color={theme.colors.mutedForeground} style={{marginRight: 4}}/>
                    <Text style={styles.replyingToText} numberOfLines={1}>
                    Replying to: {replyingTo.senderName || '...'} - "{replyingTo.text.substring(0,40)}..."
                    </Text>
                </View>
                <TouchableOpacity onPress={cancelReply}>
                  <Feather name="x" size={18} color={theme.colors.mutedForeground} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => showToast({message: "GIFs coming soon!"})}>
                <Feather name="gift" size={22} color={theme.colors.mutedForeground} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => showToast({message: "Emoji picker coming soon!"})}>
                <Feather name="smile" size={22} color={theme.colors.mutedForeground} />
                </TouchableOpacity>
                <TextInput
                style={styles.messageInput}
                placeholder="Type a vibe..."
                placeholderTextColor={theme.colors.mutedForeground}
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                />
                <GradientButtonNative
                onPress={handleSendMessage}
                style={styles.sendButton}
                disabled={!newMessage.trim()}
                icon={<Feather name="send" size={20} color={theme.colors.primaryForeground} />}
                />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noChatSelectedContainer}>
          <Feather name="message-square" size={48} color={theme.colors.mutedForeground} style={{marginBottom:16}} />
          <Text style={styles.noChatSelectedText}>Select a chat from the list above to start messaging or view your existing conversations.</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
