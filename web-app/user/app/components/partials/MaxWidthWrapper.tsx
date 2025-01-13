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
    <Component className={cn("mx-auto max-w-7xl", className)} {...props}>
      {children}
    </Component>
  );
}
