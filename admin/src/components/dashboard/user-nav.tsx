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
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { logoutMutation } from "@/lib/mutations/auth.mutation";
import { SessionStorage } from "@/config/constants";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import { User } from "lucide-react";

export function UserNav() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);

      setUser(null);

      navigate({
        to: "/",
      });
    },
    onError: ({ message }) => {
      toast({
        title: message,
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatar?.url} />
          <AvatarFallback>
            {user?.fullName ? user?.fullName?.charAt(0) : <User />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000] w-72" align="end">
        <DropdownMenuLabel className="flex items-start gap-6">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar?.url} />
            <AvatarFallback>
              {user?.fullName ? user?.fullName?.charAt(0) : <User />}
            </AvatarFallback>
          </Avatar>
          <div>
            <strong>{user?.fullName}</strong>
            <p className="text-sm text-muted-foreground">
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
              onClick={() => mutate()}
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
