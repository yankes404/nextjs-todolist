import { FaCircleCheck } from "react-icons/fa6";
import { Message } from "./message";

interface Props {
    message?: string | null;
}

export const SuccessMessage = ({ message }: Props) => (
    <Message
        message={message}
        icon={FaCircleCheck}
        className="bg-emerald-500/15 text-emerald-500"
    />
)