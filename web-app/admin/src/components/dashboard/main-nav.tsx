import { menu } from "@/config/site";
import { Link } from "@tanstack/react-router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={className} {...props}>
      <menu className="flex items-center space-x-4 lg:space-x-6">
        {menu.auth.map((item) => {
          return (
            <li key={item.name}>
              <Link
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeOptions={{
                  exact: false,
                }}
                activeProps={{
                  className: "text-primary",
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </menu>
    </nav>
  );
}
