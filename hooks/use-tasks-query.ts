"use client";

import { getTasks } from "@/actions/get-tasks";
import { useQuery } from "@tanstack/react-query";

export const useTasksQuery = () => useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks()
});