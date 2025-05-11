"use client";

import Header from '@/components/layout/Header';
import { PersonCard, type Person } from '@/components/people/PersonCard';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast'; // Corrected import path for useToast

const dummyPeople: Person[] = [
  { id: 'p1', name: 'Jessie', age: 24, bio: 'Loves hiking, live music, and trying new cafes. Looking for adventure buddies!', interests: ['Music', 'Hiking', 'Coffee', 'Travel'], imageUrl: 'https://picsum.photos/seed/jessie/400/533', distance: '1 mile away', commonEvents: 2 },
  { id: 'p2', name: 'Mike', age: 28, bio: 'Tech enthusiast, gamer, and foodie. Always down for a good board game night.', interests: ['Gaming', 'Tech', 'Food', 'Sci-Fi'], imageUrl: 'https://picsum.photos/seed/mike/400/533', distance: '3 miles away' },
  { id: 'p3', name: 'Sarah', age: 22, bio: 'Art student, loves painting, photography, and exploring museums.', interests: ['Art', 'Photography', 'Museums', 'Indie Films'], imageUrl: 'https://picsum.photos/seed/sarah/400/533', distance: '0.5 miles away', commonEvents: 1 },
  { id: 'p4', name: 'David', age: 30, bio: 'Fitness junkie, enjoys running, cycling, and healthy cooking.', interests: ['Fitness', 'Running', 'Cooking', 'Outdoors'], imageUrl: 'https://picsum.photos/seed/david/400/533', distance: '5 miles away' },
];

export default function PeoplePage() {
  const { toast } = useToast();
  const [people, setPeople] = useState<Person[]>(dummyPeople);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVibe = (id: string) => {
    const person = people.find(p => p.id === id);
    toast({ title: "Vibed!", description: `You sent a vibe to ${person?.name || 'them'}! ✨` });
    // Here you would typically remove the card or show next
    showNextPerson();
  };

  const handleSkip = (id: string) => {
    const person = people.find(p => p.id === id);
    toast({ title: "Skipped", description: `You skipped ${person?.name || 'them'}.`, variant: "default" });
     // Here you would typically remove the card or show next
    showNextPerson();
  };

  const showNextPerson = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
    // In a real app, you'd fetch new people or handle empty states.
    // For this demo, we'll cycle through. If you want to "remove" them:
    // setPeople(prevPeople => prevPeople.filter((_, index) => index !== currentIndex));
    // This would require more complex index management or state.
  };
  
  const currentPerson = people[currentIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Discover People"
        actions={
          <>
            <Button variant="ghost" size="icon" aria-label="Filters">
              <Filter className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Refresh" onClick={() => setCurrentIndex(0) /* Simplistic refresh */}>
              <RefreshCw className="h-5 w-5 text-primary" />
            </Button>
          </>
        }
      />
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 space-y-6">
        {currentPerson ? (
          <div className="w-full max-w-sm">
            <PersonCard 
              person={currentPerson}
              onVibe={() => handleVibe(currentPerson.id)}
              onSkip={() => handleSkip(currentPerson.id)}
            />
             <p className="text-center text-xs text-muted-foreground mt-4">
              Swipe left to skip, right to vibe (conceptual)
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl text-muted-foreground mb-4">No more people to show right now.</p>
            <Button onClick={() => { setPeople(dummyPeople); setCurrentIndex(0); }} variant="outline">
              Refresh Profiles
            </Button>
          </div>
        )}

        {/* Placeholder for additional controls or info */}
        {people.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing profile {currentIndex + 1} of {people.length}
          </div>
        )}
      </div>
    </div>
  );
}
