import { Outlet } from "react-router";
import { useUserStore } from "~/store/userStore";
import { Navigate } from "react-router";
import { Loading } from "~/components/loading";
import { Header } from "~/components/header";

export default function Layout() {
  const { isAuthenticated, isAuthChecked } = useUserStore();

  if (!isAuthChecked) return <Loading />;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="hidden items-center justify-center bg-linear-to-br from-primary to-accent p-8 md:flex">
          <div className="max-w-md text-center text-white">
            <div className="mb-6 text-6xl font-bold">E</div>
            <h1 className="mb-4 text-4xl font-bold">Edulearn</h1>
            <p className="text-lg opacity-90">
              Transform your learning journey with access to world-class courses
              designed for students seeking quality education.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
