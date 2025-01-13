import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  as?: React.ElementType;
};

export function MaxWithWrapper({
  children,
  className,
  as: Component = "div",
  ...prop
}: Props) {
  return (
    <Component
      className={cn("mx-auto max-w-screen-xl px-4", className)}
      {...prop}
    >
      {children}
    </Component>
  );
}
