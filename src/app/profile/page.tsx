import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit2, MapPin, Settings, ShieldCheck, LogOut, Heart, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { EventCard, type Event } from '@/components/events/EventCard'; // Assuming EventCard path
import { GradientButton } from '@/components/shared/GradientButton';

// Dummy user data
const userProfile = {
  name: 'Alex Wave Rider',
  username: '@alexwave',
  bio: 'Digital nomad exploring the world one vibe at a time. Music lover, tech enthusiast, and aspiring photographer. Let\'s connect!',
  location: 'Global',
  interests: ['Live Music', 'Tech Meetups', 'Photography', 'Travel', 'Food Festivals'],
  avatarUrl: 'https://picsum.photos/seed/alexprofile/200/200',
  bannerUrl: 'https://picsum.photos/seed/alexbanner/1200/400',
  joinedEvents: 12,
  hostedEvents: 3,
  vibesReceived: 157,
};

const dummyJoinedEvents: Event[] = [
  { id: 'event_j1', title: 'Indie Beats Night', date: '2024-06-15', location: 'The Local Venue', category: 'Music', imageUrl: 'https://picsum.photos/seed/joined1/300/169' },
  { id: 'event_j2', title: 'Startup Grind', date: '2024-06-20', location: 'CoWork Central', category: 'Tech', imageUrl: 'https://picsum.photos/seed/joined2/300/169' },
];

const dummyHostedEvents: Event[] = [
  { id: 'event_h1', title: 'Sunset Photo Walk', date: '2024-07-05', location: 'City Waterfront', category: 'Photography', imageUrl: 'https://picsum.photos/seed/hosted1/300/169' },
];


export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="My Profile"
        actions={
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5 text-primary" />
          </Button>
        }
      />
      <div className="flex-grow">
        {/* Profile Header with Banner */}
        <div className="relative h-48 md:h-64 w-full group">
          <Image 
            src={userProfile.bannerUrl} 
            alt={`${userProfile.name}'s banner`} 
            fill 
            className="object-cover"
            data-ai-hint="abstract colorful"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 transform translate-y-1/2 px-4 md:px-8">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person smiling"/>
              <AvatarFallback>{userProfile.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
           <div className="absolute top-4 right-4">
            <Link href="/profile/edit" passHref>
              <GradientButton size="sm" variant="outline" className="border-primary text-primary bg-background/70 hover:bg-primary/20 backdrop-blur-sm">
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </GradientButton>
            </Link>
          </div>
        </div>

        {/* User Info Section */}
        <div className="pt-20 md:pt-24 px-4 md:px-8 pb-8">
          <h1 className="text-3xl font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground">{userProfile.username}</p>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1 text-secondary" /> {userProfile.location}
          </div>
          
          <p className="mt-4 text-foreground/90 leading-relaxed">{userProfile.bio}</p>

          <div className="mt-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map(interest => (
                <Badge key={interest} variant="secondary" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">{interest}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{userProfile.joinedEvents}</p>
              <p className="text-xs text-muted-foreground">Events Joined</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{userProfile.hostedEvents}</p>
              <p className="text-xs text-muted-foreground">Events Hosted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{userProfile.vibesReceived}</p>
              <p className="text-xs text-muted-foreground">Vibes Received</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Joined Events Section */}
        <div className="p-4 md:px-8 md:py-6">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 md:px-2">
              <CardTitle className="text-2xl font-bold flex items-center"><CalendarDays className="mr-3 h-6 w-6 text-primary"/> Joined Events</CardTitle>
            </CardHeader>
            <CardContent className="px-0 md:px-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dummyJoinedEvents.length > 0 ? dummyJoinedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              )) : <p className="text-muted-foreground col-span-full">You haven't joined any events yet.</p>}
            </CardContent>
          </Card>
        </div>
        
        <Separator />

        {/* Hosted Events Section */}
        <div className="p-4 md:px-8 md:py-6">
           <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 md:px-2">
              <CardTitle className="text-2xl font-bold flex items-center"><Heart className="mr-3 h-6 w-6 text-secondary"/> Hosted Events</CardTitle>
            </CardHeader>
            <CardContent className="px-0 md:px-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dummyHostedEvents.length > 0 ? dummyHostedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              )) : <p className="text-muted-foreground col-span-full">You haven't hosted any events yet. <Link href="/events/create" className="text-primary hover:underline">Create one now!</Link></p>}
            </CardContent>
          </Card>
        </div>

        <Separator />
        {/* Account Actions */}
        <div className="p-4 md:p-8">
          <Button variant="outline" className="w-full mb-3 border-muted hover:border-primary hover:text-primary">
            <ShieldCheck className="mr-2 h-4 w-4" /> Moderation & Safety
          </Button>
          <Button variant="destructive" className="w-full bg-destructive/80 hover:bg-destructive text-destructive-foreground">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>

      </div>
    </div>
  );
}
