import { cn } from "@/lib/utils";
import type {
  ComponentProps,
  ElementType,
  PropsWithChildren,
} from "react";

type Props = PropsWithChildren<
  ComponentProps<"div"> & {
    as?: ElementType;
  }
>;

export function MaxWidthWrapper({
  className,
  as: Component = "div",
  children,
  ...props
}: Props) {
  return (
    <Component
      className={cn("max-w-7xl mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
