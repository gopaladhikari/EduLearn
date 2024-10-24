import { cn } from "lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function MaxWithWrapper({
	children,
	className,
	...prop
}: Props) {
	return (
		<div
			className={cn("mx-auto max-w-screen-xl p-4", className)}
			{...prop}
		>
			{children}
		</div>
	);
}
