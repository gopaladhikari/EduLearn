import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function Dashboard() {
  const { isLoggedIn, isPending } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isLoggedIn) navigate("/login");
  }, [isLoggedIn, isPending, navigate]);

  if (isPending) return <div>Loading...</div>;

  return <div>Dashboard</div>;
}
