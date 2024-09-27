import { deleteTask } from "@/actions/delete-task";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTaskMutation = (id: string) => useMutation({
    mutationKey: ["delete-task", id],
    mutationFn: (id: string) => deleteTask(id)
})