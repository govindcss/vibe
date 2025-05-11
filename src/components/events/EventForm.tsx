"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { GradientButton } from "@/components/shared/GradientButton";
import { CalendarDays, Image as ImageIcon, MapPin, Tag, Type } from "lucide-react";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format."),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)."),
  location: z.string().min(5, "Location must be at least 5 characters.").max(200),
  category: z.string().min(2, "Category is required.").max(50),
  tags: z.string().optional(),
  imageUrl: z.string().url("Invalid URL format.").optional().or(z.literal('')),
  isPrivate: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<EventFormValues>;
  isLoading?: boolean;
}

export function EventForm({ onSubmit, defaultValues, isLoading }: EventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      isPrivate: false,
      ...defaultValues,
      date: defaultValues?.date ? new Date(defaultValues.date).toISOString().split('T')[0] : '', // Format for date input
    },
  });

  function handleSubmit(data: EventFormValues) {
    const combinedDateTime = `${data.date}T${data.time}:00Z`; // Combine date and time
    onSubmit({ ...data, date: combinedDateTime });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><Type className="mr-2 h-5 w-5 text-primary"/>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Neon Night Party" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>Choose a catchy title for your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Event Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell everyone about your event..." rows={5} {...field} className="text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="text-base"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="text-base"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary"/>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Downtown Hub, 123 Main St" {...field} className="text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Music, Tech, Art" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>Help people find your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><Tag className="mr-2 h-5 w-5 text-primary"/>Tags (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., livemusic, networking, festival (comma-separated)" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>Add tags to improve discoverability.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-primary"/>Image URL (optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/image.png" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>A captivating image can attract more attendees.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Private Event</FormLabel>
                <FormDescription>
                  Private events are only visible to invited guests.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <GradientButton type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
          {isLoading ? "Submitting..." : (defaultValues ? "Update Event" : "Create Event")}
        </GradientButton>
      </form>
    </Form>
  );
}
