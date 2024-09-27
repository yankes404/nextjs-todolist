"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import { Task } from "@prisma/client";

export const getTasks = async (): Promise<Task[]> => {
    const { userId } = auth();

    if (!userId) return [];

    try {
        const tasks = db.task.findMany({
            where: {
                author: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return tasks;
    } catch (error) {
        console.error(error);
        if (process.env.NODE_ENV !== "production") {
            throw new Error("Erroe while fetching user tasks!");
        }

        return [];
    }
}