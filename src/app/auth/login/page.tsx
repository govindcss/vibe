"use client"; // Required for form handling and client-side navigation

import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    console.log("Login data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example:
    // const success = await attemptLogin(data);
    // if (success) {
      toast({
        title: "Logged In!",
        description: "Welcome back to VibeWave!",
      });
      router.push('/'); // Redirect to home or dashboard
    // } else {
    //   toast({
    //     title: "Login Failed",
    //     description: "Invalid credentials. Please try again.",
    //     variant: "destructive",
    //   });
    // }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl bg-card border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold glowing-text-primary">Welcome Back!</CardTitle>
        <CardDescription className="text-muted-foreground">Log in to continue your VibeWave journey.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
