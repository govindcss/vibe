
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import HeaderNative from '../../components/layout/HeaderNative';
import { GradientButtonNative } from '../../components/shared/GradientButtonNative';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  avatarUrl?: string;
  timestamp: Date;
  userName?: string; // Added for other users
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
  avatarUrl: string;
  dataAiHint: string;
}

const dummyChats: Chat[] = [
  { id: 'chat1', name: 'Neon Nights Fest Crew', lastMessage: 'Can\'t wait for tonight!', unread: 2, avatarUrl: 'https://picsum.photos/seed/chat1/200/200', dataAiHint: "group people" },
  { id: 'chat2', name: 'Tech Meetup Folks', lastMessage: 'Anyone has the slides?', unread: 0, avatarUrl: 'https://picsum.photos/seed/chat2/200/200', dataAiHint: "tech conference" },
  { id: 'chat3', name: 'Alex Johnson', lastMessage: 'Hey, are you going to the...', unread: 1, avatarUrl: 'https://picsum.photos/seed/alex/200/200', dataAiHint: "person smiling" },
];

const initialMessages: Message[] = [
    { id: 'm1', text: 'Hey everyone, super excited for Neon Nights!', sender: 'other', avatarUrl: 'https://picsum.photos/seed/userA/40/40', userName: 'User A', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'm2', text: 'Me too! Is anyone carpooling?', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    { id: 'm3', text: 'I might have space for 2 more people, leaving from downtown.', sender: 'other', avatarUrl: 'https://picsum.photos/seed/userB/40/40', userName: 'User B', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];


const ChatScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(dummyChats[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Simulate loading messages for selected chat
    if (selectedChat) {
        // In a real app, fetch messages for selectedChat.id
        setMessages(initialMessages); // Reset to initial for demo
    }
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [selectedChat]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: `m${messages.length + 1}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, msg]);
    setNewMessage('');
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[
        styles.chatItemContainer,
        { backgroundColor: selectedChat?.id === item.id ? theme.colors.muted : theme.colors.card },
        { borderColor: theme.colors.border }
      ]}
      onPress={() => setSelectedChat(item)}
    >
      <Image source={{ uri: item.avatarUrl }} style={styles.chatItemAvatar} data-ai-hint={item.dataAiHint}/>
      <View style={styles.chatItemTextContainer}>
        <Text style={[styles.chatItemName, { color: theme.colors.foreground }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.chatItemLastMessage, { color: theme.colors.mutedForeground }]} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unread > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.unreadText, { color: theme.colors.primaryForeground }]}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.otherMessageRow]}>
        {!isUser && item.avatarUrl && (
          <Image source={{ uri: item.avatarUrl }} style={styles.messageAvatar} data-ai-hint="person random"/>
        )}
        <View style={[
            styles.messageBubble,
            isUser ? { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 }
                   : { backgroundColor: theme.colors.card, borderBottomLeftRadius: 4, borderWidth:1, borderColor: theme.colors.border},
            
          ]}
        >
          {!isUser && item.userName && <Text style={[styles.messageSenderName, {color: theme.colors.accent}]}>{item.userName}</Text>}
          <Text style={[styles.messageText, isUser ? { color: theme.colors.primaryForeground } : { color: theme.colors.foreground }]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTimestamp, isUser ? { color: theme.colors.primaryForeground+'AA' } : { color: theme.colors.mutedForeground }]}>
            {format(item.timestamp, 'p')}
          </Text>
        </View>
         {isUser && ( // Render user avatar on the right for user messages (optional)
          <View style={[styles.messageAvatar, {backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems:'center'}]}>
            <Text style={{color: theme.colors.secondaryForeground, fontFamily: 'Inter-Bold'}}>ME</Text>
          </View>
        )}
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    // Chat List (Sidebar equivalent) - for tablet or larger phone in landscape, can be a split view.
    // For now, this will be a conditional rendering or a separate screen for mobile.
    // This example integrates it directly for simplicity of conversion.
    chatListContainer: {
        width: '35%', // Only if we show side-by-side
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    chatListHeader: { padding: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    searchInput: {
        backgroundColor: theme.colors.input,
        borderRadius: theme.radius,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        fontSize: 15,
        color: theme.colors.foreground,
        fontFamily: 'Inter-Regular',
    },
    chatItemContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, },
    chatItemAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
    chatItemTextContainer: { flex: 1 },
    chatItemName: { fontSize: 16, fontFamily: 'Inter-SemiBold', marginBottom: 2 },
    chatItemLastMessage: { fontSize: 13, fontFamily: 'Inter-Regular' },
    unreadBadge: {
        minWidth: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6,
    },
    unreadText: { fontSize: 11, fontFamily: 'Inter-Bold' },

    // Main Chat Area
    chatAreaContainer: { flex: 1, flexDirection: 'column' }, // Full flex if chat list is hidden/separate
    chatHeader: {
        padding: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card,
        flexDirection: 'row', alignItems: 'center'
    },
    chatHeaderTitle: { fontSize: 18, fontFamily: 'Inter-Bold', color: theme.colors.foreground, marginLeft: 8 },
    
    messageList: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
    messageRow: { flexDirection: 'row', marginVertical: 5, alignItems: 'flex-end', maxWidth: '80%' },
    userMessageRow: { alignSelf: 'flex-end', },
    otherMessageRow: { alignSelf: 'flex-start' },
    messageAvatar: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 6 },
    messageBubble: {
        paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16,
    },
    messageSenderName: { fontSize: 12, fontFamily: 'Inter-SemiBold', marginBottom: 2, },
    messageText: { fontSize: 15, fontFamily: 'Inter-Regular', lineHeight: 20 },
    messageTimestamp: { fontSize: 11, fontFamily: 'Inter-Regular', marginTop: 4, textAlign: 'right' },
    
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', padding: 10,
        borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.card,
    },
    iconButton: { padding: 8 },
    messageInput: {
        flex: 1, backgroundColor: theme.colors.input, borderRadius: theme.radius,
        paddingHorizontal: 16, paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        fontSize: 16, color: theme.colors.foreground, fontFamily: 'Inter-Regular',
        marginHorizontal: 8,
    },
    sendButton: { width: 44, height: 44, borderRadius: 22 },

    noChatSelectedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    noChatSelectedText: { fontSize: 16, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular' },
  });

  // TODO: Implement a responsive layout to show chat list and chat area side-by-side on tablets
  // For now, it's a full screen chat area, assuming chat selection happens on a different screen or modal.

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust as needed for header
    >
      <HeaderNative title={selectedChat ? selectedChat.name : "Messages"} showBackButton={!selectedChat /* or based on navigation stack */} />
      
      {/* This part would be the chat list, could be a drawer or separate screen */}
      {/* <FlatList data={dummyChats} renderItem={renderChatItem} keyExtractor={item => item.id} /> */}

      {selectedChat ? (
        <View style={styles.chatAreaContainer}>
           {/* Chat Header (simplified, could be part of HeaderNative actions) */}
           {/* <View style={styles.chatHeader}>
               <Image source={{ uri: selectedChat.avatarUrl }} style={styles.messageAvatar} />
               <Text style={styles.chatHeaderTitle}>{selectedChat.name}</Text>
           </View> */}

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="paperclip" size={22} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="smile" size={22} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
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
      ) : (
        <View style={styles.noChatSelectedContainer}>
          <Text style={styles.noChatSelectedText}>Select a chat to start messaging</Text>
          {/* Button to show chat list if it's hidden */}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
