import { buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { MaxWithWrapper } from "./MaxWithWrapper";

export function NotFound() {
  return (
    <>
      <main className="flex">
        <MaxWithWrapper as="section" className="mt-16 lg:mt-24">
          <div className="max-w-(--breakpoint-sm) text-center">
            <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Something&apos;s missing.
            </p>
            <p className="text-secondary-foreground mb-8 text-lg font-light">
              Sorry, we can&apos;t find that page. You&apos;ll find
              lots to explore on the home page.{" "}
            </p>

            <Link to="/" className={buttonVariants()}>
              Back to Homepage
            </Link>
          </div>
        </MaxWithWrapper>
      </main>
    </>
  );
}
