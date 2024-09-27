"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import * as z from "zod";
import { CreateTaskSchema } from "@/schemas";

export const createTask = async (values: z.infer<typeof CreateTaskSchema>) => {
    try {
        const { userId } = auth();
    
        if (!userId) return;
    
        const validatedFields = CreateTaskSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields!" }
        }
    
        const { title, description } = validatedFields.data;
    
        await db.task.create({
            data: {
                title,
                description,
                author: userId
            }
        });

        return { success: "Successfully created task!" }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
            throw new Error("Erroe while creating task!");
        }

        return { error: "Sorry, something went wrong!" };
    }
}