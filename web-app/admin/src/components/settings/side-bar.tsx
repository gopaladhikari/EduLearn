import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { menu } from "@/config/site";
import { buttonVariants } from "../ui/button";

type SidebarNavProps = React.HTMLAttributes<HTMLElement>;

export function SidebarNav({ ...props }: SidebarNavProps) {
  const { pathname } = useLocation();

  return (
    <nav {...props}>
      <menu className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {menu.settings.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-background"
                : "text-muted-foreground hover:bg-background",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        ))}
      </menu>
    </nav>
  );
}
