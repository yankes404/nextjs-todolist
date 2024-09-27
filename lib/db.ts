import { PrismaClient } from "@prisma/client";

declare global {
    let prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();