"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientButton } from '@/components/shared/GradientButton';
import { CalendarDays, MapPin, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
  description?: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (event.date) {
      try {
        setFormattedDate(new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      } catch (error) {
        console.error("Error formatting date:", error);
        // Fallback or keep as null if date is invalid
        setFormattedDate("Invalid date");
      }
    }
  }, [event.date]);

  return (
    <Card className="overflow-hidden shadow-soft hover:shadow-glow-primary transition-shadow duration-300 flex flex-col h-full bg-card border-border">
      <CardHeader className="p-0 relative">
        <Link href={`/events/${event.id}`} passHref className="block">
          <div className="aspect-[16/9] relative w-full">
            <Image
              src={event.imageUrl || `https://picsum.photos/seed/${event.id}/400/225`}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="event concert party"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/events/${event.id}`} passHref>
          <CardTitle className="text-xl font-bold mb-2 hover:text-primary transition-colors truncate">{event.title}</CardTitle>
        </Link>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-secondary" />
            <span>{formattedDate || 'Loading date...'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-secondary" />
            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">{event.category}</Badge>
          </div>
        </div>
        {event.description && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{event.description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/events/${event.id}`} passHref className="w-full">
          <GradientButton className="w-full">
            View Details
          </GradientButton>
        </Link>
      </CardFooter>
    </Card>
  );
}
