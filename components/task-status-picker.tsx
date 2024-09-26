"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/Task";

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
                status === "completed" && "bg-green-500",
                status === "in_progress" && "bg-amber-500",
                status === "cancelled" && "bg-red-500",
            )}
        />
    )
}

interface Props {
    selected?: TaskStatus;
    onChange?: (status: TaskStatus) => void;
}

export const TaskStatusPicker = ({
    selected,
    onChange
}: Props) => {
    const onClick = (status?: TaskStatus) => {
        if (onChange && status) {
            onChange(status);
        }
    }

    return (
        <div className="flex items-center gap-1.5">
            <TaskStatusCircle
                status="completed"
                selected={selected}
                onSelect={onClick}
            />
            <TaskStatusCircle
                status="in_progress"
                selected={selected}
                onSelect={onClick}
            />
            <TaskStatusCircle
                status="cancelled"
                selected={selected}
                onSelect={onClick}
            />
        </div>
    )
}