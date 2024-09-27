import { cn } from "@/lib/utils";
import { FaCircleInfo } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

interface Props {
    icon?: IconType;
    message?: string | null;
    className?: string;
}

export const Message = ({
    icon: Icon = FaCircleInfo,
    message,
    className
}: Props) => {
    if (!message) return;

    return (
        <div className={cn("p-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-sky-500/15 text-sky-500", className)}>
            <Icon className="size-2.5" />
            <p>{message}</p>
        </div>
    )
}