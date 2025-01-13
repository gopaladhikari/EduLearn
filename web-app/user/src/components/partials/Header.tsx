import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { CourseCategory } from "@/config/constant";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { Input } from "../ui/input";

export function Header() {
  return (
    <MaxWithWrapper>
      <div className="mx-auto flex h-16 items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            E
          </div>
          <span>Learning</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Categories
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search for anything"
              className="w-full rounded-full pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>

          <Button size="sm" className="rounded-sm">
            <Link href="/register">Register</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            🌐
          </Button>
        </div>
      </div>

      <div className="no-scrollbar overflow-auto border-t p-0">
        <NavigationMenu className="py-2">
          <NavigationMenuList>
            {Object.values(CourseCategory).map((item) => {
              const href = `/category/${item
                .toLocaleLowerCase()
                .replaceAll(" ", "-")}`;
              return (
                <NavigationMenuItem
                  key={item}
                  className="cursor-pointer"
                >
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href={href}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </MaxWithWrapper>
  );
}
