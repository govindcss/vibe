import Link from 'next/link';
import Image from 'next/image';
import { GradientButton } from '@/components/shared/GradientButton';
import { EventCard } from '@/components/events/EventCard'; // Assuming EventCard is created
import { Music, PartyPopper, Users } from 'lucide-react';

// Dummy data for featured events
const featuredEvents = [
  { id: '1', title: 'Neon Nights Fest', date: '2024-08-15', location: 'Downtown Plaza', category: 'Music', imageUrl: 'https://picsum.photos/seed/neonfest/600/400', description: 'Experience the ultimate music festival with glowing lights and electrifying beats.' },
  { id: '2', title: 'Tech Meetup Wave', date: '2024-08-20', location: 'Innovation Hub', category: 'Tech', imageUrl: 'https://picsum.photos/seed/techmeetup/600/400', description: 'Connect with tech enthusiasts and innovators in your city.' },
  { id: '3', title: 'Wellness Weekend', date: '2024-08-25', location: 'Serene Park', category: 'Wellness', imageUrl: 'https://picsum.photos/seed/wellness/600/400', description: 'Recharge your mind and body with our wellness retreat activities.' },
];


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center">
      <header className="relative w-full max-w-4xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-20 blur-3xl rounded-full"></div>
        <h1 className="relative text-5xl md:text-7xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            VibeWave
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover events, connect with people, and ride the <span className="glowing-text-primary font-semibold">vibe</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/events" passHref>
            <GradientButton size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
              Explore Events
            </GradientButton>
          </Link>
          <Link href="/auth/signup" passHref>
            <GradientButton variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
              Join the Wave
            </GradientButton>
          </Link>
        </div>
      </header>

      <section className="w-full max-w-5xl my-12">
        <h2 className="text-3xl font-bold mb-8 glowing-text-secondary">What's Happening?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl my-12 py-12 bg-card rounded-xl shadow-soft">
        <h2 className="text-3xl font-bold mb-8 glowing-text-accent">Why VibeWave?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="flex flex-col items-center">
            <Music className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
            <p className="text-muted-foreground">From music festivals to local meetups, find your next adventure.</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-16 h-16 text-secondary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect with People</h3>
            <p className="text-muted-foreground">Meet like-minded individuals and expand your circle.</p>
          </div>
          <div className="flex flex-col items-center">
            <PartyPopper className="w-16 h-16 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Your Vibe</h3>
            <p className="text-muted-foreground">Host your own events and share your passions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
