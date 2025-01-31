import { useAuth } from "@/hooks/useAuth";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export default function Layout() {
  const { isPending, isLoggedIn, isMounted } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isLoggedIn && isMounted) {
      navigate("/login");
    }
  }, [isLoggedIn, isPending, isMounted, navigate]);

  if (isPending) return <div>Loading...</div>;

  return <Outlet />;
}
