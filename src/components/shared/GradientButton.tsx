"use client";

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonProps {
  gradient?: string;
  glowEffect?: 'primary' | 'secondary' | 'accent' | 'none';
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, gradient = 'bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))]', glowEffect = 'primary', ...props }, ref) => {
    const glowClass = {
      primary: 'shadow-glow-primary',
      secondary: 'shadow-glow-secondary',
      accent: 'shadow-glow-accent',
      none: '',
    }[glowEffect];
    
    return (
      <Button
        ref={ref}
        className={cn(
          gradient,
          'text-primary-foreground hover:opacity-90 transition-opacity',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          glowEffect !== 'none' && `hover:${glowClass} focus:${glowClass}`,
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { GradientButton };
