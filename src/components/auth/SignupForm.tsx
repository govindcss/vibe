"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';
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
import { Checkbox } from "@/components/ui/checkbox";
import { GradientButton } from "@/components/shared/GradientButton";
import { User, Mail, Lock, Smartphone, LogIn } from 'lucide-react';

const signupFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  // phone: z.string().optional(), // Add phone validation if needed
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // path of error
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
  isLoading?: boolean;
}

export function SignupForm({ onSubmit, isLoading }: SignupFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      // phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><User className="mr-2 h-4 w-4 text-primary"/>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Alex Wave Rider" {...field} className="text-base py-3 px-4"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Mail className="mr-2 h-4 w-4 text-primary"/>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="text-base py-3 px-4"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone number field can be added here if needed */}
          {/* <FormField ... name="phone" ... /> */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-primary"/>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Create a strong password" {...field} className="text-base py-3 px-4"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-primary"/>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} className="text-base py-3 px-4"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 bg-card">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the VibeWave <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <GradientButton type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </GradientButton>
        </form>
      </Form>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
        </div>
      </div>

       <div className="mt-6 grid grid-cols-1 gap-3">
        {/* Placeholder for Social Logins */}
        <Button variant="outline" className="w-full py-3 text-base border-input hover:border-primary hover:text-primary">
           <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.5 512 0 401.5 0 268C0 134.5 110.5 24 244 24c58.9 0 113.4 22.6 152.8 60.4l-56.3 56.3C313.5 117.2 280.5 104 244 104c-63.5 0-116.2 49.8-122.8 113.5H244v86.2h244z"></path></svg>
          Sign up with Google
        </Button>
      </div>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-primary hover:underline">
          Log In <LogIn className="inline h-4 w-4 ml-1"/>
        </Link>
      </p>
    </div>
  );
}
