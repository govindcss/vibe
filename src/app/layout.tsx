
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import BottomNav from '@/components/layout/BottomNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
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
    <html lang="en" className="dark">
      <head />
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning={true}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-20 md:pb-0">
            {children}
          </main>
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

