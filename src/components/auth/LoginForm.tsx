"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/shared/GradientButton";
import { Mail, Lock, Smartphone, UserPlus } from 'lucide-react'; // Smartphone for phone login

const loginFormSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Mail className="mr-2 h-4 w-4 text-primary"/>Email or Phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="you@example.com or +1234567890" {...field} className="text-base py-3 px-4" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-primary"/>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="text-base py-3 px-4" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Link href="/auth/forgot-password">
              <Button variant="link" type="button" className="text-sm text-primary hover:underline px-0">
                Forgot password?
              </Button>
            </Link>
          </div>
          <GradientButton type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </GradientButton>
        </form>
      </Form>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {/* Placeholder for Social Logins */}
        <Button variant="outline" className="w-full py-3 text-base border-input hover:border-primary hover:text-primary">
          <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.5 512 0 401.5 0 268C0 134.5 110.5 24 244 24c58.9 0 113.4 22.6 152.8 60.4l-56.3 56.3C313.5 117.2 280.5 104 244 104c-63.5 0-116.2 49.8-122.8 113.5H244v86.2h244z"></path></svg>
          Sign in with Google
        </Button>
        {/* Add other social logins like Apple, Facebook etc. */}
      </div>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
          Sign Up <UserPlus className="inline h-4 w-4 ml-1"/>
        </Link>
      </p>
    </div>
  );
}
