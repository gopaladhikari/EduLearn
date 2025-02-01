import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import type { ComponentProps } from "react";
import { NavLink } from "react-router";

type Props = ComponentProps<"a">;

export function Logo({ href = "/", className, ...props }: Props) {
  return (
    <NavLink
      to={href}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="text-blue-400" />
        <span className="text-2xl font-bold">EduLearn</span>
      </div>
    </NavLink>
  );
}
