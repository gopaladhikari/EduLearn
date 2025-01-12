import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Link } from "@remix-run/react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

export function Header() {
  return (
    <MaxWidthWrapper className="border-b">
      <div className="flex h-16 items-center px-4    mx-auto gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-xl"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            U
          </div>
          <span>Udemy</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Categories
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1 flex items-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for anything"
              className="w-full pl-10 rounded-full"
            />
          </div>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Udemy Business
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Teach on Udemy
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm" className="rounded-sm">
            Sign up
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

      <div className="border-t">
        <div className="container mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="gap-6 px-4 py-1">
              {[
                "Development",
                "Business",
                "Finance & Accounting",
                "IT & Software",
                "Office Productivity",
                "Personal Development",
                "Design",
                "Marketing",
              ].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
