import { FaTriangleExclamation } from "react-icons/fa6";
import { Message } from "./message";

interface Props {
    message?: string | null;
}

export const ErrorMessage = ({ message }: Props) => (
    <Message
        message={message}
        icon={FaTriangleExclamation}
        className="bg-destructive/15 text-destructive"
    />
)