"use client";

import { useMutation } from "@tanstack/react-query";

import { createTask } from "@/actions/create-task";

import * as z from "zod";
import { CreateTaskSchema } from "@/schemas";

export const useCreateTaskMutation = () => useMutation({
    mutationKey: ["create-task"],
    mutationFn: (data: z.infer<typeof CreateTaskSchema>) => createTask(data)
});