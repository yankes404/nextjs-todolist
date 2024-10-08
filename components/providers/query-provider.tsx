"use client";

import {
    QueryClientProvider
  } from "@tanstack/react-query";
  
import { queryClient } from '@/query-client';

interface Props {
    children: React.ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider
            client={queryClient}
        >
            {children}
        </QueryClientProvider>
    )
}