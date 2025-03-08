import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import {
  createFileRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
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
            alt="picture of students, studying in a classroom"
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
