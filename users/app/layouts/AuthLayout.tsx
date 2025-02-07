import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { Link, Outlet, redirect } from "react-router";
import { getSession } from "@/lib/utils";
import type { Route } from "./+types/AuthLayout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("user")) return redirect("/");

  return null;
};

export default function AuthLayout() {
  return (
    <MaxWithWrapper as="section">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="md:order-2">
          <div className="space-y-6 md:max-w-(--breakpoint-sm)">
            <Outlet />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms-and-condition"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service&nbsp;
              </Link>
              and&nbsp;
              <Link
                to="/privacy-policy"
                className="hover:text-primary underline underline-offset-4"
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
          <figcaption className="sr-only">
            Autentication Banner
          </figcaption>
        </figure>
      </div>
    </MaxWithWrapper>
  );
}
