"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "@/hooks/use-create-task-mutation";

import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskSchema } from "@/schemas";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessMessage } from "../form/success-message";
import { ErrorMessage } from "../form/error-message";

import { FaPlus, FaSpinner } from "react-icons/fa6";
import { queryClient } from "@/query-client";

interface Props {
    children: React.ReactNode;
}

export const CreateTaskDialog = ({ children }: Props) => {
  const mutation = useCreateTaskMutation();

  const [isOpen, setIsOpen] = useState(false);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
        title: "",
        description: ""
    }
  });

  const reset = (resetForm?: boolean) => {
    setSuccess(null);
    setError(null);

    if (resetForm) form.reset();
  }

  const onSubmit = async (
    values: z.infer<typeof CreateTaskSchema>
  ) => {
    reset();
      
    mutation.mutate(values, {
      onSettled: (data, error) => {
          const err = data?.error || (error ? "Sorry, something went wrong! Please try again later." : null);
          if (err) {
              setError(err);
          } else if (data?.success) {
              setSuccess(data.success);
          }
      },
      onSuccess: () => {
          form.reset();
          queryClient.refetchQueries({
              queryKey: ["tasks"]
          })
      }
    })
  }

  return (
    <Dialog
      defaultOpen={isOpen}
      open={isOpen}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          reset(true);
          setIsOpen(open);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {!mutation.isPending && (
          <DialogClose />
        )}
        <DialogHeader>
          <DialogTitle className="text-center">New Task</DialogTitle>
          <DialogDescription className="text-center">
            Create a new task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl {...field}>
                    <Input
                      placeholder="e.g. Walking the dog"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-zinc-500 ml-1">
                      (Not required)
                    </span>
                  </FormLabel>
                  <FormControl {...field}>
                    <Input
                      placeholder="e.g. Walk with my dog to the park"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SuccessMessage message={success} />
            <ErrorMessage message={error} />
            <Button
              size="sm"
              disabled={mutation.isPending}
              className="mt-2"
            >
              {mutation.isPending ? (
                <FaSpinner className="animate-spin mr-1.5" />
              ): (
                <FaPlus className="mr-1.5" />
              )}
              Create task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}