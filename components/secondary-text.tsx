interface Props {
    children: React.ReactNode;
}

export const SecondaryText = ({ children }: Props) => (
    <div className="text-xs font-semibold text-neutral-400 text-center h-9 flex items-center justify-center">
        {children}
    </div>
)