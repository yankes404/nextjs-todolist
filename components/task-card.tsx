import { Task } from "@/types/Task";
import { FaTrash } from "react-icons/fa6";
import { TaskStatusPicker } from "./task-status-picker";

interface Props extends Task {};

export const TaskCard = ({
    title,
    description,
    status
}: Props) => {
    return (
        <div className="w-full flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition select-none py-2.5">
            <div className="flex flex-col gap-1.5">
                <strong className="text-sm font-semibold drop-shadow">
                    {title}
                </strong>
                {description && (
                    <p className="text-[11px] font-medium text-zinc-100 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <TaskStatusPicker
                    selected={status}
                />
                <button className="text-xs text-zinc-400 hover:text-white transition">
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}