"use server";

import { db } from "@/lib/db";

export const getTasks = async (userId: string) => {
    try {
        const tasks = db.task.findMany({
            where: {
                author: userId
            }
        });

        return tasks;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
            throw new Error("Erroe while fetching user tasks!");
        }

        return [];
    }
}