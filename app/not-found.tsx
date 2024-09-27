import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Notfound () {
    return (
        <div className="w-screen h-screen bg-zinc-950 p-4 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center">
                <strong className="text-xl font-semibold pr-4 mr-4 border-r border-zinc-700">
                    404
                </strong>
                <p className="text-sm font-medium text-zinc-500">
                    This page couldn&apos;t be found
                </p>
            </div>
            <Button
                size="sm"
                asChild
            >
                <Link
                    href="/"
                >
                    Home
                </Link>
            </Button>
        </div>
    )
}