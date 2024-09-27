"use client";

import { useMutation } from "@tanstack/react-query";

import { updateTaskStatus } from "@/actions/update-task-status";

import { TaskStatus } from "@prisma/client";

export const useUpdateTaskMutation = (id: string) => useMutation({
    mutationKey: ["update-task", id],
    mutationFn: (status: TaskStatus) => updateTaskStatus(id, status)
});