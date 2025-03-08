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
import { Link } from "@tanstack/react-router";

import { User } from "lucide-react";
import { clearUserStore, useMe } from "@/store/user-store";
import { useTransition } from "react";
import { axiosInstance } from "@/config/axios";
import { toast } from "@/hooks/use-toast";

export function UserNav() {
  const user = useMe();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const { data } = await axiosInstance.post("/api/auth/logout");
        if (data) clearUserStore();
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: (error as Error).message,

          variant: "destructive",
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatar?.url} />
          <AvatarFallback>{<User />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-10000 w-72" align="end">
        <DropdownMenuLabel className="flex items-start gap-6">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar?.url} />
            <AvatarFallback>{<User />}</AvatarFallback>
          </Avatar>
          <div>
            <strong>{user?.fullName}</strong>
            <p className="text-muted-foreground text-sm">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/courses" className="w-full">
              My learning
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
            <Link to="/" target="_blank" className="w-full">
              Help and support
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              className="w-full"
              variant="link"
              disabled={isPending}
              onClick={handleLogout}
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
