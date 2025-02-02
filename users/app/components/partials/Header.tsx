import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Form, Link, NavLink } from "react-router";
import { MaxWithWrapper } from "./MaxWidthWrapper";
import { CourseCategory } from "@/constant/data";
import type { User } from "@/types";

function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="flex items-start gap-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {user.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <strong>{user.fullName}</strong>
            <p className="text-sm text-muted-foreground">
              test@edulearn.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/my-courses" className="w-full">
              My learning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/cart" className="w-full">
              My cart
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/wishlist" className="w-full">
              Wishlist
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/notifications" className="w-full">
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/messages" className="w-full">
              Messages
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/edit-account" className="w-full">
              Account Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/purchase-history" className="w-full">
              Purchase history
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/support" target="_blank" className="w-full">
              Help and support
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button className="w-full" variant="link">
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ user }: { user: User | null }) {
  return (
    <header className="shadow-md dark:border-b dark:shadow-none">
      <MaxWithWrapper as="search" className="py-5">
        <div className="flex items-center gap-4">
          <Logo />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="scrollbar-thin grid max-h-72 gap-3 overflow-auto p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {Object.values(CourseCategory).map((category) => (
                      <li key={category}>
                        <NavLink
                          to={`/courses/${category
                            .toLocaleLowerCase()
                            .replaceAll(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {category}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Form action="/search" className="w-full">
                  <input
                    placeholder="Search"
                    name="q"
                    className="w-full rounded-md border border-black bg-transparent px-4 py-2 text-sm placeholder:text-sm focus:outline-none dark:border-white/40"
                  />
                </Form>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    cn(isActive && "text-primary")
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    cn(isActive && "text-primary")
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </MaxWithWrapper>
    </header>
  );
}
