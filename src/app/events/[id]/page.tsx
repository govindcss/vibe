import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { GradientButton } from '@/components/shared/GradientButton';
import { CalendarDays, MapPin, Users, MessageCircle, Tag, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Dummy data for a single event - replace with actual data fetching
const getEventDetails = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (id === '1') {
    return {
      id: '1',
      title: 'Summer Music Fest',
      date: '2024-07-20T18:00:00Z',
      location: 'Central Park Amphitheater, New York, NY',
      category: 'Music',
      imageUrl: 'https://picsum.photos/seed/summerfestdetailed/1200/600',
      description: 'Join us for an unforgettable night under the stars with top DJs and live bands. Summer Music Fest brings together the best electronic and indie music artists for a high-energy experience. Expect stunning visual displays, food trucks, and a vibrant crowd ready to dance the night away. This is the ultimate summer celebration you don\'t want to miss!',
      tags: ['Live Music', 'DJ Set', 'Outdoor', 'Festival', 'Summer'],
      attendees: 2345,
      organizer: 'VibeWave Presents',
      price: 25.00,
    };
  }
  // Fallback or not found
  return null; 
};


export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEventDetails(params.id);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Event Not Found" showBackButton />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-2xl text-muted-foreground">Sorry, the event you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={event.title} showBackButton />
      <div className="flex-grow">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
            data-ai-hint="event concert crowd"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2 shadow-black [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{event.title}</h1>
            <Badge variant="secondary" className="text-sm bg-primary/80 text-primary-foreground backdrop-blur-sm">{event.category}</Badge>
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <Card className="mb-6 shadow-soft bg-card border-border">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CalendarDays className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Date & Time</h3>
                  <p className="text-muted-foreground">{new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                  <a href="#" className="text-sm text-secondary hover:underline">View on map (placeholder)</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Attendees</h3>
                  <p className="text-muted-foreground">{event.attendees} going</p>
                </div>
              </div>
               <div className="flex items-start space-x-3">
                <Ticket className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Price</h3>
                  <p className="text-muted-foreground">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6 shadow-soft bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">About this event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{event.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-accent text-accent hover:bg-accent/10">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="my-8 flex flex-col sm:flex-row gap-4">
            <GradientButton size="lg" className="flex-1 py-4 text-lg">
              <Ticket className="mr-2 h-5 w-5" /> RSVP / Join Event
            </GradientButton>
            <GradientButton variant="outline" size="lg" className="flex-1 py-4 text-lg border-secondary text-secondary hover:bg-secondary/10">
              <MessageCircle className="mr-2 h-5 w-5" /> Join Group Chat
            </GradientButton>
          </div>
          
          <Separator className="my-8" />

          {/* Placeholder for Attendees List & Chat */}
          <Card className="shadow-soft bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Attendees list and event chat features coming soon!</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
