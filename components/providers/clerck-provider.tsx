"use client";

import { ClerkProvider as CProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

interface Props {
    children: React.ReactNode;
}

export const ClerkProvider = ({ children }: Props) => {
    return (
        <CProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            {children}
        </CProvider>
    )
}