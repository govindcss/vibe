import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <Link href="/" className="mb-8">
        <div className="flex items-center space-x-2">
           {/* Placeholder for VibeWave logo */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.24 16.24C15.07 17.41 13.59 18 12 18C10.41 18 8.93 17.41 7.76 16.24C6.59 15.07 6 13.59 6 12C6 10.41 6.59 8.93 7.76 7.76C8.93 6.59 10.41 6 12 6C13.59 6 15.07 6.59 16.24 7.76C18.59 10.11 18.59 13.89 16.24 16.24Z" fill="hsl(var(--primary))"/>
            <path d="M12 8C11.76 8 11.52 8.04 11.29 8.11C10.31 8.37 9.56 9.03 9.18 9.92C8.87 10.66 9.16 11.5 9.79 11.97C10.42 12.44 11.29 12.34 11.82 11.77L12.99 12.94C12.57 13.65 11.71 14.08 10.83 14.08C9.67 14.08 8.65 13.39 8.19 12.35C7.62 11.09 8.05 9.62 9.11 8.82C9.91 8.21 10.91 7.99 11.82 8.03L12 8Z" fill="hsl(var(--background))"/>
          </svg>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            VibeWave
          </span>
        </div>
      </Link>
      <main className="w-full max-w-md">
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VibeWave. All rights reserved.</p>
        <p>
          <Link href="/terms" className="hover:text-primary hover:underline">Terms of Service</Link> | <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}
