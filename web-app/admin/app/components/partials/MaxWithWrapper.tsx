import { cn } from "~/utils/cn";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export function MaxWithWrapper({ children, className }: Props) {
	return (
		<div className={cn("mx-auto max-w-screen-xl p-4", className)}>
			{children}
		</div>
	);
}
