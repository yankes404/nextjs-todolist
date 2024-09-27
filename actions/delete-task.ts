"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const deleteTask = async (
    id: string,
) => {
    try {
        const { userId } = auth();
    
        if (!userId) return { error: "You're not signed in!" }
    
        const isTaskExist = await db.task.findUnique({ where: { id }, select: { id: true, author: true } });
    
        if (!isTaskExist) return { error: "This task is not exist!" }
    
        if (isTaskExist.author !== userId) return { error: "This task is not owned by you!" }

        await db.task.delete({
            where: { id },
        })

        return { success: "Successfully deleted task!" }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
            throw new Error("Erroe while deleting task!");
        }

        return { error: "Sorry, something went wrong!" }
    }
}