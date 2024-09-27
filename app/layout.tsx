"use client";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import { Poppins } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/query-client';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <html lang="en">
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
      </QueryClientProvider>
    </ClerkProvider>
  );
}
