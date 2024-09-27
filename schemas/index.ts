import * as z from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(1, { message: "You have to enter a title!" }).max(32, { message: "Title is too long!" }),
    description: z.optional(z.string().max(48, { message: "Description is too long!" })),
})