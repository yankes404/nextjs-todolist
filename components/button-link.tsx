import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
    href: string;
    text?: string;
}

export const ButtonLink = ({
    href,
    text
}: Props) => (
    <Button asChild size="sm" variant="link" className="p-0">
        <Link href={href} target="_blank">{text || href.replace("http://", "").replace("https://", "")}</Link>
    </Button>
)