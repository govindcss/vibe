import Link from 'next/link';
import Header from '@/components/layout/Header';
import { EventCard, type Event } from '@/components/events/EventCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, PlusCircle, Search } from 'lucide-react';
import { GradientButton } from '@/components/shared/GradientButton';

// Dummy data for events
const dummyEvents: Event[] = [
  { id: '1', title: 'Summer Music Fest', date: '2024-07-20', location: 'Central Park', category: 'Music', imageUrl: 'https://picsum.photos/seed/summerfest/600/338' },
  { id: '2', title: 'Tech Innovators Summit', date: '2024-08-05', location: 'Convention Center', category: 'Tech', imageUrl: 'https://picsum.photos/seed/techsummit/600/338' },
  { id: '3', title: 'Art & Design Expo', date: '2024-08-15', location: 'City Art Gallery', category: 'Art', imageUrl: 'https://picsum.photos/seed/artexpo/600/338' },
  { id: '4', title: 'Local Food Fair', date: '2024-09-01', location: 'Market Square', category: 'Food', imageUrl: 'https://picsum.photos/seed/foodfair/600/338' },
  { id: '5', title: 'Beach Party Bonanza', date: '2024-07-28', location: 'Sunny Beach', category: 'Party', imageUrl: 'https://picsum.photos/seed/beachparty/600/338' },
  { id: '6', title: 'Indie Film Night', date: '2024-08-10', location: 'Indie Cinema House', category: 'Film', imageUrl: 'https://picsum.photos/seed/filmnight/600/338' },
];

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Discover Events" 
        actions={
          <Link href="/events/create" passHref>
            <GradientButton size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Event
            </GradientButton>
          </Link>
        }
      />
      <div className="p-4 md:p-6 flex-grow">
        {/* Filters Section */}
        <div className="mb-6 p-4 bg-card rounded-lg shadow-soft border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="relative">
              <Input type="text" placeholder="Search events..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="film">Film</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Date" />
            <Button variant="outline" className="w-full text-foreground hover:bg-primary/10 hover:text-primary">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {dummyEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No events found. Try adjusting your filters or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
