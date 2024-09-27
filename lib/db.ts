import { PrismaClient } from '@prisma/client'

declare global {
    let prisma: PrismaClient | undefined;
}

// @ts-expect-error VERCEL
const db = globalThis.prisma || new PrismaClient();

// @ts-expect-error VERCEL
if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export { db };