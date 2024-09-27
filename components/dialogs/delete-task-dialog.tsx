"use client";

import { useState } from "react";
import { useDeleteTaskMutation } from "@/hooks/use-delete-task-mutation";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { queryClient } from "@/query-client";

interface Props {
    id: string;
    children: React.ReactNode;
}

export const DeleteTaskDialog = ({
    id,
    children
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const mutation = useDeleteTaskMutation(id);

    const onDelete = () => {
        mutation.mutate(id, {
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

                setIsOpen(false);
            },
            onSuccess: () => {
                queryClient.refetchQueries({
                    queryKey: ["tasks"]
                })
            }
        })
    }

    return (
        <AlertDialog
            defaultOpen={isOpen}
            open={isOpen}
            onOpenChange={(open) => {
                if (!mutation.isPending) {
                    setIsOpen(open);
                }
            }}
        >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this task from our database!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={mutation.isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={mutation.isPending}
                        onClick={onDelete}
                    >
                        {mutation.isPending ? (
                            <FaSpinner className="animate-spin mr-1.5" />
                        ): (
                            <FaTrash className="mr-1.5" />
                        )}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}