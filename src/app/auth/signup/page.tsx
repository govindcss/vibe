"use client"; // Required for form handling and client-side navigation

import { SignupForm } from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: any) => {
    setIsLoading(true);
    console.log("Signup data:", data);
    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example:
    // const success = await attemptSignup(data);
    // if (success) {
      toast({
        title: "Account Created!",
        description: "Welcome to VibeWave! Please check your email to verify your account.",
      });
      router.push('/profile/setup'); // Redirect to profile setup or login
    // } else {
    //   toast({
    //     title: "Signup Failed",
    //     description: "Could not create account. Please try again.",
    //     variant: "destructive",
    //   });
    // }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl bg-card border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold glowing-text-primary">Join the Vibe!</CardTitle>
        <CardDescription className="text-muted-foreground">Create your VibeWave account and start exploring.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
