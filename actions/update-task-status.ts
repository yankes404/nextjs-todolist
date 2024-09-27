"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

export const updateTaskStatus = async (
    id: string,
    status: TaskStatus
) => {
    try {
        const { userId } = auth();
    
        if (!userId) return { error: "You're not signed in!" }
    
        const isTaskExist = await db.task.findUnique({ where: { id }, select: { id: true, status: true, author: true } });
    
        if (!isTaskExist) return { error: "This task is not exist!" }
    
        if (isTaskExist.author !== userId) return { error: "This task is not owned by you!" }

        if (isTaskExist.status === status) return { error: "The status of this task is already fixed on the given!" }

        await db.task.update({
            where: { id },
            data: { status }
        })

        return { success: "Successfully updated task!" }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
            throw new Error("Erroe while updating task!");
        }

        return { error: "Sorry, something went wrong!" }
    }
}