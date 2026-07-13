import { Navigate, Outlet } from "react-router";
import { Header } from "~/components/header";
import { Loading } from "~/components/loading";
import { useUserStore } from "~/store/userStore";

export default function Layout() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const isAuthChecked = useUserStore((state) => state.isAuthChecked);

  if (!isAuthChecked) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/?redirect=logout" />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
