
import { Metadata } from 'next';
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

import { ClerkProvider } from '@/components/providers/clerck-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "TaskyApp",
  description: "Manage your tasks easly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    >
      <QueryProvider>
        <html lang="en-US">
          <body
            className={cn(poppins.className, "dark")}
          >
            <Toaster />
            <div className='fixed m-2 sm:mt-8 sm:mr-10 top-0 right-0'>
              <SignedOut>
                <Button asChild>
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
