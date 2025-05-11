"use client";

import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, SendHorizonal, Smile } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  avatar?: string;
  timestamp: Date;
}

const dummyChats = [
  { id: 'chat1', name: 'Neon Nights Fest Crew', lastMessage: 'Can\'t wait for tonight!', unread: 2, avatar: 'https://picsum.photos/seed/chat1/200/200', dataAiHint: "group people" },
  { id: 'chat2', name: 'Tech Meetup Folks', lastMessage: 'Anyone has the slides?', unread: 0, avatar: 'https://picsum.photos/seed/chat2/200/200', dataAiHint: "tech conference" },
  { id: 'chat3', name: 'Alex Johnson', lastMessage: 'Hey, are you going to the...', unread: 1, avatar: 'https://picsum.photos/seed/alex/200/200', dataAiHint: "person smiling" },
];

const initialMessages: Message[] = [
    { id: 'm1', text: 'Hey everyone, super excited for Neon Nights!', sender: 'other', avatar: 'https://picsum.photos/seed/userA/40/40', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'm2', text: 'Me too! Is anyone carpooling?', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    { id: 'm3', text: 'I might have space for 2 more people, leaving from downtown.', sender: 'other', avatar: 'https://picsum.photos/seed/userB/40/40', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];


export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, selectedChat]);


  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: `m${messages.length + 1}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Header title="Messages" />
      <div className="flex flex-grow overflow-hidden">
        {/* Chat List Sidebar - shown on larger screens or as a primary view on mobile */}
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-border bg-card hidden md:flex flex-col">
          <div className="p-4 border-b border-border">
            <Input placeholder="Search chats..." className="bg-background" />
          </div>
          <ScrollArea className="flex-grow">
            {dummyChats.map(chat => (
              <div
                key={chat.id}
                className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-muted/50 ${selectedChat.id === chat.id ? 'bg-muted' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint={chat.dataAiHint}/>
                  <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{chat.unread}</span>
                )}
              </div>
            ))}
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-background">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border flex items-center space-x-3 bg-card shadow-sm">
                <Avatar className="md:hidden"> {/* Show avatar on mobile header if sidebar is hidden */}
                     <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} data-ai-hint={selectedChat.dataAiHint}/>
                     <AvatarFallback>{selectedChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
              </div>
              
              <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end max-w-xs md:max-w-md lg:max-w-lg ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2 space-x-reverse`}>
                      {msg.sender === 'other' && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.avatar} data-ai-hint="person random"/>
                          <AvatarFallback>{selectedChat.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                      )}
                       <div className={`p-3 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground border border-border rounded-bl-none shadow-sm'}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <div className="p-4 border-t border-border bg-card flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Smile className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow bg-background focus-visible:ring-primary"
                />
                <GradientButton size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <SendHorizonal className="w-5 h-5" />
                </GradientButton>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-muted-foreground">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
