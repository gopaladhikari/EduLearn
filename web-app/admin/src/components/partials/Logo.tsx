import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a">;

export function Logo({ className, ...props }: Props) {
  const { isLoggedIn } = useAuth();
  return (
    <Link
      to={isLoggedIn ? "/dashboard" : "/"}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="text-blue-400" />
        <span className="text-2xl font-bold">EduLearn</span>
      </div>
    </Link>
  );
}
