import { useAuth } from "@/hooks/useAuth";
import { Link, Outlet, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function Layout() {
  const { isPending, isMounted, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending) {
      if (isMounted) {
        if (isLoggedIn) navigate("/");
      }
    }
  }, [isLoggedIn, isPending, navigate, isMounted]);

  if (!isMounted) return;

  if (isPending) return <div>loading...</div>;

  return (
    <section>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="md:order-2">
          <div className="space-y-6 md:max-w-screen-sm">
            <Outlet />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms-and-condition"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service&nbsp;
              </Link>
              and&nbsp;
              <Link
                to="/privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <figure className="md:order-1">
          <img
            src="/auth-banner.jpeg"
            alt="students, studying in a classroom"
            height={544}
            width={544}
            className="rounded-md"
          />
          <figcaption className="sr-only">Autentication Banner</figcaption>
        </figure>
      </div>
    </section>
  );
}
