import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <MaxWithWrapper as="section">
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
          <figcaption className="sr-only">
            Autentication Banner
          </figcaption>
        </figure>
      </div>
    </MaxWithWrapper>
  );
}
