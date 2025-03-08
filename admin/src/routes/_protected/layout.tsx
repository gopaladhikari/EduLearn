import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { axiosInstance } from "@/config/axios";
import { setUserStore, useMe } from "@/store/user-store";
import type { User } from "@/types";
import {
  createFileRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,

  loader: async () => {
    try {
      const { data } = await axiosInstance.get<User>("/api/users/me");
      if (data) setUserStore(data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  staleTime: 10_000,
});

function RouteComponent() {
  const navigate = useNavigate();

  const user = useMe();

  useEffect(() => {
    if (!user)
      navigate({
        to: "/login",
        search: { redirect: location.href },
      });
  }, [user, navigate]);

  return (
    <MaxWithWrapper className="h-full space-y-3">
      <Outlet />
    </MaxWithWrapper>
  );
}
