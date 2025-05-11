import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed to Inter as requested
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import BottomNav from '@/components/layout/BottomNav'; // Import BottomNav

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans', // Keep variable name for compatibility or rename everywhere
});


export const metadata: Metadata = {
  title: 'VibeWave',
  description: 'Connect, Discover, Vibe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark class to html for default dark theme */}
      <head /> {/* Explicitly add head tag to help resolve hydration issues */}
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-20 md:pb-0"> {/* Adjust padding for bottom nav */}
            {children}
          </main>
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
