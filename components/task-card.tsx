import { Task, TaskStatus } from "@prisma/client";
import { FaTrash } from "react-icons/fa6";
import { TaskStatusPicker } from "./task-status-picker";
import { useUpdateTaskMutation } from "@/hooks/use-update-task-mutation";
import { toast } from "sonner";
import { queryClient } from "@/app/layout";
import { DeleteTaskDialog } from "./dialogs/delete-task-dialog";

interface Props extends Task {};

export const TaskCard = ({
    id,
    title,
    description,
    status
}: Props) => {
    const mutation = useUpdateTaskMutation(id);

    const onUpdate = (status: TaskStatus) => {
        mutation.mutate(status, {
            onSettled: (data, error) => {
                const err = data?.error || (error ? "Sorry, something went wrong! Please try again later." : null);

                if (err) {
                    toast.error("Error", {
                        description: err
                    })
                } else if (data?.success) {
                    toast.success("Success", {
                        description: data.success,
                    })
                }
            },
            onSuccess: () => {
                queryClient.refetchQueries({
                    queryKey: ["tasks"]
                })
            }
        })
    }

    return (
        <div className="w-full flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition select-none py-2.5">
            <div className="flex flex-col gap-1.5">
                <strong className="text-sm font-semibold drop-shadow">
                    {title}
                </strong>
                {description && (
                    <p className="text-[11px] font-medium text-zinc-400 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <TaskStatusPicker
                    selected={status}
                    onChange={onUpdate}
                    isPending={mutation.isPending}
                />
                <DeleteTaskDialog id={id}>
                    <button className="text-xs text-zinc-400 hover:text-white transition">
                        <FaTrash />
                    </button>
                </DeleteTaskDialog>
            </div>
        </div>
    )
}