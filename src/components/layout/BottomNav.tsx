"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, MessageCircle, Users, User, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/events/create', label: 'Create', icon: PlusCircle, isCentral: true },
  { href: '/people', label: 'People', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border/50 shadow-soft flex justify-around items-center md:hidden z-50">
      {navItems.map((item) => {
        const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a
              className={cn(
                "flex flex-col items-center justify-center text-xs p-2 rounded-md transition-all duration-200 ease-in-out",
                "hover:text-primary hover:scale-105",
                isActive ? "text-primary scale-105" : "text-muted-foreground",
                item.isCentral ? "transform scale-110 -translate-y-2 bg-primary text-primary-foreground rounded-full w-14 h-14 shadow-glow-primary hover:bg-primary/90" : "w-16 h-full"
              )}
              aria-label={item.label}
            >
              <Icon className={cn("w-6 h-6 mb-0.5", item.isCentral && "text-primary-foreground")} />
              {!item.isCentral && <span className="truncate">{item.label}</span>}
              {isActive && !item.isCentral && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full glowing-border-primary" />
              )}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
