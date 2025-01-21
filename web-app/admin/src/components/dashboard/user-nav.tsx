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

export function UserNav() {
  const { user, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);
      setIsLoggedIn(false);

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
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="flex items-start gap-6">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
              {user?.fullName?.charAt(0)}
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
            <Link href="/my-courses" className="w-full">
              My learning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/cart" className="w-full">
              My cart
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/wishlist" className="w-full">
              Wishlist
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/notifications" className="w-full">
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/messages" className="w-full">
              Messages
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/edit-account" className="w-full">
              Account Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/purchase-history" className="w-full">
              Purchase history
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/support" target="_blank" className="w-full">
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
