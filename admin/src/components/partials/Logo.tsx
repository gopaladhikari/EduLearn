import { cn } from "@/lib/utils";
import { useMe } from "@/store/user-store";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { type ComponentProps } from "react";

type Props = ComponentProps<"a">;

export function Logo({ className, ...props }: Props) {
  const user = useMe();

  return (
    <Link
      to={user ? "/dashboard" : "/"}
      {...props}
      className={cn("group flex w-fit items-center gap-2", className)}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="text-blue-600 group-hover:animate-spin" />
        <strong className="text-2xl font-bold">EduLearn</strong>
      </div>
    </Link>
  );
}
