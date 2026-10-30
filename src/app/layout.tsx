import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform',
  description:
    'Discover, inspect, and book photography cyc walls, cinema sound stages, podcast lounges, music recording suites, and art workshops with transparent pricing and real-time scheduling.',
  keywords: [
    'studio rental',
    'photo studio',
    'film stage',
    'podcast studio',
    'recording studio',
    'creative workspace',
    'production space',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<div className="h-18 border-b border-zinc-200 dark:border-zinc-800" />}>
              <Navbar />
            </Suspense>
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
