import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a">;

export function Logo({ href = "/", className, ...props }: Props) {
  return (
    <Link
      to={href}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
        E
      </div>
      <span>Learning</span>
    </Link>
  );
}
