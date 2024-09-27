"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import { FaSpinner } from "react-icons/fa6";

interface TaskStatusCircleProps {
    status: TaskStatus;
    selected?: TaskStatus;
    onSelect?: (status?: TaskStatus) => void
}

export const TaskStatusCircle = ({
    status,
    selected,
    onSelect
}: TaskStatusCircleProps) => {
    const isSelected = status === selected;

    const handleClick = () => {
        if (onSelect) {
            onSelect(status);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={isSelected}
            className={cn(
                "size-2.5 rounded-full opacity-50 hover:opacity-100 transition disabled:pointer-events-none disabled:opacity-100",
                status === "COMPLETED" && "bg-green-500",
                status === "IN_PROGRESS" && "bg-amber-500",
                status === "CANCELLED" && "bg-red-500",
            )}
        />
    )
}

interface Props {
    selected?: TaskStatus;
    onChange?: (status: TaskStatus) => void;
    isPending?: boolean;
}

export const TaskStatusPicker = ({
    selected,
    onChange,
    isPending
}: Props) => {
    const onClick = (status?: TaskStatus) => {
        if (onChange && status) {
            onChange(status);
        }
    }

    return (
        <div className="flex items-center gap-1.5">
            {isPending && (
                <FaSpinner
                    className="size-2.5 animate-spin text-zinc-400 mr-2"
                />
            )}
            <TaskStatusCircle
                status="COMPLETED"
                selected={selected}
                onSelect={onClick}
            />
            <TaskStatusCircle
                status="IN_PROGRESS"
                selected={selected}
                onSelect={onClick}
            />
            <TaskStatusCircle
                status="CANCELLED"
                selected={selected}
                onSelect={onClick}
            />
        </div>
    )
}