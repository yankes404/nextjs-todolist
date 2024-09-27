import { ButtonLink } from "@/components/button-link";

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