import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function MaxWithWrapper({
  children,
  className,
  as: Component = "div",
  ...prop
}: Props) {
  return (
    <Component
      className={cn("container mx-auto space-y-12 p-4", className)}
      {...prop}
    >
      {children}
    </Component>
  );
}
