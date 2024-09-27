import { FaSpinner } from "react-icons/fa6";

export default function Loading () {
    return (
        <div className="w-screen h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 gap-4">
            <FaSpinner className="size-4 text-neutral-400 animate-spin" />
            <p className="text-neutral-500 text-sm font-semibold">
                Please wait, this page is currently loading...
            </p>
        </div>
    )
}