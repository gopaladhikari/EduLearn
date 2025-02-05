import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useState, type ComponentProps } from "react";

type Props = ComponentProps<"a">;

export function Logo({ className, ...props }: Props) {
  const { isLoggedIn } = useAuth();
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(true);
  };

  return (
    <Link
      to={isLoggedIn ? "/dashboard" : "/"}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="flex items-center gap-2">
        <BookOpen
          onClick={handleClick}
          className={cn("text-blue-400", isRotated && "spin-once")}
        />
        <strong className="text-2xl font-bold">EduLearn</strong>
      </div>
    </Link>
  );
}
