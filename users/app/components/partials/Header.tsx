import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Heart, ShoppingCart, User2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Input } from "../ui/input";

function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar?.url} />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="flex items-start gap-6">
          <Avatar>
            <AvatarImage src={user.avatar?.url} />
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div>
            <strong>{user.fullName}</strong>
            <p className="text-muted-foreground text-sm">
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
  const { cart } = useCart();

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
                  <Input placeholder="Search" name="q" />
                </Form>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/wishlist" className="w-full">
                  <Heart />
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className={cn(
                    buttonVariants({
                      variant: "secondary",
                      size: "icon",
                    }),
                    "relative",
                  )}
                >
                  <span className="bg-primary absolute -top-2 -right-2 grid h-6 w-6 place-content-center rounded-full text-white">
                    {cart?.totalItems ?? 0}
                  </span>
                  <ShoppingCart size={16} />
                </Link>
                <NavigationMenuItem>
                  <Link to="/wishlist" className="w-full">
                    <Heart />
                    <span className="sr-only">My Wishlist</span>
                  </Link>
                </NavigationMenuItem>
                <UserMenu user={user} />
              </>
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
