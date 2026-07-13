import { Link } from "react-router";
import { useFetcher } from "react-router";

import { LogOut } from "lucide-react";

import { useNavs } from "~/hooks/use-navigation";
import { useUserStore } from "~/store/userStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";

export function UserNav() {
  const navigation = useNavs();

  const user = useUserStore((state) => state.user);

  const logoutFetcher = useFetcher<ApiSuccess | ApiError>();

  if (!user) return null;

  return (
    <div className="flex items-center gap-8">
      {/* Header Navigation */}
      <menu className="hidden items-center gap-6 md:flex">
        {navigation.header.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {Icon && <Icon size={18} />}

                {!Icon && item.title}
              </Link>
            </li>
          );
        })}
      </menu>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={user.profile?.avatar?.secure_url ?? "/default-avatar.svg"}
                alt={user.username}
              />

              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user.username}</span>

              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {navigation.dropdown.map((item) => (
              <DropdownMenuItem key={item.to} asChild>
                <Link
                  to={item.to}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {item.icon && <item.icon size={16} />}

                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <logoutFetcher.Form method="post" action="/logout">
            <DropdownMenuItem asChild>
              <Button
                type="submit"
                variant="destructive"
                className="w-full justify-between"
              >
                Logout
                <LogOut size={16} />
              </Button>
            </DropdownMenuItem>
          </logoutFetcher.Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
