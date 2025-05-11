"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientButton } from '@/components/shared/GradientButton';
import { Heart, Zap, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  imageUrl: string;
  distance?: string; // e.g., "2 miles away"
  commonEvents?: number;
}

interface PersonCardProps {
  person: Person;
  onVibe?: (id: string) => void;
  onSkip?: (id: string) => void;
}

export function PersonCard({ person, onVibe, onSkip }: PersonCardProps) {
  return (
    <Card className="overflow-hidden shadow-soft w-full max-w-sm mx-auto relative group bg-card border-border">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={person.imageUrl}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
          data-ai-hint="person portrait lifestyle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">{person.name}, {person.age}</h3>
          {person.distance && <p className="text-sm text-primary-foreground/80">{person.distance}</p>}
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 h-[60px]">{person.bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {person.interests.slice(0, 3).map(interest => (
            <Badge key={interest} variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">{interest}</Badge>
          ))}
        </div>
        {person.commonEvents && person.commonEvents > 0 && (
           <p className="text-xs text-accent"><Zap className="inline w-3 h-3 mr-1"/> {person.commonEvents} event(s) in common</p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-around gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-destructive/50 text-destructive/80 hover:bg-destructive/10 hover:text-destructive rounded-full p-3 aspect-square"
          onClick={() => onSkip?.(person.id)}
          aria-label="Skip"
        >
          <XCircle className="w-7 h-7" />
        </Button>
        <GradientButton
          size="lg"
          className="flex-1 rounded-full p-3 aspect-square shadow-glow-primary hover:shadow-glow-primary"
          onClick={() => onVibe?.(person.id)}
          aria-label="Vibe"
        >
          <Heart className="w-7 h-7" fill="currentColor" />
        </GradientButton>
      </CardFooter>
      {/* Placeholder for swipe interaction hint */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity text-white p-2 bg-black/30 rounded-full text-xs">
        &lt; Skip
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity text-white p-2 bg-black/30 rounded-full text-xs">
        Vibe &gt;
      </div>
    </Card>
  );
}
