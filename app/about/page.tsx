import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    href: string;
    text?: string;
}

export const ButtonLink = ({
    href,
    text
}: Props) => (
    <Button asChild size="sm" variant="link" className="p-0"><Link href={href} target="_blank">{text || href.replace("http://", "").replace("https://", "")}</Link></Button>
)

export default function AboutPage () {
    return (
        <div className="p-4 sm:p-8 sm:max-w-[464px]">
            <h1 className="text-lg font-semibold">About</h1>
            <div className="text-xs text-zinc-400 font-medium mt-2">
                The app was written to demonstrate my skills in <ButtonLink text="NextJS" href="https://nextjs.org" />, <ButtonLink text="ReactJS" href="https://react.dev" />, <ButtonLink text="Prisma" href="https://www.prisma.io" />, <ButtonLink text="TailwindCSS" href="https://tailwindcss.com" />, <ButtonLink text="TanStack Query" href="https://tanstack.com" /> . You can find the entire repository of this project and detailed information at <ButtonLink href="https://github.com/yankes404/nextjs-todolist" />.
            </div>
        </div>
    )
}