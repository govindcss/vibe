"use client"; // Required for form handling

import Header from '@/components/layout/Header';
import { EventForm } from '@/components/events/EventForm';
import { useToast } from "@/hooks/use-toast"; // Corrected import path for useToast
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = async (data: any) => {
    setIsLoading(true);
    console.log("Creating event:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Event Created!",
      description: `Your event "${data.title}" has been successfully created.`,
      variant: "default", // success variant if available/customized
    });
    setIsLoading(false);
    router.push('/events'); // Redirect to events page or event detail page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Create New Event" showBackButton />
      <div className="flex-grow p-4 md:p-8 max-w-2xl mx-auto w-full">
        <EventForm onSubmit={handleCreateEvent} isLoading={isLoading} />
      </div>
    </div>
  );
}
